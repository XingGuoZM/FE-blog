

export default function counter(state={value:''}, action) {
  const { value,type } = action
  switch (type) {
    case 'add':
      return { value };
    default:
      return state
  }
}