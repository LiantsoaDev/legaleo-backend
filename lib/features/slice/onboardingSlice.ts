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

export const fetchOnboardings = createAsyncThunk(
  "onboarding/fetchOnboardings",
  async (
    { title, userId }: { title: string; userId?: string | null },
    { rejectWithValue }
  ) => {
    try {
      const res = await getOnboardings(title, userId);
      if (!res) {
        return rejectWithValue("Impossible de récupérer les données");
      }
      console.log("res", res);
      return res;
    } catch (error) {
      return rejectWithValue("Erreur inattendue");
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
    const { internalStep, currentStep, steps, maxInternalStep, formData } =
      state.onboarding;

    // Sauvegarde d'abord les données
    if (onboardingDatas && userId)
      await dispatch(
        saveStepData({
          userId,
          onboardingDatas,
          valuesOverride: formData,
        })
      );

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
    const { internalStep, currentStep, formData } = state.onboarding;

    if (internalStep > 1) {
      dispatch(decrementInternalStep());
      return;
    }

    if (internalStep === 1) {
      if (onboardingDatas && userId) {
        await dispatch(
          saveStepData({
            userId,
            onboardingDatas,
            valuesOverride: formData,
          })
        );
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
    const { currentStep, formData } = state.onboarding;

    if (step === currentStep) return;

    if (onboardingDatas) {
      await dispatch(
        saveStepData({
          userId,
          onboardingDatas,
          valuesOverride: formData,
        })
      );
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
      valuesOverride,
    }: {
      userId: string;
      onboardingDatas: OnboardingWithSteps;
      valuesOverride?: Record<string, any>;
    }
  ) => {
    let data: Record<string, any> = {};

    const formElement = document.querySelector("form");

    if (formElement) {
      const formData = new FormData(formElement as HTMLFormElement);

      const appendValue = (key: string, value: any) => {
        if (key in data) {
          const current = data[key];
          data[key] = Array.isArray(current)
            ? [...current, value]
            : [current, value];
        } else {
          data[key] = value;
        }
      };

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          if (value.size === 0) continue;
          const base64 = await fileToBase64(value);
          appendValue(key, {
            name: value.name,
            type: value.type,
            content: base64,
          });
        } else {
          appendValue(key, value);
        }
      }
    }

    if (valuesOverride && Object.keys(valuesOverride).length > 0) {
      data = { ...data, ...valuesOverride };
    }

    if (!Object.keys(data).length) return {};

    const onboarding_id = onboardingDatas && onboardingDatas?.id;

    if (!onboarding_id) return {};

    const dataToSend = {
      userId,
      onboarding_id,
      value: data,
    };

    await postOnboardingData(dataToSend);
    return data;
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
      })
      .addCase(fetchOnboardings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onboardings = action.payload.data;
        if (state.onboardings) {
          state.steps = state.onboardings.steps.reverse();
        }
        state.formData =
          (action.payload.answer as Record<string, any>) ?? {};
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
          state.formData = { ...state.formData, ...action.payload };
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
