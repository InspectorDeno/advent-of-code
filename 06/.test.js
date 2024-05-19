import { part1, part2 } from '.'

const input = `
Time:      7  15   30
Distance:  9  40  200`

describe('06', () => {
  describe('part 1', () => {
    test('should output 288', () => {
      expect(part1(input)).toBe(288)
    })
  })

  describe('part 2', () => {
    test('should output 71503', () => {
      expect(part2(input)).toBe(71503)
    })
  })
})
