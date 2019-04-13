import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import {
  IRootState,
  ITodoFormState,
  Todo,
  TodoFormStoreKeys,
  TodoStoreKeys
} from '@/models'

let id = 0 // Don't ever actually do this

const state = (): ITodoFormState => {
  return {
    title: ''
  }
}

const getters: GetterTree<ITodoFormState, IRootState> = {
  [TodoFormStoreKeys.getters.canSubmit](STATE: ITodoFormState): boolean {
    return STATE.title.length > 0
  }
}

const mutations: MutationTree<ITodoFormState> = {
  [TodoFormStoreKeys.mutations.setTitle](
    STATE: ITodoFormState,
    title: string
  ): void {
    STATE.title = title
  }
}

const actions: ActionTree<ITodoFormState, IRootState> = {
  [TodoFormStoreKeys.actions.submit](
    context: ActionContext<ITodoFormState, IRootState>
  ): void {
    const todo: Todo = {
      completed: false,
      id: id--,
      title: context.state.title,
      userId: 123
    }

    context.commit(TodoFormStoreKeys.mutations.setTitle, '')

    context.commit(
      TodoStoreKeys.namespace + '/' + TodoStoreKeys.mutations.addTodo,
      todo,
      { root: true }
    )
  }
}

export const TodoFormStore = {
  actions,
  getters,
  mutations,
  namespaced: true,
  state
}

export default TodoFormStore
