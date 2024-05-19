export const part1 = (input) => {
  const cards = input
    .trim()
    .split('\n')
    .map((game) => {
      const [winners, mine] = game.split(/Card\s+\d+:/)[1].split('|')
      return {
        winners: winners.trim().split(/\s+/),
        mine: mine.trim().split(/\s+/)
      }
    })

  const totalScore = cards
    .map(({ winners, mine }) =>
      winners.reduce((acc, number) => (mine.includes(number) ? (acc ? acc * 2 : 1) : acc), 0)
    )
    .reduce((acc, score) => acc + score, 0)

  return totalScore
}

export const part2 = (input) => {
  const cards = input
    .trim()
    .split('\n')
    .map((game) => {
      const [winners, mine] = game.split(/Card\s+\d+:/)[1].split('|')
      return {
        winners: winners.trim().split(/\s+/),
        mine: mine.trim().split(/\s+/)
      }
    })

  const cardTotals = cards.reduce((acc, _, i) => ({ ...acc, [i]: 1 }), {})

  // Determine how many copies to add
  cards.forEach(({ winners, mine }, i) => {
    const matches = winners.reduce((acc, number) => (mine.includes(number) ? acc + 1 : acc), 0)
    for (let offset = 1; offset <= matches; offset++) {
      cardTotals[i + offset] += 1 * cardTotals[i]
    }
  })

  return Object.values(cardTotals).reduce((acc, amount) => acc + amount, 0)
}
