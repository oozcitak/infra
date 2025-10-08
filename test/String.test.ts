import { suite, test } from 'node:test'
import { deepEqual } from 'node:assert'
import { string as infraString } from '../lib'

suite('String', () => {

	test('isCodeUnitPrefix()', () => {
		deepEqual(infraString.isCodeUnitPrefix("abc", "abcd"), true)
		deepEqual(infraString.isCodeUnitPrefix("abcd", "abc"), false)
		deepEqual(infraString.isCodeUnitPrefix("abc", "xyz"), false)
		deepEqual(infraString.isCodeUnitPrefix("abc", "wxyz"), false)
		deepEqual(infraString.isCodeUnitPrefix("abcd", "xyz"), false)
	})

	test('isCodeUnitLessThan()', () => {
		deepEqual(infraString.isCodeUnitLessThan("abc", "abcd"), true)
		deepEqual(infraString.isCodeUnitLessThan("abcd", "abc"), false)
		deepEqual(infraString.isCodeUnitLessThan("abc", "xyz"), true)
		deepEqual(infraString.isCodeUnitLessThan("abc", "abc"), false)
		deepEqual(infraString.isCodeUnitLessThan("abc", "abd"), true)
		deepEqual(infraString.isCodeUnitLessThan("abd", "abc"), false)
	})

	test('isomorphicEncode()', () => {
		deepEqual(infraString.isomorphicEncode("ABC"), new Uint8Array([65, 66, 67]))
		deepEqual(infraString.isomorphicEncode("ABC\u{1F4A9}"), new Uint8Array([65, 66, 67, 0]))
	})

	test('isASCIIString()', () => {
		deepEqual(infraString.isASCIIString("ABC"), true)
		deepEqual(infraString.isASCIIString("ABC\u{1F4A9}"), false)
	})

	test('asciiLowercase()', () => {
		deepEqual(infraString.asciiLowercase("ABC\u{1F4A9}"), "abc\u{1F4A9}")
	})

	test('asciiUppercase()', () => {
		deepEqual(infraString.asciiUppercase("abc\u{1F4A9}"), "ABC\u{1F4A9}")
	})

	test('asciiCaseInsensitiveMatch()', () => {
		deepEqual(infraString.asciiCaseInsensitiveMatch("abc\u{1F4A9}", "ABC\u{1F4A9}"), true)
		deepEqual(infraString.asciiCaseInsensitiveMatch("abc\u{1F4A9}", "ABC"), false)
		deepEqual(infraString.asciiCaseInsensitiveMatch("abc", "ABCD"), false)
	})

	test('asciiEncode()', () => {
		deepEqual(infraString.asciiEncode("ABC"), new Uint8Array([65, 66, 67]))
		deepEqual(infraString.asciiEncode("ABC\u{1F4A9}"), new Uint8Array([65, 66, 67, 0]))
	})

	test('asciiDecode()', () => {
		deepEqual(infraString.asciiDecode(new Uint8Array([65, 66, 67])), "ABC")
		deepEqual(infraString.asciiDecode(new Uint8Array([65, 66, 67, 324])), "ABCD")
	})

	test('stripNewlines()', () => {
		deepEqual(infraString.stripNewlines("ABC\n"), "ABC")
		deepEqual(infraString.stripNewlines("ABC\r\n"), "ABC")
		deepEqual(infraString.stripNewlines("A\nBC\r\n"), "ABC")
	})

	test('normalizeNewlines()', () => {
		deepEqual(infraString.normalizeNewlines("ABC\n"), "ABC\n")
		deepEqual(infraString.normalizeNewlines("ABC\r\n"), "ABC\n")
		deepEqual(infraString.normalizeNewlines("A\rBC\r\n"), "A\nBC\n")
	})

	test('stripLeadingAndTrailingASCIIWhitespace()', () => {
		deepEqual(infraString.stripLeadingAndTrailingASCIIWhitespace("  A\nBC\r\n"), "A\nBC")
	})

	test('stripAndCollapseASCIIWhitespace()', () => {
		deepEqual(infraString.stripAndCollapseASCIIWhitespace("  A  B  \nC\r\n"), "A B C")
	})

	test('collectASequenceOfCodePoints()', () => {
		deepEqual(infraString.collectASequenceOfCodePoints((char) => char.toLowerCase() === "a", "AaABC", { position: 0 }), "AaA")
		deepEqual(infraString.collectASequenceOfCodePoints((char) => char === "\u{1F4A9}", "A\u{1F4A9}\u{1F4A9}B\u{1F4A9}C", { position: 1 }), "\u{1F4A9}\u{1F4A9}")
	})

	test('skipASCIIWhitespace()', () => {
		const options = { position: 3 }
		infraString.skipASCIIWhitespace("ABC    abc", options)
		deepEqual(options.position, 7)
	})

	test('strictlySplit()', () => {
		deepEqual(infraString.strictlySplit("A;BC;D", ";"), ["A", "BC", "D"])
		deepEqual(infraString.strictlySplit("A;\u{1F4A9};D", ";"), ["A", "\u{1F4A9}", "D"])
	})

	test('splitAStringOnASCIIWhitespace()', () => {
		deepEqual(infraString.splitAStringOnASCIIWhitespace("A \nBC  \r\nD"), ["A", "BC", "D"])
	})

	test('splitAStringOnCommas()', () => {
		deepEqual(infraString.splitAStringOnCommas("A,BC,,D"), ["A", "BC", "", "D"])
	})

	test('concatenate()', () => {
		deepEqual(infraString.concatenate([]), "")
		deepEqual(infraString.concatenate(["A", "BC", "D"]), "ABCD")
		deepEqual(infraString.concatenate(["A", "BC", "D"], ","), "A,BC,D")
	})

})
