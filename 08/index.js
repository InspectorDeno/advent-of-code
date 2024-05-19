export const part1 = (input) => {
  const [instructions, ...rest] = input.trim().replace(/[()]/g, '').split('\n\n')
  const elements = rest[0].split('\n').reduce((acc, line) => {
    const [from, to] = line.split(/\s+=\s+/).map((from) => from.trim())
    return { ...acc, [from]: to.split(',').map((code) => code.trim()) }
  }, {})

  let steps = 0
  let nextStep = 'AAA'
  while (true) {
    const pointer = steps % instructions.length
    const instruction = instructions.charAt(pointer)
    nextStep = elements[nextStep].at(instruction === 'L' ? 0 : 1)

    steps++
    if (nextStep === 'ZZZ') break
  }

  return steps
}

// The loops are always a repeating pattern
// We can calculate each route individually, and finding the LCM rather than doing the calculations in parallel
export const part2 = (input) => {
  const [instructions, ...rest] = input.trim().replace(/[()]/g, '').split('\n\n')
  const elements = rest[0].split('\n').reduce((acc, line) => {
    const [from, to] = line.split(/\s+=\s+/).map((from) => from.trim())
    return { ...acc, [from]: to.split(',').map((code) => code.trim()) }
  }, {})

  const steps = []
  const startPositions = Object.keys(elements).filter((key) => key.endsWith('A'))

  startPositions.forEach((pos) => {
    let step = 0
    let nextStep = pos

    while (true) {
      const pointer = step % instructions.length
      const instruction = instructions.charAt(pointer)
      nextStep = elements[nextStep].at(instruction === 'L' ? 0 : 1)
      step++
      if (nextStep.endsWith('Z')) break
    }
    steps.push(step)
  })

  // console.log({ steps })
  return findLCM(steps)
}

// Find least common multiple
function findLCM(numbers) {
  const gcd = (a, b) => {
    while (b !== 0) {
      let temp = b
      b = a % b
      a = temp
    }
    return a
  }

  const lcm = (a, b) => (a * b) / gcd(a, b)

  if (numbers.length === 0) return 0
  else return numbers.reduce((accumulator, currentValue) => lcm(accumulator, currentValue), 1)
}
