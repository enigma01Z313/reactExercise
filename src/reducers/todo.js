export default function reducer(state, action) {
  const { type, payload } = action;
  console.log(type, payload, state);

  if (type === "ADD_TODO")
    return [...state, { id: new Date().getTime(), title: payload }];

  if (type === "REMOVE_TODO")
    return state.filter((item) => item.id !== payload);

  if (type === "LOAD_TODOS") return [...payload];

  return state;
}
