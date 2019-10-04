import { map as infraMap } from '../src'

describe('Map', () => {

  test('get()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.get(map, 1)).toEqual('a')
  })

  test('set()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.set(map, 4, 'd')
    expect(map).toEqual(new Map([[1, 'a'], [2, 'b'], [3, 'c'], [4, 'd']]))
  })

  test('remove()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.remove(map, 2)
    expect(map).toEqual(new Map([[1, 'a'], [3, 'c']]))
  })

  test('remove() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    infraMap.remove(map, (item) => item[0] > 1)
    expect(map).toEqual(new Map([[1, 'a']]))
  })

  test('contains()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.contains(map, 1)).toBe(true)
    expect(infraMap.contains(map, 5)).toBe(false)
  })

  test('contains() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.contains(map, (item) => item[0] > 1)).toBe(true)
    expect(infraMap.contains(map, (item) => item[0] > 5)).toBe(false)
  })

  test('keys()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.keys(map)).toEqual(new Set([1, 2, 3]))
  })

  test('values()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.values(map)).toEqual(['a', 'b', 'c'])
  })

  test('size()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.size(map)).toBe(3)
  })

  test('size() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.size(map, (item) => item[0] >= 2)).toBe(2)
  })

  test('isEmpty()', () => {
    const map1 = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    expect(infraMap.isEmpty(map1)).toBe(false)
    const map2 = new Map()
    expect(infraMap.isEmpty(map2)).toBe(true)
  })

  test('forEach()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const list = new Array<string>()
    for (const item of infraMap.forEach(map)) {
      list.push(item[0].toString() + '_' + item[1])
    }
    expect(list).toEqual(['1_a', '2_b', '3_c'])
  })

  test('forEach() with condition', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const list = new Array<string>()
    for (const item of infraMap.forEach(map, item => item[0] >= 2)) {
      list.push(item[0].toString() + '_' + item[1])
    }
    expect(list).toEqual(['2_b', '3_c'])
  })

  test('clone()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.clone(map)
    expect(newMap).toEqual(new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInAscendingOrder()', () => {
    const map = new Map([[3, 'c'], [2, 'b'], [1, 'a']])
    const newMap = infraMap.sortInAscendingOrder(map, (a, b) => a[0] < b[0])
    expect(newMap).toEqual(new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInAscendingOrder() reverse', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.sortInAscendingOrder(map, (a, b) => a[0] < b[0])
    expect(newMap).toEqual(new Map([[1, 'a'], [2, 'b'], [3, 'c']]))
  })

  test('sortInDescendingOrder()', () => {
    const map = new Map([[1, 'a'], [2, 'b'], [3, 'c']])
    const newMap = infraMap.sortInDescendingOrder(map, (a, b) => a[0] < b[0])
    expect(newMap).toEqual(new Map([[3, 'c'], [2, 'b'], [1, 'a']]))
  })

  test('sortInDescendingOrder() reverse', () => {
    const map = new Map([[3, 'c'], [2, 'b'], [1, 'a']])
    const newMap = infraMap.sortInDescendingOrder(map, (a, b) => a[0] < b[0])
    expect(newMap).toEqual(new Map([[3, 'c'], [2, 'b'], [1, 'a']]))
  })

})