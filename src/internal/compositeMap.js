import { inspectArray } from "./array.js"
import { inspectBigIntObject } from "./bigint-object.js"
import { inspectBooleanObject } from "./boolean-object.js"
import { inspectError } from "./error.js"
import { inspectDate } from "./date.js"
import { inspectFunction } from "./function.js"
import { inspectNumberObject } from "./number-object.js"
import { inspectObject } from "./object.js"
import { inspectRegExp } from "./regexp.js"
import { inspectStringObject } from "./string-object.js"

export const compositeMap = {
  Array: inspectArray,
  BigInt: inspectBigIntObject,
  Boolean: inspectBooleanObject,
  Error: inspectError,
  Date: inspectDate,
  Function: inspectFunction,
  Number: inspectNumberObject,
  Object: inspectObject,
  RegExp: inspectRegExp,
  String: inspectStringObject,
}
