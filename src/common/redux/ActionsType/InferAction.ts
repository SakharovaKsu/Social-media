import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { StoreType } from '../store'

type Properties<T> = T extends { [key: string]: infer U } ? U : never
export type InferAction<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<Properties<T>>

export type BaseThunk<A extends Action, R = Promise<void>> = ThunkAction<R, StoreType, unknown, A>
