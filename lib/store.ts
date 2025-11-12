import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/slice/authSlice";
import onboardingReducer from "./features/slice/onboardingSlice";
import userReducer from "./features/slice/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      auth: authReducer,
      onboarding: onboardingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Indiquer les chemins à ignorer
          ignoredPaths: [
            "onboarding.onboardings.createdAt",
            "onboarding.onboardings.updatedAt",
          ],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
