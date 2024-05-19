export const part1 = (input) => {
  const allMapGroups = {}
  let mapInput = []
  let currentMap = ''

  input
    .trim()
    .split('\n')
    .forEach((line) => {
      if (line.startsWith('seeds:')) {
        mapInput.push(
          ...line
            .split('seeds: ')[1]
            .split(' ')
            .map((seed) => Number(seed))
        )
      } else if (line.endsWith(':')) {
        currentMap = line.slice(0, -1)
        allMapGroups[currentMap] = []
      } else if (line.trim() !== '') {
        const [destination, source, range] = line.split(' ').map((num) => Number(num))
        allMapGroups[currentMap].push({ destination, source, range })
      }
    })

  // Find the corresponding types
  Object.values(allMapGroups).forEach((mappings, i) => {
    let transformedInputs = []

    mapInput.forEach((input) => {
      let corresponding = mappings.filter(
        (mapping) => input > mapping.source && input < mapping.source + mapping.range
      )?.[0]

      const transformedInput = corresponding
        ? input - corresponding.source + corresponding.destination
        : input

      transformedInputs.push(transformedInput)
    })
    mapInput = transformedInputs
  })

  return Math.min(...mapInput)
}

export const part2 = (input) => {
  const allMapGroups = {}
  const minLocations = []
  let mapInput = []
  let currentMap = ''

  input
    .trim()
    .split('\n')
    .forEach((line) => {
      if (line.startsWith('seeds:')) {
        const rawSeed = [
          ...line
            .split('seeds: ')[1]
            .split(' ')
            .map((seed) => Number(seed))
        ]
        for (let i = 0; i < rawSeed.length; i += 2) {
          mapInput.push([parseInt(rawSeed[i]), parseInt(rawSeed[i + 1])])
        }
      } else if (line.endsWith(':')) {
        currentMap = line.slice(0, -1)
        allMapGroups[currentMap] = []
      } else if (line.trim() !== '') {
        const [destination, source, range] = line.split(' ').map((num) => Number(num))
        allMapGroups[currentMap].push({ destination, source, range })
      }
    })

  mapInput.forEach((inputPair) => {
    // batch processing
    const batchSize = 10000
    for (let i = 0; i < inputPair[1]; i += batchSize) {
      let batchSeedArray = []
      for (let j = i; j < i + batchSize && j < inputPair[1]; j++) {
        batchSeedArray.push(inputPair[0] + j)
      }

      Object.values(allMapGroups).forEach((mappings) => {
        let transformedInputs = []
        let mappingCache
        let corresponding
        batchSeedArray.forEach((seed) => {
          // use cached mapping if possible
          if (
            mappingCache &&
            seed >= mappingCache.source &&
            seed < mappingCache.source + mappingCache.range
          ) {
            corresponding = mappingCache
          } else {
            corresponding = mappings.filter(
              (mapping) => seed >= mapping.source && seed < mapping.source + mapping.range
            )?.[0]
            mappingCache = corresponding
          }

          // account for case when no mapping
          const transformedInput = corresponding
            ? seed - corresponding.source + corresponding.destination
            : seed

          transformedInputs.push(transformedInput)
        })

        batchSeedArray = transformedInputs
      })
      // we have processed a batch of seeds, calc the local min location
      let minLocation = Math.min(...batchSeedArray)
      minLocations.push(minLocation)
    }
  })

  // // we have processed all batches of seeds, can calculate global minimum
  return Math.min(...minLocations)
}
