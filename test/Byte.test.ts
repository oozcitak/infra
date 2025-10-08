import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { byte } from '../lib'

suite('Byte', () => {

  test('isASCIIByte()', () => {
    deepEqual(byte.isASCIIByte(0), true)
    deepEqual(byte.isASCIIByte('A'.charCodeAt(0)), true)
    deepEqual(byte.isASCIIByte('Z'.charCodeAt(0)), true)
    deepEqual(byte.isASCIIByte(127), true)
    deepEqual(byte.isASCIIByte(128), false)
    deepEqual(byte.isASCIIByte(255), false)
  })

})