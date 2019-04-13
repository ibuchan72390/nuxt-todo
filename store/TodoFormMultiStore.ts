import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import {
  IRootState,
  ITodoFormMultiState,
  Todo,
  TodoFormMultiStoreKeys,
  TodoStoreKeys
} from '@/models'
import { StringKeyValue } from '@/models/KeyValue'

let id = 0 // Don't ever actually do this

const state = (): ITodoFormMultiState => {
  return {
    data: {}
  }
}

const getters: GetterTree<ITodoFormMultiState, IRootState> = {
  [TodoFormMultiStoreKeys.getters.canSubmitFn](
    STATE: ITodoFormMultiState,
    key: string
  ): boolean {
    const item = STATE.data[key]

    if (item) {
      return item.title.length > 0
    }

    return false
  },

  [TodoFormMultiStoreKeys.getters.getTitleFn](
    STATE: ITodoFormMultiState,
    key: string
  ): string {
    const item = STATE.data[key]

    if (item) {
      return item.title
    }
    return ''
  }
}

const mutations: MutationTree<ITodoFormMultiState> = {
  [TodoFormMultiStoreKeys.mutations.setKeyedTitleFn](
    STATE: ITodoFormMultiState,
    keyValue: StringKeyValue<string>
  ): void {
    const item = STATE.data[keyValue.key]

    if (item) {
      item.title = keyValue.val
    }
  }
}

const actions: ActionTree<ITodoFormMultiState, IRootState> = {
  [TodoFormMultiStoreKeys.actions.submitKey](
    context: ActionContext<ITodoFormMultiState, IRootState>,
    key: string
  ): void {
    const item = context.state.data[key]

    const todo: Todo = {
      completed: false,
      id: id--,
      title: item.title,
      userId: 123
    }

    context.commit(TodoFormMultiStoreKeys.mutations.setKeyedTitleFn, {
      key,
      value: ''
    })

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
