import { part1, part2 } from '.'

const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe('07', () => {
  describe('part 1', () => {
    test('should output 6440', () => {
      expect(part1(input)).toBe(6440)
    })
  })

  describe('part 2', () => {
    test('should output 5905', () => {
      expect(part2(input)).toBe(5905)
    })
  })
})
