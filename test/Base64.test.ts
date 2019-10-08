import { base64 } from '../src'

describe('Base64', () => {

  const encodedPairs = [
    ["", ""],
    ["f", "Zg=="],
    ["fo", "Zm8="],
    ["foo", "Zm9v"],
    ["foob", "Zm9vYg=="],
    ["fooba", "Zm9vYmE="],
    ["foobar", "Zm9vYmFy"],
  ]

  test('forgivingBase64Encode()', () => {
    for (const pair of encodedPairs) {
      expect(base64.forgivingBase64Encode(pair[0])).toBe(pair[1])
    }
  })

  test('forgivingBase64Decode()', () => {
    for (const pair of encodedPairs) {
      expect(base64.forgivingBase64Decode(pair[1])).toBe(pair[0])
    }
  })

  test('forgivingBase64Decode() validate input', () => {
    expect(base64.forgivingBase64Decode(" Z\tg\n=\f=\r")).toBe(base64.forgivingBase64Decode("Zg=="))
    expect(base64.forgivingBase64Decode("Zm9v==")).toBe(base64.forgivingBase64Decode("Zm9v"))
    expect(base64.forgivingBase64Decode("Zm9v=")).toBe(null)
    expect(base64.forgivingBase64Decode("()")).toBe(null)
  })

  test('round trip', () => {
    const testData = [
      "",
      "HELLO",
      "\0\n\r\t",
      "\u{1F4A9}"
    ]
    
    for (const data of testData) {
      expect(base64.forgivingBase64Decode(base64.forgivingBase64Encode(data))).toBe(data)
    }
  })

})