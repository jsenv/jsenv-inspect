import { assert } from "@jsenv/assert"
import { inspect } from "../index.js"

const CustomConstructor = function() {
  this.foo = true
}
const customInstance = new CustomConstructor()
const actual = inspect(customInstance)
const expected = `CustomConstructor({
  "foo": true
})`
assert({ actual, expected })
