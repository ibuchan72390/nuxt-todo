<template>
  <div>
    <input type="text" v-model="title">
    <button :disabled="!canSubmit" @click="submit()">Create Todo</button>
  </div>
</template>

<script lang="ts">
import { Component, namespace } from 'nuxt-property-decorator'
import Vue from 'vue'

import { TodoFormStoreKeys } from '@/models'

const todoForm = namespace(TodoFormStoreKeys.namespace)

@Component
export default class TodoForm extends Vue {
  public get title() {
    return this.storeTitle
  }
  public set title(value: string) {
    this.setTitle(value)
  }

  @todoForm.Getter(TodoFormStoreKeys.getters.canSubmit)
  public canSubmit: boolean

  @todoForm.Action(TodoFormStoreKeys.actions.submit)
  public submit: () => Promise<void>

  @todoForm.Mutation(TodoFormStoreKeys.mutations.setTitle)
  private setTitle: (title: string) => void

  @todoForm.State(TodoFormStoreKeys.state.title)
  private storeTitle: string
}
</script>

