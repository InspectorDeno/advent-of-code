const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}
const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g

export const part1 = (input) =>
  input
    .trim()
    .replace(/[^\S\n]/g, '')
    .split('\n')
    .reduce((acc, row) => {
      const num = row.split(/ /)[0].replace(/[\D]/g, '')
      const val = num.charAt(0).concat(num.charAt(num.length - 1))

      return acc + Number(val)
    }, 0)

export const part2 = (input) =>
  input
    .trim()
    .replace(/[^\S\n]/g, '')
    .split('\n')
    .reduce((acc, row) => {
      const matches = [...row.matchAll(regex)].map((d) => d[1])
      const val = Number([matches[0], matches.at(-1)].map((d) => digitMap[d] || d).join(''))
      return acc + val
    }, 0)
