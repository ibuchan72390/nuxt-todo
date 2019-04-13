import { Todo } from '~/models'

export interface ITodoState {
  todos: Todo[]
  loading: boolean
}

// export interface ITodoState {
//   todos: Todo[] | null
// }
