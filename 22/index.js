// Rectangle intersection
// https://silentmatt.com/rectangle-intersection/
function bricksOverlap(a, b) {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) && Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  )
}

// Calculate maximum drop and update z values
function dropBricks(bricks) {
  bricks.forEach((brick, index) => {
    let maxDrop = 1
    for (let i = 0; i < index; i++) {
      const next = bricks[i]
      if (bricksOverlap(brick, next)) {
        maxDrop = Math.max(maxDrop, next[5] + 1)
      }
    }
    brick[5] -= brick[2] - maxDrop
    brick[2] = maxDrop
  })
}

// Calculate which bricks support other bricks
function checkSupport(bricks) {
  const supports = {}
  const supportedBy = {}

  for (let i = 0; i < bricks.length; i++) {
    supports[i] = new Set()
    supportedBy[i] = new Set()
  }

  for (let i = 0; i < bricks.length; i++) {
    const upper = bricks[i]
    for (let j = 0; j < i; j++) {
      const lower = bricks[j]
      if (bricksOverlap(lower, upper) && upper[2] === lower[5] + 1) {
        supports[j].add(i)
        supportedBy[i].add(j)
      }
    }
  }

  return { supports, supportedBy }
}

function isSubsetOf(setA, setB) {
  for (const element of setA) {
    if (!setB.has(element)) return false
  }
  return true
}

export const part1 = (input) => {
  // Bricks are stored as [x,y,z,x,y,z]
  let bricks = input
    .trim()
    .split('\n')
    .map((brick) => brick.replace('~', ',').split(',').map(Number))
    .sort((a, b) => a[2] - b[2])

  dropBricks(bricks)
  bricks.sort((a, b) => a[2] - b[2])
  const { supports, supportedBy } = checkSupport(bricks)

  let total = 0
  for (let i = 0; i < bricks.length; i++) {
    if (Array.from(supports[i]).every((j) => supportedBy[j].size >= 2)) total += 1
  }

  return total
}

export const part2 = (input) => {
  let bricks = input
    .trim()
    .split('\n')
    .map((brick) => brick.replace('~', ',').split(',').map(Number))
    .sort((a, b) => a[2] - b[2])

  dropBricks(bricks)
  bricks.sort((a, b) => a[2] - b[2])

  const { supports, supportedBy } = checkSupport(bricks)

  let total = 0
  for (let i = 0; i < bricks.length; i++) {
    // Grab a brick to disintegrate
    const queue = Array.from(supports[i]).filter((j) => supportedBy[j].size === 1)
    const falling = new Set(queue)

    // Look at all bricks whose support just fell
    while (queue.length) {
      const fell = queue.shift()
      for (const next of [...supports[fell]].filter((x) => !falling.has(x))) {
        // Everything that supports next is currently falling
        if (isSubsetOf(supportedBy[next], falling)) {
          queue.push(next)
          falling.add(next)
        }
      }
    }

    total += falling.size
  }

  return total
}
