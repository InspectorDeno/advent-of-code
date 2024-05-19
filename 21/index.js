const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1]
]

export const part1 = (input) => {
  let startNode
  const grid = input
    .trim()
    .split('\n')
    .map((row, y) => {
      if (row.includes('S')) startNode = { y, x: row.indexOf('S') }
      return row.split('')
    })

  const visited = {}
  const queue = [[startNode, 64]]
  const answer = {}

  while (queue.length) {
    const [current, stepsLeft] = queue.shift()
    const { x, y } = current
    if (stepsLeft % 2 === 0) answer[`${y},${x}`] = true
    if (stepsLeft === 0) continue

    for (const [dy, dx] of directions) {
      const nextY = y + dy
      const nextX = x + dx
      if (
        nextY < 0 ||
        nextY >= grid.length ||
        nextX < 0 ||
        nextX >= grid[0].length ||
        grid[nextY][nextX] === '#' ||
        visited[`${nextY},${nextX}`]
      )
        continue
      visited[`${nextY},${nextX}`] = true
      queue.push([{ y: nextY, x: nextX }, stepsLeft - 1])
    }
  }

  const result = Object.keys(answer).length
  return result
}

export const part2 = (input) => {
  const walk = (start, steps) => {
    const visited = {}
    const queue = [[start, steps]]
    const answer = {}

    while (queue.length) {
      const [current, stepsLeft] = queue.shift()
      const { x, y } = current
      if (stepsLeft % 2 === 0) answer[`${y},${x}`] = true
      if (stepsLeft === 0) continue

      for (const [dy, dx] of directions) {
        const nextY = y + dy
        const nextX = x + dx
        if (
          nextY < 0 ||
          nextY >= grid.length ||
          nextX < 0 ||
          nextX >= grid[0].length ||
          grid[nextY][nextX] === '#' ||
          visited[`${nextY},${nextX}`]
        )
          continue
        visited[`${nextY},${nextX}`] = true
        queue.push([{ y: nextY, x: nextX }, stepsLeft - 1])
      }
    }

    return Object.keys(answer).length
  }

  let startNode
  const grid = input
    .trim()
    .split('\n')
    .map((row, y) => {
      if (row.includes('S')) startNode = { y, x: row.indexOf('S') }
      return row.split('')
    })

  const steps = 26501365
  const size = grid.length
  const toEdge = Math.floor(size / 2)
  const grids = (steps - toEdge) / size
  // Full grids
  const even = walk(startNode, 2 * size)
  const odd = walk(startNode, 2 * size + 1)
  // Corners
  const top = walk({ x: toEdge, y: size - 1 }, size - 1)
  const right = walk({ x: 0, y: toEdge }, size - 1)
  const down = walk({ x: toEdge, y: 0 }, size - 1)
  const left = walk({ x: size - 1, y: toEdge }, size - 1)
  // Small triangles
  const A = walk({ x: 0, y: 0 }, toEdge - 1)
  const B = walk({ x: grid.length - 1, y: 0 }, toEdge - 1)
  const C = walk({ x: grid.length - 1, y: grid[0].length - 1 }, toEdge - 1)
  const D = walk({ x: 0, y: grid[0].length - 1 }, toEdge - 1)
  // With missing triangles
  const E = walk({ x: 0, y: 0 }, size + toEdge - 1)
  const F = walk({ x: grid[0].length - 1, y: 0 }, size + toEdge - 1)
  const G = walk({ x: grid[0].length - 1, y: grid.length - 1 }, size + toEdge - 1)
  const H = walk({ x: 0, y: grid.length - 1 }, size + toEdge - 1)

  let count = top + right + down + left
  count += odd * Math.pow(grids - 1, 2)
  count += even * Math.pow(grids, 2)
  count += (A + B + C + D) * grids
  count += (E + F + G + H) * (grids - 1)

  return count
}
