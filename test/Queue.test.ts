import { queue as infraQueue } from '../src'

describe('Queue', () => {

  test('enqueue()', () => {
    const list = ['a', 'b', 'c']
    infraQueue.enqueue(list, 'd')
    expect(list).toEqual(['a', 'b', 'c', 'd'])
  })

  test('dequeue()', () => {
    const list = ['a', 'b', 'c']
    const item = infraQueue.dequeue(list)
    expect(item).toBe('a')
    expect(list).toEqual(['b', 'c'])
    infraQueue.dequeue(list) // remove b
    infraQueue.dequeue(list) // remove c
    expect(infraQueue.dequeue(list)).toBeNull()
  })

})