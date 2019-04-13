import { ITodoFormState } from '@/models'

export interface ITodoFormMultiState {
  data: { [key: string]: ITodoFormState }
}
