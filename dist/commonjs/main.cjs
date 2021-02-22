'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const valueToType = value => {
  const primitiveType = valueToPrimitiveType(value);

  if (primitiveType === "function") {
    return {
      compositeType: "Function"
    };
  }

  if (primitiveType === "object") {
    const compositeType = valueToCompositeType(value);
    return {
      compositeType
    };
  }

  return {
    primitiveType
  };
};
const {
  toString
} = Object.prototype;

const valueToCompositeType = object => {
  if (typeof object === "object" && Object.getPrototypeOf(object) === null) {
    return "Object";
  }

  const toStringResult = toString.call(object); // returns format is '[object ${tagName}]';
  // and we want ${tagName}

  const tagName = toStringResult.slice("[object ".length, -1);

  if (tagName === "Object") {
    const objectConstructorName = object.constructor.name;

    if (objectConstructorName !== "Object") {
      return objectConstructorName;
    }
  }

  return tagName;
};

const valueToPrimitiveType = value => {
  if (value === null) {
    return "null";
  }

  if (value === undefined) {
    return "undefined";
  }

  return typeof value;
};

const inspectBoolean = value => value.toString();

const inspectNull = () => "null";

// https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/numeric-separators-style.js
const inspectNumber = (value, {
  numericSeparator
}) => {
  if (isNegativeZero(value)) {
    return "-0";
  } // isNaN
  // eslint-disable-next-line no-self-compare


  if (value !== value) {
    return "NaN";
  }

  if (value === Infinity) {
    return "Infinity";
  }

  if (value === -Infinity) {
    return "-Infinity";
  }

  const numberString = String(value);

  if (!numericSeparator) {
    return numberString;
  }

  const {
    number,
    mark = "",
    sign = "",
    power = ""
  } = numberString.match(/^(?<number>.*?)(?:(?<mark>e)(?<sign>[+-])?(?<power>\d+))?$/i).groups;
  const numberWithSeparators = formatNumber(number);
  const powerWithSeparators = addSeparator(power, {
    minimumDigits: 5,
    groupLength: 3
  });
  return `${numberWithSeparators}${mark}${sign}${powerWithSeparators}`;
}; // Use this and instead of Object.is(value, -0)
// because in some corner cases firefox returns false
// for Object.is(-0, -0)

const isNegativeZero = value => {
  return value === 0 && 1 / value === -Infinity;
};

const formatNumber = numberString => {
  const parts = numberString.split(".");
  const [integer, fractional] = parts;

  if (parts.length === 2) {
    const integerWithSeparators = addSeparator(integer, {
      minimumDigits: 5,
      groupLength: 3
    });
    const fractionalWithSeparators = addSeparatorFromLeft(fractional, {
      minimumDigits: 5,
      groupLength: 3
    });
    return `${integerWithSeparators}.${fractionalWithSeparators}`;
  }

  return addSeparator(integer, {
    minimumDigits: 5,
    groupLength: 3
  });
};

const addSeparator = (numberString, {
  minimumDigits,
  groupLength
}) => {
  if (numberString[0] === "-") {
    return `-${groupDigits(numberString.slice(1), {
      minimumDigits,
      groupLength
    })}`;
  }

  return groupDigits(numberString, {
    minimumDigits,
    groupLength
  });
};

const groupDigits = (digits, {
  minimumDigits,
  groupLength
}) => {
  const digitCount = digits.length;

  if (digitCount < minimumDigits) {
    return digits;
  }

  let digitsWithSeparator = digits.slice(-groupLength);
  let remainingDigits = digits.slice(0, -groupLength);

  while (remainingDigits.length) {
    const group = remainingDigits.slice(-groupLength);
    remainingDigits = remainingDigits.slice(0, -groupLength);
    digitsWithSeparator = `${group}_${digitsWithSeparator}`;
  }

  return digitsWithSeparator;
};

const addSeparatorFromLeft = (value, {
  minimumDigits,
  groupLength
}) => {
  const {
    length
  } = value;

  if (length < minimumDigits) {
    return value;
  }

  const parts = [];

  for (let start = 0; start < length; start += groupLength) {
    const end = Math.min(start + groupLength, length);
    parts.push(value.slice(start, end));
  }

  return parts.join("_");
};

// https://github.com/joliss/js-string-escape/blob/master/index.js
// http://javascript.crockford.com/remedial.html
const quote = value => {
  const string = String(value);
  let i = 0;
  const j = string.length;
  var escapedString = "";

  while (i < j) {
    const char = string[i];
    let escapedChar;

    if (char === '"' || char === "'" || char === "\\") {
      escapedChar = `\\${char}`;
    } else if (char === "\n") {
      escapedChar = "\\n";
    } else if (char === "\r") {
      escapedChar = "\\r";
    } else if (char === "\u2028") {
      escapedChar = "\\u2028";
    } else if (char === "\u2029") {
      escapedChar = "\\u2029";
    } else {
      escapedChar = char;
    }

    escapedString += escapedChar;
    i++;
  }

  return escapedString;
};
const preNewLineAndIndentation = (value, {
  depth,
  indentUsingTab,
  indentSize
}) => {
  return `${newLineAndIndent({
    count: depth + 1,
    useTabs: indentUsingTab,
    size: indentSize
  })}${value}`;
};

