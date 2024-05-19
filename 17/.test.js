import { part1, part2 } from '.'

const input = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`

describe('17', () => {
  describe('part1', () => {
    test('should output 102', () => {
      expect(part1(input)).toBe(102)
    })
  })

  describe('part 2', () => {
    test('should output 94', () => {
      expect(part2(input)).toBe(94)
    })

    test('should output 71', () => {
      expect(
        part2(`
111111111111
999999999991
999999999991
999999999991
999999999991`)
      ).toBe(71)
    })
  })
})
