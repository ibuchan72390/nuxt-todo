<template>
  <div>
    <h3>Todos</h3>

    <div>
      <h3>Unkeyed Todo Form</h3>
      <todo-form></todo-form>
      <todo-form></todo-form>
    </div>

    <div>
      <h3>Keyed Todo Form</h3>
      <todo-form-multi></todo-form-multi>
      <todo-form-multi></todo-form-multi>
    </div>

    <div v-if="!loading">
      <div v-for="todo of todos" :key="todo.id">
        <span>{{todo.id}}</span>
        <span>{{todo.title}}</span>
        <input type="checkbox" :checked="todo.completed">
        <button @click="toggleComplete(todo)">Toggle</button>
      </div>
    </div>

    <b-loading :active="loading"></b-loading>
  </div>
</template>

<script lang="ts">
import { Component, namespace } from 'nuxt-property-decorator'
import Vue from 'vue'

import TodoForm from '~/components/TodoForm.vue'
import TodoFormMulti from '~/components/TodoFormMulti.vue'

import { Todo, TodoStoreKeys } from '~/models'

const todos = namespace(TodoStoreKeys.namespace)

@Component({
  components: {
    TodoForm,
    TodoFormMulti
  }
})
export default class TodoPage extends Vue {
  @todos.State(TodoStoreKeys.state.loading)
  public loading: boolean

  @todos.State(TodoStoreKeys.state.todos)
  public todos: Todo[]

  @todos.Mutation(TodoStoreKeys.mutations.toggleComplete)
  public toggleComplete: (todo: Todo) => void

  @todos.Action(TodoStoreKeys.actions.initialize)
  public initialize: () => Promise<void>

  public async created() {
    await this.initialize()
  }
}
</script>

