import { isFunction } from "@oozcitak/util"

/**
 * Adds the given item to the end of the list.
 * 
 * @param list - a list
 * @param item - an item
 */
export function append<T>(list: Array<T>, item: T): void {
  list.push(item)
}

/**
 * Extends a list by appending all items from another list.
 * 
 * @param listA - a list to extend
 * @param listB - a list containing items to append to `listA`
 */
export function extend<T>(listA: Array<T>, listB: Array<T>): void {
  listA.push(...listB)
}

/**
 * Inserts the given item to the start of the list.
 * 
 * @param list - a list
 * @param item - an item
 */
export function prepend<T>(list: Array<T>, item: T): void {
  list.unshift(item)
}

/**
 * Replaces the given item or all items matching condition with a new item.
 * 
 * @param list - a list
 * @param conditionOrItem - an item to replace or a condition matching items
 * to replace
 * @param item - an item
 */
export function replace<T>(list: Array<T>, conditionOrItem: T | ((item: T) => boolean),
  newItem: T): void {
  let i = 0
  for (const oldItem of list) {
    if (isFunction(conditionOrItem)) {
      if (!!conditionOrItem.call(null, oldItem)) {
        list[i] = newItem
      }
    } else if (oldItem === conditionOrItem) {
      list[i] = newItem
      return
    }
    i++
  }
}

/**
 * Inserts the given item before the given index.
 * 
 * @param list - a list
 * @param item - an item
 */
export function insert<T>(list: Array<T>, item: T, index: number): void {
  list.splice(index, 0, item)
}

/**
 * Removes the given item or all items matching condition.
 * 
 * @param list - a list
 * @param conditionOrItem - an item to remove or a condition matching items
 * to remove
 */
export function remove<T>(list: Array<T>, conditionOrItem: T | ((item: T) => boolean)): void {
  let i = list.length
  while (i--) {
    const oldItem = list[i]
    if (isFunction(conditionOrItem)) {
      if (!!conditionOrItem.call(null, oldItem)) {
        list.splice(i, 1)
      }
    } else if (oldItem === conditionOrItem) {
      list.splice(i, 1)
      return
    }
  }
}

/**
 * Removes all items from the list.
 */
export function empty<T>(list: Array<T>): void {
  list.length = 0
}

/**
 * Determines if the list contains the given item or any items matching 
 * condition.
 * 
 * @param list - a list
 * @param conditionOrItem - an item to a condition to match
 */
export function contains<T>(list: Array<T>, conditionOrItem: T | ((item: T) => boolean)): boolean {
  for (const oldItem of list) {
    if (isFunction(conditionOrItem)) {
      if (!!conditionOrItem.call(null, oldItem)) {
        return true
      }
    } else if (oldItem === conditionOrItem) {
      return true
    }
  }
  return false
}

/**
 * Returns the count of items in the list matching the given condition.
 * 
 * @param list - a list
 * @param condition - an optional condition to match
 */
export function size<T>(list: Array<T>, condition?: ((item: T) => boolean)): number {
  if (condition === undefined) {
    return list.length
  } else {
    let count = 0
    for (const item of list) {
      if (!!condition.call(null, item)) {
        count++
      }
    }
    return count
  }
}

/**
 * Determines if the list is empty.
 * 
 * @param list - a list
 */
export function isEmpty<T>(list: Array<T>): boolean {
  return list.length === 0
}

/**
 * Returns an iterator for the items of the list.
 * 
 * @param list - a list
 * @param condition - an optional condition to match
 */
export function *forEach<T>(list: Array<T>, condition?: ((item: T) => any)): IterableIterator<T> {
  if (condition === undefined) {
    yield* list
  } else {
    for (const item of list) {
      if (!!condition.call(null, item)) {
        yield item
      }
    }
  }
}

/**
 * Creates and returns a shallow clone of list.
 * 
 * @param list - a list
 */
export function clone<T>(list: Array<T>): Array<T> {
  return new Array<T>(...list)
}

/**
 * Returns a new list containing items from the list sorted in ascending 
 * order.
 * 
 * @param list - a list
 * @param lessThanAlgo - a function that returns `true` if its first argument
 * is less than its second argument, and `false` otherwise.
 */
export function sortInAscendingOrder<T>(list: Array<T>,
  lessThanAlgo: ((itemA: T, itemB: T) => boolean)): Array<T> {
  return list.sort((itemA: T, itemB: T) =>
    lessThanAlgo.call(null, itemA, itemB) ? -1 : 1)
}

/**
 * Returns a new list containing items from the list sorted in descending 
 * order.
 * 
 * @param list - a list
 * @param lessThanAlgo - a function that returns `true` if its first argument
 * is less than its second argument, and `false` otherwise.
 */
export function sortInDescendingOrder<T>(list: Array<T>,
  lessThanAlgo: ((itemA: T, itemB: T) => boolean)): Array<T> {
  return list.sort((itemA: T, itemB: T) =>
    lessThanAlgo.call(null, itemA, itemB) ? 1 : -1)
}
