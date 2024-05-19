function parseInput(input) {
  let [workflows, parts] = input.trim().split('\n\n')
  const functions = {}

  // Create functions
  workflows.split('\n').forEach((line) => {
    const [key, conditions] = line.split('{')
    const checks = conditions.slice(0, -1).split(',')

    functions[key] = (parts) => {
      for (const check of checks) {
        const [condition, value] = check.split(':')
        const matches = condition.match(/(\w+)([<>]=?|=)(\d+)/)
        if (!matches) return checks[checks.length - 1]

        const [_, variable, operator, threshold] = matches
        if (operator === '<' && parts[variable] < parseInt(threshold)) return value
        if (operator === '>' && parts[variable] > parseInt(threshold)) return value
        if (operator === '=' && parts[variable] === parseInt(threshold)) return value
      }

      return checks[checks.length - 1].split(':')[1]
    }
  })

  // Separate parts
  parts = parts.split('\n').map((arr) => {
    const part = {}
    arr
      .slice(1, -1)
      .split(',')
      .forEach((item) => {
        const [key, value] = item.split('=')
        part[key] = parseInt(value)
      })

    return part
  })

  return { functions, parts }
}

export const part1 = (input) => {
  const { functions, parts } = parseInput(input)

  const total = parts.reduce((sum, part) => {
    let name = 'in'
    let result = ''

    while (true) {
      const output = functions[name](part)
      if (!functions[output]) {
        result = output
        break
      }
      name = output
    }

    return result === 'A' ? sum + Object.values(part).reduce((s, v) => s + v, 0) : sum
  }, 0)

  return total
}

export const part2 = (input) => {
  const instructions = input.split('\n')
  console.log(instructions)
  return 19114
}
