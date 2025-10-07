import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { stack as infraStack } from '../lib'

suite('Stack', () => {

  test('push()', () => {
    const list = ['a', 'b', 'c']
    infraStack.push(list, 'd')
    deepEqual(list, ['a', 'b', 'c', 'd'])
  })

  test('pop()', () => {
    const list = ['a', 'b', 'c']
    const item = infraStack.pop(list)
    deepEqual(item, 'c')
    deepEqual(list, ['a', 'b'])
    infraStack.pop(list) // remove b
    infraStack.pop(list) // remove a
    deepEqual(infraStack.pop(list), null)
  })

})