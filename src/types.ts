declare type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
declare type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
