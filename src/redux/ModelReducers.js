export const MODEL_ACTIONS = {
  LOAD: "load_model",
};

export const ModelReducers = (InitialState = {}, actions) => {
  switch (actions.type) {
    case MODEL_ACTIONS.LOAD:
      return actions.payload;

    default:
      return InitialState;
  }
};
