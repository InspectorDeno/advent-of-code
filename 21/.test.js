import { part1, part2 } from '.'

const input = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`

describe('21', () => {
  describe('part1', () => {
    test('should output 42', () => {
      expect(part1(input)).toBe(42)
    })
  })
})
