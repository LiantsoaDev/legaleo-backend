import { OnboardingStep } from "@/app/generated/prisma";
import { fileToBase64, getOnboardings, postOnboardingData } from "@/server";
import { OnboardingWithSteps } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingState {
  steps: OnboardingStep[];
  onboardings: OnboardingWithSteps | null;
  currentStep: number;
  internalStep: number;
  maxInternalStep: number;
  formData: Record<string, any>;
  isLoading: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  steps: [],
  onboardings: null,
  currentStep: 1,
  internalStep: 1,
  maxInternalStep: 1,
  formData: {},
  isLoading: false,
  error: null,
};

const ONBOARDING_FORM_SELECTOR = 'form[data-onboarding-form="true"]';

const appendFormValue = (
  target: Record<string, any>,
  key: string,
  value: any
) => {
  if (value === undefined) return;
  if (!(key in target)) {
    target[key] = value;
    return;
  }

  const existing = target[key];
  if (Array.isArray(existing)) {
    target[key] = [...existing, value];
    return;
  }

  target[key] = [existing, value];
};

const collectChoiceFieldValues = (
  formElement: HTMLFormElement
): Record<string, any> => {
  const inputs = Array.from(
    formElement.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox'], input[type='radio']"
    )
  );

  const choiceValues: Record<string, any> = {};

  inputs.forEach((input) => {
    if (!input.name) return;
    if (!(input.name in choiceValues)) {
      choiceValues[input.name] =
        input.type === "checkbox" ? ([] as string[]) : null;
    }

    if (input.checked) {
      if (input.type === "checkbox") {
        const current = choiceValues[input.name] as string[];
        choiceValues[input.name] = [...current, input.value];
      } else {
        choiceValues[input.name] = input.value;
      }
    }
  });

  return choiceValues;
};

const serializeFormEntries = async (
  formElement: HTMLFormElement
): Promise<Record<string, any>> => {
  const formData = new FormData(formElement);
  const serialized: Record<string, any> = {};

  for (const [key, rawValue] of formData.entries()) {
    if (rawValue instanceof File) continue;
    appendFormValue(serialized, key, rawValue as string);
  }

  for (const [key, rawValue] of formData.entries()) {
    if (!(rawValue instanceof File) || rawValue.size === 0) continue;
    const base64 = await fileToBase64(rawValue);
    const filePayload = {
      name: rawValue.name,
      type: rawValue.type,
      content: base64,
    };
    appendFormValue(serialized, key, filePayload);
  }

  const choiceValues = collectChoiceFieldValues(formElement);
  Object.entries(choiceValues).forEach(([key, value]) => {
    serialized[key] = value;
  });

  return serialized;
};

export const fetchOnboardings = createAsyncThunk(
  "onboarding/fetchOnboardings",
  async (
    { title, userId }: { title: string; userId?: string },
    { rejectWithValue }
  ) => {
    const loadOnboarding = async (maybeTitle?: string) =>
      getOnboardings(maybeTitle, userId);

    try {
      const res = await loadOnboarding(title);
      return res;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur inattendue lors de la récupération de l'onboarding";

      const isMissingOnboarding = /aucun onboarding/i.test(message);
      if (!isMissingOnboarding) {
        return rejectWithValue(message);
      }

      try {
        const fallback = await loadOnboarding();
        if (fallback?.data) {
          return fallback;
        }
        return rejectWithValue(
          "Aucun onboarding n'est configuré pour le moment. Merci de contacter l'administrateur."
        );
      } catch (fallbackError) {
        const fallbackMessage =
          fallbackError instanceof Error
            ? fallbackError.message
            : "Erreur inattendue lors de la récupération de l'onboarding";
        return rejectWithValue(fallbackMessage);
      }
    }
  }
);

