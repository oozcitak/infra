import { set as infraSet } from '../src'

describe('Set', () => {

  test('append()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.append(set, 'd')
    expect(set).toEqual(new Set(['a', 'b', 'c', 'd']))
  })

  test('extend()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.extend(set, new Set(['d', 'e']))
    expect(set).toEqual(new Set(['a', 'b', 'c', 'd', 'e']))
  })

  test('prepend()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.prepend(set, 'd')
    expect(set).toEqual(new Set(['d', 'a', 'b', 'c']))
  })

  test('replace()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.replace(set, 'b', 'd')
    expect(set).toEqual(new Set(['a', 'd', 'c']))
  })

  test('replace() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    infraSet.replace(set, (item) => item.startsWith('b'), 'd')
    expect(set).toEqual(new Set(['a', 'd', 'c']))
  })

  test('insert()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.insert(set, 'd', 1)
    expect(set).toEqual(new Set(['a', 'd', 'b', 'c']))
  })

  test('remove()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.remove(set, 'b')
    expect(set).toEqual(new Set(['a', 'c']))
  })

  test('remove() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    infraSet.remove(set, (item) => item.startsWith('b'))
    expect(set).toEqual(new Set(['a', 'c']))
  })

  test('empty()', () => {
    const set = new Set(['a', 'b', 'c'])
    infraSet.empty(set)
    expect(set.size).toBe(0)
  })

  test('contains()', () => {
    const set = new Set(['a', 'b', 'c'])
    expect(infraSet.contains(set, 'b')).toBe(true)
    expect(infraSet.contains(set, 'd')).toBe(false)
  })

  test('remove() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    expect(infraSet.contains(set, (item) => item.startsWith('b'))).toBe(true)
    expect(infraSet.contains(set, (item) => item.startsWith('d'))).toBe(false)
  })

  test('size()', () => {
    const set = new Set(['a', 'b', 'c'])
    expect(infraSet.size(set)).toBe(3)
  })

  test('size() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    expect(infraSet.size(set, (item) => item.startsWith('b'))).toBe(2)
  })

  test('isEmpty()', () => {
    const set = new Set(['a', 'b', 'c'])
    expect(infraSet.isEmpty(set)).toBe(false)
    set.clear()
    expect(infraSet.isEmpty(set)).toBe(true)
  })

  test('forEach()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = new Set<string>()
    for (const item of infraSet.forEach(set)) {
      newSet.add(item + '_')
    }
    expect(newSet).toEqual(new Set(['a_', 'b_', 'c_']))
  })

  test('forEach() with condition', () => {
    const set = new Set(['a', 'b1', 'b2', 'c'])
    const newSet = new Set<string>()
    for (const item of infraSet.forEach(set, item => item.startsWith('b'))) {
      newSet.add(item + '_')
    }
    expect(newSet).toEqual(new Set(['b1_', 'b2_']))
  })

  test('clone()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.clone(set)
    expect(newSet).toEqual(new Set(['a', 'b', 'c']))
  })

  test('sortInAscendingOrder()', () => {
    const set = new Set(['c', 'b', 'a'])
    const newSet = infraSet.sortInAscendingOrder(set, (a, b) => a < b)
    expect(newSet).toEqual(new Set(['a', 'b', 'c']))
  })

  test('sortInAscendingOrder() reverse', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.sortInAscendingOrder(set, (a, b) => a < b)
    expect(newSet).toEqual(new Set(['a', 'b', 'c']))
  })

  test('sortInDescendingOrder()', () => {
    const set = new Set(['a', 'b', 'c'])
    const newSet = infraSet.sortInDescendingOrder(set, (a, b) => a < b)
    expect(newSet).toEqual(new Set(['c', 'b', 'a']))
  })

  test('sortInDescendingOrder() reverse', () => {
    const set = new Set(['c', 'b', 'a'])
    const newSet = infraSet.sortInDescendingOrder(set, (a, b) => a < b)
    expect(newSet).toEqual(new Set(['c', 'b', 'a']))
  })

  test('isSubsetOf()', () => {
    const superset = new Set(['a', 'b', 'c', 'd'])
    const subset = new Set(['b', 'c'])
    const otherset = new Set(['1', '2'])
    expect(infraSet.isSubsetOf(subset, superset)).toBe(true)
    expect(infraSet.isSubsetOf(otherset, superset)).toBe(false)
  })

  test('isSupersetOf()', () => {
    const superset = new Set(['a', 'b', 'c', 'd'])
    const subset = new Set(['b', 'c'])
    const otherset = new Set(['1', '2'])
    expect(infraSet.isSupersetOf(superset, subset)).toBe(true)
    expect(infraSet.isSupersetOf(superset, otherset)).toBe(false)
  })

  test('intersection()', () => {
    const set1 = new Set(['a', 'b', 'c', 'd'])
    const set2 = new Set(['b', 'c'])
    const newSet = infraSet.intersection(set1, set2)
    expect(newSet).toEqual(new Set(['b', 'c']))
  })

  test('union()', () => {
    const set1 = new Set(['a', 'd'])
    const set2 = new Set(['b', 'c'])
    const newSet = infraSet.union(set1, set2)
    expect(newSet).toEqual(new Set(['a', 'd', 'b', 'c']))
  })

  test('range()', () => {
    const set = infraSet.range(1, 4)
    expect(set).toEqual(new Set([1, 2, 3, 4]))
  })

})