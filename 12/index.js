const cache = {}

function dfs(record, groups) {
  let key = record.toString() + '|' + groups.toString()
  if (key in cache) return cache[key]
  if (!groups.length) return record.includes('#') ? 0 : 1

  const size = groups[0]
  groups = groups.slice(1)

  let count = 0
  for (let end = 0; end < record.length; end++) {
    let start = end - (size - 1)
    if (fits(record, start, end)) count += dfs(record.slice(end + 1), groups)
  }

  cache[key] = count
  return count
}

function fits(str, start, end) {
  if (start - 1 < 0 || end + 1 >= str.length) return false
  if (str[start - 1] === '#' || str[end + 1] === '#') return false
  if (str.substring(0, start).includes('#')) return false
  for (let i = start; i <= end; i++) if (str[i] === '.') return false
  return true
}

export const part1 = (input) => {
  const rows = input
    .trim()
    .split('\n')
    .map((row) => {
      let [record, groups] = row.trim().split(' ')
      groups = groups.split(',').map((clue) => Number(clue))
      return [record, groups]
    })

  let total = 0
  rows.forEach((row) => {
    let [record, groups] = row
    // Add padding to avoid edge cases
    record = '.' + record + '.'
    total += dfs(record, groups)
  })

  return total
}

export const part2 = (input) => {
  const rows = input
    .trim()
    .split('\n')
    .map((row) => {
      let [record, groups] = row.trim().split(' ')
      record = Array(5).fill(record).join('?')

      groups = groups.split(',').map((clue) => Number(clue))
      groups = Array(5).fill(groups).flat()
      return [record, groups]
    })

  let total = 0
  rows.forEach((row) => {
    let [record, groups] = row
    // Add padding to avoid edge cases
    record = '.' + record + '.'
    total += dfs(record, groups)
  })

  return total
}
