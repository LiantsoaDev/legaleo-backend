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
  async ({ title }: { title: string }, { rejectWithValue }) => {
    try {
      const res = await getOnboardings(title);
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
    const formElement = document.querySelector("form");
    if (!formElement) return;

    const formData = new FormData(formElement as HTMLFormElement);
    const data: Record<string, any> = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([_, value]) => !(value instanceof File)
      )
    );

    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        const base64 = await fileToBase64(value);
        data[key] = { name: value.name, type: value.type, content: base64 };
      }
    }

    const onboarding_id = onboardingDatas && onboardingDatas?.id;

    if (!onboarding_id) return;

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
          state.steps = state.onboardings.steps;
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
        state.formData = { ...state.formData, ...action.payload };
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
