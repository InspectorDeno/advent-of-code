const isSymbol = (val) => /[^0-9.]/g.test(val)
const isNumber = (val) => !isNaN(val)
const neighbors = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1]
]

// Store input as 2d array
// Read input and store coordinates of special characters
// Check surrounding 3x3 and store position if overlap with number
// Determine the entire number of overlapped number
// Return their sum
export const part1 = (input) => {
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))

  const mines = []
  // Save coordinates of symbol neighbors
  grid.forEach((row, y) => {
    row.forEach((symbol, x) => {
      // Save symbol neighbors
      if (isSymbol(symbol)) {
        for (let i = 0; i < 8; i++) {
          const dy = y + neighbors[i][1]
          const dx = x + neighbors[i][0]
          if (isNumber(grid[dy]?.[dx])) mines.push({ x: dx, y: dy })
        }
      }
    })
  })

  // Determine enitre parts and check if they overlap with the mines
  const parts = []
  grid.forEach((row, y) => {
    let number = ''
    let part = false

    row.forEach((symbol, x) => {
      if (isNumber(symbol)) {
        part = part || mines.some((match) => match.x === x && match.y === y)
        number += symbol
      }
      if (!isNumber(symbol) || x === row.length - 1) {
        part && number && parts.push(number)
        part = false
        number = ''
      }
    })
  })

  return parts.reduce((acc, val) => acc + Number(val), 0)
}

// Store input as 2d array
// Read input and store coordinates of gears (*)
// Check surrounding 3x3 and store position if overlap with number
// Determine the entire number of overlapped number
// Return their sum
export const part2 = (input) => {
  const isSamePart = (first, second) => first.y === second.y && Math.abs(first.x - second.x) === 1
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))

  const mines = []
  let gearIndex = 0
  // Save coordinates of symbol neighbors
  grid.forEach((row, y) => {
    row.forEach((symbol, x) => {
      const parts = []
      if (symbol === '*') {
        let numberOfparts = 0

        for (let i = 0; i < 8; i++) {
          const dy = y + neighbors[i][1]
          const dx = x + neighbors[i][0]

          if (isNumber(grid[dy]?.[dx])) {
            const number = { val: grid[dy]?.[dx], y: dy, x: dx }
            parts.push(number)
            if (!parts.some((part) => isSamePart(part, number))) {
              numberOfparts += 1
            }
          }
        }
        if (numberOfparts === 2) {
          mines.push({ gearIndex, parts })
          gearIndex++
        }
      }
    })
  })

  // Determine enitre parts and check which
  const parts = []
  grid.forEach((row, y) => {
    let number = ''
    let match

    row.forEach((symbol, x) => {
      if (isNumber(symbol)) {
        match =
          match || mines.find((mine) => mine.parts.some((part) => part.x === x && part.y === y))
        number += symbol
      }
      if (!isNumber(symbol) || x === row.length - 1) {
        match && number && parts.push({ gearIndex: match.gearIndex, number })
        number = ''
        match = null
      }
    })
  })

  return Object.values(
    parts.reduce(
      (acc, part) => ({
        ...acc,
        [part.gearIndex]: acc[part.gearIndex]
          ? acc[part.gearIndex] * Number(part.number)
          : Number(part.number)
      }),
      {}
    )
  ).reduce((acc, val) => acc + val, 0)
}
