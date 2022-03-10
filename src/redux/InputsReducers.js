export const INPUT_ACTIONS = {
  ADD: "add_inputs",
  DELETE: "delete_input",
  CHANGE: "change_input",
  ADD_IMAGE: "add_image",
  DELETE_IMAGE: "delete_image",
};

export const InputReducers = (
  InitialState = [
    {
      name: "Input Key",
      value: [],
    },
    {
      name: "Input Key1",
      value: [],
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
          value: [],
        },
      ];
    case INPUT_ACTIONS.DELETE:
      return InitialState.filter((ele, i) => i !== actions.payload.index);
    case INPUT_ACTIONS.CHANGE:
      return InitialState.map((ele, j) =>
        actions.payload.index === j
          ? { ...ele, name: actions.payload.value }
          : ele
      );
    case INPUT_ACTIONS.ADD_IMAGE:
      return InitialState.map((ele, j) =>
        actions.payload.index === j
          ? { ...ele, value: [...ele.value, ...actions.payload.value] }
          : ele
      );
    case INPUT_ACTIONS.DELETE_IMAGE:
      return InitialState.map((ele, j) =>
        actions.payload.index === j
          ? {
              ...ele,
              value: ele.value.filter(
                (img, imgIndex) => imgIndex !== actions.payload.imgIndex
              ),
            }
          : ele
      );
    default:
      return InitialState;
  }
};
