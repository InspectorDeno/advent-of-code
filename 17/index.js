import { Heap } from 'heap-js'
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]

// Uses a binary heap (priority queue) to automatically sort the search by lowest heat
export const part1 = (input) => {
  const heats = {}
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
  grid.forEach((row, y) => row.forEach((cost, x) => (heats[`${x},${y}`] = Number(cost))))
  const width = grid.length
  const height = grid[0].length

  let totalHeat
  const visited = new Set()
  const queue = new Heap((a, b) => a[0] - b[0]) // Sort the queue by heat
  queue.init([[0, 0, 0, 0, 0, 0]])

  while (queue.length) {
    let [heat, x, y, dx, dy, count] = queue.pop()
    const key = JSON.stringify([x, y, dx, dy, count])

    if (visited.has(key)) continue

    if (x === width - 1 && y === height - 1) {
      totalHeat = heat
      break
    }

    visited.add(key)

    for (const [nextDx, nextDy] of directions) {
      const nextX = x + nextDx
      const nextY = y + nextDy
      const nextHeat = heats[`${nextX},${nextY}`]

      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue // Off the grid
      if (nextDx === -dx && nextDy === -dy) continue // Can't go backwards
      if (nextDx === dx && nextDy === dy) {
        if (count < 3) queue.push([heat + nextHeat, nextX, nextY, nextDx, nextDy, count + 1])
        else continue
      } else queue.push([heat + nextHeat, nextX, nextY, nextDx, nextDy, 1])
    }
  }

  return totalHeat
}

export const part2 = (input) => {
  const heats = {}
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
  grid.forEach((row, x) =>
    row.forEach((cost, y) => {
      heats[`${x},${y}`] = Number(cost)
    })
  )
  const width = grid.length
  const height = grid[0].length

  let totalHeat
  const visited = new Set()
  const queue = new Heap((a, b) => a[0] - b[0]) // Sort the queue by heat
  queue.init([[0, 0, 0, 0, 0, 0]])

  while (queue.length) {
    let [heat, x, y, dx, dy, count] = queue.pop()
    const key = JSON.stringify([x, y, dx, dy, count])

    if (visited.has(key)) continue

    if (x === width - 1 && y === height - 1 && count >= 4) {
      totalHeat = heat
      break
    }

    visited.add(key)

    for (const [nextDx, nextDy] of directions) {
      const nextX = x + nextDx
      const nextY = y + nextDy
      const nextHeat = heats[`${nextX},${nextY}`]

      if (nextX < 0 || nextX >= width || nextY < 0 || nextY >= height) continue // Off the grid
      if (nextDx === -dx && nextDy === -dy) continue // Can't go backwards
      if (nextDx === dx && nextDy === dy) {
        if (count < 10) queue.push([heat + nextHeat, nextX, nextY, nextDx, nextDy, count + 1])
        else continue
      } else if (count >= 4 || (x === 0 && y === 0))
        queue.push([heat + nextHeat, nextX, nextY, nextDx, nextDy, 1])
    }
  }

  return totalHeat
}
