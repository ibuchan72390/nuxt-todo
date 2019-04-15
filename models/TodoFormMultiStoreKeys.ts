export const TodoFormMultiStoreKeys = {
  actions: {
    submitKey: 'submitKey'
  },
  getters: {
    canSubmitFn: 'canSubmitFn',
    getTitleFn: 'getTitleFn'
  },
  mutations: {
    initialize: 'INITIALIZE',
    setKeyedTitleFn: 'SET_KEYED_TITLE_FN'
  },
  namespace: 'TodoFormMultiStore',
  state: {
    title: 'title'
  }
}
