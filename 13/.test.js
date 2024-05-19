import { part1, part2 } from '.'

const input = `
#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

describe('13', () => {
  describe('part1', () => {
    test('should output 405', () => {
      expect(part1(input)).toBe(405)
    })
  })

  describe('part 2', () => {
    test('should output 400', () => {
      expect(part2(input)).toBe(400)
    })
  })
})
