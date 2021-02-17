/* globals BigInt */
/* eslint-disable no-eval */
import { assert } from "@jsenv/assert"
import { inspect } from "@jsenv/inspect"

{
  const value = BigInt(1)
  const actual = inspect(value)
  const expected = "1n"
  assert({ actual, expected })
}

{
  const value = 2n
  const actual = inspect(value)
  const expected = "2n"
  assert({ actual, expected })
}

{
  const value = Object(BigInt(1))
  const actual = inspect(value)
  const expected = "BigInt(1n)"
  assert({ actual, expected })
}
