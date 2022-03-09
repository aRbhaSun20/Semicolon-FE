import { create } from "@tensorflow-models/knn-classifier";

export const MODEL_ACTIONS = {
  LOAD: "load_model",
};

export const ModelReducers = (
  InitialState = { knnClassifier: create(), model: {} },
  actions
) => {
  switch (actions.type) {
    case MODEL_ACTIONS.LOAD:
      return { ...InitialState, model: actions.payload };

    default:
      return InitialState;
  }
};
