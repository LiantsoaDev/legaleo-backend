import { OnboardingStep } from "@/app/generated/prisma";
import { fileToBase64, getOnboardings, postOnboardingData } from "@/server";
import { OnboardingWithSteps } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  clearJuridiqueOnboardingAnswers,
  readJuridiqueOnboardingAnswers,
} from "@/utils/onboardingCookie";

const normalizeObject = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(normalizeObject);
  }
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce<Record<string, any>>((acc, key) => {
        acc[key] = normalizeObject(value[key]);
        return acc;
      }, {});
  }
  return value;
};

const getPayloadHash = (value: Record<string, any>) =>
  JSON.stringify(normalizeObject(value));

export interface OnboardingState {
  steps: OnboardingStep[];
  onboardings: OnboardingWithSteps | null;
  currentStep: number;
  internalStep: number;
  maxInternalStep: number;
  formData: Record<string, any>;
  lastSyncedPayloadHash: string | null;
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
  lastSyncedPayloadHash: null,
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

    const isJuridiqueOnboarding = (() => {
      const title = onboardingDatas?.title?.toLowerCase() ?? "";
      const pathIsJuridique =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/onboarding/juridique");

      return (
        pathIsJuridique ||
        title.includes("juridique") ||
        title.includes("reseau etabli")
      );
    })();

    const isFinalJuridiqueQuestion =
      isJuridiqueOnboarding && currentStep === 8 && internalStep === 1;

    const shouldPersistImmediately =
      !isJuridiqueOnboarding || isFinalJuridiqueQuestion;

    // Sauvegarde d'abord les données
    if (shouldPersistImmediately && onboardingDatas && userId) {
      const valuesOverride = isFinalJuridiqueQuestion
        ? { ...formData, ...readJuridiqueOnboardingAnswers() }
        : formData;

      await dispatch(
        saveStepData({
          userId,
          onboardingDatas,
          valuesOverride,
        })
      );

      if (isFinalJuridiqueQuestion) {
        clearJuridiqueOnboardingAnswers();
      }
    }

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

    const isJuridiqueOnboarding = (() => {
      const title = onboardingDatas?.title?.toLowerCase() ?? "";
      const pathIsJuridique =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/onboarding/juridique");

      return (
        pathIsJuridique ||
        title.includes("juridique") ||
        title.includes("reseau etabli")
      );
    })();
    const isFinalJuridiqueQuestion =
      isJuridiqueOnboarding && currentStep === 8 && internalStep === 1;
    const shouldPersistImmediately =
      !isJuridiqueOnboarding || isFinalJuridiqueQuestion;

    if (internalStep > 1) {
      dispatch(decrementInternalStep());
      return;
    }

    if (internalStep === 1) {
      if (shouldPersistImmediately && onboardingDatas && userId) {
        await dispatch(
          saveStepData({
            userId,
            onboardingDatas,
            valuesOverride: isFinalJuridiqueQuestion
              ? { ...formData, ...readJuridiqueOnboardingAnswers() }
              : formData,
          })
        );

        if (isFinalJuridiqueQuestion) {
          clearJuridiqueOnboardingAnswers();
        }
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
    const { currentStep, formData, internalStep } = state.onboarding;

    const isJuridiqueOnboarding = (() => {
      const title = onboardingDatas?.title?.toLowerCase() ?? "";
      const pathIsJuridique =
        typeof window !== "undefined" &&
        window.location.pathname.includes("/onboarding/juridique");

      return (
        pathIsJuridique ||
        title.includes("juridique") ||
        title.includes("reseau etabli")
      );
    })();
    const isFinalJuridiqueQuestion =
      isJuridiqueOnboarding && currentStep === 8 && internalStep === 1;
    const shouldPersistImmediately =
      !isJuridiqueOnboarding || isFinalJuridiqueQuestion;

    if (step === currentStep) return;

    if (shouldPersistImmediately && onboardingDatas) {
      await dispatch(
        saveStepData({
          userId,
          onboardingDatas,
          valuesOverride: isFinalJuridiqueQuestion
            ? { ...formData, ...readJuridiqueOnboardingAnswers() }
            : formData,
        })
      );

      if (isFinalJuridiqueQuestion) {
        clearJuridiqueOnboardingAnswers();
      }
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
    },
    { getState }
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

    if (!Object.keys(data).length) {
      return { saved: false as const };
    }

    const onboarding_id = onboardingDatas && onboardingDatas?.id;

    if (!onboarding_id) {
      return { saved: false as const };
    }

    const nextPayloadHash = getPayloadHash(data);
    const state = getState() as { onboarding: OnboardingState };
    if (state.onboarding.lastSyncedPayloadHash === nextPayloadHash) {
      return { saved: false as const };
    }

    const dataToSend = {
      userId,
      onboarding_id,
      value: data,
    };

    await postOnboardingData(dataToSend);
    return {
      saved: true as const,
      data,
      hash: nextPayloadHash,
    };
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
        // Remettre internalStep à 1 pour que le composant de l'étape précédente se remonte correctement
        state.internalStep = 1;
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
        if (action.payload?.saved && action.payload.data && action.payload.hash) {
          state.formData = { ...state.formData, ...action.payload.data };
          state.lastSyncedPayloadHash = action.payload.hash;
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
