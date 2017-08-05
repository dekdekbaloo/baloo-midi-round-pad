const DIATONIC_DISTANCES = [ 1, 1, 0.5, 1, 1, 1, 0.5 ]

function rotate (array, n) {
  const temp = []
  const _array = [ ...array ]
  for (let i = 0; i < n; i++) {
    temp.push(_array.shift())
  }
  return [ ..._array, ...temp ]
}

export const DISTANCES = [
  DIATONIC_DISTANCES, // I
  rotate(DIATONIC_DISTANCES, 1), // II
  rotate(DIATONIC_DISTANCES, 2), // III
  rotate(DIATONIC_DISTANCES, 3), // IV
  rotate(DIATONIC_DISTANCES, 4), // V
  rotate(DIATONIC_DISTANCES, 5), // VI
  rotate(DIATONIC_DISTANCES, 6), // VII
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ]
]
