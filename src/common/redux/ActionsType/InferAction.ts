type Properties<T> = T extends { [key: string]: infer U } ? U : never
export type InferAction<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<Properties<T>>
