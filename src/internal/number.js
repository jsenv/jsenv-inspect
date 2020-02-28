export const inspectNumber = (value) => {
  return isNegativeZero(value) ? "-0" : value.toString()
}

// Use this and instead of Object.is(value, -0)
// because in some corner cases firefox returns false
// for Object.is(-0, -0)
const isNegativeZero = (value) => {
  return value === 0 && 1 / value === -Infinity
}
