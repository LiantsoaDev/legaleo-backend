// hooks.ts (ou lib/hooks.ts, selon ton projet)

import {
    useDispatch,
    useSelector,
    useStore,
    type TypedUseSelectorHook,
  } from "react-redux";
  import type { AppDispatch, AppStore, RootState } from "./store";
  
  // hook dispatch typé
  export const useAppDispatch: () => AppDispatch = useDispatch;
  
  // hook selector typé
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
  
  // hook store typé
  export const useAppStore: () => AppStore = useStore;
  