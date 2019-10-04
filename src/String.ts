import  { ASCIIWhiteSpace } from './CodePoints'

/**
 * Splits a string on ASCII whitespace.
 * 
 * @param str - a string
 */
export function splitAStringOnASCIIWhitespace(str: string): Array<string> {
  return str.split(ASCIIWhiteSpace).filter(token => token)
}

