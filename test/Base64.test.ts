import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { base64 } from '../lib'

suite('Base64', () => {

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
      deepEqual(base64.forgivingBase64Encode(pair[0]), pair[1])
    }
  })

  test('forgivingBase64Decode()', () => {
    for (const pair of encodedPairs) {
      deepEqual(base64.forgivingBase64Decode(pair[1]), pair[0])
    }
  })

  test('forgivingBase64Decode() validate input', () => {
    deepEqual(base64.forgivingBase64Decode(" Z\tg\n=\f=\r"), base64.forgivingBase64Decode("Zg=="))
    deepEqual(base64.forgivingBase64Decode("Zm9v=="), base64.forgivingBase64Decode("Zm9v"))
    deepEqual(base64.forgivingBase64Decode("Zm9v="), null)
    deepEqual(base64.forgivingBase64Decode("()"), null)
  })

  test('round trip', () => {
    const testData = [
      "",
      "HELLO",
      "\0\n\r\t",
      "\u{1F4A9}"
    ]

    for (const data of testData) {
      deepEqual(base64.forgivingBase64Decode(base64.forgivingBase64Encode(data)), data)
    }
  })

})