/**
 * A surrogate is a code point that is in the range U+D800 to U+DFFF, inclusive.
 */
export const Surrogate = /[0xD800-0xDFFF]/
/**
 * A noncharacter is a code point that is in the range U+FDD0 to U+FDEF,
 * inclusive, or U+FFFE, U+FFFF, U+1FFFE, U+1FFFF, U+2FFFE, U+2FFFF, U+3FFFE, 
 * U+3FFFF, U+4FFFE, U+4FFFF, U+5FFFE, U+5FFFF, U+6FFFE, U+6FFFF, U+7FFFE, 
 * U+7FFFF, U+8FFFE, U+8FFFF, U+9FFFE, U+9FFFF, U+AFFFE, U+AFFFF, U+BFFFE, 
 * U+BFFFF, U+CFFFE, U+CFFFF, U+DFFFE, U+DFFFF, U+EFFFE, U+EFFFF, U+FFFFE, 
 * U+FFFFF, U+10FFFE, or U+10FFFF.
 */
export const NonCharacter = /[\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]/
/**
 * An ASCII code point is a code point in the range U+0000 NULL to U+007F
 * DELETE, inclusive.
 */
export const ASCIICodePoint = /[\u0000-\u007F]/
/**
 * An ASCII tab or newline is U+0009 TAB, U+000A LF, or U+000D CR.
 */
export const ASCIITabOrNewLine = /[\t\n\r]/
/**
 * ASCII whitespace is U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, or 
 * U+0020 SPACE.
 */
export const ASCIIWhiteSpace = /[\t\n\f\r ]/
/**
 * A C0 control is a code point in the range U+0000 NULL to U+001F
 * INFORMATION SEPARATOR ONE, inclusive.
 */
export const C0Control = /[\u0000-\u001F]/
/**
 * A C0 control or space is a C0 control or U+0020 SPACE.
 */
export const C0ControlOrSpace = /[\u0000-\u001F ]/
/**
 * A control is a C0 control or a code point in the range U+007F DELETE to 
 * U+009F APPLICATION PROGRAM COMMAND, inclusive.
 */
export const Control = /[\u0000-\u001F\u007F-\u009F]/
/**
 * An ASCII digit is a code point in the range U+0030 (0) to U+0039 (9), 
 * inclusive.
 */
export const ASCIIDigit = /[0-9]/
/**
 * An ASCII upper hex digit is an ASCII digit or a code point in the range 
 * U+0041 (A) to U+0046 (F), inclusive.
 */
export const ASCIIUpperHexDigit = /[0-9A-F]/
/**
 * An ASCII lower hex digit is an ASCII digit or a code point in the range 
 * U+0061 (a) to U+0066 (f), inclusive.
 */
export const ASCIILowerHexDigit = /[0-9a-f]/
/**
 * An ASCII hex digit is an ASCII upper hex digit or ASCII lower hex digit.
 */
export const ASCIIHexDigit = /[0-9A-Fa-f]/
/**
 * An ASCII upper alpha is a code point in the range U+0041 (A) to U+005A (Z), 
 * inclusive.
 */
export const ASCIIUpperAlpha = /[A-Z]/
/**
 * An ASCII lower alpha is a code point in the range U+0061 (a) to U+007A (z), 
 * inclusive.
 */
export const ASCIILowerAlpha = /[a-z]/
/**
 * An ASCII alpha is an ASCII upper alpha or ASCII lower alpha.
 */
export const ASCIIAlpha = /[A-Za-z]/
/**
 * An ASCII alphanumeric is an ASCII digit or ASCII alpha.
 */
export const ASCIIAlphanumeric = /[0-9A-Za-z]/
