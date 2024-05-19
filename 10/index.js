//prettier-ignore
const pipeMap = {
  "|": [ [-1,0], [1,0]  ],
  "-": [ [0,1],  [0,-1] ],
  "L": [ [-1,0], [0,1]  ],
  "J": [ [-1,0], [0,-1] ],
  "7": [ [1,0],  [0,-1] ],
  "F": [ [1,0],  [0,1]  ],
  "S": [ [-1,0], [1,0], [0,1], [0,-1]]
}

// Find the starting pipe based on the pipeMap
function findPipe(directions) {
  const sortArrays = (arr) => arr.map((subArr) => subArr.slice().sort((a, b) => a - b))
  const sortedInput = sortArrays(directions)

  for (const key in pipeMap) {
    const sortedPipes = sortArrays(pipeMap[key])

    if (sortedInput.every((dir, index) => dir.every((elem, i) => elem === sortedPipes[index][i])))
      return key
  }
  return
}

// BFS
function findLoop({ grid, start }) {
  const queue = []
  const visited = {}
  const distances = {}

  queue.push({ node: start, symbol: 'S' })
  visited[start] = true
  distances[start] = 0

  while (queue.length > 0) {
    const { node, symbol } = queue.shift()
    const directions = pipeMap[symbol]
    const [y, x] = node

    directions.forEach(([dy, dx]) => {
      const coord = [y + dy, x + dx]
      const symbol = grid[y + dy]?.[x + dx]
      const next = pipeMap[symbol]

      if (visited[coord]) return
      if (next) {
        // Skip if neighbor doesn't match
        if (!next.some(([ny, nx]) => !(ny + dy) && !(nx + dx))) return

        visited[coord] = symbol
        distances[coord] = distances[node] + 1
        queue.push({ node: coord, symbol })
      }
    })

    // Find pipe for start node
    if (node === start) {
      const [s, ...neighbors] = Object.keys(visited)
      const [sy, sx] = s.split(',')

      const directions = []
      neighbors.forEach((n) => {
        const [ny, nx] = n.split(',')
        directions.push([ny - sy, nx - sx])
      })

      const startPipe = findPipe(directions)
      visited[[sy, sx]] = startPipe
      grid[sy][sx] = startPipe
    }
  }

  return { distances, visited }
}

// Raycast. Shoot in arbitrary direction, I'm going ->
// If we cross an odd number of pipes, the tile's enclosed
function isEnclosed({ grid, visited, node }) {
  const [y, x] = node
  let crossedPipes = 0
  let crossingFrom = {}

  for (let dx = x; dx < grid[0].length; dx++) {
    const hit = visited[[y, dx]]

    if (hit) {
      switch (hit) {
        case '-':
          break
        case '|':
          crossedPipes++
          crossingFrom = {}
          break
        case 'L':
          crossingFrom.top = true
          break
        case 'J':
          if (crossingFrom.bottom) crossedPipes++
          crossingFrom = {}
          break
        case '7':
          if (crossingFrom.top) crossedPipes++
          crossingFrom = {}
          break
        case 'F':
          crossingFrom.bottom = true
          break
        default:
          crossingFrom = {}
          break
      }
    }
  }

  return crossedPipes % 2 === 1
}

export const part1 = (input) => {
  const grid = input
    .trim()
    .replace(/[^\S\n]/g, '')
    .split('\n')
    .map((row) => row.split(''))

  let startNode = []
  grid.every((row, y) =>
    row.every((symbol, x) => {
      if (symbol === 'S') {
        startNode = [y, x]
        return false
      }
      return true
    })
  )

  const { distances } = findLoop({ grid, start: startNode })

  return Object.values(distances)[Object.values(distances).length - 1]
}

export const part2 = (input) => {
  const grid = input
    .trim()
    .replace(/[^\S\n]/g, '')
    .split('\n')
    .map((row) => row.split(''))

  let startNode = []
  grid.every((row, y) =>
    row.every((symbol, x) => {
      if (symbol === 'S') {
        startNode = [y, x]
        return false
      }
      return true
    })
  )

  // Get the list of tiles if the loop
  const { visited } = findLoop({ grid, start: startNode })
  let enclosedTiles = 0

  // Check all tiles that are not in 'visited' to see if they are enclosed
  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (!visited[[y, x]] && isEnclosed({ grid, node: [y, x], visited })) {
        grid[y][x] = '♥︎'
        enclosedTiles++
      }
    }
  }

  // grid.forEach((row) => console.log(...row))

  return enclosedTiles
}
