export const PREDICTIONS_ACTIONS = {
  LOAD: "load_predictions",
};

export const PredictionReducers = (InitialState = {}, actions) => {
  switch (actions.type) {
    case PREDICTIONS_ACTIONS.LOAD:
      return actions.payload;

    default:
      return InitialState;
  }
};
