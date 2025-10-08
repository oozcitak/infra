import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { queue as infraQueue } from '../lib'

suite('Queue', () => {

  test('enqueue()', () => {
    const list = ['a', 'b', 'c']
    infraQueue.enqueue(list, 'd')
    deepEqual(list, ['a', 'b', 'c', 'd'])
  })

  test('dequeue()', () => {
    const list = ['a', 'b', 'c']
    const item = infraQueue.dequeue(list)
    deepEqual(item, 'a')
    deepEqual(list, ['b', 'c'])
    infraQueue.dequeue(list) // remove b
    infraQueue.dequeue(list) // remove c
    deepEqual(infraQueue.dequeue(list), null)
  })

})