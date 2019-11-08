import * as util from '../../src/util'

describe('util', () => {

  test('utf8Encode', () => {
    expect(util.utf8Encode("HELLO")).toEqual(new Uint8Array([72, 69, 76, 76, 79]))
    expect(util.utf8Encode("Ö")).toEqual(new Uint8Array([195, 150]))
    expect(util.utf8Encode("\u9733")).toEqual(new Uint8Array([233, 156, 179]))
    expect(util.utf8Encode("\u{1f600}")).toEqual(new Uint8Array([240, 159, 152, 128]))
    expect(util.utf8Encode("\u{1f600}")).toEqual(new Uint8Array([240, 159, 152, 128]))
    // invalid surrogates
    expect(() => util.utf8Encode(String.fromCharCode(0xd83d))).toThrow()
    expect(() => util.utf8Encode(String.fromCharCode(0xd83d, 0xd000))).toThrow()
  })

  test('utf8Decode', () => {
    expect(util.utf8Decode(new Uint8Array([72, 69, 76, 76, 79]))).toBe("HELLO")
    expect(util.utf8Decode(new Uint8Array([195, 150]))).toBe("Ö")
    expect(util.utf8Decode(new Uint8Array([233, 156, 179]))).toBe("\u9733")
    expect(util.utf8Decode(new Uint8Array([240, 159, 152, 128]))).toBe("\u{1f600}")
    expect(util.utf8Decode(new Uint8Array([240, 159, 152, 128]))).toBe("\u{1f600}")
    // invalid byte sequences
    expect(() => util.utf8Decode(new Uint8Array([198]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([233, 156]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([240, 159, 152]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([250]))).toThrow()
    expect(() => util.utf8Decode(new Uint8Array([247, 143, 191, 191]))).toThrow()
  })

})