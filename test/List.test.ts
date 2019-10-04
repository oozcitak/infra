import { list as infraList } from '../src'

describe('List', () => {

  test('append()', () => {
    const list = ['a', 'b', 'c']
    infraList.append(list, 'd')
    expect(list).toEqual(['a', 'b', 'c', 'd'])
  })

  test('extend()', () => {
    const list = ['a', 'b', 'c']
    infraList.extend(list, ['d', 'e'])
    expect(list).toEqual(['a', 'b', 'c', 'd', 'e'])
  })

  test('prepend()', () => {
    const list = ['a', 'b', 'c']
    infraList.prepend(list, 'd')
    expect(list).toEqual(['d', 'a', 'b', 'c'])
  })

  test('replace()', () => {
    const list = ['a', 'b', 'c']
    infraList.replace(list, 'b', 'd')
    expect(list).toEqual(['a', 'd', 'c'])
  })

  test('replace() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    infraList.replace(list, (item) => item.startsWith('b'), 'd')
    expect(list).toEqual(['a', 'd', 'd', 'c'])
  })

  test('insert()', () => {
    const list = ['a', 'b', 'c']
    infraList.insert(list, 'd', 1)
    expect(list).toEqual(['a', 'd', 'b', 'c'])
  })

  test('remove()', () => {
    const list = ['a', 'b', 'c']
    infraList.remove(list, 'b')
    expect(list).toEqual(['a', 'c'])
  })

  test('remove() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    infraList.remove(list, (item) => item.startsWith('b'))
    expect(list).toEqual(['a', 'c'])
  })

  test('empty()', () => {
    const list = ['a', 'b', 'c']
    infraList.empty(list)
    expect(list).toEqual([ ])
  })

  test('contains()', () => {
    const list = ['a', 'b', 'c']
    expect(infraList.contains(list, 'b')).toBe(true)
    expect(infraList.contains(list, 'd')).toBe(false)
  })

  test('remove() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    expect(infraList.contains(list, (item) => item.startsWith('b'))).toBe(true)
    expect(infraList.contains(list, (item) => item.startsWith('d'))).toBe(false)
  })

  test('size()', () => {
    const list = ['a', 'b', 'c']
    expect(infraList.size(list)).toBe(3)
  })

  test('size() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    expect(infraList.size(list, (item) => item.startsWith('b'))).toBe(2)
  })

  test('isEmpty()', () => {
    const list = ['a', 'b', 'c']
    expect(infraList.isEmpty(list)).toBe(false)
    list.length = 0
    expect(infraList.isEmpty(list)).toBe(true)
  })

  test('forEach()', () => {
    const list = ['a', 'b', 'c']
    const newList: string[] = []
    for (const item of infraList.forEach(list)) {
      newList.push(item + '_')
    }
    expect(newList).toEqual(['a_', 'b_', 'c_'])
  })

  test('forEach() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    const newList: string[] = []
    for (const item of infraList.forEach(list, item => item.startsWith('b'))) {
      newList.push(item + '_')
    }
    expect(newList).toEqual(['b1_', 'b2_'])
  })

  test('clone()', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.clone(list)
    expect(newList).toEqual(['a', 'b', 'c'])
  })

  test('sortInAscendingOrder()', () => {
    const list = ['c', 'b', 'a']
    const newList = infraList.sortInAscendingOrder(list, (a, b) => a < b)
    expect(newList).toEqual(['a', 'b', 'c'])
  })

  test('sortInAscendingOrder() reverse', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.sortInAscendingOrder(list, (a, b) => a < b)
    expect(newList).toEqual(['a', 'b', 'c'])
  })

  test('sortInDescendingOrder()', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.sortInDescendingOrder(list, (a, b) => a < b)
    expect(newList).toEqual(['c', 'b', 'a'])
  })

  test('sortInDescendingOrder() reverse', () => {
    const list = ['c', 'b', 'a']
    const newList = infraList.sortInDescendingOrder(list, (a, b) => a < b)
    expect(newList).toEqual(['c', 'b', 'a'])
  })

})