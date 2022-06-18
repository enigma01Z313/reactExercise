export default function reducer(state, action) {
  const { type, payload } = action;
  console.log(type, payload, state);

  if (type === "ADD_TODO") {
    console.log(payload);
    return [
      ...state,
      {
        userId: 1,
        id: payload.id,
        title: payload.title,
        completed: false,
      },
    ];
  }

  if (type === "REMOVE_TODO")
    return state.filter((item) => item.id !== payload);

  if (type === "LOAD_TODOS") return [...payload];

  return state;
}
