export type GenericHandlerType<T extends number | string, K> = {
  [y in T]: K;
};
