export const part1 = (input) => {
  const inputs = input.trim().split('\n')
  const times = inputs[0]
    .split(/Time:\s+/)[1]
    .split(/\s+/)
    .map((t) => Number(t))
  const records = inputs[1]
    .split(/Distance:\s+/)[1]
    .split(/\s+/)
    .map((d) => Number(d))

  const brokenRecords = []
  times.forEach((time, raceIndex) => {
    const raceRecord = []
    Array.from(Array(time + 1))
      .map((_, i) => i)
      .forEach((holdDuration) => {
        const timeLeft = time - holdDuration
        const velocity = holdDuration
        const distanceTraveled = velocity * timeLeft
        if (distanceTraveled > records[raceIndex]) raceRecord.push(distanceTraveled)
      })
    brokenRecords.push(raceRecord)
  })

  return brokenRecords.reduce((acc, race) => (acc ? race.length * acc : race.length), 0)
}

export const part2 = (input) => {
  const inputs = input.trim().split('\n')
  const time = Number(
    inputs[0]
      .split(/Time:\s+/)[1]
      .split(/\s+/)
      .join('')
  )
  const record = Number(
    inputs[1]
      .split(/Distance:\s+/)[1]
      .split(/\s+/)
      .join('')
  )

  const brokenRecords = []
  Array.from(Array(time + 1))
    .map((_, i) => i)
    .forEach((holdDuration) => {
      const timeLeft = time - holdDuration
      const velocity = holdDuration
      const distanceTraveled = velocity * timeLeft
      if (distanceTraveled > record) brokenRecords.push(distanceTraveled)
    })

  return brokenRecords.length
}
