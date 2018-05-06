// Generated by BUCKLESCRIPT VERSION 3.0.0, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Js_dict = require("bs-platform/lib/js/js_dict.js");
var Js_json = require("bs-platform/lib/js/js_json.js");
var Belt_List = require("bs-platform/lib/js/belt_List.js");
var Belt_Option = require("bs-platform/lib/js/belt_Option.js");
var Belt_MapString = require("bs-platform/lib/js/belt_MapString.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

var falsePromise = Promise.resolve(false);

function reply(msg, res) {
  return res.then((function (isOk) {
                return Promise.resolve(isOk ? /* None */0 : /* Some */[msg]);
              }));
}

function classified(fn, maybe, sanitized) {
  return Promise.resolve(maybe ? Curry._2(fn, Js_json.classify(maybe[0]), sanitized) : /* None */0);
}

function numberTest(fn, maybe, sanitized) {
  var fn2 = function (classified, _) {
    if (typeof classified === "number") {
      return /* Some */["not_number"];
    } else if (classified.tag === 1) {
      return Curry._1(fn, classified[0]);
    } else {
      return /* Some */["not_number"];
    }
  };
  return classified(fn2, maybe, sanitized);
}

function stringTest(fn, maybe, sanitized) {
  var fn2 = function (classified, _) {
    if (typeof classified === "number") {
      return /* Some */["not_string"];
    } else if (classified.tag) {
      return /* Some */["not_string"];
    } else {
      return Curry._1(fn, classified[0]);
    }
  };
  return classified(fn2, maybe, sanitized);
}

function required(maybe, _) {
  return Promise.resolve(maybe ? /* None */0 : /* Some */["required"]);
}

function requireArray(maybe, _) {
  var tmp;
  if (maybe) {
    var match = Js_json.classify(maybe[0]);
    tmp = typeof match === "number" ? /* Some */["require_array"] : (
        match.tag === 3 ? /* None */0 : /* Some */["require_array"]
      );
  } else {
    tmp = /* Some */["required"];
  }
  return Promise.resolve(tmp);
}

function notEqualNumber(x) {
  return (function (param, param$1) {
      return numberTest((function (str) {
                    var match = str === x;
                    if (match) {
                      return /* Some */["cannot_be_equal"];
                    } else {
                      return /* None */0;
                    }
                  }), param, param$1);
    });
}

function notEqualString(x) {
  return (function (param, param$1) {
      return stringTest((function (str) {
                    var match = str === x;
                    if (match) {
                      return /* Some */["cannot_be_equal"];
                    } else {
                      return /* None */0;
                    }
                  }), param, param$1);
    });
}

function isString(param, param$1) {
  return classified((function (classified, _) {
                if (typeof classified === "number") {
                  return /* Some */["not_string"];
                } else if (classified.tag) {
                  return /* Some */["not_string"];
                } else {
                  return /* None */0;
                }
              }), param, param$1);
}

function isInt(param, param$1) {
  return numberTest((function (n) {
                var match = Math.ceil(n) === n;
                if (match) {
                  return /* None */0;
                } else {
                  return /* Some */["not_int"];
                }
              }), param, param$1);
}

function isEqualNumber(x) {
  return (function (param, param$1) {
      return numberTest((function (n) {
                    var match = n === x;
                    if (match) {
                      return /* None */0;
                    } else {
                      return /* Some */["not_equal"];
                    }
                  }), param, param$1);
    });
}

function isEqualString(x) {
  return (function (param, param$1) {
      return stringTest((function (str) {
                    var match = str === x;
                    if (match) {
                      return /* None */0;
                    } else {
                      return /* Some */["not_equal"];
                    }
                  }), param, param$1);
    });
}

function minStringLength(length) {
  return (function (param, param$1) {
      return stringTest((function (str) {
                    var match = str.length >= length;
                    if (match) {
                      return /* None */0;
                    } else {
                      return /* Some */["min_length"];
                    }
                  }), param, param$1);
    });
}

function externRaw(fn, msg, maybe, sanitized) {
  return reply(msg, Promise.resolve(Curry._2(fn, maybe, sanitized)));
}

function extern(fn, msg, maybe, sanitized) {
  if (maybe) {
    return reply(msg, Curry._2(fn, Js_json.classify(maybe[0]), sanitized));
  } else {
    return Promise.resolve(/* None */0);
  }
}

function externCompiler(fn, msg, maybe, sanitized) {
  return extern((function (classified, _) {
                return Curry._1(fn, classified);
              }), msg, maybe, sanitized);
}

function externString(fn, msg, maybe, sanitized) {
  var handler = function (param) {
    var fn$1 = function (str) {
      return Curry._2(fn, str, sanitized);
    };
    var classified = param;
    var tmp;
    tmp = typeof classified === "number" || classified.tag ? false : Curry._1(fn$1, classified[0]);
    return Promise.resolve(tmp);
  };
  return externCompiler(handler, msg, maybe, sanitized);
}

function externNumber(fn, msg, maybe, sanitized) {
  var handler = function (param) {
    if (typeof param === "number" || param.tag !== 1) {
      return falsePromise;
    } else {
      return Promise.resolve(Curry._2(fn, param[0], sanitized));
    }
  };
  return externCompiler(handler, msg, maybe, sanitized);
}

function externArray(fn, msg, maybe, sanitized) {
  var handler = function (param) {
    if (typeof param === "number" || param.tag !== 3) {
      return falsePromise;
    } else {
      return Promise.resolve(Curry._2(fn, param[0], sanitized));
    }
  };
  return externCompiler(handler, msg, maybe, sanitized);
}

function externDependentFactory(decoder, fn, key, msg, maybe, sanitized) {
  var handler = function (v) {
    var __x = Belt_MapString.get(sanitized, key);
    return Curry._3(fn, v, Belt_Option.flatMap(__x, (function (__x) {
                      return Belt_Option.flatMap(__x, decoder);
                    })), sanitized);
  };
  var __x = Belt_Option.flatMap(maybe, decoder);
  return reply(msg, Belt_Option.mapWithDefault(__x, falsePromise, handler));
}

function externDependentRaw(fn, key, msg, maybe, sanitized) {
  if (maybe) {
    var __x = Belt_MapString.get(sanitized, key);
    return reply(msg, Curry._3(fn, maybe[0], Belt_Option.flatMap(__x, (function (x) {
                          return x;
                        })), sanitized));
  } else {
    return Promise.resolve(/* None */0);
  }
}

function externDependentNumber(fn, key, msg) {
  return (function (param, param$1) {
      return externDependentFactory(Js_json.decodeNumber, fn, key, msg, param, param$1);
    });
}

function externDependentString(fn, key, msg) {
  return (function (param, param$1) {
      return externDependentFactory(Js_json.decodeString, fn, key, msg, param, param$1);
    });
}

function recursive(validator) {
  var awesomizer = function (jsonList) {
    if (jsonList) {
      var xs = jsonList[1];
      var match = Js_json.classify(jsonList[0]);
      if (typeof match === "number" || match.tag !== 2) {
        return falsePromise;
      } else {
        return Curry._1(validator, match[0]).then((function (result) {
                      if (result[0] >= 106380200) {
                        return falsePromise;
                      } else {
                        return awesomizer(xs);
                      }
                    }));
      }
    } else {
      return Promise.resolve(true);
    }
  };
  return (function (param, param$1) {
      return extern((function (taggedJson, _) {
                    if (typeof taggedJson === "number" || taggedJson.tag !== 3) {
                      return falsePromise;
                    } else {
                      return awesomizer(Belt_List.fromArray(taggedJson[0]));
                    }
                  }), "invalid_scope", param, param$1);
    });
}

function extern$1(fn, msg) {
  return (function (maybe, sanitized) {
      var __x = Belt_Option.map(maybe, (function (json) {
              var jsonSanitized = Js_dict.fromArray(Belt_MapString.toArray(Belt_MapString.map(sanitized, (function (param) {
                              if (param) {
                                return param[0];
                              } else {
                                return null;
                              }
                            }))));
              return Curry._3(fn, json, jsonSanitized, sanitized);
            }));
      return reply(msg, Belt_Option.getWithDefault(__x, falsePromise));
    });
}

function externDependent(fn, key, msg) {
  var executor = function (json, jsonSanitized, sanitized) {
    var maybe = Belt_MapString.get(sanitized, key);
    return Curry._3(fn, json, Belt_Option.mapWithDefault(maybe, null, Js_null_undefined.fromOption), jsonSanitized);
  };
  return extern$1(executor, msg);
}

var Promise$1 = /* module */[
  /* extern */extern$1,
  /* externDependent */externDependent
];

function extern$2(fn, msg) {
  return extern$1((function (a, b, c) {
                return Promise.resolve(Curry._3(fn, a, b, c));
              }), msg);
}

function externDependent$1(fn, key, msg) {
  return externDependent((function (a, b, c) {
                return Promise.resolve(Curry._3(fn, a, b, c));
              }), key, msg);
}

var JavaScript = [
  Promise$1,
  extern$2,
  externDependent$1
];

exports.externArray = externArray;
exports.externDependentNumber = externDependentNumber;
exports.externDependentRaw = externDependentRaw;
exports.externDependentString = externDependentString;
exports.externNumber = externNumber;
exports.externRaw = externRaw;
exports.externString = externString;
exports.isEqualNumber = isEqualNumber;
exports.isEqualString = isEqualString;
exports.isInt = isInt;
exports.isString = isString;
exports.minStringLength = minStringLength;
exports.notEqualNumber = notEqualNumber;
exports.notEqualString = notEqualString;
exports.recursive = recursive;
exports.required = required;
exports.requireArray = requireArray;
exports.JavaScript = JavaScript;
/* falsePromise Not a pure module */
