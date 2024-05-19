export const part1 = (input) => {
  function countRows(mirror, flipped) {
    let rows = 0

    mirror.forEach((row, i) => {
      if (row === mirror[i + 1]) {
        // Check above and below for matching rows
        for (let y = 0; y < i; y++) {
          const up = mirror[i - 1 - y]
          const down = mirror[i + 2 + y]
          if (up && down && up !== down) return
        }
        rows = i + 1
      }
    })
    return flipped ? rows : rows * 100
  }

  const mirrors = input
    .trim()
    .split('\n\n')
    .map((row) => row.split('\n'))
  const flippedMirrors = mirrors.map((row) =>
    row[0].split('').map((_, i) => row.map((r) => r[i]).join(''))
  )

  const sum = mirrors.reduce((total, mirror, i) => {
    const value = countRows(mirror)
    return value ? total + value : total + countRows(flippedMirrors[i], true)
  }, 0)

  return sum
}

export const part2 = (input) => {
  function countRows(mirror, flipped) {
    let rows = 0

    mirror.forEach((row, i) => {
      const below = mirror[i + 1]
      if (!below) return
      let smudges = countSmudges(row, below)
      if (smudges > 1) return // too many smudges already
      // Check above and below, and add upp all smudges
      for (let y = 0; y < i; y++) {
        const up = mirror[i - 1 - y]
        const down = mirror[i + 2 + y]
        if (!(up && down)) continue
        smudges += countSmudges(up, down)
      }

      if (smudges === 1) rows = i + 1
    })

    return flipped ? rows : rows * 100
  }

  function countSmudges(row1, row2) {
    let smudges = 0
    for (let ch = 0; ch < row1.length; ch++) {
      if (row1[ch] !== row2[ch]) smudges++
    }
    return smudges
  }

  const mirrors = input
    .trim()
    .split('\n\n')
    .map((row) => row.split('\n'))
  const flippedMirrors = mirrors.map((row) =>
    row[0].split('').map((_, i) => row.map((r) => r[i]).join(''))
  )

  const sum = mirrors.reduce((total, mirror, i) => {
    const value = countRows(mirror)
    return value ? total + value : total + countRows(flippedMirrors[i], true)
  }, 0)

  return sum
}
