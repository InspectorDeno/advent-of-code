const Dir = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1]
}

function walk(queue) {
  const trench = []
  let pos = [0, 0]
  let minPos = { x: 0, y: 0 }

  const nextPos = (dir, pos) => pos.map((v, i) => v + dir[i])

  while (queue.length > 0) {
    const { steps, dir } = queue.shift()

    for (let i = 0; i < steps; i++) {
      pos = nextPos(Dir[dir], pos)
      trench.push(pos)
    }

    // Track min position to determine what the start coordinates were
    minPos = { y: pos[0] < minPos.y ? pos[0] : minPos.y, x: pos[1] < minPos.x ? pos[1] : minPos.x }
  }

  return { trench, startPos: [minPos.y * -1, minPos.x * -1] }
}

function flood(grid, [startY, startX]) {
  const maxY = grid.length
  const maxX = grid[0].length

  const isValidMove = (y, x) => y >= 0 && y < maxY && x >= 0 && x < maxX

  const queue = [{ y: startY, x: startX }]
  let count = 0

  while (queue.length > 0) {
    const { y, x } = queue.shift()
    if (grid[y][x] === '.') {
      count++
      grid[y][x] = '#' // Mark visited cell
      for (const [dy, dx] of Object.values(Dir)) {
        const newY = y + dy
        const newX = x + dx
        if (isValidMove(newY, newX) && grid[newY][newX] === '.') {
          queue.push({ y: newY, x: newX })
        }
      }
    }
  }

  return count
}

export const part1 = (input) => {
  const instructions = input
    .trim()
    .split('\n')
    .map((row) => {
      const [dir, steps] = row.trim().split(' ')
      return { dir, steps: Number(steps) }
    })

  // Walk the loop
  const { startPos, trench } = walk(instructions)

  // // Figure out the dimensions of the grid
  const [maxY, maxX] = [
    trench.map(([y, _]) => y + startPos[0] + 1).sort((a, b) => b - a)[0],
    trench.map(([_, x]) => x + startPos[1] + 1).sort((a, b) => b - a)[0]
  ]

  // Add grid with some padding
  const [gridY, gridX] = [maxY + 2, maxX + 2]
  const grid = Array.from(Array(gridY)).map(() => Array(gridX).fill('.'))
  trench.forEach(([y, x]) => (grid[y + startPos[0] + 1][x + startPos[1] + 1] = '#'))

  // Now we can floodfill the outside and the remaining cells will be enclosed
  const outsideCells = flood(grid, [0, 0])
  const total = gridY * gridX - outsideCells

  return total
}

// Flood fill strategy isn't viable here...
// Instead, store the loop as a polygon and add up the inner points using the shoelace formula
// https://en.wikipedia.org/wiki/Shoelace_formula
export const part2 = (input) => {
  const instructions = input
    .trim()
    .split('\n')
    .map((row) => {
      const code = row.trim().split('#')[1].replace(/[)]/, '')
      const hex = code.substring(0, 5)
      const dir = code.charAt(code.length - 1)

      return { dir: parseInt(dir), steps: parseInt(hex, 16) }
    })

  let x = 0
  let y = 0
  const points = []
  let perimeter = 0

  // Store the polygon points
  instructions.forEach(({ steps, dir }) => {
    switch (dir) {
      case 0:
        x += steps
        break
      case 1:
        y += steps
        break
      case 2:
        x -= steps
        break
      case 3:
        y -= steps
        break
    }
    perimeter += steps
    points.push([x, y])
  })

  // Shoelace formula
  let result = 0
  for (let i = 0; i < points.length - 1; i++) {
    result += (points[i + 1][0] + points[i][0]) * (points[i + 1][1] - points[i][1])
  }

  result += perimeter
  return Math.floor(result / 2) + 1
}
