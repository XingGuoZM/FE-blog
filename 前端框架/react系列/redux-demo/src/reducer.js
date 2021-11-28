

export default (state={timer:0}, action) => {
  switch (action.type) {
    case 'add':
      return {timer: state.timer+1};
    case 'minus':
      return {timer: state.timer-1};
    default:
      return state
  }
}