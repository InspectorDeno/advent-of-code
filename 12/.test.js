import { part1, part2 } from '.'

const input = `
???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

describe('12', () => {
  describe('part1', () => {
    test('should output 21', () => {
      expect(part1(input)).toBe(21)
    })
  })

  describe('part 2', () => {
    test('should output 525152', () => {
      expect(part2(input)).toBe(525152)
    })
  })
})
