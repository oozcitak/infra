import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { map as infraMap } from '../lib'

suite('Map', () => {

  test('get()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.get(map, 1), 'a')
  })

  test('set()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.set(map, 4, 'd')
    deepEqual(map, new Map([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]))
  })

  test('remove()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.remove(map, 2)
    deepEqual(map, new Map([[1, 'a'], [3, 'c']]))
  })

  test('remove() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.remove(map, (item) => item[0] > 1)
    deepEqual(map, new Map([[1, 'a']]))
  })

  test('contains()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.contains(map, 1), true)
    deepEqual(infraMap.contains(map, 5), false)
  })

  test('contains() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.contains(map, (item) => item[0] > 1), true)
    deepEqual(infraMap.contains(map, (item) => item[0] > 5), false)
  })

  test('keys()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.keys(map), new Set([1, 2, 3]))
  })

  test('values()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.values(map), ['a', 'b', 'c'])
  })

  test('size()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.size(map), 3)
  })

  test('size() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.size(map, (item) => item[0] >= 2), 2)
  })

  test('isEmpty()', () => {
    const map1 = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    deepEqual(infraMap.isEmpty(map1), false)
    const map2 = new Map()
    deepEqual(infraMap.isEmpty(map2), true)
  })

  test('forEach()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const list = new Array<string>()
    for (const item of infraMap.forEach(map)) {
      list.push(item[0].toString() + '_' + item[1])
    }
    deepEqual(list, ['1_a', '2_b', '3_c'])
  })

  test('forEach() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const list = new Array<string>()
    for (const item of infraMap.forEach(map, item => item[0] >= 2)) {
      list.push(item[0].toString() + '_' + item[1])
    }
    deepEqual(list, ['2_b', '3_c'])
  })

  test('clone()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.clone(map)
    deepEqual(newMap, new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInAscendingOrder()', () => {
    const map = new Map([[3, 'c'], [2, 'b'], [1, 'a']])
    const newMap = infraMap.sortInAscendingOrder(map, (a, b) => a[0] < b[0])
    deepEqual(newMap, new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInAscendingOrder() reverse', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.sortInAscendingOrder(map, (a, b) => a[0] < b[0])
    deepEqual(newMap, new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInDescendingOrder()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.sortInDescendingOrder(map, (a, b) => a[0] < b[0])
    deepEqual(newMap, new Map([[3, 'c'], [2, 'b'], [1, 'a']]))
  })

  test('sortInDescendingOrder() reverse', () => {
    const map = new Map([[3, 'c'], [2, 'b'], [1, 'a']])
    const newMap = infraMap.sortInDescendingOrder(map, (a, b) => a[0] < b[0])
    deepEqual(newMap, new Map([[3, 'c'], [2, 'b'], [1, 'a']]))
  })

})