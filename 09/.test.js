import { part1, part2 } from '.'

const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

describe('09', () => {
  describe('part 1', () => {
    test('should output 114', () => {
      expect(part1(input)).toBe(114)
    })
  })

  describe('part 2', () => {
    test('should output 2', () => {
      expect(part2(input)).toBe(2)
    })
  })
})
