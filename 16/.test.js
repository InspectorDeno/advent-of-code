import { readFileSync } from 'fs'
import { part1, part2 } from '.'

const input = readFileSync('./16/test-input.txt', 'utf8').trim()

describe('16', () => {
  describe('part1', () => {
    test('should output 46', () => {
      expect(part1(input)).toBe(46)
    })
  })

  describe('part 2', () => {
    test('should output 51', () => {
      expect(part2(input)).toBe(51)
    })
  })
})
