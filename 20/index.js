let modules = {}

class Transmitter {
  constructor(endModule, cycleModules) {
    this.queue = []
    this.pulses = { 0: 0, 1: 0 }
    this.count = 0
    this.endModule = endModule?.name
    this.cycles = cycleModules?.reduce((acc, m) => ({ ...acc, [m.name]: 0 }), {})
    this.done = false
  }

  send(messages) {
    messages.forEach((message) => this.queue.push(message))

    while (this.queue.length) {
      const { from, name, signal } = this.queue.shift(-1)

      if (from === 'button') this.count += 1
      // Save the min count for the cycle module to send a 1 to the end module
      if (signal && name === this.endModule) {
        this.cycles[from] = this.cycles[from] || this.count
        // When all of them have sent a 1, we're done
        if (Object.values(this.cycles).every((val) => val)) this.done = true
      }

      this.pulses[signal] += 1
      modules[name]?.send({ from, signal })
    }
  }
}

class Button {
  send(signal) {
    modules.transmitter.send([{ from: 'button', name: 'broadcaster', signal }])
  }
}

class Broadcaster {
  constructor(output) {
    this.output = output
  }

  send({ signal }) {
    modules.transmitter.send(this.output.map((name) => ({ name, signal })))
  }
}

class FlipFlop {
  constructor(name, output) {
    this.name = name
    this.output = output
    this.state = 0
    // Initialize the state of conjunctions
    output.forEach((n) => {
      if (modules[n] instanceof Conjunction) modules[n].state[this.name] = 0
    })
  }

  send({ signal }) {
    if (signal) return // Ignore 0s
    this.state = this.state ? 0 : 1
    modules.transmitter.send(
      this.output.map((name) => ({
        from: this.name,
        name,
        signal: this.state
      }))
    )
  }
}

class Conjunction {
  constructor(name, output) {
    this.name = name
    this.output = output
    this.state = {}
  }

  send({ from, signal }) {
    this.state[from] = signal
    modules.transmitter.send(
      this.output.map((name) => ({
        from: this.name,
        name,
        signal: Object.values(this.state).every((state) => state) ? 0 : 1
      }))
    )
  }
}

function init(input) {
  modules = {}

  input
    .trim()
    .split('\n')
    .map((r) => r.trim())
    .sort((a, b) => {
      if (b.startsWith('&')) return 1
      if (a.startsWith('&')) return -1
      return 0
    })
    .forEach((row) => {
      const [module, to] = row.split('->').map((v) => v.trim())
      const name = module.slice(1)
      const output = to.split(',').map((v) => v.trim())

      if (module === 'broadcaster') modules.broadcaster = new Broadcaster(output)
      if (module.startsWith('%')) modules[name] = new FlipFlop(name, output)
      if (module.startsWith('&')) modules[name] = new Conjunction(name, output)
    })
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

  return numbers.length === 0
    ? 0
    : numbers.reduce((accumulator, currentValue) => lcm(accumulator, currentValue), 1)
}

export const part1 = (input) => {
  init(input)
  modules.transmitter = new Transmitter()
  const button = new Button()

  Array.from(Array(1000)).forEach(() => button.send(0))

  const pulses = modules.transmitter.pulses
  const result = pulses[0] * pulses[1]
  return result
}

/** This is similar to day 08.
 * The final conjunction module that outputs to 'rx' has multiple inputs that send a 1 every whatever thousand steps.
 * Instead of waiting for the cycles to align, we save the number of button presses for a cycle module to send a 1,
 * and find their least common multiple.
 */
export const part2 = (input) => {
  init(input)
  const endModule = Object.values(modules).filter((m) => m.output?.includes('rx'))[0]
  const cycleModules = Object.values(modules).filter((m) => m.output?.includes(endModule.name))
  modules.transmitter = new Transmitter(endModule, cycleModules)
  const button = new Button()

  while (!modules.transmitter.done) {
    button.send(0)
  }

  const cycles = modules.transmitter.cycles
  const result = findLCM(Object.values(cycles))
  return result
}
