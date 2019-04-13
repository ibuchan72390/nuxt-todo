export class KeyValue<TKey, TVal> {
  public key: TKey
  public val: TVal
}

export class StringKeyValue<TVal> extends KeyValue<string, TVal> {}
