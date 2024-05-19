export const part1 = (input) => {
  // Stored as [x, y, z, vx, vy, vz]
  let stones = input
    .trim()
    .split('\n')
    .map((row) => row.replace('@', ',').split(',').map(Number))

  console.log(stones)

  let collisions = 0
  for (let i = 0; i < stones.length; i++) {
    for (let j = i + 1; j < stones.length; j++) {
      const [x1, y1, , vx1, vy1] = stones[i]
      const [x2, y2, , vx2, vy2] = stones[j]

      const t = ((x2 - x1) * vy2 - (y2 - y1) * vx2) / (vx1 * vy2 - vy1 * vx2)

      // l1 = x1 + (x1 + vx1)

      const collX = x1 + t * vx1
      const collY = y1 + t * vy1

      console.log([collX, collY])
      if (collX >= 7 && collX <= 27 && collY >= 7 && collY <= 27) collisions += 1
    }
  }
  return collisions
}

export const part2 = (input) => {
  return 123
}
