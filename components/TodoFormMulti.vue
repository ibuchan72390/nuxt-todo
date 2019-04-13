<template>
  <div>
    <input type="text" v-model="title">
    <button :disabled="!canSubmit" @click="submit()">Create Todo</button>
  </div>
</template>

<script lang="ts">
import { Component, namespace } from 'nuxt-property-decorator'
import Vue from 'vue'

import { StringKeyValue, TodoFormMultiStoreKeys } from '@/models'

const todoForm = namespace(TodoFormMultiStoreKeys.namespace)

@Component
export default class TodoFormMulti extends Vue {
  public get title() {
    return this.storeTitle(this.internalKey)
  }
  public set title(value: string) {
    this.setTitle({ key: this.internalKey, val: value })
  }

  public get canSubmit(): boolean {
    return this.canSubmitFn(this.internalKey)
  }

  @todoForm.Getter(TodoFormMultiStoreKeys.getters.canSubmitFn)
  public canSubmitFn: (key: string) => boolean

  @todoForm.Action(TodoFormMultiStoreKeys.actions.submitKey)
  public submitFn: (key: string) => Promise<void>

  @todoForm.Getter(TodoFormMultiStoreKeys.getters.getTitleFn)
  private storeTitle: (key: string) => string

  private internalKey: string = Math.random().toString()

  @todoForm.Mutation(TodoFormMultiStoreKeys.mutations.setKeyedTitleFn)
  private setTitle: (title: StringKeyValue<string>) => void

  public submit() {
    this.submitFn(this.internalKey)
  }
}
</script>
