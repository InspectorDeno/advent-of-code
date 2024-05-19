import { part1, part2 } from '.'

const input = `
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`

describe('18', () => {
  describe('part1', () => {
    test('should output 85', () => {
      expect(
        part1(`
        R 6
        U 4
        L 3
        U 2
        L 7
        D 5
        L 1
        D 3
        R 5
        U 2`)
      ).toBe(85)
    })
    test('should output 62', () => {
      expect(part1(input)).toBe(62)
    })
  })

  describe('part 2', () => {
    test('should output 952408144115', () => {
      expect(part2(input)).toBe(952408144115)
    })
  })
})
