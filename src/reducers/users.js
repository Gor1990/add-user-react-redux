export default function users(state = [], {type, payload}) {
    switch (type) {
      case "ADD_USER":
      return [
          ...state,
          payload
      ];
            console.log('state',state);
      case "DELETE_USER":
        const newState = state.filter(item=>item.id !== payload);
        return newState;
      default:
        return state;
    }
}