import * as util from '../../src/util'

describe('util', () => {

  test('isBoolean', () => {
    expect(util.isBoolean(true)).toBe(true)
    expect(util.isBoolean(true)).toBe(true)
    expect(util.isBoolean(1)).toBe(false)
    expect(util.isBoolean(0)).toBe(false)
    expect(util.isBoolean("x")).toBe(false)
    expect(util.isBoolean(["x"])).toBe(false)
    expect(util.isBoolean({ x: "x" })).toBe(false)
    expect(util.isBoolean(() => { })).toBe(false)
  })

  test('isNumber', () => {
    expect(util.isNumber(1)).toBe(true)
    expect(util.isNumber(0)).toBe(true)
    expect(util.isNumber(NaN)).toBe(true)
    expect(util.isNumber(Infinity)).toBe(true)
    expect(util.isNumber("x")).toBe(false)
    expect(util.isNumber(["x"])).toBe(false)
    expect(util.isNumber({ x: "x" })).toBe(false)
    expect(util.isNumber(() => { })).toBe(false)
  })

  test('isString', () => {
    expect(util.isString("")).toBe(true)
    expect(util.isString("0")).toBe(true)
    expect(util.isString(1)).toBe(false)
    expect(util.isString(["x"])).toBe(false)
    expect(util.isString({ x: "x" })).toBe(false)
    expect(util.isString(() => { })).toBe(false)
  })

  test('isFunction', () => {
    expect(util.isFunction(() => { })).toBe(true)
    expect(util.isFunction("0")).toBe(false)
    expect(util.isFunction(1)).toBe(false)
    expect(util.isFunction(["x"])).toBe(false)
    expect(util.isFunction({ x: "x" })).toBe(false)
  })

  test('isObject', () => {
    expect(util.isObject(() => { })).toBe(true)
    expect(util.isObject(["x"])).toBe(true)
    expect(util.isObject({ x: "x" })).toBe(true)
    expect(util.isObject("0")).toBe(false)
    expect(util.isObject(1)).toBe(false)
  })

  test('isArray', () => {
    expect(util.isArray(["x"])).toBe(true)
    expect(util.isArray(() => { })).toBe(false)
    expect(util.isArray({ x: "x" })).toBe(false)
    expect(util.isArray("0")).toBe(false)
    expect(util.isArray(1)).toBe(false)
  })

  test('isEmpty', () => {
    expect(util.isEmpty([])).toBe(true)
    expect(util.isEmpty({})).toBe(true)
    expect(util.isEmpty(["x"])).toBe(false)
    expect(util.isEmpty({ x: "x" })).toBe(false)

    expect(util.isEmpty(123)).toBe(false)
    expect(util.isEmpty(0)).toBe(false)
    expect(util.isEmpty(true)).toBe(false)
    expect(util.isEmpty(false)).toBe(false)
    expect(util.isEmpty("nope")).toBe(false)
    expect(util.isEmpty("")).toBe(false)

    class Obj { }
    const emptyObj = new Obj()
    Reflect.setPrototypeOf(emptyObj, { id: 42 })
    expect(util.isEmpty(emptyObj)).toBe(true)
  })

})