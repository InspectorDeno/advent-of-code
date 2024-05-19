import { part1, part2 } from '.'

const input = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

describe('14', () => {
  describe('part1', () => {
    test('should output 136', () => {
      expect(part1(input)).toBe(136)
    })
  })

  describe('part 2', () => {
    test('should output 64', () => {
      expect(part2(input)).toBe(64)
    })
  })
})
