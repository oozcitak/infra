import { stack as infraStack } from '../src'

describe('Stack', () => {

  test('push()', () => {
    const list = ['a', 'b', 'c']
    infraStack.push(list, 'd')
    expect(list).toEqual(['a', 'b', 'c', 'd'])
  })

  test('pop()', () => {
    const list = ['a', 'b', 'c']
    const item = infraStack.pop(list)
    expect(item).toBe('c')
    expect(list).toEqual(['a', 'b'])
    infraStack.pop(list) // remove b
    infraStack.pop(list) // remove a
    expect(infraStack.pop(list)).toBeNull()    
  })

})