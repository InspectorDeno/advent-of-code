import { part1, part2 } from '.'

describe('20', () => {
  describe('part1', () => {
    test('should output 32000000', () => {
      expect(
        part1(`
        broadcaster -> a, b, c
        %a -> b
        %b -> c
        %c -> inv
        &inv -> a`)
      ).toBe(32000000)
    })

    test('should output 11687500', () => {
      expect(
        part1(`
        broadcaster -> a
        %a -> inv, con
        &inv -> b
        %b -> con
        &con -> output`)
      ).toBe(11687500)
    })
  })

  describe('part 2', () => {
    test('should output 2', () => {
      expect(
        part2(`
        broadcaster -> a
        %a -> inv
        &inv -> b
        %b -> rx
        &con -> output`)
      ).toBe(2)
    })
  })
})
