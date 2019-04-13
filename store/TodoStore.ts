import { IRootState, ITodoState, Todo, TodoStoreKeys } from '@/models'
import { ActionContext, ActionTree, MutationTree } from 'vuex'

export const state = (): ITodoState => {
  return {
    loading: false,
    todos: []
  }
}

export const actions: ActionTree<ITodoState, IRootState> = {
  async [TodoStoreKeys.actions.initialize](
    context: ActionContext<ITodoState, IRootState>
  ): Promise<void> {
    context.commit(TodoStoreKeys.mutations.setLoading, true)

    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      headers: {
        Accept: 'application/json'
      }
    })

    const values = await response.json()

    context.commit(TodoStoreKeys.mutations.setTodos, values)

    context.commit(TodoStoreKeys.mutations.setLoading, false)
  }
}

export const mutations: MutationTree<ITodoState> = {
  [TodoStoreKeys.mutations.addTodo](STATE: ITodoState, todo: Todo): void {
    STATE.todos.push(todo)
  },

  [TodoStoreKeys.mutations.setLoading](
    STATE: ITodoState,
    loading: boolean
  ): void {
    STATE.loading = loading
  },

  [TodoStoreKeys.mutations.setTodos](STATE: ITodoState, todos: Todo[]): void {
    STATE.todos = todos
  },

  [TodoStoreKeys.mutations.toggleComplete](
    STATE: ITodoState,
    todo: Todo
  ): void {
    const toComplete = STATE.todos.filter(x => x === todo)
    toComplete[0].completed = !toComplete[0].completed
  }
}

export const TodoStore = {
  actions,
  mutations,
  namespaced: true,
  state
}

export default TodoStore
