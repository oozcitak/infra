import { byte } from '../src'

describe('Byte', () => {

  test('isASCIIByte()', () => {
    expect(byte.isASCIIByte(0)).toBe(true)
    expect(byte.isASCIIByte('A'.charCodeAt(0))).toBe(true)
    expect(byte.isASCIIByte('Z'.charCodeAt(0))).toBe(true)
    expect(byte.isASCIIByte(127)).toBe(true)
    expect(byte.isASCIIByte(128)).toBe(false)
    expect(byte.isASCIIByte(255)).toBe(false)
  })

})