export const part1 = (input) => {
  // Group games into sets
  const results = input
    .trim()
    .split('\n')
    .reduce((acc, game, index) => {
      // Group sets by color
      const sets = game
        .trim()
        .replace(/Game \d+: /, '')
        .split(';')
        .map((set) => {
          const colors = { red: 0, green: 0, blue: 0 }
          set.split(',').forEach((color) => {
            const [val, c] = color.trim().split(' ')
            colors[c] = Number(val)
          })
          return colors
        })

      return [...acc, { index: index + 1, sets }]
    }, [])

  // Add up sum of indices for possible games
  const indexSum = results.reduce((sum, game) => {
    if (game.sets.some((set) => set['red'] > 12 || set['green'] > 13 || set['blue'] > 14))
      return sum
    return sum + game.index
  }, 0)

  return indexSum
}

export const part2 = (input) => {
  // Group games into sets
  const results = input
    .trim()
    .split('\n')
    .reduce((acc, game, index) => {
      // Group sets by color
      const sets = game
        .trim()
        .replace(/Game \d+: /, '')
        .split(';')
        .map((set) => {
          const colors = { red: 0, green: 0, blue: 0 }
          set.split(',').forEach((color) => {
            const [val, c] = color.trim().split(' ')
            colors[c] = Number(val)
          })
          return colors
        })

      return [...acc, { index: index + 1, sets }]
    }, [])

  // Add up sum of powers of minimum colors required
  const indexSum = results.reduce((sum, game) => {
    const minColors = { red: 0, green: 0, blue: 0 }
    game.sets.forEach((set) => {
      if (set.red > minColors.red) minColors.red = set.red
      if (set.green > minColors.green) minColors.green = set.green
      if (set.blue > minColors.blue) minColors.blue = set.blue
    })
    const power = minColors.red * minColors.green * minColors.blue
    return sum + power
  }, 0)

  return indexSum
}
