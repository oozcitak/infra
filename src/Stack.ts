/**
 * Pushes the given item to the stack.
 *
 * @param list - a list
 * @param item - an item
 */
export function push<T>(list: Array<T>, item: T) {
  list.push(item)
}

/**
 * Pops and returns an item from the stack.
 *
 * @param list - a list
 */
export function pop<T>(list: Array<T>) {
  return list.pop() || null
}