const postNewLineAndIndentation = ({
  depth,
  indentUsingTab,
  indentSize
}) => {
  return newLineAndIndent({
    count: depth,
    useTabs: indentUsingTab,
    size: indentSize
  });
};

const newLineAndIndent = ({
  count,
  useTabs,
  size
}) => {
  if (useTabs) {
    // eslint-disable-next-line prefer-template
    return "\n" + "\t".repeat(count);
  } // eslint-disable-next-line prefer-template


  return "\n" + " ".repeat(count * size);
};

const wrapNewLineAndIndentation = (value, {
  depth,
  indentUsingTab,
  indentSize
}) => {
  return `${preNewLineAndIndentation(value, {
    depth,
    indentUsingTab,
    indentSize
  })}${postNewLineAndIndentation({
    depth,
    indentUsingTab,
    indentSize
  })}`;
};

const inspectString = (value, {
  singleQuote
}) => {
  const quotedValue = quote(value);
  return singleQuote ? `'${quotedValue}'` : `"${quotedValue}"`;
};

const inspectSymbol = (value, {
  nestedInspect,
  parenthesis
}) => {
  const symbolDescription = symbolToDescription(value);
  const symbolDescriptionSource = symbolDescription ? nestedInspect(symbolDescription) : "";
  const symbolSource = `Symbol(${symbolDescriptionSource})`;
  if (parenthesis) return `${symbolSource}`;
  return symbolSource;
};
const symbolToDescription = "description" in Symbol.prototype ? symbol => symbol.description : symbol => {
  const toStringResult = symbol.toString();
  const openingParenthesisIndex = toStringResult.indexOf("(");
  const closingParenthesisIndex = toStringResult.indexOf(")");
  const symbolDescription = toStringResult.slice(openingParenthesisIndex + 1, closingParenthesisIndex);
  return symbolDescription;
};

const inspectUndefined = () => "undefined";

const inspectBigInt = value => {
  return `${value}n`;
};

const primitiveMap = {
  boolean: inspectBoolean,
  null: inspectNull,
  number: inspectNumber,
  string: inspectString,
  symbol: inspectSymbol,
  undefined: inspectUndefined,
  bigint: inspectBigInt
};

const inspectConstructor = (value, {
  parenthesis,
  useNew
}) => {
  let formattedString = value;

  if (parenthesis) {
    formattedString = `(${value})`;
  }

  if (useNew) {
    formattedString = `new ${formattedString}`;
  }

  return formattedString;
};

const inspectArray = (value, {
  seen = [],
  nestedInspect,
  depth,
  indentUsingTab,
  indentSize,
  parenthesis,
  useNew
}) => {
  if (seen.indexOf(value) > -1) {
    return "Symbol.for('circular')";
  }

  seen.push(value);
  let valuesSource = "";
  let i = 0;
  const j = value.length;

  while (i < j) {
    const valueSource = value.hasOwnProperty(i) ? nestedInspect(value[i], {
      seen
    }) : "";

    if (i === 0) {
      valuesSource += valueSource;
    } else {
      valuesSource += `,${preNewLineAndIndentation(valueSource, {
        depth,
        indentUsingTab,
        indentSize
      })}`;
    }

    i++;
  }

  let arraySource;

  if (valuesSource.length) {
    arraySource = wrapNewLineAndIndentation(valuesSource, {
      depth,
      indentUsingTab,
      indentSize
    });
  } else {
    arraySource = "";
  }

  arraySource = `[${arraySource}]`;
  return inspectConstructor(arraySource, {
    parenthesis,
    useNew
  });
};

const inspectBigIntObject = (value, {
  nestedInspect
}) => {
  const bigIntSource = nestedInspect(value.valueOf());
  return `BigInt(${bigIntSource})`;
};

const inspectBooleanObject = (value, {
  nestedInspect,
  useNew,
  parenthesis
}) => {
  const booleanSource = nestedInspect(value.valueOf());
  return inspectConstructor(`Boolean(${booleanSource})`, {
    useNew,
    parenthesis
  });
};

const inspectError = (error, {
  nestedInspect,
  useNew,
  parenthesis
}) => {
  const messageSource = nestedInspect(error.message);
  const errorSource = inspectConstructor(`${errorToConstructorName(error)}(${messageSource})`, {
    useNew,
    parenthesis
  });
  return errorSource;
};

const errorToConstructorName = ({
  name
}) => {
  if (derivedErrorNameArray.includes(name)) {
    return name;
  }

  return "Error";
}; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types


const derivedErrorNameArray = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"];

