const tiltLeft = (dish) =>
  dish.map((str) => {
    const row = str.split('')
    let steps = 0
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '.') steps++
      if (row[i] === '#') steps = 0
      if (row[i] === 'O') {
        if (!steps) continue
        row.splice(i - steps, 1, 'O')
        row.splice(i, 1, '.')
      }
    }
    return row.join('')
  })

const tiltRight = (dish) =>
  dish.map((str) => {
    const row = str.split('')
    let steps = 0
    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i] === '.') steps++
      if (row[i] === '#') steps = 0
      if (row[i] === 'O') {
        if (!steps) continue
        row.splice(i + steps, 1, 'O')
        row.splice(i, 1, '.')
      }
    }
    return row.join('')
  })

const transpose = (arr) => arr[0].split('').map((_, x) => arr.map((row) => row[x]).join(''))

export const part1 = (input) => {
  const dish = input.trim().split('\n')
  // Flip dish, tilt to the left and flip back
  const tilted = transpose(tiltLeft(transpose(dish)))

  const totalLoad = tilted.reduce((sum, row, i) => {
    const load = [...row.matchAll('O')].length * (row.length - i)
    return sum + load
  }, 0)

  return totalLoad
}

export const part2 = (input) => {
  // Tilt the dish up, left, down, right
  function cycle() {
    dish = transpose(tiltLeft(transpose(dish)))
    dish = tiltLeft(dish)
    dish = transpose(tiltRight(transpose(dish)))
    dish = tiltRight(dish)
  }

  let dish = input.trim().split('\n')

  const seen = {}
  const visited = [dish]
  // Cycle until we find a repeated pattern
  let iterations = 0
  while (true) {
    iterations++
    cycle()
    let key = dish.toString()
    if (key in seen) break
    seen[key] = dish
    visited.push(dish)
  }

  // Find index of first time we had the final configuration
  const offset = visited.map((dish) => dish.toString()).indexOf(dish.toString())
  const loopLength = iterations - offset
  const match = visited[((1000000000 - offset) % loopLength) + offset]

  const totalLoad = match.reduce((sum, row, i) => {
    const load = [...row.matchAll('O')].length * (row.length - i)
    return sum + load
  }, 0)

  return totalLoad
}
