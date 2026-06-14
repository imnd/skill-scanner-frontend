export function toIterable<T extends Record<string, unknown>>(object: T): Iterable<T[keyof T]> {
  return {
    ...object,
    [Symbol.iterator]() {
      return Object.values(this).filter(v => typeof v === 'object')[Symbol.iterator]();
    }
  };
}
