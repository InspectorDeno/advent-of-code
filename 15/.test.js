import { part1, part2 } from '.'

const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

describe('15', () => {
  describe('part1', () => {
    test('should output 1320', () => {
      expect(part1(input)).toBe(1320)
    })
  })

  describe('part 2', () => {
    test('should output 145', () => {
      expect(part2(input)).toBe(145)
    })
  })
})
