import { create } from "@tensorflow-models/knn-classifier";

export const MODEL_ACTIONS = {
  LOAD: "load_model",
  CHANGE_PARAMETERS: "changes_model_parameters",
};

export const ModelReducers = (
  InitialState = { knnClassifier: create(), model: {}, training: false,complete:false },
  actions
) => {
  switch (actions.type) {
    case MODEL_ACTIONS.LOAD:
      return { ...InitialState, model: actions.payload };
    case MODEL_ACTIONS.CHANGE_PARAMETERS:
      return { ...InitialState, ...actions.payload };
    default:
      return InitialState;
  }
};
