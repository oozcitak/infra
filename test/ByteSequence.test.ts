import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { byteSequence } from '../lib'

suite('ByteSequence', () => {

  test('length()', () => {
    const list = new Uint8Array([1, 2, 3])
    deepEqual(byteSequence.length(list), 3)
  })

  test('byteLowercase()', () => {
    const list = new Uint8Array([1, 2, 'A'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4])
    byteSequence.byteLowercase(list)
    deepEqual(
      list,
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    )
  })

  test('byteUppercase()', () => {
    const list = new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    byteSequence.byteUppercase(list)
    deepEqual(
      list,
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4])
    )
  })

  test('byteCaseInsensitiveMatch()', () => {
    deepEqual(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'B'.charCodeAt(0), 3, 4]),
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4])
    ), true)
    deepEqual(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 'a'.charCodeAt(0), 'b'.charCodeAt(0), 3, 4]),
      new Uint8Array([1, 2, 'A'.charCodeAt(0), 'Z'.charCodeAt(0), 3, 4])
    ), false)
    deepEqual(byteSequence.byteCaseInsensitiveMatch(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    ), false)
  })

  test('startsWith()', () => {
    deepEqual(byteSequence.startsWith(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    ), true)
    deepEqual(byteSequence.startsWith(
      new Uint8Array([1, 2]),
      new Uint8Array([1, 2, 3, 4])
    ), false)
    deepEqual(byteSequence.startsWith(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([5, 6])
    ), false)
  })

  test('byteLessThan()', () => {
    deepEqual(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2])
    ), true)
    deepEqual(byteSequence.byteLessThan(
      new Uint8Array([1, 2]),
        new Uint8Array([1, 2, 3, 4])
    ), false)
    deepEqual(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([1, 2, 7, 4])
    ), true)
    deepEqual(byteSequence.byteLessThan(
      new Uint8Array([1, 2, 7, 4]),
        new Uint8Array([1, 2, 3, 4])
    ), false)
  })

  test('isomorphicDecode()', () => {
    deepEqual(byteSequence.isomorphicDecode(new Uint8Array([65, 66, 67, 68])), "ABCD")
  })

})