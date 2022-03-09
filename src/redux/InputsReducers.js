export const INPUT_ACTIONS = {
  ADD: "add_inputs",
  DELETE: "delete_input",
  CHANGE: "change_input",
};

export const InputReducers = (
  InitialState = [
    {
      name: "Input Key",
      value: null,
    },
  ],
  actions
) => {
  switch (actions.type) {
    case INPUT_ACTIONS.ADD:
      return [
        ...InitialState,
        {
          name: `Input Key ${InitialState.length}`,
          value: null,
        },
      ];
    case INPUT_ACTIONS.DELETE:
      return InitialState.filter((ele, i) => i !== actions.payload.index);
    case INPUT_ACTIONS.CHANGE:
      return InitialState.map((ele, j) =>
        actions.payload.index === j ? actions.payload.value : ele
      );
    default:
      return InitialState;
  }
};
