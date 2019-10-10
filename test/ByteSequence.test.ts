import { byteSequence } from '../src'

describe('ByteSequence', () => {

  test('length()', () => {
    const list = new Uint8Array([1, 2, 3])
    expect(byteSequence.length(list)).toBe(3)
  })

  test('byteLowercase()', () => {
    const list = new Uint8Array([1, 2, 'A'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4])
    byteSequence.byteLowercase(list)
    expect(list).toEqual(
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    )
  })

  test('byteUppercase()', () => {
    const list = new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    byteSequence.byteUppercase(list)
    expect(list).toEqual(
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4])
    )
  })

  test('byteCaseInsensitiveMatch()', () => {
    expect(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4]),
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    )).toBe(true)
    expect(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4]),
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'Z'.charCodeAt(0), 3, 4])
    )).toBe(false)
    expect(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    )).toBe(false)
  })

  test('startsWith()', () => {
    expect(byteSequence.startsWith(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    )).toBe(true)
    expect(byteSequence.startsWith(
      new Uint8Array([1, 2]),
      new Uint8Array([1, 2, 3, 4])
    )).toBe(false)
    expect(byteSequence.startsWith(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([5, 6])
    )).toBe(false)
  })

  test('byteLessThan()', () => {
    expect(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    )).toBe(true)
    expect(byteSequence.byteLessThan(
      new Uint8Array([1, 2]),
        new Uint8Array([1, 2, 3, 4])
    )).toBe(false)
    expect(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2, 7, 4])
    )).toBe(true)
    expect(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 7, 4]),
        new Uint8Array([1, 2, 3, 4])
    )).toBe(false)
  })

  test('isomorphicDecode()', () => {
    expect(byteSequence.isomorphicDecode(new Uint8Array([65, 66, 67, 68]))).toBe("ABCD")
  })

})