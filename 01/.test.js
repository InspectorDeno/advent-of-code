import { part1, part2 } from '.'

describe('01', () => {
  describe('part 1', () => {
    test('should output 142', () => {
      const input = `
      1abc2
      pqr3stu8vwx
      a1b2c3d4e5f
      treb7uchet`
      expect(part1(input)).toBe(142)
    })
  })

  describe('part 2', () => {
    test('should output 281', () => {
      const input = `
      two1nine
      eightwothree
      abcone2threexyz
      xtwone3four
      4nineeightseven2
      zoneight234
      7pqrstsixteen`
      expect(part2(input)).toBe(281)
    })
  })
})