const inspectDate = (value, {
  nestedInspect,
  useNew,
  parenthesis
}) => {
  const dateSource = nestedInspect(value.valueOf(), {
    numericSeparator: false
  });
  return inspectConstructor(`Date(${dateSource})`, {
    useNew,
    parenthesis
  });
};

const inspectFunction = (value, {
  showFunctionBody,
  parenthesis,
  depth
}) => {
  let functionSource;

  if (showFunctionBody) {
    functionSource = value.toString();
  } else {
    const isArrowFunction = value.prototype === undefined;
    const head = isArrowFunction ? "() =>" : `function ${depth === 0 ? value.name : ""}()`;
    functionSource = `${head} {/* hidden */}`;
  }

  if (parenthesis) {
    return `(${functionSource})`;
  }

  return functionSource;
};

const inspectNumberObject = (value, {
  nestedInspect,
  useNew,
  parenthesis
}) => {
  const numberSource = nestedInspect(value.valueOf());
  return inspectConstructor(`Number(${numberSource})`, {
    useNew,
    parenthesis
  });
};

const inspectObject = (value, {
  nestedInspect,
  seen = [],
  depth,
  indentUsingTab,
  indentSize,
  objectConstructor,
  parenthesis,
  useNew
}) => {
  if (seen.indexOf(value) > -1) return "Symbol.for('circular')";
  seen.push(value);
  const propertySourceArray = [];
  Object.getOwnPropertyNames(value).forEach(propertyName => {
    const propertyNameAsNumber = parseInt(propertyName, 10);
    const propertyNameSource = nestedInspect(Number.isInteger(propertyNameAsNumber) ? propertyNameAsNumber : propertyName);
    propertySourceArray.push({
      nameOrSymbolSource: propertyNameSource,
      valueSource: nestedInspect(value[propertyName], {
        seen
      })
    });
  });
  Object.getOwnPropertySymbols(value).forEach(symbol => {
    propertySourceArray.push({
      nameOrSymbolSource: `[${nestedInspect(symbol)}]`,
      valueSource: nestedInspect(value[symbol], {
        seen
      })
    });
  });
  let propertiesSource = "";
  propertySourceArray.forEach(({
    nameOrSymbolSource,
    valueSource
  }, index) => {
    if (index === 0) {
      propertiesSource += `${nameOrSymbolSource}: ${valueSource}`;
    } else {
      propertiesSource += `,${preNewLineAndIndentation(`${nameOrSymbolSource}: ${valueSource}`, {
        depth,
        indentUsingTab,
        indentSize
      })}`;
    }
  });
  let objectSource;

  if (propertiesSource.length) {
    objectSource = `${wrapNewLineAndIndentation(propertiesSource, {
      depth,
      indentUsingTab,
      indentSize
    })}`;
  } else {
    objectSource = "";
  }

  if (objectConstructor) {
    objectSource = `Object({${objectSource}})`;
  } else {
    objectSource = `{${objectSource}}`;
  }

  return inspectConstructor(objectSource, {
    parenthesis,
    useNew
  });
};

const inspectRegExp = value => value.toString();

const inspectStringObject = (value, {
  nestedInspect,
  useNew,
  parenthesis
}) => {
  const stringSource = nestedInspect(value.valueOf());
  return inspectConstructor(`String(${stringSource})`, {
    useNew,
    parenthesis
  });
};

const compositeMap = {
  Array: inspectArray,
  BigInt: inspectBigIntObject,
  Boolean: inspectBooleanObject,
  Error: inspectError,
  Date: inspectDate,
  Function: inspectFunction,
  Number: inspectNumberObject,
  Object: inspectObject,
  RegExp: inspectRegExp,
  String: inspectStringObject
};

const inspect = (value, {
  parenthesis = false,
  singleQuote = false,
  useNew = false,
  objectConstructor = false,
  showFunctionBody = false,
  indentUsingTab = false,
  indentSize = 2,
  numericSeparator = true
} = {}) => {
  const scopedInspect = (scopedValue, scopedOptions) => {
    const {
      primitiveType,
      compositeType
    } = valueToType(scopedValue);
    const options = { ...scopedOptions,
      nestedInspect: (nestedValue, nestedOptions = {}) => {
        return scopedInspect(nestedValue, { ...scopedOptions,
          depth: scopedOptions.depth + 1,
          ...nestedOptions
        });
      }
    };

    if (primitiveType) {
      return primitiveMap[primitiveType](scopedValue, options);
    }

    if (compositeType in compositeMap) {
      return compositeMap[compositeType](scopedValue, options);
    }

    return inspectConstructor(`${compositeType}(${inspectObject(scopedValue, options)})`, { ...options,
      parenthesis: false
    });
  };

  return scopedInspect(value, {
    parenthesis,
    singleQuote,
    useNew,
    objectConstructor,
    showFunctionBody,
    indentUsingTab,
    indentSize,
    numericSeparator,
    depth: 0
  });
};

exports.inspect = inspect;

//# sourceMappingURL=main.cjs.map