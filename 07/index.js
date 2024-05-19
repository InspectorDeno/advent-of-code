export const part1 = (input) => {
  const sortedHands = Array.from(Array(7)).map(() => [])
  const cardValues = '23456789TJQKA'

  const evaluatePokerHand = (hand) => {
    // Count occurrences of each card value
    const cardCounts = {}
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      cardCounts[card] = (cardCounts[card] || 0) + 1
    }
    const counts = Object.values(cardCounts)
    const maxCount = Math.max(...counts)

    if (maxCount === 5) return 6 // Five of a kind ???
    if (maxCount === 4) return 5 // Four of a kind
    else if (maxCount === 3 && counts.includes(2)) return 4 // Full house
    else if (maxCount === 3) return 3 // Three of a kind
    else if (counts.filter((count) => count === 2).length === 2) return 2 // Two pair
    else if (counts.filter((count) => count === 2).length === 1) return 1 // One pair
    else return 0 // High card
  }

  const games = input
    .trim()
    .split('\n')
    .map((row) => {
      const [hand, bid] = row.split(' ')
      return { hand, bid }
    })

  // Sort hands based on rank
  games.forEach((game) => sortedHands.at(evaluatePokerHand(game.hand)).push(game))

  // Sort within rank and add upp winnings
  let handRank = 0
  sortedHands
    .map((hands) =>
      hands.sort((a, b) => {
        const handA = a.hand.split('')
        const handB = b.hand.split('')
        for (let i = 0; i < 5; i++) {
          const diff = cardValues.indexOf(handA[i]) - cardValues.indexOf(handB[i])
          if (!diff) continue
          return diff > 0 ? 1 : -1
        }
      })
    )
    .map((hands) => {
      if (!hands.length) return
      hands.map((hand) => {
        handRank++
        hand.rank = handRank
        hand.winnings = Number(hand.bid) * handRank
      })
    })

  const totalWinnings = sortedHands.flat().reduce((acc, hand) => acc + hand.winnings, 0)

  return totalWinnings
}

export const part2 = (input) => {
  const sortedHands = Array.from(Array(7)).map(() => [])
  const cardValues = 'J23456789TQKA'

  const evaluatePokerHand = (hand) => {
    // Count occurrences of each card value
    const cardCounts = {}
    let jokers = 0
    for (let i = 0; i < hand.length; i++) {
      const card = hand[i]
      if (card === 'J') jokers++
      else cardCounts[card] = (cardCounts[card] || 0) + 1
    }

    // Add Js to biggest count
    if (Object.keys(cardCounts).length) {
      const highestValue = Object.entries(cardCounts).sort(
        ([valueA, countA], [valueB, countB]) =>
          countB - countA || cardValues.indexOf(valueB) - cardValues.indexOf(valueA)
      )[0][0]

      if (highestValue) cardCounts[highestValue] = cardCounts[highestValue] += jokers
    }

    const counts = Object.values(cardCounts)
    const maxCount = !counts.length ? 5 : Math.max(...counts) // All Js are still best

    if (maxCount === 5) return 6 // Five of a kind ???
    if (maxCount === 4) return 5 // Four of a kind
    else if (maxCount === 3 && counts.includes(2)) return 4 // Full house
    else if (maxCount === 3) return 3 // Three of a kind
    else if (counts.filter((count) => count === 2).length === 2) return 2 // Two pair
    else if (counts.filter((count) => count === 2).length === 1) return 1 // One pair
    else return 0 // High card
  }

  const games = input
    .trim()
    .split('\n')
    .map((row) => {
      const [hand, bid] = row.split(' ')
      return { hand, bid }
    })
  // Sort hands based on rank
  games.forEach((game) => sortedHands.at(evaluatePokerHand(game.hand)).push(game))

  // Sort within rank and add upp winnings
  let handRank = 0
  sortedHands
    .map((hands) =>
      hands.sort((a, b) => {
        const handA = a.hand.split('')
        const handB = b.hand.split('')
        for (let i = 0; i < 5; i++) {
          const diff = cardValues.indexOf(handA[i]) - cardValues.indexOf(handB[i])
          if (!diff) continue
          return diff > 0 ? 1 : -1
        }
      })
    )
    .map((hands) => {
      if (!hands.length) return
      hands.map((hand) => {
        handRank++
        hand.rank = handRank
        hand.winnings = Number(hand.bid) * handRank
      })
    })

  // console.log(sortedHands.flat().map((hand) => hand.hand))
  // console.log(sortedHands)

  const totalWinnings = sortedHands.flat().reduce((acc, hand) => acc + hand.winnings, 0)

  return totalWinnings
}
