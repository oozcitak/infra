import { isFunction } from "@oozcitak/util"

/**
 * Gets the value corresponding to the given key.
 *
 * @param map - a map
 * @param key - a key
 */
export function get<K, V>(map: Map<K, V>, key: K) {
  return map.get(key)
}

/**
 * Sets the value corresponding to the given key.
 *
 * @param map - a map
 * @param key - a key
 * @param val - a value
 */
export function set<K, V>(map: Map<K, V>, key: K, val:V) {
  map.set(key, val)
}

/**
 * Removes the item with the given key or all items matching condition.
 *
 * @param map - a map
 * @param conditionOrItem - the key of an item to remove or a condition matching
 * items to remove
 */
export function remove<K, V>(map: Map<K, V>, conditionOrItem: K | ((item: [K, V]) => boolean)) {
  if (!isFunction(conditionOrItem)) {
    map.delete(conditionOrItem)
  } else {
    const toRemove: Array<K> = []
    for (const item of map) {
      if (!!conditionOrItem.call(null, item)) {
        toRemove.push(item[0])
      }
    }
    for(const key of toRemove) {
      map.delete(key)
    }
  }
}

/**
 * Determines if the map contains a value with the given key.
 *
 * @param map - a map
 * @param conditionOrItem - the key of an item to match or a condition matching
 * items
 */
export function contains<K, V>(map: Map<K, V>, conditionOrItem: K | ((item: [K, V]) => boolean)) {
  if (!isFunction(conditionOrItem)) {
    return map.has(conditionOrItem)
  } else {
    for (const item of map) {
      if (!!conditionOrItem.call(null, item)) {
        return true
      }
    }
    return false
  }
}

/**
 * Gets the keys of the map.
 *
 * @param map - a map
 */
export function keys<K, V>(map: Map<K, V>) {
  return new Set(map.keys())
}

/**
 * Gets the values of the map.
 *
 * @param map - a map
 */
export function values<K, V>(map: Map<K, V>) {
  return [...map.values()]
}

/**
 * Gets the size of the map.
 *
 * @param map - a map
 * @param condition - an optional condition to match
 */
export function size<K, V>(map: Map<K, V>, condition?: ((item: [K, V]) => boolean)) {
  if (condition === undefined) {
    return map.size
  } else {
    let count = 0
    for (const item of map) {
      if (!!condition.call(null, item)) {
        count++
      }
    }
    return count
  }
}

/**
 * Determines if the map is empty.
 *
 * @param map - a map
 */
export function isEmpty<K, V>(map: Map<K, V>) {
  return map.size === 0
}

/**
 * Returns an iterator for the items of the map.
 *
 * @param map - a map
 * @param condition - an optional condition to match
 */
export function *forEach<K, V>(map: Map<K, V>, condition?: ((item: [K, V]) => boolean)) {
  if (condition === undefined) {
    yield* map
  } else {
    for (const item of map) {
      if (!!condition.call(null, item)) {
        yield item
      }
    }
  }
}

/**
 * Creates and returns a shallow clone of map.
 *
 * @param map - a map
 */
export function clone<K, V>(map: Map<K, V>) {
  return new Map<K, V>(map)
}

/**
 * Returns a new map containing items from the map sorted in ascending
 * order.
 *
 * @param map - a map
 * @param lessThanAlgo - a function that returns `true` if its first argument
 * is less than its second argument, and `false` otherwise.
 */
export function sortInAscendingOrder<K, V>(map: Map<K, V>,
  lessThanAlgo: ((itemA: [K, V], itemB: [K, V]) => boolean)) {
  const list = new Array<[K, V]>(...map)
  list.sort((itemA, itemB) =>
    lessThanAlgo.call(null, itemA, itemB) ? -1 : 1)
  return new Map<K, V>(list)
}

/**
 * Returns a new map containing items from the map sorted in descending
 * order.
 *
 * @param map - a map
 * @param lessThanAlgo - a function that returns `true` if its first argument
 * is less than its second argument, and `false` otherwise.
 */
export function sortInDescendingOrder<K, V>(map: Map<K, V>,
  lessThanAlgo: ((itemA: [K, V], itemB: [K, V]) => boolean)) {
  const list = new Array<[K, V]>(...map)
  list.sort((itemA, itemB) =>
    lessThanAlgo.call(null, itemA, itemB) ? 1 : -1)
  return new Map<K, V>(list)
}
