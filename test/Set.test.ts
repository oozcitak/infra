import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { set as infraSet } from '../lib'

suite('Set', () => {

  test('append()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.append(set, 'd')
    deepEqual(set, new Set(['a', 'b', 'c', 'd']))
  })

  test('extend()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.extend(set, new Set(['d', 'e']))
    deepEqual(set, new Set(['a', 'b', 'c', 'd', 'e']))
  })

  test('prepend()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.prepend(set, 'd')
    deepEqual(set, new Set(['d', 'a', 'b', 'c']))
  })

  test('replace()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.replace(set, 'b', 'd')
    deepEqual(set, new Set(['a', 'd', 'c']))
  })

  test('replace() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    infraSet.replace(set, (item) => item.startsWith('b'), 'd')
    deepEqual(set, new Set(['a', 'd', 'c']))
  })

  test('insert()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.insert(set, 'd', 1)
    deepEqual(set, new Set(['a', 'd', 'b', 'c']))
  })

  test('remove()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.remove(set, 'b')
    deepEqual(set, new Set(['a', 'c']))
  })

  test('remove() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    infraSet.remove(set, (item) => item.startsWith('b'))
    deepEqual(set, new Set(['a', 'c']))
  })

  test('empty()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.empty(set)
    deepEqual(set.size, 0)
  })

  test('contains()', () => {
    const set = new Set(['a', 'b', 'c'])
    deepEqual(infraSet.contains(set, 'b'), true)
    deepEqual(infraSet.contains(set, 'd'), false)
  })

  test('contains() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    deepEqual(infraSet.contains(set, (item) => item.startsWith('b')), true)
    deepEqual(infraSet.contains(set, (item) => item.startsWith('d')), false)
  })

  test('size()', () => {
    const set = new Set(['a', 'b', 'c'])
    deepEqual(infraSet.size(set), 3)
  })

  test('size() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    deepEqual(infraSet.size(set, (item) => item.startsWith('b')), 2)
  })

  test('isEmpty()', () => {
    const set = new Set(['a', 'b', 'c'])
    deepEqual(infraSet.isEmpty(set), false)
    set.clear()
    deepEqual(infraSet.isEmpty(set), true)
  })

  test('forEach()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = new Set<string>()
    for (const item of infraSet.forEach(set)) {
      newSet.add(item + '_')
    }
    deepEqual(newSet, new Set(['a_', 'b_', 'c_']))
  })

  test('forEach() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    const newSet = new Set<string>()
    for (const item of infraSet.forEach(set, item => item.startsWith('b'))) {
      newSet.add(item + '_')
    }
    deepEqual(newSet, new Set(['b1_', 'b2_']))
  })

  test('clone()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.clone(set)
    deepEqual(newSet, new Set(['a', 'b', 'c']))
  })

  test('sortInAscendingOrder()', () => {
    const set = new Set(['c', 'b', 'a'])
    const newSet = infraSet.sortInAscendingOrder(set, (a, b) => a < b)
    deepEqual(newSet, new Set(['a', 'b', 'c']))
  })

  test('sortInAscendingOrder() reverse', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.sortInAscendingOrder(set, (a, b) => a < b)
    deepEqual(newSet, new Set(['a', 'b', 'c']))
  })

  test('sortInDescendingOrder()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.sortInDescendingOrder(set, (a, b) => a < b)
    deepEqual(newSet, new Set(['c', 'b', 'a']))
  })

  test('sortInDescendingOrder() reverse', () => {
    const set = new Set(['c', 'b', 'a'])
    const newSet = infraSet.sortInDescendingOrder(set, (a, b) => a < b)
    deepEqual(newSet, new Set(['c', 'b', 'a']))
  })

  test('isSubsetOf()', () => {
    const superset = new Set(['a', 'b', 'c', 'd'])
    const subset = new Set(['b', 'c'])
    const otherset = new Set(['1', '2'])
    deepEqual(infraSet.isSubsetOf(subset, superset), true)
    deepEqual(infraSet.isSubsetOf(otherset, superset), false)
  })

  test('isSupersetOf()', () => {
    const superset = new Set(['a', 'b', 'c', 'd'])
    const subset = new Set(['b', 'c'])
    const otherset = new Set(['1', '2'])
    deepEqual(infraSet.isSupersetOf(superset, subset), true)
    deepEqual(infraSet.isSupersetOf(superset, otherset), false)
  })

  test('intersection()', () => {
    const set1 = new Set(['a', 'b', 'c', 'd'])
    const set2 = new Set(['b', 'c'])
    const newSet = infraSet.intersection(set1, set2)
    deepEqual(newSet, new Set(['b', 'c']))
  })

  test('union()', () => {
    const set1 = new Set(['a', 'd'])
    const set2 = new Set(['b', 'c'])
    const newSet = infraSet.union(set1, set2)
    deepEqual(newSet, new Set(['a', 'd', 'b', 'c']))
  })

  test('range()', () => {
    const set = infraSet.range(1, 4)
    deepEqual(set, new Set([1, 2, 3, 4]))
  })

})