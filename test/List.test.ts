import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { list as infraList } from '../lib'

suite('List', () => {

  test('append()', () => {
    const list = ['a', 'b', 'c']
    infraList.append(list, 'd')
    deepEqual(list, ['a', 'b', 'c', 'd'])
  })

  test('extend()', () => {
    const list = ['a', 'b', 'c']
    infraList.extend(list, ['d', 'e'])
    deepEqual(list, ['a', 'b', 'c', 'd', 'e'])
  })

  test('prepend()', () => {
    const list = ['a', 'b', 'c']
    infraList.prepend(list, 'd')
    deepEqual(list, ['d', 'a', 'b', 'c'])
  })

  test('replace()', () => {
    const list = ['a', 'b', 'c']
    infraList.replace(list, 'b', 'd')
    deepEqual(list, ['a', 'd', 'c'])
  })

  test('replace() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    infraList.replace(list, (item) => item.startsWith('b'), 'd')
    deepEqual(list, ['a', 'd', 'd', 'c'])
  })

  test('insert()', () => {
    const list = ['a', 'b', 'c']
    infraList.insert(list, 'd', 1)
    deepEqual(list, ['a', 'd', 'b', 'c'])
  })

  test('remove()', () => {
    const list = ['a', 'b', 'c']
    infraList.remove(list, 'b')
    deepEqual(list, ['a', 'c'])
  })

  test('remove() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    infraList.remove(list, (item) => item.startsWith('b'))
    deepEqual(list, ['a', 'c'])
  })

  test('empty()', () => {
    const list = ['a', 'b', 'c']
    infraList.empty(list)
    deepEqual(list, [ ])
  })

  test('contains()', () => {
    const list = ['a', 'b', 'c']
    deepEqual(infraList.contains(list, 'b'), true)
    deepEqual(infraList.contains(list, 'd'), false)
  })

  test('remove() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    deepEqual(infraList.contains(list, (item) => item.startsWith('b')), true)
    deepEqual(infraList.contains(list, (item) => item.startsWith('d')), false)
  })

  test('size()', () => {
    const list = ['a', 'b', 'c']
    deepEqual(infraList.size(list), 3)
  })

  test('size() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    deepEqual(infraList.size(list, (item) => item.startsWith('b')), 2)
  })

  test('isEmpty()', () => {
    const list = ['a', 'b', 'c']
    deepEqual(infraList.isEmpty(list), false)
    list.length = 0
    deepEqual(infraList.isEmpty(list), true)
  })

  test('forEach()', () => {
    const list = ['a', 'b', 'c']
    const newList: string[] = []
    for (const item of infraList.forEach(list)) {
      newList.push(item + '_')
    }
    deepEqual(newList, ['a_', 'b_', 'c_'])
  })

  test('forEach() with condition', () => {
    const list = ['a', 'b1', 'b2', 'c']
    const newList: string[] = []
    for (const item of infraList.forEach(list, item => item.startsWith('b'))) {
      newList.push(item + '_')
    }
    deepEqual(newList, ['b1_', 'b2_'])
  })

  test('clone()', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.clone(list)
    deepEqual(newList, ['a', 'b', 'c'])
  })

  test('sortInAscendingOrder()', () => {
    const list = ['c', 'b', 'a']
    const newList = infraList.sortInAscendingOrder(list, (a, b) => a < b)
    deepEqual(newList, ['a', 'b', 'c'])
  })

  test('sortInAscendingOrder() reverse', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.sortInAscendingOrder(list, (a, b) => a < b)
    deepEqual(newList, ['a', 'b', 'c'])
  })

  test('sortInDescendingOrder()', () => {
    const list = ['a', 'b', 'c']
    const newList = infraList.sortInDescendingOrder(list, (a, b) => a < b)
    deepEqual(newList, ['c', 'b', 'a'])
  })

  test('sortInDescendingOrder() reverse', () => {
    const list = ['c', 'b', 'a']
    const newList = infraList.sortInDescendingOrder(list, (a, b) => a < b)
    deepEqual(newList, ['c', 'b', 'a'])
  })

})