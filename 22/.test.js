import { part1, part2 } from '.'

const input = `
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`

describe('21', () => {
  describe('part1', () => {
    test('should output 5', () => {
      expect(part1(input)).toBe(5)
    })
  })

  describe('part2', () => {
    test('should output 7', () => {
      expect(part2(input)).toBe(7)
    })
  })
})
