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
      // Pour l'onboarding général, ne pas utiliser formData du state comme valuesOverride
      // car cela pourrait écraser les nouvelles valeurs du formulaire
      // On laisse saveStepData récupérer directement depuis le formulaire
      const valuesOverride = isFinalJuridiqueQuestion
        ? { ...formData, ...readJuridiqueOnboardingAnswers() }
        : undefined; // Ne pas passer formData pour l'onboarding général

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
    const state = getState() as { onboarding: OnboardingState };
    // Commencer avec les données sauvegardées du state Redux pour récupérer toutes les valeurs
    let data: Record<string, any> = { ...state.onboarding.formData };

    // Récupérer le formulaire de manière synchrone d'abord
    const formElement = document.querySelector("form") as HTMLFormElement | null;

    if (formElement && formElement.isConnected) {
      // Récupérer directement depuis les inputs pour éviter les problèmes avec FormData
      const formInputs = formElement.querySelectorAll("input, textarea, select");

      // Tracker les noms de champs radio pour ne prendre que celui qui est checked
      const radioGroups: Record<string, HTMLInputElement | null> = {};

      formInputs.forEach((input) => {
        const htmlInput = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const name = htmlInput.name;
        
        if (!name) return;

        // Ignorer les champs qui sont dans valuesOverride pour éviter les conflits
        if (valuesOverride && name in valuesOverride) {
          return;
        }

        // Pour les inputs radio, ne prendre que celui qui est checked
        if (htmlInput instanceof HTMLInputElement && htmlInput.type === "radio") {
          if (htmlInput.checked) {
            // Si on a déjà une valeur pour ce groupe radio, la remplacer (ne garder que le checked)
            radioGroups[name] = htmlInput;
          }
          return; // On traitera les radios après
        }

        if (htmlInput instanceof HTMLInputElement && htmlInput.type === "file") {
          const files = htmlInput.files;
          if (files && files.length > 0) {
            const file = files[0];
            if (file.size > 0) {
              data[name] = file; // Ne pas utiliser appendValue pour les fichiers
            }
          }
        } else {
          // Récupérer la valeur directement depuis l'input
          const value = htmlInput.value;
          
          // Enregistrer toutes les valeurs non-null/undefined
          if (value !== undefined && value !== null) {
            // Pour les selects, ignorer les valeurs par défaut comme "Indiquez votre fonction"
            if (htmlInput instanceof HTMLSelectElement) {
              if (value && value !== "Indiquez votre fonction" && value !== "") {
                data[name] = value;
              }
            } else if (htmlInput instanceof HTMLInputElement && htmlInput.type === "checkbox") {
              // Pour les checkboxes, gérer comme un tableau si plusieurs sont cochées
              if (htmlInput.checked) {
                if (Array.isArray(data[name])) {
                  if (!data[name].includes(value)) {
                    data[name] = [...data[name], value];
                  }
                } else if (data[name] !== undefined) {
                  data[name] = [data[name], value];
                } else {
                  data[name] = value;
                }
              }
            } else {
              // Pour les autres inputs (text, email, textarea, etc.), enregistrer la valeur
              // Même si elle est vide, on l'enregistre pour permettre de vider un champ
              data[name] = value;
            }
          }
        }
      });

      // Traiter les radios après avoir parcouru tous les inputs
      Object.entries(radioGroups).forEach(([name, radioInput]) => {
        if (radioInput && !(valuesOverride && name in valuesOverride)) {
          // Pour les radios, utiliser la valeur normalisée si disponible depuis formData
          // Sinon utiliser la valeur brute de l'input
          const normalizedValue = state.onboarding.formData[name];
          data[name] = normalizedValue !== undefined ? normalizedValue : radioInput.value;
        }
      });

      // Traiter les fichiers séparément avec FormData
      const formData = new FormData(formElement);
      for (const [key, value] of formData.entries()) {
        // Ignorer les clés qui sont dans valuesOverride
        if (valuesOverride && key in valuesOverride) {
          continue;
        }
        if (value instanceof File) {
          if (value.size === 0) continue;
          const base64 = await fileToBase64(value);
          data[key] = {
            name: value.name,
            type: value.type,
            content: base64,
          };
        }
      }
    }

    // Fusionner avec valuesOverride, valuesOverride a la priorité pour éviter les conflits
    if (valuesOverride && Object.keys(valuesOverride).length > 0) {
      // valuesOverride a la priorité sur les valeurs du formulaire
      data = { ...data, ...valuesOverride };
    }

    // Log pour déboguer les données finales avant envoi
    console.log("Données finales avant envoi:", data);

    if (!Object.keys(data).length) {
      return { saved: false as const };
    }

    const onboarding_id = onboardingDatas && onboardingDatas?.id;

    if (!onboarding_id) {
      return { saved: false as const };
    }

    const nextPayloadHash = getPayloadHash(data);
    if (state.onboarding.lastSyncedPayloadHash === nextPayloadHash) {
      return { saved: false as const };
    }

    const dataToSend = {
      userId,
      onboarding_id,
      value: data,
    };

    console.log("Données envoyées à l'API:", dataToSend);

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
        const rawAnswer = (action.payload.answer as Record<string, any>) ?? {};
        
        // Normaliser les données : si un champ contient un tableau mais devrait être une seule valeur,
        // prendre la première valeur ou la valeur qui correspond à une option valide
        const normalizedFormData: Record<string, any> = {};
        Object.entries(rawAnswer).forEach(([key, value]) => {
          // Si la valeur est un tableau, vérifier si c'est un champ qui devrait être une seule valeur
          if (Array.isArray(value)) {
            // Pour les champs radio/select qui devraient avoir une seule valeur,
            // prendre la première valeur du tableau (probablement la valeur sélectionnée)
            // ou la dernière valeur si c'est un tableau d'options
            // On garde le tableau seulement si c'est intentionnel (comme pour les checkboxes multiples)
            const shouldBeSingleValue = [
              'points_de_vente',
              'utilise_crm',
              'localisation',
              'reseau_existant',
              'service_recrutement',
              'accompagnement_humain',
              'objectif_developpement',
              'type_reseau_dip_status',
              'has_contrat_model',
              'objectif_legaleo', // Peut être multiple, mais vérifions
            ].includes(key);
            
            if (shouldBeSingleValue && value.length > 0) {
              // Prendre la première valeur qui n'est pas une option par défaut
              // Si toutes les valeurs sont des options, prendre la première
              normalizedFormData[key] = value[0];
            } else {
              // Garder le tableau pour les champs qui peuvent être multiples
              normalizedFormData[key] = value;
            }
          } else {
            // Pour les valeurs non-tableaux, les garder telles quelles
            normalizedFormData[key] = value;
          }
        });
        
        // Pour l'onboarding juridique, fusionner avec les données des cookies
        // Les données de l'API ont la priorité, mais les cookies peuvent contenir des valeurs plus récentes
        const isJuridiqueOnboarding = (() => {
          const title = state.onboardings?.title?.toLowerCase() ?? "";
          const pathIsJuridique =
            typeof window !== "undefined" &&
            window.location.pathname.includes("/onboarding/juridique");
          return (
            pathIsJuridique ||
            title.includes("juridique") ||
            title.includes("reseau etabli")
          );
        })();
        
        if (isJuridiqueOnboarding) {
          const cookieData = readJuridiqueOnboardingAnswers();
          // Fusionner : les données des cookies ont la priorité pour les champs qu'elles contiennent
          // car elles peuvent être plus récentes (saisie en cours)
          state.formData = { ...normalizedFormData, ...cookieData };
        } else {
          state.formData = normalizedFormData;
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
