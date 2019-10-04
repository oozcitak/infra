import { string as infraString } from '../src'

describe('String', () => {

  test('splitAStringOnASCIIWhitespace()', () => {
    const str = 'a b    c'
    const list = infraString.splitAStringOnASCIIWhitespace(str)
    expect(list.length).toBe(3)
    expect(list[0]).toBe('a')
    expect(list[1]).toBe('b')
    expect(list[2]).toBe('c')
  })

})