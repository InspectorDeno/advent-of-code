import { part1, part2 } from '.'

const input = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`

describe('24', () => {
  describe('part1', () => {
    test('should output 2', () => {
      expect(part1(input)).toBe(2)
    })
  })

  describe('part2', () => {
    test('should output 123', () => {
      expect(part2(input)).toBe(123)
    })
  })
})
