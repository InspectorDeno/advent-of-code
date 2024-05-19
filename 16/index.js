const Dir = {
  UP: [-1, 0],
  RIGHT: [0, 1],
  DOWN: [1, 0],
  LEFT: [0, -1]
}

const reflect = (dir, c) => {
  switch (dir) {
    case Dir.UP:
      return c === '/' ? Dir.RIGHT : Dir.LEFT
    case Dir.RIGHT:
      return c === '/' ? Dir.UP : Dir.DOWN
    case Dir.DOWN:
      return c === '/' ? Dir.LEFT : Dir.RIGHT
    case Dir.LEFT:
      return c === '/' ? Dir.DOWN : Dir.UP
  }
}

const split = (dir, c) => {
  switch (dir) {
    case Dir.UP:
    case Dir.DOWN:
      return c === '|' ? [dir] : [Dir.LEFT, Dir.RIGHT]
    case Dir.LEFT:
    case Dir.RIGHT:
      return c === '|' ? [Dir.UP, Dir.DOWN] : [dir]
  }
}

const fire = (start, direction, grid) => {
  const nextPos = (dir, pos) => pos.map((v, i) => v + dir[i])

  const cache = {}
  const queue = [[start, direction]]
  const energized = {}

  // bfs
  while (queue.length > 0) {
    let [pos, dir] = queue.shift()
    const key = JSON.stringify([pos, dir])
    if (cache[key]) continue

    const [y, x] = pos
    if (y < 0 || y >= grid.length) continue
    if (x < 0 || x >= grid[0].length) continue

    cache[key] = true // Track repetitions
    energized[pos] = true // Store energized coords

    const symbol = grid[y][x]
    switch (symbol) {
      case '.':
        queue.push([nextPos(dir, pos), dir])
        break
      case '|':
      case '-':
        split(dir, symbol).forEach((dir) => queue.push([nextPos(dir, pos), dir]))
        break
      case '/':
      case '\\':
        const nextDir = reflect(dir, symbol)
        queue.push([nextPos(nextDir, pos), nextDir])
        break
    }
  }
  return Object.keys(energized).length
}

export const part1 = (input) => {
  const grid = input.split('\n').map((row) => row.trim().split(''))
  const energized = fire([0, 0], Dir.RIGHT, grid)

  return energized
}

export const part2 = (input) => {
  const grid = input.split('\n').map((row) => row.trim().split(''))
  const energized = []

  // Fire the lasers
  grid.forEach((row, y) => {
    energized.push(fire([y, 0], Dir.RIGHT, grid))
    energized.push(fire([y, row.length - 1], Dir.LEFT, grid))
  })
  grid[0].forEach((_, x) => energized.push(fire([0, x], Dir.DOWN, grid)))
  grid[grid.length - 1].forEach((_, x) => energized.push(fire([grid.length - 1, x], Dir.UP, grid)))

  return energized.sort((a, b) => b - a)[0]
}
