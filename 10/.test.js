import { part1, part2 } from '.'

describe('10', () => {
  describe('part 1', () => {
    test('should output 4', () => {
      const input = `
      .....
      .S-7.
      .|.|.
      .L-J.
      .....`
      expect(part1(input)).toBe(4)
    })

    test('should output 8', () => {
      expect(
        part1(`
        ..F7.
        .FJ|.
        SJ.L7
        |F--J
        LJ...`)
      ).toBe(8)
    })

    test('should output 8', () => {
      expect(
        part1(`
        ..F7.
        .FJ|.
        FS.L7
        |F--J
        LJ---`)
      ).toBe(8)
    })
  })

  describe('part 2', () => {
    test('should output 4', () => {
      expect(
        part2(`
        ...........
        .S-------7.
        .|F-----7|.
        .||.....||.
        .||.....||.
        .|L-7.F-J|.
        .|..|.|..|.
        .L--J.L--J.
        ...........`)
      ).toBe(4)
    })
    test('should output 4', () => {
      expect(
        part2(`
        ..........
        .S------7.
        .|F----7|.
        .||....||.
        .||....||.
        .|L-7F-J|.
        .|..||..|.
        .L--JL--J.
        ..........`)
      ).toBe(4)
    })
    test('should output 10', () => {
      expect(
        part2(`
        FF7FSF7F7F7F7F7F---7
        L|LJ||||||||||||F--J
        FL-7LJLJ||||||LJL-77
        F--JF--7||LJLJ7F7FJ-
        L---JF-JLJ.||-FJLJJ7
        |F|F-JF---7F7-L7L|7|
        |FFJF7L7F-JF7|JL---7
        7-L-JL7||F7|L7F-7F7|
        L.L7LFJ|||||FJL7||LJ
        L7JLJL-JLJLJL--JLJ.L`)
      ).toBe(10)
    })
  })
})
