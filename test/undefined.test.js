import { assert } from "@jsenv/assert"
import { inspect } from "../index.js"

const actual = inspect(undefined)
const expected = "undefined"
assert({ actual, expected })
