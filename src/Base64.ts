import { ASCIIWhiteSpace } from './CodePoints'

/**
 * Base-64 encodes the given string.
 * 
 * @param input - a string
 */
export function forgivingBase64Encode(input: string): string {
  /**
   * To forgiving-base64 encode given a byte sequence data, apply the base64
   * algorithm defined in section 4 of RFC 4648 to data and return the result.
   * [RFC4648]
   */
  return Buffer.from(input).toString('base64')
}

/**
 * Decodes a base-64 string.
 * 
 * @param input - a string
 */
export function forgivingBase64Decode(input: string): string {
  /**
   * Uses native buffer.
   */
  return Buffer.from(input.replace(ASCIIWhiteSpace, ''), 'base64').toString('utf8')
}