import { json as infraJSON } from '../src'

describe('JSON', () => {

  test('parseJSONFromBytes()', () => {
    const obj = {
      v1: null,
      v2: 42,
      v3: "hello",
      v4: [1, "3", 4, null],
      v5: {
        v51: null,
        v52: 52,
        v53: "53",
        v54: [2, 7, null, "8"],
        v55: { nested: true }
      }
    }
    const str = JSON.stringify(obj)
    const bytes = Uint8Array.from(str.split("").map(c => c.charCodeAt(0)))
    expect(infraJSON.parseJSONFromBytes(bytes)).toEqual(obj)
  })

  test('serializeJSONToBytes()', () => {
    const obj = {
      v1: null,
      v2: 42,
      v3: "hello",
      v4: [1, "3", 4, null],
      v5: {
        v51: null,
        v52: 52,
        v53: "53",
        v54: [2, 7, null, "8"],
        v55: { nested: true }
      }
    }
    const str = JSON.stringify(obj)
    const bytes = Uint8Array.from(str.split("").map(c => c.charCodeAt(0)))
    expect(infraJSON.serializeJSONToBytes(obj)).toEqual(bytes)
  })

  test('parseJSONIntoInfraValues()', () => {
    const obj = {
      v1: null,
      v2: 42,
      v3: "hello",
      v4: [1, "3", 4, null],
      v5: {
        v51: null,
        v52: 52,
        v53: "53",
        v54: [2, 7, null, "8"],
        v55: { nested: true }
      }
    }
    const infraObj = new Map<string, any>()
    infraObj.set("v1", null)
    infraObj.set("v2", 42)
    infraObj.set("v3", "hello")
    infraObj.set("v4", [1, "3", 4, null])
    const v5 = new Map<string, any>()
    infraObj.set("v5", v5)
    v5.set("v51", null)
    v5.set("v52", 52)
    v5.set("v53", "53")
    v5.set("v54", [2, 7, null, "8"])
    const v55 = new Map<string, any>()
    v5.set("v55", v55)
    v55.set("nested", true)
    
    expect(infraJSON.parseJSONIntoInfraValues(JSON.stringify(obj))).toEqual(infraObj)
  })

  test('convertAJSONDerivedJavaScriptValueToAnInfraValue()', () => {
    const obj = {
      v1: null,
      v2: 42,
      v3: "hello",
      v4: [1, "3", 4, null],
      v5: {
        v51: null,
        v52: 52,
        v53: "53",
        v54: [2, 7, null, "8"],
        v55: { nested: true }
      }
    }
    const infraObj = new Map<string, any>()
    infraObj.set("v1", null)
    infraObj.set("v2", 42)
    infraObj.set("v3", "hello")
    infraObj.set("v4", [1, "3", 4, null])
    const v5 = new Map<string, any>()
    infraObj.set("v5", v5)
    v5.set("v51", null)
    v5.set("v52", 52)
    v5.set("v53", "53")
    v5.set("v54", [2, 7, null, "8"])
    const v55 = new Map<string, any>()
    v5.set("v55", v55)
    v55.set("nested", true)
    
    expect(infraJSON.convertAJSONDerivedJavaScriptValueToAnInfraValue(obj)).toEqual(infraObj)
  })

})