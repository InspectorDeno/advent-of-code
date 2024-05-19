//prettier-ignore
const Dirs = {
  '^': [ [-1, 0] ],
  ">": [ [0, 1] ],
  "v": [ [1, 0] ],
  "<": [ [0, -1] ],
  '.': [ [-1, 0], [1, 0], [0, -1], [0, 1] ],
}

function isValidPath(y, x, grid) {
  return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length && grid[y][x] !== '#'
}

// The path is only 1-wide, so we can utilize the fact that some tiles will have more neighbors than most.
// Find all intersection nodes with at least 3 neighbors.
// Calculate the cost (distance) between these nodes by walking the path and store as a directed graph.
// Search the graph using dfs to find the most expensive path from start to end.
export const part1 = (input) => {
  let start, end
  let grid = input
    .trim()
    .split('\n')
    .map((row, i, a) => {
      if (i === 0) start = [0, row.indexOf('.')].join(',')
      if (i === a.length - 1) end = [a.length - 1, row.indexOf('.')].join(',')
      return row.split('')
    })

  const intersections = new Set([start, end])
  // Store all intersection points with at least 3 neighboring paths
  for (const [y, row] of grid.entries()) {
    for (const [x, symbol] of row.entries()) {
      if (symbol === '#') continue
      let neighbors = 0
      for (const [ny, nx] of [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1]
      ]) {
        if (isValidPath(ny, nx, grid)) neighbors++
      }
      if (neighbors >= 3) intersections.add([y, x].join(','))
    }
  }

  let graph = {}
  // Add up the distance between intersections in a directed graph
  for (const from of intersections) {
    const [fy, fx] = from.split(',').map(Number)
    const stack = [[fy, fx, 0]]
    const visited = new Set([[fy, fx].join(',')])
    graph[from] = {}

    while (stack.length) {
      let [y, x, distance] = stack.pop()
      // Continue until we hit an intersection
      if (distance !== 0 && intersections.has([y, x].join(','))) {
        graph[from][[y, x].join(',')] = distance
        continue
      }

      for (const [dy, dx] of Dirs[grid[y][x]]) {
        const nextY = y + dy
        const nextX = x + dx
        if (isValidPath(nextY, nextX, grid) && !visited.has([nextY, nextX].join(','))) {
          stack.push([nextY, nextX, distance + 1])
          visited.add([nextY, nextX].join(','))
        }
      }
    }
  }

  // Find the longest hike (path-1)
  function dfs(current, visited = new Set()) {
    if (current === end) return 0 // Don't add a step here
    let maxDistance = -Infinity

    visited.add(current)

    for (const [node, distance] of Object.entries(graph[current])) {
      if (!visited.has(node)) maxDistance = Math.max(maxDistance, dfs(node, visited) + distance)
    }

    visited.delete(current)
    return maxDistance
  }

  return dfs(start)
}

// Basically the same as part 1, except we treat slopes as regular path blocks (.)
// Takes about 10s to run
export const part2 = (input) => {
  let start, end
  let grid = input
    .trim()
    .split('\n')
    .map((row, i, a) => {
      if (i === 0) start = [0, row.indexOf('.')].join(',')
      if (i === a.length - 1) end = [a.length - 1, row.indexOf('.')].join(',')
      return row.split('')
    })

  const intersections = new Set([start, end])
  // Store all intersection points with at least 3 neighboring paths
  for (const [y, row] of grid.entries()) {
    for (const [x, symbol] of row.entries()) {
      if (symbol === '#') continue
      let neighbors = 0
      for (const [ny, nx] of [
        [y - 1, x],
        [y + 1, x],
        [y, x - 1],
        [y, x + 1]
      ]) {
        if (isValidPath(ny, nx, grid)) neighbors++
      }
      if (neighbors >= 3) intersections.add([y, x].join(','))
    }
  }

  let graph = {}
  // Add up the distance between intersections in a directed graph
  for (const from of intersections) {
    const [fy, fx] = from.split(',').map(Number)
    const stack = [[fy, fx, 0]]
    const visited = new Set([[fy, fx].join(',')])
    graph[from] = {}

    while (stack.length) {
      let [y, x, distance] = stack.pop()
      // Continue until we hit an intersection
      if (distance !== 0 && intersections.has([y, x].join(','))) {
        graph[from][[y, x].join(',')] = distance
        continue
      }

      // Treat all options as the '.' option
      for (const [dy, dx] of Dirs['.']) {
        const nextY = y + dy
        const nextX = x + dx
        if (isValidPath(nextY, nextX, grid) && !visited.has([nextY, nextX].join(','))) {
          stack.push([nextY, nextX, distance + 1])
          visited.add([nextY, nextX].join(','))
        }
      }
    }
  }

  // Find the longest hike (path - 1)
  function dfs(current, visited = new Set()) {
    if (current === end) return 0 // Don't add a step here
    let maxDistance = -Infinity

    visited.add(current)

    for (const [node, distance] of Object.entries(graph[current])) {
      if (!visited.has(node)) maxDistance = Math.max(maxDistance, dfs(node, visited) + distance)
    }

    visited.delete(current)
    return maxDistance
  }

  return dfs(start)
}
