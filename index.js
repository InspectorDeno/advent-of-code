import { readFileSync } from 'fs'

const day = process.argv[2]
const part = process.argv[3]

if (!day && !part) {
  console.log('Missing arguments')
  console.log('Example command: \x1b[32mbun start 01 part1 \x1b[0m')
} else {
  const input = readFileSync(`./${day}/input.txt`, 'utf8').trim()
  const f = require(`./${day}/index.js`)
  console.log(f[part]?.(input))
}
