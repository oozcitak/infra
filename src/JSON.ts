import { 
  isString, isNumber, isArray, isObject, utf8Decode, utf8Encode
} from "./util"

/**
 * Parses the given byte sequence representing a JSON string into an object.
 * 
 * @param bytes - a byte sequence
 */
export function parseJSONFromBytes(bytes: Uint8Array): any {
  /**
   * 1. Let jsonText be the result of running UTF-8 decode on bytes. [ENCODING]
   * 2. Return ? Call(%JSONParse%, undefined, « jsonText »).
   */
  const jsonText = utf8Decode(bytes)
  return JSON.parse.call(undefined, jsonText)
}

/**
 * Serialize the given JavaScript value into a byte sequence.
 * 
 * @param value - a JavaScript value
 */
export function serializeJSONToBytes(value: any): Uint8Array {
  /**
   * 1. Let jsonString be ? Call(%JSONStringify%, undefined, « value »).
   * 2. Return the result of running UTF-8 encode on jsonString. [ENCODING]
   */
  const jsonString = JSON.stringify.call(undefined, value)
  return utf8Encode(jsonString)
}

/**
 * Parses the given JSON string into a Realm-independent JavaScript value.
 * 
 * @param jsonText - a JSON string
 */
export function parseJSONIntoInfraValues(jsonText: string): any {
  /**
   * 1. Let jsValue be ? Call(%JSONParse%, undefined, « jsonText »).
   * 2. Return the result of converting a JSON-derived JavaScript value to an
   * Infra value, given jsValue.
   */
  const jsValue = JSON.parse.call(undefined, jsonText)
  return convertAJSONDerivedJavaScriptValueToAnInfraValue(jsValue)
}

/**
 * Parses the value into a Realm-independent JavaScript value.
 * 
 * @param jsValue - a JavaScript value
 */
export function convertAJSONDerivedJavaScriptValueToAnInfraValue(jsValue: any): any {
  /**
   * 1. If Type(jsValue) is Null, String, or Number, then return jsValue.
   */
  if (jsValue === null || isString(jsValue) || isNumber(jsValue)) return jsValue

  /**
   * 2. If IsArray(jsValue) is true, then:
   * 2.1. Let result be an empty list.
   * 2.2. Let length be ! ToLength(! Get(jsValue, "length")).
   * 2.3. For each index of the range 0 to length − 1, inclusive:
   * 2.3.1. Let indexName be ! ToString(index).
   * 2.3.2. Let jsValueAtIndex be ! Get(jsValue, indexName).
   * 2.3.3. Let infraValueAtIndex be the result of converting a JSON-derived 
   * JavaScript value to an Infra value, given jsValueAtIndex.
   * 2.3.4. Append infraValueAtIndex to result.
   * 2.8. Return result.
   */
  if (isArray(jsValue)) {
    const result = new Array<any>()
    for (const jsValueAtIndex of jsValue) {
      result.push(convertAJSONDerivedJavaScriptValueToAnInfraValue(jsValueAtIndex))
    }
    return result
  } else if (isObject(jsValue)) {
    /**
     * 3. Let result be an empty ordered map.
     * 4. For each key of ! jsValue.[[OwnPropertyKeys]]():
     * 4.1. Let jsValueAtKey be ! Get(jsValue, key).
     * 4.2. Let infraValueAtKey be the result of converting a JSON-derived 
     * JavaScript value to an Infra value, given jsValueAtKey.
     * 4.3. Set result[key] to infraValueAtKey.
     * 5. Return result.
     */
    const result = new Map<string, any>()
    for (const key in jsValue) {
      /* istanbul ignore else */
      if (jsValue.hasOwnProperty(key)) {
        const jsValueAtKey = jsValue[key]
        result.set(key, convertAJSONDerivedJavaScriptValueToAnInfraValue(jsValueAtKey))
      }
    }
    return result
  }

  /* istanbul ignore next */
  return jsValue
}