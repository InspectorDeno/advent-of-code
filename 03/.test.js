import { part1, part2 } from '.'

const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

describe('03', () => {
  describe('part 1', () => {
    test('should output 4361', () => {
      expect(part1(input)).toBe(4361)
    })
  })

  describe('part 2', () => {
    test('should output 467835', () => {
      expect(part2(input)).toBe(467835)
    })
  })
})
