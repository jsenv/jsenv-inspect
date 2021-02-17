import { valueToType } from "./internal/valueToType.js"
import { primitiveMap } from "./internal/primitiveMap.js"
import { compositeMap } from "./internal/compositeMap.js"
import { inspectConstructor } from "./internal/constructor.js"
import { inspectObject } from "./internal/object.js"

export const inspect = (
  value,
  {
    parenthesis = false,
    singleQuote = false,
    useNew = false,
    objectConstructor = false,
    showFunctionBody = false,
    indentUsingTab = false,
    indentSize = 2,
  } = {},
) => {
  const scopedInspect = (scopedValue, scopedOptions) => {
    const { primitiveType, compositeType } = valueToType(scopedValue)
    const options = {
      ...scopedOptions,
      nestedInspect: (nestedValue, nestedOptions = {}) => {
        return scopedInspect(nestedValue, {
          ...scopedOptions,
          depth: scopedOptions.depth + 1,
          ...nestedOptions,
        })
      },
    }

    if (primitiveType) {
      return primitiveMap[primitiveType](scopedValue, options)
    }

    if (compositeType in compositeMap) {
      return compositeMap[compositeType](scopedValue, options)
    }

    return inspectConstructor(`${compositeType}(${inspectObject(scopedValue, options)})`, {
      ...options,
      parenthesis: false,
    })
  }

  return scopedInspect(value, {
    parenthesis,
    singleQuote,
    useNew,
    objectConstructor,
    showFunctionBody,
    indentUsingTab,
    indentSize,
    depth: 0,
  })
}
