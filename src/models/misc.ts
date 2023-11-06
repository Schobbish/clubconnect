/** The return type of useState, useful for context types. */
// could use ReturnType, but no nice way to not select the S | undefined
// overload which is annoying to work with
export type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];
