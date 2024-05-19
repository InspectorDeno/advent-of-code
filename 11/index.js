export const part1 = (input) => {
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
  const rows = grid.map((row) => row.join(''))
  const columns = grid[0].map((_, y) => grid.map((row) => row[y]).join(''))

  const galaxies = []
  const emptyRows = rows.map((_, i) => i).filter((x) => !rows[x].includes('#'))
  const emptyColumns = columns.map((_, i) => i).filter((x) => !columns[x].includes('#'))

  // Expand the universe
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < columns.length; x++) {
      if (grid[y][x] === '#')
        galaxies.push([
          y + emptyRows.filter((a) => a < y).length,
          x + emptyColumns.filter((b) => b < x).length
        ])
    }
  }

  // Add up manhattan distances
  let totalDistance = 0
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance +=
        Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
    }
  }

  return totalDistance
}

export const part2 = (input) => {
  const grid = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
  const rows = grid.map((row) => row.join(''))
  const columns = grid[0].map((_, y) => grid.map((row) => row[y]).join(''))

  const galaxies = []
  const emptyRows = rows.map((_, i) => i).filter((x) => !rows[x].includes('#'))
  const emptyColumns = columns.map((_, i) => i).filter((x) => !columns[x].includes('#'))

  // Expand the universe
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < columns.length; x++) {
      if (grid[y][x] === '#')
        galaxies.push([
          y + emptyRows.filter((a) => a < y).length * 999999,
          x + emptyColumns.filter((b) => b < x).length * 999999
        ])
    }
  }

  // Add up manhattan distances
  let totalDistance = 0
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance +=
        Math.abs(galaxies[i][0] - galaxies[j][0]) + Math.abs(galaxies[i][1] - galaxies[j][1])
    }
  }

  return totalDistance
}
