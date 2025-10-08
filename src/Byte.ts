/**
 * Determines if the given number is an ASCII byte.
 *
 * @param byte - a byte
 */
export function isASCIIByte(byte: number) {
  /**
   * An ASCII byte is a byte in the range 0x00 (NUL) to 0x7F (DEL), inclusive.
   */
  return byte >= 0x00 && byte <= 0x7F
}
