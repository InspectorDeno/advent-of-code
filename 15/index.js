function hash(str) {
  let value = 0
  for (let char of [...str].values()) {
    value += char.charCodeAt(0)
    value *= 17
    value %= 256
  }
  return value
}

export const part1 = (input) => input.split(',').reduce((sum, step) => sum + hash(step), 0)

export const part2 = (input) => {
  const boxes = {}

  input.split(',').forEach((step) => {
    const [label, lens] = step.includes('=') ? step.split('=') : step.split('-')
    const box = hash(label)
    if (lens) boxes[box] = { ...boxes[box], [label]: Number(lens) }
    else delete boxes[box]?.[label]
  })

  const total = Object.entries(boxes).reduce((sum, [box, slot]) => {
    const idx = Number(box) + 1
    return (sum += Object.entries(slot).reduce(
      (sum, [_, lens], i) => (sum += idx * (i + 1) * lens),
      0
    ))
  }, 0)

  return total
}