export const handleNextStep = createAsyncThunk(
  "onboarding/handleNextStep",
  async (
    {
      userId,
      onboardingDatas,
      linkToRedirect,
    }: {
      userId: string | null;
      onboardingDatas: OnboardingWithSteps | null;
      linkToRedirect: string;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as { onboarding: OnboardingState };
    const { internalStep, currentStep, steps, maxInternalStep } =
      state.onboarding;

    // Sauvegarde d'abord les données
    if (onboardingDatas && userId)
      await dispatch(saveStepData({ userId, onboardingDatas }));

    if (internalStep < maxInternalStep) {
      dispatch(incrementInternalStep());
    } else {
      if (currentStep < steps.length) {
        dispatch(nextStep());
      } else {
        window.location.href = linkToRedirect;
      }
    }
  }
);

export const handlePrevStep = createAsyncThunk(
  "onboarding/handlePrevStep",
  async (
    {
      userId,
      onboardingDatas,
    }: {
      userId: string | null;
      onboardingDatas: OnboardingWithSteps | null;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as { onboarding: OnboardingState };
    const { internalStep, currentStep } = state.onboarding;

    if (internalStep > 1) {
      dispatch(decrementInternalStep());
      return;
    }

    if (internalStep === 1) {
      if (onboardingDatas && userId) {
        await dispatch(saveStepData({ userId, onboardingDatas }));
      }
      if (currentStep > 1) {
        dispatch(prevStep());
      }
    }
  }
);

export const jumpToStep = createAsyncThunk(
  "onboarding/jumpToStep",
  async (
    {
      step,
      userId,
      onboardingDatas,
    }: {
      step: number;
      userId: string;
      onboardingDatas: OnboardingWithSteps | null;
    },
    { dispatch, getState }
  ) => {
    const state = getState() as { onboarding: OnboardingState };
    const { currentStep } = state.onboarding;

    if (step === currentStep) return;

    if (onboardingDatas) {
      await dispatch(saveStepData({ userId, onboardingDatas }));
    }

    dispatch(setStep(step));
  }
);

export const saveStepData = createAsyncThunk(
  "onboarding/saveStepData",
  async (
    {
      userId,
      onboardingDatas,
    }: { userId: string; onboardingDatas: OnboardingWithSteps },
    { getState }
  ) => {
    const state = getState() as { onboarding: OnboardingState };
    if (typeof document === "undefined") {
      return state.onboarding.formData;
    }

    const formElement = document.querySelector<HTMLFormElement>(
      ONBOARDING_FORM_SELECTOR
    );
    if (!formElement) return state.onboarding.formData;

    const stepData = await serializeFormEntries(formElement);

    if (!Object.keys(stepData).length) {
      return state.onboarding.formData;
    }

    if (!onboardingDatas?.id) {
      return state.onboarding.formData;
    }

    const mergedData = {
      ...state.onboarding.formData,
      ...stepData,
    };

    await postOnboardingData({
      userId,
      onboarding_id: onboardingDatas.id,
      value: mergedData,
    });

    return mergedData;
  }
);

export const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
      state.internalStep = 1;
    },
    prevStep: (state) => {
      if (state.internalStep > 1) {
        state.internalStep -= 1;
      } else if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
      state.internalStep = 1;
    },
    incrementInternalStep: (state) => {
      state.internalStep += 1;
    },
    setMaxInternalStep: (state, action: PayloadAction<number>) => {
      state.maxInternalStep = action.payload;
    },
    decrementInternalStep: (state) => {
      if (state.internalStep > 1) {
        state.internalStep -= 1;
      }
    },
    resetOnboarding: (state) => {
      Object.assign(state, initialState);
    },
    updateFormData: (state, action: PayloadAction<Record<string, any>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboardings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnboardings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.onboardings = action.payload.data;
        if (state.onboardings) {
          state.steps = [...state.onboardings.steps].reverse();
          const existingAnswers =
            (state.onboardings.answers?.[0]?.value as Record<string, any>) ||
            {};
          state.formData = existingAnswers;
        } else {
          state.steps = [];
          state.formData = {};
        }
      })
      .addCase(fetchOnboardings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(saveStepData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveStepData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.formData = action.payload;
        }
      })
      .addCase(saveStepData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export const {
  nextStep,
  prevStep,
  resetOnboarding,
  updateFormData,
  incrementInternalStep,
  decrementInternalStep,
  setStep,
  setMaxInternalStep,
} = onboardingSlice.actions;
export default onboardingSlice.reducer;
