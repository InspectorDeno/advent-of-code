import { part1, part2 } from '.'

const input = `
...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

describe('11', () => {
  describe('part 1', () => {
    test('should output 374', () => {
      expect(part1(input)).toBe(374)
    })
  })

  describe('part 2', () => {
    test('should output 82000210', () => {
      expect(part2(input)).toBe(82000210)
    })
  })
})
