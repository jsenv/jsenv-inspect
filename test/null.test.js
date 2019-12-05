import { assert } from "@jsenv/assert"
import { inspect } from "../index.js"

const actual = inspect(null)
const expected = "null"
assert({
  actual,
  expected,
})
