import { string as infraString } from '../src'

describe('String', () => {

	test('isCodeUnitPrefix()', () => {
		expect(infraString.isCodeUnitPrefix("abc", "abcd")).toBe(true)
		expect(infraString.isCodeUnitPrefix("abcd", "abc")).toBe(false)
		expect(infraString.isCodeUnitPrefix("abc", "xyz")).toBe(false)
		expect(infraString.isCodeUnitPrefix("abc", "wxyz")).toBe(false)
		expect(infraString.isCodeUnitPrefix("abcd", "xyz")).toBe(false)
	})

	test('isCodeUnitLessThan()', () => {
		expect(infraString.isCodeUnitLessThan("abc", "abcd")).toBe(true)
		expect(infraString.isCodeUnitLessThan("abcd", "abc")).toBe(false)
		expect(infraString.isCodeUnitLessThan("abc", "xyz")).toBe(true)
		expect(infraString.isCodeUnitLessThan("abc", "abc")).toBe(false)
		expect(infraString.isCodeUnitLessThan("abc", "abd")).toBe(true)
		expect(infraString.isCodeUnitLessThan("abd", "abc")).toBe(false)
	})

	test('isomorphicEncode()', () => {
		expect(infraString.isomorphicEncode("ABC")).toEqual(new Uint8Array([65, 66, 67]))
		expect(infraString.isomorphicEncode("ABC\u{1F4A9}")).toEqual(new Uint8Array([65, 66, 67, 0]))
	})

	test('isASCIIString()', () => {
		expect(infraString.isASCIIString("ABC")).toBe(true)
		expect(infraString.isASCIIString("ABC\u{1F4A9}")).toBe(false)
	})

	test('asciiLowercase()', () => {
		expect(infraString.asciiLowercase("ABC\u{1F4A9}")).toBe("abc\u{1F4A9}")
	})

	test('asciiUppercase()', () => {
		expect(infraString.asciiUppercase("abc\u{1F4A9}")).toBe("ABC\u{1F4A9}")
	})

	test('asciiCaseInsensitiveMatch()', () => {
		expect(infraString.asciiCaseInsensitiveMatch("abc\u{1F4A9}", "ABC\u{1F4A9}")).toBe(true)
		expect(infraString.asciiCaseInsensitiveMatch("abc\u{1F4A9}", "ABC")).toBe(false)
		expect(infraString.asciiCaseInsensitiveMatch("abc", "ABCD")).toBe(false)
	})

	test('asciiEncode()', () => {
		expect(infraString.asciiEncode("ABC")).toEqual(new Uint8Array([65, 66, 67]))
		expect(infraString.asciiEncode("ABC\u{1F4A9}")).toEqual(new Uint8Array([65, 66, 67, 0]))
	})

	test('asciiDecode()', () => {
		expect(infraString.asciiDecode(new Uint8Array([65, 66, 67]))).toBe("ABC")
		expect(infraString.asciiDecode(new Uint8Array([65, 66, 67, 324]))).toBe("ABCD")
	})

	test('stripNewlines()', () => {
		expect(infraString.stripNewlines("ABC\n")).toBe("ABC")
		expect(infraString.stripNewlines("ABC\r\n")).toBe("ABC")
		expect(infraString.stripNewlines("A\nBC\r\n")).toBe("ABC")
	})

	test('normalizeNewlines()', () => {
		expect(infraString.normalizeNewlines("ABC\n")).toBe("ABC\n")
		expect(infraString.normalizeNewlines("ABC\r\n")).toBe("ABC\n")
		expect(infraString.normalizeNewlines("A\rBC\r\n")).toBe("A\nBC\n")
	})

	test('stripLeadingAndTrailingASCIIWhitespace()', () => {
		expect(infraString.stripLeadingAndTrailingASCIIWhitespace("  A\nBC\r\n")).toBe("A\nBC")
	})

	test('stripAndCollapseASCIIWhitespace()', () => {
		expect(infraString.stripAndCollapseASCIIWhitespace("  A  B  \nC\r\n")).toBe("A B C")
	})

	test('collectASequenceOfCodePoints()', () => {
		expect(infraString.collectASequenceOfCodePoints((char) => char.toLowerCase() === "a", "AaABC", { position: 0 })).toBe("AaA")
		expect(infraString.collectASequenceOfCodePoints((char) => char === "\u{1F4A9}", "A\u{1F4A9}\u{1F4A9}B\u{1F4A9}C", { position: 1 })).toBe("\u{1F4A9}\u{1F4A9}")
	})

	test('skipASCIIWhitespace()', () => {
		const options = { position: 3 }
		infraString.skipASCIIWhitespace("ABC    abc", options)
		expect(options.position).toBe(7)
	})

	test('strictlySplit()', () => {
		expect(infraString.strictlySplit("A;BC;D", ";")).toEqual(["A", "BC", "D"])
		expect(infraString.strictlySplit("A;\u{1F4A9};D", ";")).toEqual(["A", "\u{1F4A9}", "D"])
	})

	test('splitAStringOnASCIIWhitespace()', () => {
		expect(infraString.splitAStringOnASCIIWhitespace("A \nBC  \r\nD")).toEqual(["A", "BC", "D"])
	})

	test('splitAStringOnCommas()', () => {
		expect(infraString.splitAStringOnCommas("A,BC,,D")).toEqual(["A", "BC", "", "D"])
	})

	test('concatenate()', () => {
		expect(infraString.concatenate([])).toBe("")
		expect(infraString.concatenate(["A", "BC", "D"])).toBe("ABCD")
		expect(infraString.concatenate(["A", "BC", "D"], ",")).toBe("A,BC,D")
	})

})
