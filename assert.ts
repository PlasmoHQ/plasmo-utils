import { AssertionError } from "assert"

export function assertUnreachable(_value: never): never {
  throw new Error("Statement should be unreachable")
}

export function assertTruthy<T>(value: T, message = "Value is invalid") {
  if (!value) {
    throw new AssertionError({
      message
    })
  }
  return value
}
