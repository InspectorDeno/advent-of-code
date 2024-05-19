export const part1 = (input) => {
  const histories = input
    .trim()
    .split('\n')
    .map((line) => [
      line
        .trim()
        .split(' ')
        .map((number) => Number(number))
    ])

  // Calculate diffs and push to history
  const predictions = histories.map((history) => {
    while (!history[history.length - 1].every((n) => !n)) {
      const newSequence = []
      const lastSequence = history[history.length - 1]
      for (let i = 0; i < lastSequence.length - 1; i++) {
        newSequence.push(lastSequence[i + 1] - lastSequence[i])
      }
      history.push(newSequence)
    }

    // Push predictions
    let nextPrediction = 0
    for (let i = history.length - 1; i >= 0; i--) {
      nextPrediction += history[i][history[i].length - 1]
      history[i].push(nextPrediction)
    }
    return history[0][history[0].length - 1]
  })

  // Return their sum
  return predictions.reduce((acc, value) => acc + value, 0)
}

export const part2 = (input) => {
  const histories = input
    .trim()
    .split('\n')
    .map((line) => [
      line
        .trim()
        .split(' ')
        .map((number) => Number(number))
    ])

  // Calculate diffs and push to history
  const predictions = histories.map((history) => {
    while (!history[history.length - 1].every((n) => !n)) {
      const newSequence = []
      const lastSequence = history[history.length - 1]
      for (let i = 0; i < lastSequence.length - 1; i++) {
        newSequence.push(lastSequence[i + 1] - lastSequence[i])
      }
      history.push(newSequence)
    }

    // Push predictions
    let nextPrediction = 0
    for (let i = history.length - 1; i >= 0; i--) {
      nextPrediction = history[i][0] - nextPrediction
      history[i].unshift(nextPrediction)
    }
    return history[0][0]
  })

  return predictions.reduce((acc, value) => acc + value, 0)
}
