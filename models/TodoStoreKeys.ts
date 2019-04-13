export const TodoStoreKeys = {
  actions: {
    initialize: 'initialize'
  },
  mutations: {
    addTodo: 'ADD_TODO',
    setLoading: 'SET_LOADING',
    setTodos: 'SET_TODOS',
    toggleComplete: 'TOGGLE_COMPLETE'
  },
  namespace: 'TodoStore',
  state: {
    loading: 'loading',
    todos: 'todos'
  }
}
