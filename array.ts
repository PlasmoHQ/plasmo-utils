// https://stackoverflow.com/a/63795192/3151192
// CC BY-SA 4.0
// By Sebastien Lorber
export async function find<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean>
): Promise<T | undefined> {
  for (const t of array) {
    if (await predicate(t)) {
      return t
    }
  }
  return undefined
}
