var __jsenv_inspect__ = (function (exports) {
  'use strict';

  var defineProperty = (function (obj, key, value) {
    // Shortcircuit the slow defineProperty path when possible.
    // We are trying to avoid issues where setters defined on the
    // prototype cause side effects under the fast path of simple
    // assignment. By checking for existence of the property with
    // the in operator, we can optimize most of this overhead away.
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  });

  function _objectSpread (target) {
    for (var i = 1; i < arguments.length; i++) {
      // eslint-disable-next-line prefer-rest-params
      var source = arguments[i] === null ? {} : arguments[i];

      if (i % 2) {
        // eslint-disable-next-line no-loop-func
        ownKeys(Object(source), true).forEach(function (key) {
          defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        // eslint-disable-next-line no-loop-func
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  } // This function is different to "Reflect.ownKeys". The enumerableOnly
  // filters on symbol properties only. Returned string properties are always
  // enumerable. It is good to use in objectSpread.

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      }); // eslint-disable-next-line prefer-spread

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  var nativeTypeOf = function nativeTypeOf(obj) {
    return typeof obj;
  };

  var customTypeOf = function customTypeOf(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? nativeTypeOf : customTypeOf;

  var valueToType = function valueToType(value) {
    var primitiveType = valueToPrimitiveType(value);

    if (primitiveType === "function") {
      return {
        compositeType: "Function"
      };
    }

    if (primitiveType === "object") {
      var compositeType = valueToCompositeType(value);
      return {
        compositeType: compositeType
      };
    }

    return {
      primitiveType: primitiveType
    };
  };
  var toString = Object.prototype.toString;

  var valueToCompositeType = function valueToCompositeType(object) {
    if (_typeof(object) === "object" && Object.getPrototypeOf(object) === null) {
      return "Object";
    }

    var toStringResult = toString.call(object); // returns format is '[object ${tagName}]';
    // and we want ${tagName}

    var tagName = toStringResult.slice("[object ".length, -1);

    if (tagName === "Object") {
      var objectConstructorName = object.constructor.name;

      if (objectConstructorName !== "Object") {
        return objectConstructorName;
      }
    }

    return tagName;
  };

  var valueToPrimitiveType = function valueToPrimitiveType(value) {
    if (value === null) {
      return "null";
    }

    if (value === undefined) {
      return "undefined";
    }

    return _typeof(value);
  };

  var inspectBoolean = function inspectBoolean(value) {
    return value.toString();
  };

  var inspectNull = function inspectNull() {
    return "null";
  };

  // eslint-disable-next-line consistent-return
  var arrayWithHoles = (function (arr) {
    if (Array.isArray(arr)) return arr;
  });

  var iterableToArrayLimit = (function (arr, i) {
    // this is an expanded form of \`for...of\` that properly supports abrupt completions of
    // iterators etc. variable names have been minimised to reduce the size of this massive
    // helper. sometimes spec compliance is annoying :(
    //
    // _n = _iteratorNormalCompletion
    // _d = _didIteratorError
    // _e = _iteratorError
    // _i = _iterator
    // _s = _step
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _e;

    var _i = arr[Symbol.iterator]();

    var _s;

    try {
      for (; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i.return !== null) _i.return();
      } finally {
        if (_d) throw _e;
      }
    } // eslint-disable-next-line consistent-return


    return _arr;
  });

  /* eslint-disable no-eq-null, eqeqeq */
  function arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    var arr2 = new Array(len);

    for (var i = 0; i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  /* eslint-disable consistent-return */
  function unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }

  var nonIterableRest = (function () {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  });

  var _slicedToArray = (function (arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
  });

  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/numeric-separators-style.js
  var inspectNumber = function inspectNumber(value, _ref) {
    var numericSeparator = _ref.numericSeparator;

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

    var numberString = String(value);

    if (!numericSeparator) {
      return numberString;
    }

    var _numberString$match$g = numberString.match(/^(?<number>.*?)(?:(?<mark>e)(?<sign>[+-])?(?<power>\d+))?$/i).groups,
        number = _numberString$match$g.number,
        _numberString$match$g2 = _numberString$match$g.mark,
        mark = _numberString$match$g2 === void 0 ? "" : _numberString$match$g2,
        _numberString$match$g3 = _numberString$match$g.sign,
        sign = _numberString$match$g3 === void 0 ? "" : _numberString$match$g3,
        _numberString$match$g4 = _numberString$match$g.power,
        power = _numberString$match$g4 === void 0 ? "" : _numberString$match$g4;
    var numberWithSeparators = formatNumber(number);
    var powerWithSeparators = addSeparator(power, {
      minimumDigits: 5,
      groupLength: 3
    });
    return "".concat(numberWithSeparators).concat(mark).concat(sign).concat(powerWithSeparators);
  }; // Use this and instead of Object.is(value, -0)
  // because in some corner cases firefox returns false
  // for Object.is(-0, -0)

  var isNegativeZero = function isNegativeZero(value) {
    return value === 0 && 1 / value === -Infinity;
  };

  var formatNumber = function formatNumber(numberString) {
    var parts = numberString.split(".");

    var _parts = _slicedToArray(parts, 2),
        integer = _parts[0],
        fractional = _parts[1];

    if (parts.length === 2) {
      var integerWithSeparators = addSeparator(integer, {
        minimumDigits: 5,
        groupLength: 3
      });
      var fractionalWithSeparators = addSeparatorFromLeft(fractional, {
        minimumDigits: 5,
        groupLength: 3
      });
      return "".concat(integerWithSeparators, ".").concat(fractionalWithSeparators);
    }

    return addSeparator(integer, {
      minimumDigits: 5,
      groupLength: 3
    });
  };

  var addSeparator = function addSeparator(numberString, _ref2) {
    var minimumDigits = _ref2.minimumDigits,
        groupLength = _ref2.groupLength;

    if (numberString[0] === "-") {
      return "-".concat(groupDigits(numberString.slice(1), {
        minimumDigits: minimumDigits,
        groupLength: groupLength
      }));
    }

    return groupDigits(numberString, {
      minimumDigits: minimumDigits,
      groupLength: groupLength
    });
  };

  var groupDigits = function groupDigits(digits, _ref3) {
    var minimumDigits = _ref3.minimumDigits,
        groupLength = _ref3.groupLength;
    var digitCount = digits.length;

    if (digitCount < minimumDigits) {
      return digits;
    }

    var digitsWithSeparator = digits.slice(-groupLength);
    var remainingDigits = digits.slice(0, -groupLength);

    while (remainingDigits.length) {
      var group = remainingDigits.slice(-groupLength);
      remainingDigits = remainingDigits.slice(0, -groupLength);
      digitsWithSeparator = "".concat(group, "_").concat(digitsWithSeparator);
    }

    return digitsWithSeparator;
  };

  var addSeparatorFromLeft = function addSeparatorFromLeft(value, _ref4) {
    var minimumDigits = _ref4.minimumDigits,
        groupLength = _ref4.groupLength;
    var length = value.length;

    if (length < minimumDigits) {
      return value;
    }

    var parts = [];

    for (var start = 0; start < length; start += groupLength) {
      var end = Math.min(start + groupLength, length);
      parts.push(value.slice(start, end));
    }

    return parts.join("_");
  };

  // https://github.com/joliss/js-string-escape/blob/master/index.js
  // http://javascript.crockford.com/remedial.html
  var quote = function quote(value) {
    var string = String(value);
    var i = 0;
    var j = string.length;
    var escapedString = "";

    while (i < j) {
      var char = string[i];
      var escapedChar = void 0;

      if (char === '"' || char === "'" || char === "\\") {
        escapedChar = "\\".concat(char);
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
  var preNewLineAndIndentation = function preNewLineAndIndentation(value, _ref) {
    var depth = _ref.depth,
        indentUsingTab = _ref.indentUsingTab,
        indentSize = _ref.indentSize;
    return "".concat(newLineAndIndent({
      count: depth + 1,
      useTabs: indentUsingTab,
      size: indentSize
    })).concat(value);
  };

  var postNewLineAndIndentation = function postNewLineAndIndentation(_ref2) {
    var depth = _ref2.depth,
        indentUsingTab = _ref2.indentUsingTab,
        indentSize = _ref2.indentSize;
    return newLineAndIndent({
      count: depth,
      useTabs: indentUsingTab,
      size: indentSize
    });
  };

  var newLineAndIndent = function newLineAndIndent(_ref3) {
    var count = _ref3.count,
        useTabs = _ref3.useTabs,
        size = _ref3.size;

    if (useTabs) {
      // eslint-disable-next-line prefer-template
      return "\n" + "\t".repeat(count);
    } // eslint-disable-next-line prefer-template


    return "\n" + " ".repeat(count * size);
  };

  var wrapNewLineAndIndentation = function wrapNewLineAndIndentation(value, _ref4) {
    var depth = _ref4.depth,
        indentUsingTab = _ref4.indentUsingTab,
        indentSize = _ref4.indentSize;
    return "".concat(preNewLineAndIndentation(value, {
      depth: depth,
      indentUsingTab: indentUsingTab,
      indentSize: indentSize
    })).concat(postNewLineAndIndentation({
      depth: depth,
      indentUsingTab: indentUsingTab,
      indentSize: indentSize
    }));
  };

  var inspectString = function inspectString(value, _ref) {
    var singleQuote = _ref.singleQuote;
    var quotedValue = quote(value);
    return singleQuote ? "'".concat(quotedValue, "'") : "\"".concat(quotedValue, "\"");
  };

  var inspectSymbol = function inspectSymbol(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        parenthesis = _ref.parenthesis;
    var symbolDescription = symbolToDescription(value);
    var symbolDescriptionSource = symbolDescription ? nestedInspect(symbolDescription) : "";
    var symbolSource = "Symbol(".concat(symbolDescriptionSource, ")");
    if (parenthesis) return "".concat(symbolSource);
    return symbolSource;
  };
  var symbolToDescription = "description" in Symbol.prototype ? function (symbol) {
    return symbol.description;
  } : function (symbol) {
    var toStringResult = symbol.toString();
    var openingParenthesisIndex = toStringResult.indexOf("(");
    var closingParenthesisIndex = toStringResult.indexOf(")");
    var symbolDescription = toStringResult.slice(openingParenthesisIndex + 1, closingParenthesisIndex);
    return symbolDescription;
  };

  var inspectUndefined = function inspectUndefined() {
    return "undefined";
  };

  var inspectBigInt = function inspectBigInt(value) {
    return "".concat(value, "n");
  };

  var primitiveMap = {
    boolean: inspectBoolean,
    null: inspectNull,
    number: inspectNumber,
    string: inspectString,
    symbol: inspectSymbol,
    undefined: inspectUndefined,
    bigint: inspectBigInt
  };

  var inspectConstructor = function inspectConstructor(value, _ref) {
    var parenthesis = _ref.parenthesis,
        useNew = _ref.useNew;
    var formattedString = value;

    if (parenthesis) {
      formattedString = "(".concat(value, ")");
    }

    if (useNew) {
      formattedString = "new ".concat(formattedString);
    }

    return formattedString;
  };

  var inspectArray = function inspectArray(value, _ref) {
    var _ref$seen = _ref.seen,
        seen = _ref$seen === void 0 ? [] : _ref$seen,
        nestedInspect = _ref.nestedInspect,
        depth = _ref.depth,
        indentUsingTab = _ref.indentUsingTab,
        indentSize = _ref.indentSize,
        parenthesis = _ref.parenthesis,
        useNew = _ref.useNew;

    if (seen.indexOf(value) > -1) {
      return "Symbol.for('circular')";
    }

    seen.push(value);
    var valuesSource = "";
    var i = 0;
    var j = value.length;

    while (i < j) {
      var valueSource = value.hasOwnProperty(i) ? nestedInspect(value[i], {
        seen: seen
      }) : "";

      if (i === 0) {
        valuesSource += valueSource;
      } else {
        valuesSource += ",".concat(preNewLineAndIndentation(valueSource, {
          depth: depth,
          indentUsingTab: indentUsingTab,
          indentSize: indentSize
        }));
      }

      i++;
    }

    var arraySource;

    if (valuesSource.length) {
      arraySource = wrapNewLineAndIndentation(valuesSource, {
        depth: depth,
        indentUsingTab: indentUsingTab,
        indentSize: indentSize
      });
    } else {
      arraySource = "";
    }

    arraySource = "[".concat(arraySource, "]");
    return inspectConstructor(arraySource, {
      parenthesis: parenthesis,
      useNew: useNew
    });
  };

  var inspectBigIntObject = function inspectBigIntObject(value, _ref) {
    var nestedInspect = _ref.nestedInspect;
    var bigIntSource = nestedInspect(value.valueOf());
    return "BigInt(".concat(bigIntSource, ")");
  };

  var inspectBooleanObject = function inspectBooleanObject(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        useNew = _ref.useNew,
        parenthesis = _ref.parenthesis;
    var booleanSource = nestedInspect(value.valueOf());
    return inspectConstructor("Boolean(".concat(booleanSource, ")"), {
      useNew: useNew,
      parenthesis: parenthesis
    });
  };

  var inspectError = function inspectError(error, _ref) {
    var nestedInspect = _ref.nestedInspect,
        useNew = _ref.useNew,
        parenthesis = _ref.parenthesis;
    var messageSource = nestedInspect(error.message);
    var errorSource = inspectConstructor("".concat(errorToConstructorName(error), "(").concat(messageSource, ")"), {
      useNew: useNew,
      parenthesis: parenthesis
    });
    return errorSource;
  };

  var errorToConstructorName = function errorToConstructorName(_ref2) {
    var name = _ref2.name;

    if (derivedErrorNameArray.includes(name)) {
      return name;
    }

    return "Error";
  }; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types


  var derivedErrorNameArray = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"];

  var inspectDate = function inspectDate(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        useNew = _ref.useNew,
        parenthesis = _ref.parenthesis;
    var dateSource = nestedInspect(value.valueOf(), {
      numericSeparator: false
    });
    return inspectConstructor("Date(".concat(dateSource, ")"), {
      useNew: useNew,
      parenthesis: parenthesis
    });
  };

  var inspectFunction = function inspectFunction(value, _ref) {
    var showFunctionBody = _ref.showFunctionBody,
        parenthesis = _ref.parenthesis,
        depth = _ref.depth;
    var functionSource;

    if (showFunctionBody) {
      functionSource = value.toString();
    } else {
      var isArrowFunction = value.prototype === undefined;
      var head = isArrowFunction ? "() =>" : "function ".concat(depth === 0 ? value.name : "", "()");
      functionSource = "".concat(head, " {/* hidden */}");
    }

    if (parenthesis) {
      return "(".concat(functionSource, ")");
    }

    return functionSource;
  };

  var inspectNumberObject = function inspectNumberObject(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        useNew = _ref.useNew,
        parenthesis = _ref.parenthesis;
    var numberSource = nestedInspect(value.valueOf());
    return inspectConstructor("Number(".concat(numberSource, ")"), {
      useNew: useNew,
      parenthesis: parenthesis
    });
  };

  var inspectObject = function inspectObject(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        _ref$seen = _ref.seen,
        seen = _ref$seen === void 0 ? [] : _ref$seen,
        depth = _ref.depth,
        indentUsingTab = _ref.indentUsingTab,
        indentSize = _ref.indentSize,
        objectConstructor = _ref.objectConstructor,
        parenthesis = _ref.parenthesis,
        useNew = _ref.useNew;
    if (seen.indexOf(value) > -1) return "Symbol.for('circular')";
    seen.push(value);
    var propertySourceArray = [];
    Object.getOwnPropertyNames(value).forEach(function (propertyName) {
      var propertyNameAsNumber = parseInt(propertyName, 10);
      var propertyNameSource = nestedInspect(Number.isInteger(propertyNameAsNumber) ? propertyNameAsNumber : propertyName);
      propertySourceArray.push({
        nameOrSymbolSource: propertyNameSource,
        valueSource: nestedInspect(value[propertyName], {
          seen: seen
        })
      });
    });
    Object.getOwnPropertySymbols(value).forEach(function (symbol) {
      propertySourceArray.push({
        nameOrSymbolSource: "[".concat(nestedInspect(symbol), "]"),
        valueSource: nestedInspect(value[symbol], {
          seen: seen
        })
      });
    });
    var propertiesSource = "";
    propertySourceArray.forEach(function (_ref2, index) {
      var nameOrSymbolSource = _ref2.nameOrSymbolSource,
          valueSource = _ref2.valueSource;

      if (index === 0) {
        propertiesSource += "".concat(nameOrSymbolSource, ": ").concat(valueSource);
      } else {
        propertiesSource += ",".concat(preNewLineAndIndentation("".concat(nameOrSymbolSource, ": ").concat(valueSource), {
          depth: depth,
          indentUsingTab: indentUsingTab,
          indentSize: indentSize
        }));
      }
    });
    var objectSource;

    if (propertiesSource.length) {
      objectSource = "".concat(wrapNewLineAndIndentation(propertiesSource, {
        depth: depth,
        indentUsingTab: indentUsingTab,
        indentSize: indentSize
      }));
    } else {
      objectSource = "";
    }

    if (objectConstructor) {
      objectSource = "Object({".concat(objectSource, "})");
    } else {
      objectSource = "{".concat(objectSource, "}");
    }

    return inspectConstructor(objectSource, {
      parenthesis: parenthesis,
      useNew: useNew
    });
  };

  var inspectRegExp = function inspectRegExp(value) {
    return value.toString();
  };

  var inspectStringObject = function inspectStringObject(value, _ref) {
    var nestedInspect = _ref.nestedInspect,
        useNew = _ref.useNew,
        parenthesis = _ref.parenthesis;
    var stringSource = nestedInspect(value.valueOf());
    return inspectConstructor("String(".concat(stringSource, ")"), {
      useNew: useNew,
      parenthesis: parenthesis
    });
  };

  var compositeMap = {
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

  var inspect = function inspect(value) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$parenthesis = _ref.parenthesis,
        parenthesis = _ref$parenthesis === void 0 ? false : _ref$parenthesis,
        _ref$singleQuote = _ref.singleQuote,
        singleQuote = _ref$singleQuote === void 0 ? false : _ref$singleQuote,
        _ref$useNew = _ref.useNew,
        useNew = _ref$useNew === void 0 ? false : _ref$useNew,
        _ref$objectConstructo = _ref.objectConstructor,
        objectConstructor = _ref$objectConstructo === void 0 ? false : _ref$objectConstructo,
        _ref$showFunctionBody = _ref.showFunctionBody,
        showFunctionBody = _ref$showFunctionBody === void 0 ? false : _ref$showFunctionBody,
        _ref$indentUsingTab = _ref.indentUsingTab,
        indentUsingTab = _ref$indentUsingTab === void 0 ? false : _ref$indentUsingTab,
        _ref$indentSize = _ref.indentSize,
        indentSize = _ref$indentSize === void 0 ? 2 : _ref$indentSize,
        _ref$numericSeparator = _ref.numericSeparator,
        numericSeparator = _ref$numericSeparator === void 0 ? true : _ref$numericSeparator;

    var scopedInspect = function scopedInspect(scopedValue, scopedOptions) {
      var _valueToType = valueToType(scopedValue),
          primitiveType = _valueToType.primitiveType,
          compositeType = _valueToType.compositeType;

      var options = _objectSpread(_objectSpread({}, scopedOptions), {}, {
        nestedInspect: function nestedInspect(nestedValue) {
          var nestedOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return scopedInspect(nestedValue, _objectSpread(_objectSpread({}, scopedOptions), {}, {
            depth: scopedOptions.depth + 1
          }, nestedOptions));
        }
      });

      if (primitiveType) {
        return primitiveMap[primitiveType](scopedValue, options);
      }

      if (compositeType in compositeMap) {
        return compositeMap[compositeType](scopedValue, options);
      }

      return inspectConstructor("".concat(compositeType, "(").concat(inspectObject(scopedValue, options), ")"), _objectSpread(_objectSpread({}, options), {}, {
        parenthesis: false
      }));
    };

    return scopedInspect(value, {
      parenthesis: parenthesis,
      singleQuote: singleQuote,
      useNew: useNew,
      objectConstructor: objectConstructor,
      showFunctionBody: showFunctionBody,
      indentUsingTab: indentUsingTab,
      indentSize: indentSize,
      numericSeparator: numericSeparator,
      depth: 0
    });
  };

  exports.inspect = inspect;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));

//# sourceMappingURL=main.js.map