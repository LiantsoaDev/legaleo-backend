import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type WorkspaceState = {
  workspaceName: string;
  currentSpace: string;
  spaces: string[];
  companyName?: string | null;
  shareholderName?: string | null;
  shareholderSiren?: string | null;
};

const initialState: WorkspaceState = {
  workspaceName: "", // Will be resolved from onboarding or defaults
  currentSpace: "",
  spaces: [],
  companyName: null,
  shareholderName: null,
  shareholderSiren: null,
};

export const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setWorkspaceData: (
      state,
      action: PayloadAction<{
        workspaceName?: string;
        companyName?: string | null;
        shareholderName?: string | null;
        shareholderSiren?: string | null;
      }>
    ) => {
      state.workspaceName = action.payload.workspaceName ?? state.workspaceName;
      state.companyName =
        action.payload.companyName !== undefined
          ? action.payload.companyName
          : state.companyName;
      state.shareholderName =
        action.payload.shareholderName !== undefined
          ? action.payload.shareholderName
          : state.shareholderName;
      state.shareholderSiren =
        action.payload.shareholderSiren !== undefined
          ? action.payload.shareholderSiren
          : state.shareholderSiren;
    },
    setWorkspaceSpaces: (
      state,
      action: PayloadAction<{ spaces: string[]; currentSpace?: string }>
    ) => {
      const uniqueSpaces = Array.from(new Set(action.payload.spaces)).filter(
        Boolean
      );
      state.spaces = uniqueSpaces;
      if (action.payload.currentSpace) {
        state.currentSpace = action.payload.currentSpace;
      } else if (uniqueSpaces.length && !uniqueSpaces.includes(state.currentSpace)) {
        state.currentSpace = uniqueSpaces[0];
      }
    },
    setCurrentWorkspaceSpace: (state, action: PayloadAction<string>) => {
      state.currentSpace = action.payload;
      if (action.payload && !state.spaces.includes(action.payload)) {
        state.spaces.push(action.payload);
      }
    },
    resetWorkspace: (state) => {
      state.workspaceName = initialState.workspaceName;
      state.currentSpace = initialState.currentSpace;
      state.spaces = initialState.spaces;
      state.companyName = initialState.companyName;
      state.shareholderName = initialState.shareholderName;
      state.shareholderSiren = initialState.shareholderSiren;
    },
  },
});

export const {
  setWorkspaceData,
  setWorkspaceSpaces,
  setCurrentWorkspaceSpace,
  resetWorkspace,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
