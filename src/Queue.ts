/**
 * Appends the given item to the queue.
 *
 * @param list - a list
 * @param item - an item
 */
export function enqueue<T>(list: Array<T>, item: T) {
  list.push(item)
}

/**
 * Removes and returns an item from the queue.
 *
 * @param list - a list
 */
export function dequeue<T>(list: Array<T>) {
  return list.shift() || null
}
