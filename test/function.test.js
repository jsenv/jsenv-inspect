import { assert } from "@jsenv/assert"
import { inspect } from "../index.js"

{
  const actual = inspect(function() {})
  const expected = `function () {/* hidden */}`
  assert({ actual, expected })
}

{
  const actual = inspect(function() {}, { showFunctionBody: true })
  const expected = "function () {}"
  assert({ actual, expected })
}

{
  const value = function() {
    return true
  }
  const actual = inspect(value, { showFunctionBody: true })
  const expected = value.toString()
  assert({ actual, expected })
}

{
  function named(a) {
    return a
  }

  {
    const actual = inspect(named)
    const expected = `function named() {/* hidden */}`
    assert({ actual, expected })
  }
  {
    const actual = inspect(named, { showFunctionBody: true })
    const expected = named.toString()
    assert({ actual, expected })
  }
}

{
  const nested = {
    function() {},
  }
  const actual = inspect(nested)
  const expected = `{
  "function": function () {/* hidden */}
}`
  assert({ actual, expected })
}

// if arrow function are supported (not transpiled)
// if ((() => {}).prototype === null) {
// }