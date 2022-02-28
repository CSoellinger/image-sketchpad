function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
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
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var runtime = {exports: {}};

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
}(runtime));

var regenerator = runtime.exports;

var download = {exports: {}};

(function (module, exports) {
//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	{
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	}
}(commonjsGlobal, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else {			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else {//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else {
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));
}(download));

var _download = download.exports;

var drawToCanvas$1 = {exports: {}};

var forceCanvasContext = {exports: {}};

var isCanvasContext = {exports: {}};

(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isContext;

function isContext(ctx) {

  function getFunctionName(obj) {
    return obj.toString().split(' ')[1].replace(/[^a-z0-9_$]/ig, '');
  }

  var name = getFunctionName(ctx.constructor);

  return ['CanvasRenderingContext2D', 'WebGLRenderingContext', 'CanvasRenderingContext2DConstructor', 'WebGLRenderingContextConstructor'].indexOf(name) > -1;
}

module.exports = exports['default'];
}(isCanvasContext, isCanvasContext.exports));

(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = forceCanvasContext;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isCanvasContext = isCanvasContext.exports;

var _isCanvasContext2 = _interopRequireDefault(_isCanvasContext);

function forceCanvasContext(ctx) {
  var type = arguments.length <= 1 || arguments[1] === undefined ? '2d' : arguments[1];

  // convert canvas to ctx
  if (ctx.tagName === 'CANVAS') {
    ctx = ctx.getContext(type);
  }

  // error if not ctx
  if (!(0, _isCanvasContext2['default'])(ctx)) throw Error('Could not force context');

  return ctx;
}

module.exports = exports['default'];
}(forceCanvasContext, forceCanvasContext.exports));

(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = drawToCanvas;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _forceCanvasContext = forceCanvasContext.exports;

var _forceCanvasContext2 = _interopRequireDefault(_forceCanvasContext);

function drawToCanvas(source, dest) {
  var _forceContext;

  var pos = arguments.length <= 2 || arguments[2] === undefined ? [0, 0] : arguments[2];

  (_forceContext = (0, _forceCanvasContext2['default'])(dest)).drawImage.apply(_forceContext, [source].concat(_toConsumableArray(pos)));
  return dest;
}

module.exports = exports['default'];
}(drawToCanvas$1, drawToCanvas$1.exports));

var drawToCanvas = /*@__PURE__*/getDefaultExportFromCjs(drawToCanvas$1.exports);

// Defaults
var defaultOptions = {
	format: 'image/png',
	quality: 0.92,
	width: undefined,
	height: undefined,
	Canvas: undefined,
	crossOrigin: undefined
};

// Return Promise
var mergeImages = function (sources, options) {
	if ( sources === void 0 ) sources = [];
	if ( options === void 0 ) options = {};

	return new Promise(function (resolve) {
	options = Object.assign({}, defaultOptions, options);

	// Setup browser/Node.js specific variables
	var canvas = options.Canvas ? new options.Canvas() : window.document.createElement('canvas');
	var Image = options.Image || window.Image;

	// Load sources
	var images = sources.map(function (source) { return new Promise(function (resolve, reject) {
		// Convert sources to objects
		if (source.constructor.name !== 'Object') {
			source = { src: source };
		}

		// Resolve source and img when loaded
		var img = new Image();
		img.crossOrigin = options.crossOrigin;
		img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
		img.onload = function () { return resolve(Object.assign({}, source, { img: img })); };
		img.src = source.src;
	}); });

	// Get canvas context
	var ctx = canvas.getContext('2d');

	// When sources have loaded
	resolve(Promise.all(images)
		.then(function (images) {
			// Set canvas dimensions
			var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
			canvas.width = getSize('width');
			canvas.height = getSize('height');

			// Draw images to canvas
			images.forEach(function (image) {
				ctx.globalAlpha = image.opacity ? image.opacity : 1;
				return ctx.drawImage(image.img, image.x || 0, image.y || 0);
			});

			if (options.Canvas && options.format === 'image/jpeg') {
				// Resolve data URI for node-canvas jpeg async
				return new Promise(function (resolve, reject) {
					canvas.toDataURL(options.format, {
						quality: options.quality,
						progressive: false
					}, function (err, jpeg) {
						if (err) {
							reject(err);
							return;
						}
						resolve(jpeg);
					});
				});
			}

			// Resolve all other data URIs sync
			return canvas.toDataURL(options.format, options.quality);
		}));
});
};

var pica = {exports: {}};

/*!

pica
https://github.com/nodeca/pica

*/

(function (module, exports) {
(function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){

var inherits = _dereq_('inherits');

var Multimath = _dereq_('multimath');

var mm_unsharp_mask = _dereq_('./mm_unsharp_mask');

var mm_resize = _dereq_('./mm_resize');

function MathLib(requested_features) {
  var __requested_features = requested_features || [];

  var features = {
    js: __requested_features.indexOf('js') >= 0,
    wasm: __requested_features.indexOf('wasm') >= 0
  };
  Multimath.call(this, features);
  this.features = {
    js: features.js,
    wasm: features.wasm && this.has_wasm()
  };
  this.use(mm_unsharp_mask);
  this.use(mm_resize);
}

inherits(MathLib, Multimath);

MathLib.prototype.resizeAndUnsharp = function resizeAndUnsharp(options, cache) {
  var result = this.resize(options, cache);

  if (options.unsharpAmount) {
    this.unsharp_mask(result, options.toWidth, options.toHeight, options.unsharpAmount, options.unsharpRadius, options.unsharpThreshold);
  }

  return result;
};

module.exports = MathLib;

},{"./mm_resize":4,"./mm_unsharp_mask":9,"inherits":19,"multimath":20}],2:[function(_dereq_,module,exports){
//var FIXED_FRAC_BITS = 14;

function clampTo8(i) {
  return i < 0 ? 0 : i > 255 ? 255 : i;
} // Convolve image in horizontal directions and transpose output. In theory,
// transpose allow:
//
// - use the same convolver for both passes (this fails due different
//   types of input array and temporary buffer)
// - making vertical pass by horisonltal lines inprove CPU cache use.
//
// But in real life this doesn't work :)
//


function convolveHorizontally(src, dest, srcW, srcH, destW, filters) {
  var r, g, b, a;
  var filterPtr, filterShift, filterSize;
  var srcPtr, srcY, destX, filterVal;
  var srcOffset = 0,
      destOffset = 0; // For each row

  for (srcY = 0; srcY < srcH; srcY++) {
    filterPtr = 0; // Apply precomputed filters to each destination row point

    for (destX = 0; destX < destW; destX++) {
      // Get the filter that determines the current output pixel.
      filterShift = filters[filterPtr++];
      filterSize = filters[filterPtr++];
      srcPtr = srcOffset + filterShift * 4 | 0;
      r = g = b = a = 0; // Apply the filter to the row to get the destination pixel r, g, b, a

      for (; filterSize > 0; filterSize--) {
        filterVal = filters[filterPtr++]; // Use reverse order to workaround deopts in old v8 (node v.10)
        // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.

        a = a + filterVal * src[srcPtr + 3] | 0;
        b = b + filterVal * src[srcPtr + 2] | 0;
        g = g + filterVal * src[srcPtr + 1] | 0;
        r = r + filterVal * src[srcPtr] | 0;
        srcPtr = srcPtr + 4 | 0;
      } // Bring this value back in range. All of the filter scaling factors
      // are in fixed point with FIXED_FRAC_BITS bits of fractional part.
      //
      // (!) Add 1/2 of value before clamping to get proper rounding. In other
      // case brightness loss will be noticeable if you resize image with white
      // border and place it on white background.
      //


      dest[destOffset + 3] = clampTo8(a + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 2] = clampTo8(b + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 1] = clampTo8(g + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset] = clampTo8(r + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      destOffset = destOffset + srcH * 4 | 0;
    }

    destOffset = (srcY + 1) * 4 | 0;
    srcOffset = (srcY + 1) * srcW * 4 | 0;
  }
} // Technically, convolvers are the same. But input array and temporary
// buffer can be of different type (especially, in old browsers). So,
// keep code in separate functions to avoid deoptimizations & speed loss.


function convolveVertically(src, dest, srcW, srcH, destW, filters) {
  var r, g, b, a;
  var filterPtr, filterShift, filterSize;
  var srcPtr, srcY, destX, filterVal;
  var srcOffset = 0,
      destOffset = 0; // For each row

  for (srcY = 0; srcY < srcH; srcY++) {
    filterPtr = 0; // Apply precomputed filters to each destination row point

    for (destX = 0; destX < destW; destX++) {
      // Get the filter that determines the current output pixel.
      filterShift = filters[filterPtr++];
      filterSize = filters[filterPtr++];
      srcPtr = srcOffset + filterShift * 4 | 0;
      r = g = b = a = 0; // Apply the filter to the row to get the destination pixel r, g, b, a

      for (; filterSize > 0; filterSize--) {
        filterVal = filters[filterPtr++]; // Use reverse order to workaround deopts in old v8 (node v.10)
        // Big thanks to @mraleph (Vyacheslav Egorov) for the tip.

        a = a + filterVal * src[srcPtr + 3] | 0;
        b = b + filterVal * src[srcPtr + 2] | 0;
        g = g + filterVal * src[srcPtr + 1] | 0;
        r = r + filterVal * src[srcPtr] | 0;
        srcPtr = srcPtr + 4 | 0;
      } // Bring this value back in range. All of the filter scaling factors
      // are in fixed point with FIXED_FRAC_BITS bits of fractional part.
      //
      // (!) Add 1/2 of value before clamping to get proper rounding. In other
      // case brightness loss will be noticeable if you resize image with white
      // border and place it on white background.
      //


      dest[destOffset + 3] = clampTo8(a + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 2] = clampTo8(b + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset + 1] = clampTo8(g + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      dest[destOffset] = clampTo8(r + (1 << 13) >> 14
      /*FIXED_FRAC_BITS*/
      );
      destOffset = destOffset + srcH * 4 | 0;
    }

    destOffset = (srcY + 1) * 4 | 0;
    srcOffset = (srcY + 1) * srcW * 4 | 0;
  }
}

module.exports = {
  convolveHorizontally: convolveHorizontally,
  convolveVertically: convolveVertically
};

},{}],3:[function(_dereq_,module,exports){
/* eslint-disable max-len */

module.exports = 'AGFzbQEAAAAADAZkeWxpbmsAAAAAAAEXA2AAAGAGf39/f39/AGAHf39/f39/fwACDwEDZW52Bm1lbW9yeQIAAAMEAwABAgYGAX8AQQALB1cFEV9fd2FzbV9jYWxsX2N0b3JzAAAIY29udm9sdmUAAQpjb252b2x2ZUhWAAIMX19kc29faGFuZGxlAwAYX193YXNtX2FwcGx5X2RhdGFfcmVsb2NzAAAK7AMDAwABC8YDAQ9/AkAgA0UNACAERQ0AA0AgDCENQQAhE0EAIQcDQCAHQQJqIQYCfyAHQQF0IAVqIgcuAQIiFEUEQEGAwAAhCEGAwAAhCUGAwAAhCkGAwAAhCyAGDAELIBIgBy4BAGohCEEAIQsgFCEHQQAhDiAGIQlBACEPQQAhEANAIAUgCUEBdGouAQAiESAAIAhBAnRqKAIAIgpBGHZsIBBqIRAgCkH/AXEgEWwgC2ohCyAKQRB2Qf8BcSARbCAPaiEPIApBCHZB/wFxIBFsIA5qIQ4gCEEBaiEIIAlBAWohCSAHQQFrIgcNAAsgC0GAQGshCCAOQYBAayEJIA9BgEBrIQogEEGAQGshCyAGIBRqCyEHIAEgDUECdGogCUEOdSIGQf8BIAZB/wFIGyIGQQAgBkEAShtBCHRBgP4DcSAKQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EQdEGAgPwHcSALQQ51IgZB/wEgBkH/AUgbIgZBACAGQQBKG0EYdHJyIAhBDnUiBkH/ASAGQf8BSBsiBkEAIAZBAEobcjYCACADIA1qIQ0gE0EBaiITIARHDQALIAxBAWoiDCACbCESIAMgDEcNAAsLCx4AQQAgAiADIAQgBSAAEAEgAkEAIAQgBSAGIAEQAQs=';

},{}],4:[function(_dereq_,module,exports){

module.exports = {
  name: 'resize',
  fn: _dereq_('./resize'),
  wasm_fn: _dereq_('./resize_wasm'),
  wasm_src: _dereq_('./convolve_wasm_base64')
};

},{"./convolve_wasm_base64":3,"./resize":5,"./resize_wasm":8}],5:[function(_dereq_,module,exports){

var createFilters = _dereq_('./resize_filter_gen');

var convolveHorizontally = _dereq_('./convolve').convolveHorizontally;

var convolveVertically = _dereq_('./convolve').convolveVertically;

function resetAlpha(dst, width, height) {
  var ptr = 3,
      len = width * height * 4 | 0;

  while (ptr < len) {
    dst[ptr] = 0xFF;
    ptr = ptr + 4 | 0;
  }
}

module.exports = function resize(options) {
  var src = options.src;
  var srcW = options.width;
  var srcH = options.height;
  var destW = options.toWidth;
  var destH = options.toHeight;
  var scaleX = options.scaleX || options.toWidth / options.width;
  var scaleY = options.scaleY || options.toHeight / options.height;
  var offsetX = options.offsetX || 0;
  var offsetY = options.offsetY || 0;
  var dest = options.dest || new Uint8Array(destW * destH * 4);
  var alpha = options.alpha || false;
  var filter = typeof options.filter === 'undefined' ? 'mks2013' : options.filter;
  var filtersX = createFilters(filter, srcW, destW, scaleX, offsetX),
      filtersY = createFilters(filter, srcH, destH, scaleY, offsetY);
  var tmp = new Uint8Array(destW * srcH * 4); // To use single function we need src & tmp of the same type.
  // But src can be CanvasPixelArray, and tmp - Uint8Array. So, keep
  // vertical and horizontal passes separately to avoid deoptimization.

  convolveHorizontally(src, tmp, srcW, srcH, destW, filtersX);
  convolveVertically(tmp, dest, srcH, destW, destH, filtersY); // That's faster than doing checks in convolver.
  // !!! Note, canvas data is not premultipled. We don't need other
  // alpha corrections.

  if (!alpha) resetAlpha(dest, destW, destH);
  return dest;
};

},{"./convolve":2,"./resize_filter_gen":6}],6:[function(_dereq_,module,exports){

var FILTER_INFO = _dereq_('./resize_filter_info'); // Precision of fixed FP values


var FIXED_FRAC_BITS = 14;

function toFixedPoint(num) {
  return Math.round(num * ((1 << FIXED_FRAC_BITS) - 1));
}

module.exports = function resizeFilterGen(filter, srcSize, destSize, scale, offset) {
  var filterFunction = FILTER_INFO.filter[filter].fn;
  var scaleInverted = 1.0 / scale;
  var scaleClamped = Math.min(1.0, scale); // For upscale
  // Filter window (averaging interval), scaled to src image

  var srcWindow = FILTER_INFO.filter[filter].win / scaleClamped;
  var destPixel, srcPixel, srcFirst, srcLast, filterElementSize, floatFilter, fxpFilter, total, pxl, idx, floatVal, filterTotal, filterVal;
  var leftNotEmpty, rightNotEmpty, filterShift, filterSize;
  var maxFilterElementSize = Math.floor((srcWindow + 1) * 2);
  var packedFilter = new Int16Array((maxFilterElementSize + 2) * destSize);
  var packedFilterPtr = 0;
  var slowCopy = !packedFilter.subarray || !packedFilter.set; // For each destination pixel calculate source range and built filter values

  for (destPixel = 0; destPixel < destSize; destPixel++) {
    // Scaling should be done relative to central pixel point
    srcPixel = (destPixel + 0.5) * scaleInverted + offset;
    srcFirst = Math.max(0, Math.floor(srcPixel - srcWindow));
    srcLast = Math.min(srcSize - 1, Math.ceil(srcPixel + srcWindow));
    filterElementSize = srcLast - srcFirst + 1;
    floatFilter = new Float32Array(filterElementSize);
    fxpFilter = new Int16Array(filterElementSize);
    total = 0.0; // Fill filter values for calculated range

    for (pxl = srcFirst, idx = 0; pxl <= srcLast; pxl++, idx++) {
      floatVal = filterFunction((pxl + 0.5 - srcPixel) * scaleClamped);
      total += floatVal;
      floatFilter[idx] = floatVal;
    } // Normalize filter, convert to fixed point and accumulate conversion error


    filterTotal = 0;

    for (idx = 0; idx < floatFilter.length; idx++) {
      filterVal = floatFilter[idx] / total;
      filterTotal += filterVal;
      fxpFilter[idx] = toFixedPoint(filterVal);
    } // Compensate normalization error, to minimize brightness drift


    fxpFilter[destSize >> 1] += toFixedPoint(1.0 - filterTotal); //
    // Now pack filter to useable form
    //
    // 1. Trim heading and tailing zero values, and compensate shitf/length
    // 2. Put all to single array in this format:
    //
    //    [ pos shift, data length, value1, value2, value3, ... ]
    //

    leftNotEmpty = 0;

    while (leftNotEmpty < fxpFilter.length && fxpFilter[leftNotEmpty] === 0) {
      leftNotEmpty++;
    }

    if (leftNotEmpty < fxpFilter.length) {
      rightNotEmpty = fxpFilter.length - 1;

      while (rightNotEmpty > 0 && fxpFilter[rightNotEmpty] === 0) {
        rightNotEmpty--;
      }

      filterShift = srcFirst + leftNotEmpty;
      filterSize = rightNotEmpty - leftNotEmpty + 1;
      packedFilter[packedFilterPtr++] = filterShift; // shift

      packedFilter[packedFilterPtr++] = filterSize; // size

      if (!slowCopy) {
        packedFilter.set(fxpFilter.subarray(leftNotEmpty, rightNotEmpty + 1), packedFilterPtr);
        packedFilterPtr += filterSize;
      } else {
        // fallback for old IE < 11, without subarray/set methods
        for (idx = leftNotEmpty; idx <= rightNotEmpty; idx++) {
          packedFilter[packedFilterPtr++] = fxpFilter[idx];
        }
      }
    } else {
      // zero data, write header only
      packedFilter[packedFilterPtr++] = 0; // shift

      packedFilter[packedFilterPtr++] = 0; // size
    }
  }

  return packedFilter;
};

},{"./resize_filter_info":7}],7:[function(_dereq_,module,exports){

var filter = {
  // Nearest neibor
  box: {
    win: 0.5,
    fn: function fn(x) {
      if (x < 0) x = -x;
      return x < 0.5 ? 1.0 : 0.0;
    }
  },
  // // Hamming
  hamming: {
    win: 1.0,
    fn: function fn(x) {
      if (x < 0) x = -x;

      if (x >= 1.0) {
        return 0.0;
      }

      if (x < 1.19209290E-07) {
        return 1.0;
      }

      var xpi = x * Math.PI;
      return Math.sin(xpi) / xpi * (0.54 + 0.46 * Math.cos(xpi / 1.0));
    }
  },
  // Lanczos, win = 2
  lanczos2: {
    win: 2.0,
    fn: function fn(x) {
      if (x < 0) x = -x;

      if (x >= 2.0) {
        return 0.0;
      }

      if (x < 1.19209290E-07) {
        return 1.0;
      }

      var xpi = x * Math.PI;
      return Math.sin(xpi) / xpi * Math.sin(xpi / 2.0) / (xpi / 2.0);
    }
  },
  // Lanczos, win = 3
  lanczos3: {
    win: 3.0,
    fn: function fn(x) {
      if (x < 0) x = -x;

      if (x >= 3.0) {
        return 0.0;
      }

      if (x < 1.19209290E-07) {
        return 1.0;
      }

      var xpi = x * Math.PI;
      return Math.sin(xpi) / xpi * Math.sin(xpi / 3.0) / (xpi / 3.0);
    }
  },
  // Magic Kernel Sharp 2013, win = 2.5
  // http://johncostella.com/magic/
  mks2013: {
    win: 2.5,
    fn: function fn(x) {
      if (x < 0) x = -x;

      if (x >= 2.5) {
        return 0.0;
      }

      if (x >= 1.5) {
        return -0.125 * (x - 2.5) * (x - 2.5);
      }

      if (x >= 0.5) {
        return 0.25 * (4 * x * x - 11 * x + 7);
      }

      return 1.0625 - 1.75 * x * x;
    }
  }
};
module.exports = {
  filter: filter,
  // Legacy mapping
  f2q: {
    box: 0,
    hamming: 1,
    lanczos2: 2,
    lanczos3: 3
  },
  q2f: ['box', 'hamming', 'lanczos2', 'lanczos3']
};

},{}],8:[function(_dereq_,module,exports){

var createFilters = _dereq_('./resize_filter_gen');

function resetAlpha(dst, width, height) {
  var ptr = 3,
      len = width * height * 4 | 0;

  while (ptr < len) {
    dst[ptr] = 0xFF;
    ptr = ptr + 4 | 0;
  }
}

function asUint8Array(src) {
  return new Uint8Array(src.buffer, 0, src.byteLength);
}

var IS_LE = true; // should not crash everything on module load in old browsers

try {
  IS_LE = new Uint32Array(new Uint8Array([1, 0, 0, 0]).buffer)[0] === 1;
} catch (__) {}

function copyInt16asLE(src, target, target_offset) {
  if (IS_LE) {
    target.set(asUint8Array(src), target_offset);
    return;
  }

  for (var ptr = target_offset, i = 0; i < src.length; i++) {
    var data = src[i];
    target[ptr++] = data & 0xFF;
    target[ptr++] = data >> 8 & 0xFF;
  }
}

module.exports = function resize_wasm(options) {
  var src = options.src;
  var srcW = options.width;
  var srcH = options.height;
  var destW = options.toWidth;
  var destH = options.toHeight;
  var scaleX = options.scaleX || options.toWidth / options.width;
  var scaleY = options.scaleY || options.toHeight / options.height;
  var offsetX = options.offsetX || 0.0;
  var offsetY = options.offsetY || 0.0;
  var dest = options.dest || new Uint8Array(destW * destH * 4);
  var alpha = options.alpha || false;
  var filter = typeof options.filter === 'undefined' ? 'mks2013' : options.filter;
  var filtersX = createFilters(filter, srcW, destW, scaleX, offsetX),
      filtersY = createFilters(filter, srcH, destH, scaleY, offsetY); // destination is 0 too.

  var src_offset = 0; // buffer between convolve passes

  var tmp_offset = this.__align(src_offset + Math.max(src.byteLength, dest.byteLength));

  var filtersX_offset = this.__align(tmp_offset + srcH * destW * 4);

  var filtersY_offset = this.__align(filtersX_offset + filtersX.byteLength);

  var alloc_bytes = filtersY_offset + filtersY.byteLength;

  var instance = this.__instance('resize', alloc_bytes); //
  // Fill memory block with data to process
  //


  var mem = new Uint8Array(this.__memory.buffer);
  var mem32 = new Uint32Array(this.__memory.buffer); // 32-bit copy is much faster in chrome

  var src32 = new Uint32Array(src.buffer);
  mem32.set(src32); // We should guarantee LE bytes order. Filters are not big, so
  // speed difference is not significant vs direct .set()

  copyInt16asLE(filtersX, mem, filtersX_offset);
  copyInt16asLE(filtersY, mem, filtersY_offset); //
  // Now call webassembly method
  // emsdk does method names with '_'

  var fn = instance.exports.convolveHV || instance.exports._convolveHV;
  fn(filtersX_offset, filtersY_offset, tmp_offset, srcW, srcH, destW, destH); //
  // Copy data back to typed array
  //
  // 32-bit copy is much faster in chrome

  var dest32 = new Uint32Array(dest.buffer);
  dest32.set(new Uint32Array(this.__memory.buffer, 0, destH * destW)); // That's faster than doing checks in convolver.
  // !!! Note, canvas data is not premultipled. We don't need other
  // alpha corrections.

  if (!alpha) resetAlpha(dest, destW, destH);
  return dest;
};

},{"./resize_filter_gen":6}],9:[function(_dereq_,module,exports){

module.exports = {
  name: 'unsharp_mask',
  fn: _dereq_('./unsharp_mask'),
  wasm_fn: _dereq_('./unsharp_mask_wasm'),
  wasm_src: _dereq_('./unsharp_mask_wasm_base64')
};

},{"./unsharp_mask":10,"./unsharp_mask_wasm":11,"./unsharp_mask_wasm_base64":12}],10:[function(_dereq_,module,exports){

var glur_mono16 = _dereq_('glur/mono16');

function hsv_v16(img, width, height) {
  var size = width * height;
  var out = new Uint16Array(size);
  var r, g, b, max;

  for (var i = 0; i < size; i++) {
    r = img[4 * i];
    g = img[4 * i + 1];
    b = img[4 * i + 2];
    max = r >= g && r >= b ? r : g >= b && g >= r ? g : b;
    out[i] = max << 8;
  }

  return out;
}

module.exports = function unsharp(img, width, height, amount, radius, threshold) {
  var v1, v2, vmul;
  var diff, iTimes4;

  if (amount === 0 || radius < 0.5) {
    return;
  }

  if (radius > 2.0) {
    radius = 2.0;
  }

  var brightness = hsv_v16(img, width, height);
  var blured = new Uint16Array(brightness); // copy, because blur modify src

  glur_mono16(blured, width, height, radius);
  var amountFp = amount / 100 * 0x1000 + 0.5 | 0;
  var thresholdFp = threshold << 8;
  var size = width * height;
  /* eslint-disable indent */

  for (var i = 0; i < size; i++) {
    v1 = brightness[i];
    diff = v1 - blured[i];

    if (Math.abs(diff) >= thresholdFp) {
      // add unsharp mask to the brightness channel
      v2 = v1 + (amountFp * diff + 0x800 >> 12); // Both v1 and v2 are within [0.0 .. 255.0] (0000-FF00) range, never going into
      // [255.003 .. 255.996] (FF01-FFFF). This allows to round this value as (x+.5)|0
      // later without overflowing.

      v2 = v2 > 0xff00 ? 0xff00 : v2;
      v2 = v2 < 0x0000 ? 0x0000 : v2; // Avoid division by 0. V=0 means rgb(0,0,0), unsharp with unsharpAmount>0 cannot
      // change this value (because diff between colors gets inflated), so no need to verify correctness.

      v1 = v1 !== 0 ? v1 : 1; // Multiplying V in HSV model by a constant is equivalent to multiplying each component
      // in RGB by the same constant (same for HSL), see also:
      // https://beesbuzz.biz/code/16-hsv-color-transforms

      vmul = (v2 << 12) / v1 | 0; // Result will be in [0..255] range because:
      //  - all numbers are positive
      //  - r,g,b <= (v1/256)
      //  - r,g,b,(v1/256),(v2/256) <= 255
      // So highest this number can get is X*255/X+0.5=255.5 which is < 256 and rounds down.

      iTimes4 = i * 4;
      img[iTimes4] = img[iTimes4] * vmul + 0x800 >> 12; // R

      img[iTimes4 + 1] = img[iTimes4 + 1] * vmul + 0x800 >> 12; // G

      img[iTimes4 + 2] = img[iTimes4 + 2] * vmul + 0x800 >> 12; // B
    }
  }
};

},{"glur/mono16":18}],11:[function(_dereq_,module,exports){

module.exports = function unsharp(img, width, height, amount, radius, threshold) {
  if (amount === 0 || radius < 0.5) {
    return;
  }

  if (radius > 2.0) {
    radius = 2.0;
  }

  var pixels = width * height;
  var img_bytes_cnt = pixels * 4;
  var hsv_bytes_cnt = pixels * 2;
  var blur_bytes_cnt = pixels * 2;
  var blur_line_byte_cnt = Math.max(width, height) * 4; // float32 array

  var blur_coeffs_byte_cnt = 8 * 4; // float32 array

  var img_offset = 0;
  var hsv_offset = img_bytes_cnt;
  var blur_offset = hsv_offset + hsv_bytes_cnt;
  var blur_tmp_offset = blur_offset + blur_bytes_cnt;
  var blur_line_offset = blur_tmp_offset + blur_bytes_cnt;
  var blur_coeffs_offset = blur_line_offset + blur_line_byte_cnt;

  var instance = this.__instance('unsharp_mask', img_bytes_cnt + hsv_bytes_cnt + blur_bytes_cnt * 2 + blur_line_byte_cnt + blur_coeffs_byte_cnt, {
    exp: Math.exp
  }); // 32-bit copy is much faster in chrome


  var img32 = new Uint32Array(img.buffer);
  var mem32 = new Uint32Array(this.__memory.buffer);
  mem32.set(img32); // HSL

  var fn = instance.exports.hsv_v16 || instance.exports._hsv_v16;
  fn(img_offset, hsv_offset, width, height); // BLUR

  fn = instance.exports.blurMono16 || instance.exports._blurMono16;
  fn(hsv_offset, blur_offset, blur_tmp_offset, blur_line_offset, blur_coeffs_offset, width, height, radius); // UNSHARP

  fn = instance.exports.unsharp || instance.exports._unsharp;
  fn(img_offset, img_offset, hsv_offset, blur_offset, width, height, amount, threshold); // 32-bit copy is much faster in chrome

  img32.set(new Uint32Array(this.__memory.buffer, 0, pixels));
};

},{}],12:[function(_dereq_,module,exports){
/* eslint-disable max-len */

module.exports = 'AGFzbQEAAAAADAZkeWxpbmsAAAAAAAE0B2AAAGAEf39/fwBgBn9/f39/fwBgCH9/f39/f39/AGAIf39/f39/f30AYAJ9fwBgAXwBfAIZAgNlbnYDZXhwAAYDZW52Bm1lbW9yeQIAAAMHBgAFAgQBAwYGAX8AQQALB4oBCBFfX3dhc21fY2FsbF9jdG9ycwABFl9fYnVpbGRfZ2F1c3NpYW5fY29lZnMAAg5fX2dhdXNzMTZfbGluZQADCmJsdXJNb25vMTYABAdoc3ZfdjE2AAUHdW5zaGFycAAGDF9fZHNvX2hhbmRsZQMAGF9fd2FzbV9hcHBseV9kYXRhX3JlbG9jcwABCsUMBgMAAQvWAQEHfCABRNuGukOCGvs/IAC7oyICRAAAAAAAAADAohAAIgW2jDgCFCABIAKaEAAiAyADoCIGtjgCECABRAAAAAAAAPA/IAOhIgQgBKIgAyACIAKgokQAAAAAAADwP6AgBaGjIgS2OAIAIAEgBSAEmqIiB7Y4AgwgASADIAJEAAAAAAAA8D+gIASioiIItjgCCCABIAMgAkQAAAAAAADwv6AgBKKiIgK2OAIEIAEgByAIoCAFRAAAAAAAAPA/IAahoCIDo7Y4AhwgASAEIAKgIAOjtjgCGAuGBQMGfwl8An0gAyoCDCEVIAMqAgghFiADKgIUuyERIAMqAhC7IRACQCAEQQFrIghBAEgiCQRAIAIhByAAIQYMAQsgAiAALwEAuCIPIAMqAhi7oiIMIBGiIg0gDCAQoiAPIAMqAgS7IhOiIhQgAyoCALsiEiAPoqCgoCIOtjgCACACQQRqIQcgAEECaiEGIAhFDQAgCEEBIAhBAUgbIgpBf3MhCwJ/IAQgCmtBAXFFBEAgDiENIAgMAQsgAiANIA4gEKIgFCASIAAvAQK4Ig+ioKCgIg22OAIEIAJBCGohByAAQQRqIQYgDiEMIARBAmsLIQIgC0EAIARrRg0AA0AgByAMIBGiIA0gEKIgDyAToiASIAYvAQC4Ig6ioKCgIgy2OAIAIAcgDSARoiAMIBCiIA4gE6IgEiAGLwECuCIPoqCgoCINtjgCBCAHQQhqIQcgBkEEaiEGIAJBAkohACACQQJrIQIgAA0ACwsCQCAJDQAgASAFIAhsQQF0aiIAAn8gBkECay8BACICuCINIBW7IhKiIA0gFrsiE6KgIA0gAyoCHLuiIgwgEKKgIAwgEaKgIg8gB0EEayIHKgIAu6AiDkQAAAAAAADwQWMgDkQAAAAAAAAAAGZxBEAgDqsMAQtBAAs7AQAgCEUNACAGQQRrIQZBACAFa0EBdCEBA0ACfyANIBKiIAJB//8DcbgiDSAToqAgDyIOIBCioCAMIBGioCIPIAdBBGsiByoCALugIgxEAAAAAAAA8EFjIAxEAAAAAAAAAABmcQRAIAyrDAELQQALIQMgBi8BACECIAAgAWoiACADOwEAIAZBAmshBiAIQQFKIQMgDiEMIAhBAWshCCADDQALCwvRAgIBfwd8AkAgB0MAAAAAWw0AIARE24a6Q4Ia+z8gB0MAAAA/l7ujIglEAAAAAAAAAMCiEAAiDLaMOAIUIAQgCZoQACIKIAqgIg22OAIQIAREAAAAAAAA8D8gCqEiCyALoiAKIAkgCaCiRAAAAAAAAPA/oCAMoaMiC7Y4AgAgBCAMIAuaoiIOtjgCDCAEIAogCUQAAAAAAADwP6AgC6KiIg+2OAIIIAQgCiAJRAAAAAAAAPC/oCALoqIiCbY4AgQgBCAOIA+gIAxEAAAAAAAA8D8gDaGgIgqjtjgCHCAEIAsgCaAgCqO2OAIYIAYEQANAIAAgBSAIbEEBdGogAiAIQQF0aiADIAQgBSAGEAMgCEEBaiIIIAZHDQALCyAFRQ0AQQAhCANAIAIgBiAIbEEBdGogASAIQQF0aiADIAQgBiAFEAMgCEEBaiIIIAVHDQALCwtxAQN/IAIgA2wiBQRAA0AgASAAKAIAIgRBEHZB/wFxIgIgAiAEQQh2Qf8BcSIDIAMgBEH/AXEiBEkbIAIgA0sbIgYgBiAEIAIgBEsbIAMgBEsbQQh0OwEAIAFBAmohASAAQQRqIQAgBUEBayIFDQALCwuZAgIDfwF8IAQgBWwhBAJ/IAazQwAAgEWUQwAAyEKVu0QAAAAAAADgP6AiC5lEAAAAAAAA4EFjBEAgC6oMAQtBgICAgHgLIQUgBARAIAdBCHQhCUEAIQYDQCAJIAIgBkEBdCIHai8BACIBIAMgB2ovAQBrIgcgB0EfdSIIaiAIc00EQCAAIAZBAnQiCGoiCiAFIAdsQYAQakEMdSABaiIHQYD+AyAHQYD+A0gbIgdBACAHQQBKG0EMdCABQQEgARtuIgEgCi0AAGxBgBBqQQx2OgAAIAAgCEEBcmoiByABIActAABsQYAQakEMdjoAACAAIAhBAnJqIgcgASAHLQAAbEGAEGpBDHY6AAALIAZBAWoiBiAERw0ACwsL';

},{}],13:[function(_dereq_,module,exports){

var GC_INTERVAL = 100;

function Pool(create, idle) {
  this.create = create;
  this.available = [];
  this.acquired = {};
  this.lastId = 1;
  this.timeoutId = 0;
  this.idle = idle || 2000;
}

Pool.prototype.acquire = function () {
  var _this = this;

  var resource;

  if (this.available.length !== 0) {
    resource = this.available.pop();
  } else {
    resource = this.create();
    resource.id = this.lastId++;

    resource.release = function () {
      return _this.release(resource);
    };
  }

  this.acquired[resource.id] = resource;
  return resource;
};

Pool.prototype.release = function (resource) {
  var _this2 = this;

  delete this.acquired[resource.id];
  resource.lastUsed = Date.now();
  this.available.push(resource);

  if (this.timeoutId === 0) {
    this.timeoutId = setTimeout(function () {
      return _this2.gc();
    }, GC_INTERVAL);
  }
};

Pool.prototype.gc = function () {
  var _this3 = this;

  var now = Date.now();
  this.available = this.available.filter(function (resource) {
    if (now - resource.lastUsed > _this3.idle) {
      resource.destroy();
      return false;
    }

    return true;
  });

  if (this.available.length !== 0) {
    this.timeoutId = setTimeout(function () {
      return _this3.gc();
    }, GC_INTERVAL);
  } else {
    this.timeoutId = 0;
  }
};

module.exports = Pool;

},{}],14:[function(_dereq_,module,exports){
// min size = 1 can consume large amount of memory

var MIN_INNER_TILE_SIZE = 2;

module.exports = function createStages(fromWidth, fromHeight, toWidth, toHeight, srcTileSize, destTileBorder) {
  var scaleX = toWidth / fromWidth;
  var scaleY = toHeight / fromHeight; // derived from createRegions equation:
  // innerTileWidth = pixelFloor(srcTileSize * scaleX) - 2 * destTileBorder;

  var minScale = (2 * destTileBorder + MIN_INNER_TILE_SIZE + 1) / srcTileSize; // refuse to scale image multiple times by less than twice each time,
  // it could only happen because of invalid options

  if (minScale > 0.5) return [[toWidth, toHeight]];
  var stageCount = Math.ceil(Math.log(Math.min(scaleX, scaleY)) / Math.log(minScale)); // no additional resizes are necessary,
  // stageCount can be zero or be negative when enlarging the image

  if (stageCount <= 1) return [[toWidth, toHeight]];
  var result = [];

  for (var i = 0; i < stageCount; i++) {
    var width = Math.round(Math.pow(Math.pow(fromWidth, stageCount - i - 1) * Math.pow(toWidth, i + 1), 1 / stageCount));
    var height = Math.round(Math.pow(Math.pow(fromHeight, stageCount - i - 1) * Math.pow(toHeight, i + 1), 1 / stageCount));
    result.push([width, height]);
  }

  return result;
};

},{}],15:[function(_dereq_,module,exports){
/*
 * pixelFloor and pixelCeil are modified versions of Math.floor and Math.ceil
 * functions which take into account floating point arithmetic errors.
 * Those errors can cause undesired increments/decrements of sizes and offsets:
 * Math.ceil(36 / (36 / 500)) = 501
 * pixelCeil(36 / (36 / 500)) = 500
 */

var PIXEL_EPSILON = 1e-5;

function pixelFloor(x) {
  var nearest = Math.round(x);

  if (Math.abs(x - nearest) < PIXEL_EPSILON) {
    return nearest;
  }

  return Math.floor(x);
}

function pixelCeil(x) {
  var nearest = Math.round(x);

  if (Math.abs(x - nearest) < PIXEL_EPSILON) {
    return nearest;
  }

  return Math.ceil(x);
}

module.exports = function createRegions(options) {
  var scaleX = options.toWidth / options.width;
  var scaleY = options.toHeight / options.height;
  var innerTileWidth = pixelFloor(options.srcTileSize * scaleX) - 2 * options.destTileBorder;
  var innerTileHeight = pixelFloor(options.srcTileSize * scaleY) - 2 * options.destTileBorder; // prevent infinite loop, this should never happen

  if (innerTileWidth < 1 || innerTileHeight < 1) {
    throw new Error('Internal error in pica: target tile width/height is too small.');
  }

  var x, y;
  var innerX, innerY, toTileWidth, toTileHeight;
  var tiles = [];
  var tile; // we go top-to-down instead of left-to-right to make image displayed from top to
  // doesn in the browser

  for (innerY = 0; innerY < options.toHeight; innerY += innerTileHeight) {
    for (innerX = 0; innerX < options.toWidth; innerX += innerTileWidth) {
      x = innerX - options.destTileBorder;

      if (x < 0) {
        x = 0;
      }

      toTileWidth = innerX + innerTileWidth + options.destTileBorder - x;

      if (x + toTileWidth >= options.toWidth) {
        toTileWidth = options.toWidth - x;
      }

      y = innerY - options.destTileBorder;

      if (y < 0) {
        y = 0;
      }

      toTileHeight = innerY + innerTileHeight + options.destTileBorder - y;

      if (y + toTileHeight >= options.toHeight) {
        toTileHeight = options.toHeight - y;
      }

      tile = {
        toX: x,
        toY: y,
        toWidth: toTileWidth,
        toHeight: toTileHeight,
        toInnerX: innerX,
        toInnerY: innerY,
        toInnerWidth: innerTileWidth,
        toInnerHeight: innerTileHeight,
        offsetX: x / scaleX - pixelFloor(x / scaleX),
        offsetY: y / scaleY - pixelFloor(y / scaleY),
        scaleX: scaleX,
        scaleY: scaleY,
        x: pixelFloor(x / scaleX),
        y: pixelFloor(y / scaleY),
        width: pixelCeil(toTileWidth / scaleX),
        height: pixelCeil(toTileHeight / scaleY)
      };
      tiles.push(tile);
    }
  }

  return tiles;
};

},{}],16:[function(_dereq_,module,exports){

function objClass(obj) {
  return Object.prototype.toString.call(obj);
}

module.exports.isCanvas = function isCanvas(element) {
  var cname = objClass(element);
  return cname === '[object HTMLCanvasElement]'
  /* browser */
  || cname === '[object OffscreenCanvas]' || cname === '[object Canvas]'
  /* node-canvas */
  ;
};

module.exports.isImage = function isImage(element) {
  return objClass(element) === '[object HTMLImageElement]';
};

module.exports.isImageBitmap = function isImageBitmap(element) {
  return objClass(element) === '[object ImageBitmap]';
};

module.exports.limiter = function limiter(concurrency) {
  var active = 0,
      queue = [];

  function roll() {
    if (active < concurrency && queue.length) {
      active++;
      queue.shift()();
    }
  }

  return function limit(fn) {
    return new Promise(function (resolve, reject) {
      queue.push(function () {
        fn().then(function (result) {
          resolve(result);
          active--;
          roll();
        }, function (err) {
          reject(err);
          active--;
          roll();
        });
      });
      roll();
    });
  };
};

module.exports.cib_quality_name = function cib_quality_name(num) {
  switch (num) {
    case 0:
      return 'pixelated';

    case 1:
      return 'low';

    case 2:
      return 'medium';
  }

  return 'high';
};

module.exports.cib_support = function cib_support(createCanvas) {
  return Promise.resolve().then(function () {
    if (typeof createImageBitmap === 'undefined') {
      return false;
    }

    var c = createCanvas(100, 100);
    return createImageBitmap(c, 0, 0, 100, 100, {
      resizeWidth: 10,
      resizeHeight: 10,
      resizeQuality: 'high'
    }).then(function (bitmap) {
      var status = bitmap.width === 10; // Branch below is filtered on upper level. We do not call resize
      // detection for basic ImageBitmap.
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap
      // old Crome 51 has ImageBitmap without .close(). Then this code
      // will throw and return 'false' as expected.
      //

      bitmap.close();
      c = null;
      return status;
    });
  })["catch"](function () {
    return false;
  });
};

module.exports.worker_offscreen_canvas_support = function worker_offscreen_canvas_support() {
  return new Promise(function (resolve, reject) {
    if (typeof OffscreenCanvas === 'undefined') {
      // if OffscreenCanvas is present, we assume browser supports Worker and built-in Promise as well
      resolve(false);
      return;
    }

    function workerPayload(self) {
      if (typeof createImageBitmap === 'undefined') {
        self.postMessage(false);
        return;
      }

      Promise.resolve().then(function () {
        var canvas = new OffscreenCanvas(10, 10); // test that 2d context can be used in worker

        var ctx = canvas.getContext('2d');
        ctx.rect(0, 0, 1, 1); // test that cib can be used to return image bitmap from worker

        return createImageBitmap(canvas, 0, 0, 1, 1);
      }).then(function () {
        return self.postMessage(true);
      }, function () {
        return self.postMessage(false);
      });
    }

    var code = btoa("(".concat(workerPayload.toString(), ")(self);"));
    var w = new Worker("data:text/javascript;base64,".concat(code));

    w.onmessage = function (ev) {
      return resolve(ev.data);
    };

    w.onerror = reject;
  }).then(function (result) {
    return result;
  }, function () {
    return false;
  });
}; // Check if canvas.getContext('2d').getImageData can be used,
// FireFox randomizes the output of that function in `privacy.resistFingerprinting` mode


module.exports.can_use_canvas = function can_use_canvas(createCanvas) {
  var usable = false;

  try {
    var canvas = createCanvas(2, 1);
    var ctx = canvas.getContext('2d');
    var d = ctx.createImageData(2, 1);
    d.data[0] = 12;
    d.data[1] = 23;
    d.data[2] = 34;
    d.data[3] = 255;
    d.data[4] = 45;
    d.data[5] = 56;
    d.data[6] = 67;
    d.data[7] = 255;
    ctx.putImageData(d, 0, 0);
    d = null;
    d = ctx.getImageData(0, 0, 2, 1);

    if (d.data[0] === 12 && d.data[1] === 23 && d.data[2] === 34 && d.data[3] === 255 && d.data[4] === 45 && d.data[5] === 56 && d.data[6] === 67 && d.data[7] === 255) {
      usable = true;
    }
  } catch (err) {}

  return usable;
}; // Check if createImageBitmap(img, sx, sy, sw, sh) signature works correctly
// with JPEG images oriented with Exif;
// https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
// TODO: remove after it's fixed in chrome for at least 2 releases


module.exports.cib_can_use_region = function cib_can_use_region() {
  return new Promise(function (resolve) {
    if (typeof createImageBitmap === 'undefined') {
      resolve(false);
      return;
    }

    var image = new Image();
    image.src = 'data:image/jpeg;base64,' + '/9j/4QBiRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAYAAAEaAAUAAAABAAAASgEbAAUAA' + 'AABAAAAUgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/9' + 'sAQwAEAwMEAwMEBAMEBQQEBQYKBwYGBgYNCQoICg8NEBAPDQ8OERMYFBESFxIODxUcFRc' + 'ZGRsbGxAUHR8dGh8YGhsa/9sAQwEEBQUGBQYMBwcMGhEPERoaGhoaGhoaGhoaGhoaGhoa' + 'GhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoa/8IAEQgAAQACAwERAAIRAQMRA' + 'f/EABQAAQAAAAAAAAAAAAAAAAAAAAf/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAA' + 'IQAxAAAAF/P//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAQUCf//EABQRAQAAAAA' + 'AAAAAAAAAAAAAAAD/2gAIAQMBAT8Bf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIB' + 'AT8Bf//EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEABj8Cf//EABQQAQAAAAAAAAAAA' + 'AAAAAAAAAD/2gAIAQEAAT8hf//aAAwDAQACAAMAAAAQH//EABQRAQAAAAAAAAAAAAAAAA' + 'AAAAD/2gAIAQMBAT8Qf//EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQIBAT8Qf//EABQ' + 'QAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAT8Qf//Z';

    image.onload = function () {
      createImageBitmap(image, 0, 0, image.width, image.height).then(function (bitmap) {
        if (bitmap.width === image.width && bitmap.height === image.height) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, function () {
        return resolve(false);
      });
    };

    image.onerror = function () {
      return resolve(false);
    };
  });
};

},{}],17:[function(_dereq_,module,exports){

module.exports = function () {
  var MathLib = _dereq_('./mathlib');

  var mathLib;
  /* eslint-disable no-undef */

  onmessage = function onmessage(ev) {
    var tileOpts = ev.data.opts;

    if (!tileOpts.src && tileOpts.srcBitmap) {
      var canvas = new OffscreenCanvas(tileOpts.width, tileOpts.height);
      var ctx = canvas.getContext('2d', {
        alpha: Boolean(tileOpts.alpha)
      });
      ctx.drawImage(tileOpts.srcBitmap, 0, 0);
      tileOpts.src = ctx.getImageData(0, 0, tileOpts.width, tileOpts.height).data;
      canvas.width = canvas.height = 0;
      canvas = null;
      tileOpts.srcBitmap.close();
      tileOpts.srcBitmap = null; // Temporary force out data to typed array, because Chrome have artefacts
      // https://github.com/nodeca/pica/issues/223
      // returnBitmap = true;
    }

    if (!mathLib) mathLib = new MathLib(ev.data.features); // Use multimath's sync auto-init. Avoid Promise use in old browsers,
    // because polyfills are not propagated to webworker.

    var data = mathLib.resizeAndUnsharp(tileOpts);

    {
      postMessage({
        data: data
      }, [data.buffer]);
    }
  };
};

},{"./mathlib":1}],18:[function(_dereq_,module,exports){
// Calculate Gaussian blur of an image using IIR filter
// The method is taken from Intel's white paper and code example attached to it:
// https://software.intel.com/en-us/articles/iir-gaussian-blur-filter
// -implementation-using-intel-advanced-vector-extensions

var a0, a1, a2, a3, b1, b2, left_corner, right_corner;

function gaussCoef(sigma) {
  if (sigma < 0.5) {
    sigma = 0.5;
  }

  var a = Math.exp(0.726 * 0.726) / sigma,
      g1 = Math.exp(-a),
      g2 = Math.exp(-2 * a),
      k = (1 - g1) * (1 - g1) / (1 + 2 * a * g1 - g2);

  a0 = k;
  a1 = k * (a - 1) * g1;
  a2 = k * (a + 1) * g1;
  a3 = -k * g2;
  b1 = 2 * g1;
  b2 = -g2;
  left_corner = (a0 + a1) / (1 - b1 - b2);
  right_corner = (a2 + a3) / (1 - b1 - b2);

  // Attempt to force type to FP32.
  return new Float32Array([ a0, a1, a2, a3, b1, b2, left_corner, right_corner ]);
}

function convolveMono16(src, out, line, coeff, width, height) {
  // takes src image and writes the blurred and transposed result into out

  var prev_src, curr_src, curr_out, prev_out, prev_prev_out;
  var src_index, out_index, line_index;
  var i, j;
  var coeff_a0, coeff_a1, coeff_b1, coeff_b2;

  for (i = 0; i < height; i++) {
    src_index = i * width;
    out_index = i;
    line_index = 0;

    // left to right
    prev_src = src[src_index];
    prev_prev_out = prev_src * coeff[6];
    prev_out = prev_prev_out;

    coeff_a0 = coeff[0];
    coeff_a1 = coeff[1];
    coeff_b1 = coeff[4];
    coeff_b2 = coeff[5];

    for (j = 0; j < width; j++) {
      curr_src = src[src_index];

      curr_out = curr_src * coeff_a0 +
                 prev_src * coeff_a1 +
                 prev_out * coeff_b1 +
                 prev_prev_out * coeff_b2;

      prev_prev_out = prev_out;
      prev_out = curr_out;
      prev_src = curr_src;

      line[line_index] = prev_out;
      line_index++;
      src_index++;
    }

    src_index--;
    line_index--;
    out_index += height * (width - 1);

    // right to left
    prev_src = src[src_index];
    prev_prev_out = prev_src * coeff[7];
    prev_out = prev_prev_out;
    curr_src = prev_src;

    coeff_a0 = coeff[2];
    coeff_a1 = coeff[3];

    for (j = width - 1; j >= 0; j--) {
      curr_out = curr_src * coeff_a0 +
                 prev_src * coeff_a1 +
                 prev_out * coeff_b1 +
                 prev_prev_out * coeff_b2;

      prev_prev_out = prev_out;
      prev_out = curr_out;

      prev_src = curr_src;
      curr_src = src[src_index];

      out[out_index] = line[line_index] + prev_out;

      src_index--;
      line_index--;
      out_index -= height;
    }
  }
}


function blurMono16(src, width, height, radius) {
  // Quick exit on zero radius
  if (!radius) { return; }

  var out      = new Uint16Array(src.length),
      tmp_line = new Float32Array(Math.max(width, height));

  var coeff = gaussCoef(radius);

  convolveMono16(src, out, tmp_line, coeff, width, height);
  convolveMono16(out, src, tmp_line, coeff, height, width);
}

module.exports = blurMono16;

},{}],19:[function(_dereq_,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

},{}],20:[function(_dereq_,module,exports){


var assign         = _dereq_('object-assign');
var base64decode   = _dereq_('./lib/base64decode');
var hasWebAssembly = _dereq_('./lib/wa_detect');


var DEFAULT_OPTIONS = {
  js: true,
  wasm: true
};


function MultiMath(options) {
  if (!(this instanceof MultiMath)) return new MultiMath(options);

  var opts = assign({}, DEFAULT_OPTIONS, options || {});

  this.options         = opts;

  this.__cache         = {};

  this.__init_promise  = null;
  this.__modules       = opts.modules || {};
  this.__memory        = null;
  this.__wasm          = {};

  this.__isLE = ((new Uint32Array((new Uint8Array([ 1, 0, 0, 0 ])).buffer))[0] === 1);

  if (!this.options.js && !this.options.wasm) {
    throw new Error('mathlib: at least "js" or "wasm" should be enabled');
  }
}


MultiMath.prototype.has_wasm = hasWebAssembly;


MultiMath.prototype.use = function (module) {
  this.__modules[module.name] = module;

  // Pin the best possible implementation
  if (this.options.wasm && this.has_wasm() && module.wasm_fn) {
    this[module.name] = module.wasm_fn;
  } else {
    this[module.name] = module.fn;
  }

  return this;
};


MultiMath.prototype.init = function () {
  if (this.__init_promise) return this.__init_promise;

  if (!this.options.js && this.options.wasm && !this.has_wasm()) {
    return Promise.reject(new Error('mathlib: only "wasm" was enabled, but it\'s not supported'));
  }

  var self = this;

  this.__init_promise = Promise.all(Object.keys(self.__modules).map(function (name) {
    var module = self.__modules[name];

    if (!self.options.wasm || !self.has_wasm() || !module.wasm_fn) return null;

    // If already compiled - exit
    if (self.__wasm[name]) return null;

    // Compile wasm source
    return WebAssembly.compile(self.__base64decode(module.wasm_src))
      .then(function (m) { self.__wasm[name] = m; });
  }))
    .then(function () { return self; });

  return this.__init_promise;
};


////////////////////////////////////////////////////////////////////////////////
// Methods below are for internal use from plugins


// Simple decode base64 to typed array. Useful to load embedded webassembly
// code. You probably don't need to call this method directly.
//
MultiMath.prototype.__base64decode = base64decode;


// Increase current memory to include specified number of bytes. Do nothing if
// size is already ok. You probably don't need to call this method directly,
// because it will be invoked from `.__instance()`.
//
MultiMath.prototype.__reallocate = function mem_grow_to(bytes) {
  if (!this.__memory) {
    this.__memory = new WebAssembly.Memory({
      initial: Math.ceil(bytes / (64 * 1024))
    });
    return this.__memory;
  }

  var mem_size = this.__memory.buffer.byteLength;

  if (mem_size < bytes) {
    this.__memory.grow(Math.ceil((bytes - mem_size) / (64 * 1024)));
  }

  return this.__memory;
};


// Returns instantinated webassembly item by name, with specified memory size
// and environment.
// - use cache if available
// - do sync module init, if async init was not called earlier
// - allocate memory if not enougth
// - can export functions to webassembly via "env_extra",
//   for example, { exp: Math.exp }
//
MultiMath.prototype.__instance = function instance(name, memsize, env_extra) {
  if (memsize) this.__reallocate(memsize);

  // If .init() was not called, do sync compile
  if (!this.__wasm[name]) {
    var module = this.__modules[name];
    this.__wasm[name] = new WebAssembly.Module(this.__base64decode(module.wasm_src));
  }

  if (!this.__cache[name]) {
    var env_base = {
      memoryBase: 0,
      memory: this.__memory,
      tableBase: 0,
      table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })
    };

    this.__cache[name] = new WebAssembly.Instance(this.__wasm[name], {
      env: assign(env_base, env_extra || {})
    });
  }

  return this.__cache[name];
};


// Helper to calculate memory aligh for pointers. Webassembly does not require
// this, but you may wish to experiment. Default base = 8;
//
MultiMath.prototype.__align = function align(number, base) {
  base = base || 8;
  var reminder = number % base;
  return number + (reminder ? base - reminder : 0);
};


module.exports = MultiMath;

},{"./lib/base64decode":21,"./lib/wa_detect":22,"object-assign":23}],21:[function(_dereq_,module,exports){


var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';


module.exports = function base64decode(str) {
  var input = str.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max   = input.length;

  var out = new Uint8Array((max * 3) >> 2);

  // Collect by 6*4 bits (3 bytes)

  var bits = 0;
  var ptr  = 0;

  for (var idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      out[ptr++] = (bits >> 16) & 0xFF;
      out[ptr++] = (bits >> 8) & 0xFF;
      out[ptr++] = bits & 0xFF;
    }

    bits = (bits << 6) | BASE64_MAP.indexOf(input.charAt(idx));
  }

  // Dump tail

  var tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    out[ptr++] = (bits >> 16) & 0xFF;
    out[ptr++] = (bits >> 8) & 0xFF;
    out[ptr++] = bits & 0xFF;
  } else if (tailbits === 18) {
    out[ptr++] = (bits >> 10) & 0xFF;
    out[ptr++] = (bits >> 2) & 0xFF;
  } else if (tailbits === 12) {
    out[ptr++] = (bits >> 4) & 0xFF;
  }

  return out;
};

},{}],22:[function(_dereq_,module,exports){


var wa;


module.exports = function hasWebAssembly() {
  // use cache if called before;
  if (typeof wa !== 'undefined') return wa;

  wa = false;

  if (typeof WebAssembly === 'undefined') return wa;

  // If WebAssenbly is disabled, code can throw on compile
  try {
    // https://github.com/brion/min-wasm-fail/blob/master/min-wasm-fail.in.js
    // Additional check that WA internals are correct

    /* eslint-disable comma-spacing, max-len */
    var bin      = new Uint8Array([ 0,97,115,109,1,0,0,0,1,6,1,96,1,127,1,127,3,2,1,0,5,3,1,0,1,7,8,1,4,116,101,115,116,0,0,10,16,1,14,0,32,0,65,1,54,2,0,32,0,40,2,0,11 ]);
    var module   = new WebAssembly.Module(bin);
    var instance = new WebAssembly.Instance(module, {});

    // test storing to and loading from a non-zero location via a parameter.
    // Safari on iOS 11.2.5 returns 0 unexpectedly at non-zero locations
    if (instance.exports.test(4) !== 0) wa = true;

    return wa;
  } catch (__) {}

  return wa;
};

},{}],23:[function(_dereq_,module,exports){
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],24:[function(_dereq_,module,exports){
var bundleFn = arguments[3];
var sources = arguments[4];
var cache = arguments[5];

var stringify = JSON.stringify;

module.exports = function (fn, options) {
    var wkey;
    var cacheKeys = Object.keys(cache);

    for (var i = 0, l = cacheKeys.length; i < l; i++) {
        var key = cacheKeys[i];
        var exp = cache[key].exports;
        // Using babel as a transpiler to use esmodule, the export will always
        // be an object with the default export as a property of it. To ensure
        // the existing api and babel esmodule exports are both supported we
        // check for both
        if (exp === fn || exp && exp.default === fn) {
            wkey = key;
            break;
        }
    }

    if (!wkey) {
        wkey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
        var wcache = {};
        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i];
            wcache[key] = key;
        }
        sources[wkey] = [
            'function(require,module,exports){' + fn + '(self); }',
            wcache
        ];
    }
    var skey = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);

    var scache = {}; scache[wkey] = wkey;
    sources[skey] = [
        'function(require,module,exports){' +
            // try to call default if defined to also support babel esmodule exports
            'var f = require(' + stringify(wkey) + ');' +
            '(f.default ? f.default : f)(self);' +
        '}',
        scache
    ];

    var workerSources = {};
    resolveSources(skey);

    function resolveSources(key) {
        workerSources[key] = true;

        for (var depPath in sources[key][1]) {
            var depKey = sources[key][1][depPath];
            if (!workerSources[depKey]) {
                resolveSources(depKey);
            }
        }
    }

    var src = '(' + bundleFn + ')({'
        + Object.keys(workerSources).map(function (key) {
            return stringify(key) + ':['
                + sources[key][0]
                + ',' + stringify(sources[key][1]) + ']'
            ;
        }).join(',')
        + '},{},[' + stringify(skey) + '])'
    ;

    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var blob = new Blob([src], { type: 'text/javascript' });
    if (options && options.bare) { return blob; }
    var workerUrl = URL.createObjectURL(blob);
    var worker = new Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};

},{}],"/index.js":[function(_dereq_,module,exports){

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var assign = _dereq_('object-assign');

var webworkify = _dereq_('webworkify');

var MathLib = _dereq_('./lib/mathlib');

var Pool = _dereq_('./lib/pool');

var utils = _dereq_('./lib/utils');

var worker = _dereq_('./lib/worker');

var createStages = _dereq_('./lib/stepper');

var createRegions = _dereq_('./lib/tiler');

var filter_info = _dereq_('./lib/mm_resize/resize_filter_info'); // Deduplicate pools & limiters with the same configs
// when user creates multiple pica instances.


var singletones = {};
var NEED_SAFARI_FIX = false;

try {
  if (typeof navigator !== 'undefined' && navigator.userAgent) {
    NEED_SAFARI_FIX = navigator.userAgent.indexOf('Safari') >= 0;
  }
} catch (e) {}

var concurrency = 1;

if (typeof navigator !== 'undefined') {
  concurrency = Math.min(navigator.hardwareConcurrency || 1, 4);
}

var DEFAULT_PICA_OPTS = {
  tile: 1024,
  concurrency: concurrency,
  features: ['js', 'wasm', 'ww'],
  idle: 2000,
  createCanvas: function createCanvas(width, height) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    return tmpCanvas;
  }
};
var DEFAULT_RESIZE_OPTS = {
  filter: 'mks2013',
  alpha: false,
  unsharpAmount: 0,
  unsharpRadius: 0.0,
  unsharpThreshold: 0
};
var CAN_NEW_IMAGE_DATA = false;
var CAN_CREATE_IMAGE_BITMAP = false;
var CAN_USE_CANVAS_GET_IMAGE_DATA = false;
var CAN_USE_OFFSCREEN_CANVAS = false;
var CAN_USE_CIB_REGION_FOR_IMAGE = false;

function workerFabric() {
  return {
    value: webworkify(worker),
    destroy: function destroy() {
      this.value.terminate();

      if (typeof window !== 'undefined') {
        var url = window.URL || window.webkitURL || window.mozURL || window.msURL;

        if (url && url.revokeObjectURL && this.value.objectURL) {
          url.revokeObjectURL(this.value.objectURL);
        }
      }
    }
  };
} ////////////////////////////////////////////////////////////////////////////////
// API methods


function Pica(options) {
  if (!(this instanceof Pica)) return new Pica(options);
  this.options = assign({}, DEFAULT_PICA_OPTS, options || {});
  var limiter_key = "lk_".concat(this.options.concurrency); // Share limiters to avoid multiple parallel workers when user creates
  // multiple pica instances.

  this.__limit = singletones[limiter_key] || utils.limiter(this.options.concurrency);
  if (!singletones[limiter_key]) singletones[limiter_key] = this.__limit; // List of supported features, according to options & browser/node.js

  this.features = {
    js: false,
    // pure JS implementation, can be disabled for testing
    wasm: false,
    // webassembly implementation for heavy functions
    cib: false,
    // resize via createImageBitmap (only FF at this moment)
    ww: false // webworkers

  };
  this.__workersPool = null; // Store requested features for webworkers

  this.__requested_features = [];
  this.__mathlib = null;
}

Pica.prototype.init = function () {
  var _this = this;

  if (this.__initPromise) return this.__initPromise; // Test if we can create ImageData without canvas and memory copy

  if (typeof ImageData !== 'undefined' && typeof Uint8ClampedArray !== 'undefined') {
    try {
      /* eslint-disable no-new */
      new ImageData(new Uint8ClampedArray(400), 10, 10);
      CAN_NEW_IMAGE_DATA = true;
    } catch (__) {}
  } // ImageBitmap can be effective in 2 places:
  //
  // 1. Threaded jpeg unpack (basic)
  // 2. Built-in resize (blocked due problem in chrome, see issue #89)
  //
  // For basic use we also need ImageBitmap wo support .close() method,
  // see https://developer.mozilla.org/ru/docs/Web/API/ImageBitmap


  if (typeof ImageBitmap !== 'undefined') {
    if (ImageBitmap.prototype && ImageBitmap.prototype.close) {
      CAN_CREATE_IMAGE_BITMAP = true;
    } else {
      this.debug('ImageBitmap does not support .close(), disabled');
    }
  }

  var features = this.options.features.slice();

  if (features.indexOf('all') >= 0) {
    features = ['cib', 'wasm', 'js', 'ww'];
  }

  this.__requested_features = features;
  this.__mathlib = new MathLib(features); // Check WebWorker support if requested

  if (features.indexOf('ww') >= 0) {
    if (typeof window !== 'undefined' && 'Worker' in window) {
      // IE <= 11 don't allow to create webworkers from string. We should check it.
      // https://connect.microsoft.com/IE/feedback/details/801810/web-workers-from-blob-urls-in-ie-10-and-11
      try {
        var wkr = _dereq_('webworkify')(function () {});

        wkr.terminate();
        this.features.ww = true; // pool uniqueness depends on pool config + webworker config

        var wpool_key = "wp_".concat(JSON.stringify(this.options));

        if (singletones[wpool_key]) {
          this.__workersPool = singletones[wpool_key];
        } else {
          this.__workersPool = new Pool(workerFabric, this.options.idle);
          singletones[wpool_key] = this.__workersPool;
        }
      } catch (__) {}
    }
  }

  var initMath = this.__mathlib.init().then(function (mathlib) {
    // Copy detected features
    assign(_this.features, mathlib.features);
  });

  var checkCibResize;

  if (!CAN_CREATE_IMAGE_BITMAP) {
    checkCibResize = Promise.resolve(false);
  } else {
    checkCibResize = utils.cib_support(this.options.createCanvas).then(function (status) {
      if (_this.features.cib && features.indexOf('cib') < 0) {
        _this.debug('createImageBitmap() resize supported, but disabled by config');

        return;
      }

      if (features.indexOf('cib') >= 0) _this.features.cib = status;
    });
  }

  CAN_USE_CANVAS_GET_IMAGE_DATA = utils.can_use_canvas(this.options.createCanvas);
  var checkOffscreenCanvas;

  if (CAN_CREATE_IMAGE_BITMAP && CAN_NEW_IMAGE_DATA && features.indexOf('ww') !== -1) {
    checkOffscreenCanvas = utils.worker_offscreen_canvas_support();
  } else {
    checkOffscreenCanvas = Promise.resolve(false);
  }

  checkOffscreenCanvas = checkOffscreenCanvas.then(function (result) {
    CAN_USE_OFFSCREEN_CANVAS = result;
  }); // we use createImageBitmap to crop image data and pass it to workers,
  // so need to check whether function works correctly;
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1220671

  var checkCibRegion = utils.cib_can_use_region().then(function (result) {
    CAN_USE_CIB_REGION_FOR_IMAGE = result;
  }); // Init math lib. That's async because can load some

  this.__initPromise = Promise.all([initMath, checkCibResize, checkOffscreenCanvas, checkCibRegion]).then(function () {
    return _this;
  });
  return this.__initPromise;
}; // Call resizer in webworker or locally, depending on config


Pica.prototype.__invokeResize = function (tileOpts, opts) {
  var _this2 = this;

  // Share cache between calls:
  //
  // - wasm instance
  // - wasm memory object
  //
  opts.__mathCache = opts.__mathCache || {};
  return Promise.resolve().then(function () {
    if (!_this2.features.ww) {
      // not possible to have ImageBitmap here if user disabled WW
      return {
        data: _this2.__mathlib.resizeAndUnsharp(tileOpts, opts.__mathCache)
      };
    }

    return new Promise(function (resolve, reject) {
      var w = _this2.__workersPool.acquire();

      if (opts.cancelToken) opts.cancelToken["catch"](function (err) {
        return reject(err);
      });

      w.value.onmessage = function (ev) {
        w.release();
        if (ev.data.err) reject(ev.data.err);else resolve(ev.data);
      };

      var transfer = [];
      if (tileOpts.src) transfer.push(tileOpts.src.buffer);
      if (tileOpts.srcBitmap) transfer.push(tileOpts.srcBitmap);
      w.value.postMessage({
        opts: tileOpts,
        features: _this2.__requested_features,
        preload: {
          wasm_nodule: _this2.__mathlib.__
        }
      }, transfer);
    });
  });
}; // this function can return promise if createImageBitmap is used


Pica.prototype.__extractTileData = function (tile, from, opts, stageEnv, extractTo) {
  if (this.features.ww && CAN_USE_OFFSCREEN_CANVAS && ( // createImageBitmap doesn't work for images (Image, ImageBitmap) with Exif orientation in Chrome,
  // can use canvas because canvas doesn't have orientation;
  // see https://bugs.chromium.org/p/chromium/issues/detail?id=1220671
  utils.isCanvas(from) || CAN_USE_CIB_REGION_FOR_IMAGE)) {
    this.debug('Create tile for OffscreenCanvas');
    return createImageBitmap(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height).then(function (bitmap) {
      extractTo.srcBitmap = bitmap;
      return extractTo;
    });
  } // Extract tile RGBA buffer, depending on input type


  if (utils.isCanvas(from)) {
    if (!stageEnv.srcCtx) stageEnv.srcCtx = from.getContext('2d', {
      alpha: Boolean(opts.alpha)
    }); // If input is Canvas - extract region data directly

    this.debug('Get tile pixel data');
    extractTo.src = stageEnv.srcCtx.getImageData(tile.x, tile.y, tile.width, tile.height).data;
    return extractTo;
  } // If input is Image or decoded to ImageBitmap,
  // draw region to temporary canvas and extract data from it
  //
  // Note! Attempt to reuse this canvas causes significant slowdown in chrome
  //


  this.debug('Draw tile imageBitmap/image to temporary canvas');
  var tmpCanvas = this.options.createCanvas(tile.width, tile.height);
  var tmpCtx = tmpCanvas.getContext('2d', {
    alpha: Boolean(opts.alpha)
  });
  tmpCtx.globalCompositeOperation = 'copy';
  tmpCtx.drawImage(stageEnv.srcImageBitmap || from, tile.x, tile.y, tile.width, tile.height, 0, 0, tile.width, tile.height);
  this.debug('Get tile pixel data');
  extractTo.src = tmpCtx.getImageData(0, 0, tile.width, tile.height).data; // Safari 12 workaround
  // https://github.com/nodeca/pica/issues/199

  tmpCanvas.width = tmpCanvas.height = 0;
  return extractTo;
};

Pica.prototype.__landTileData = function (tile, result, stageEnv) {
  var toImageData;
  this.debug('Convert raw rgba tile result to ImageData');

  if (result.bitmap) {
    stageEnv.toCtx.drawImage(result.bitmap, tile.toX, tile.toY);
    return null;
  }

  if (CAN_NEW_IMAGE_DATA) {
    // this branch is for modern browsers
    // If `new ImageData()` & Uint8ClampedArray suported
    toImageData = new ImageData(new Uint8ClampedArray(result.data), tile.toWidth, tile.toHeight);
  } else {
    // fallback for `node-canvas` and old browsers
    // (IE11 has ImageData but does not support `new ImageData()`)
    toImageData = stageEnv.toCtx.createImageData(tile.toWidth, tile.toHeight);

    if (toImageData.data.set) {
      toImageData.data.set(result.data);
    } else {
      // IE9 don't have `.set()`
      for (var i = toImageData.data.length - 1; i >= 0; i--) {
        toImageData.data[i] = result.data[i];
      }
    }
  }

  this.debug('Draw tile');

  if (NEED_SAFARI_FIX) {
    // Safari draws thin white stripes between tiles without this fix
    stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth + 1e-5, tile.toInnerHeight + 1e-5);
  } else {
    stageEnv.toCtx.putImageData(toImageData, tile.toX, tile.toY, tile.toInnerX - tile.toX, tile.toInnerY - tile.toY, tile.toInnerWidth, tile.toInnerHeight);
  }

  return null;
};

Pica.prototype.__tileAndResize = function (from, to, opts) {
  var _this3 = this;

  var stageEnv = {
    srcCtx: null,
    srcImageBitmap: null,
    isImageBitmapReused: false,
    toCtx: null
  };

  var processTile = function processTile(tile) {
    return _this3.__limit(function () {
      if (opts.canceled) return opts.cancelToken;
      var tileOpts = {
        width: tile.width,
        height: tile.height,
        toWidth: tile.toWidth,
        toHeight: tile.toHeight,
        scaleX: tile.scaleX,
        scaleY: tile.scaleY,
        offsetX: tile.offsetX,
        offsetY: tile.offsetY,
        filter: opts.filter,
        alpha: opts.alpha,
        unsharpAmount: opts.unsharpAmount,
        unsharpRadius: opts.unsharpRadius,
        unsharpThreshold: opts.unsharpThreshold
      };

      _this3.debug('Invoke resize math');

      return Promise.resolve(tileOpts).then(function (tileOpts) {
        return _this3.__extractTileData(tile, from, opts, stageEnv, tileOpts);
      }).then(function (tileOpts) {
        _this3.debug('Invoke resize math');

        return _this3.__invokeResize(tileOpts, opts);
      }).then(function (result) {
        if (opts.canceled) return opts.cancelToken;
        stageEnv.srcImageData = null;
        return _this3.__landTileData(tile, result, stageEnv);
      });
    });
  }; // Need to normalize data source first. It can be canvas or image.
  // If image - try to decode in background if possible


  return Promise.resolve().then(function () {
    stageEnv.toCtx = to.getContext('2d', {
      alpha: Boolean(opts.alpha)
    });
    if (utils.isCanvas(from)) return null;

    if (utils.isImageBitmap(from)) {
      stageEnv.srcImageBitmap = from;
      stageEnv.isImageBitmapReused = true;
      return null;
    }

    if (utils.isImage(from)) {
      // try do decode image in background for faster next operations;
      // if we're using offscreen canvas, cib is called per tile, so not needed here
      if (!CAN_CREATE_IMAGE_BITMAP) return null;

      _this3.debug('Decode image via createImageBitmap');

      return createImageBitmap(from).then(function (imageBitmap) {
        stageEnv.srcImageBitmap = imageBitmap;
      }) // Suppress error to use fallback, if method fails
      // https://github.com/nodeca/pica/issues/190

      /* eslint-disable no-unused-vars */
      ["catch"](function (e) {
        return null;
      });
    }

    throw new Error('Pica: ".from" should be Image, Canvas or ImageBitmap');
  }).then(function () {
    if (opts.canceled) return opts.cancelToken;

    _this3.debug('Calculate tiles'); //
    // Here we are with "normalized" source,
    // follow to tiling
    //


    var regions = createRegions({
      width: opts.width,
      height: opts.height,
      srcTileSize: _this3.options.tile,
      toWidth: opts.toWidth,
      toHeight: opts.toHeight,
      destTileBorder: opts.__destTileBorder
    });
    var jobs = regions.map(function (tile) {
      return processTile(tile);
    });

    function cleanup(stageEnv) {
      if (stageEnv.srcImageBitmap) {
        if (!stageEnv.isImageBitmapReused) stageEnv.srcImageBitmap.close();
        stageEnv.srcImageBitmap = null;
      }
    }

    _this3.debug('Process tiles');

    return Promise.all(jobs).then(function () {
      _this3.debug('Finished!');

      cleanup(stageEnv);
      return to;
    }, function (err) {
      cleanup(stageEnv);
      throw err;
    });
  });
};

Pica.prototype.__processStages = function (stages, from, to, opts) {
  var _this4 = this;

  if (opts.canceled) return opts.cancelToken;

  var _stages$shift = stages.shift(),
      _stages$shift2 = _slicedToArray(_stages$shift, 2),
      toWidth = _stages$shift2[0],
      toHeight = _stages$shift2[1];

  var isLastStage = stages.length === 0; // Optimization for legacy filters -
  // only use user-defined quality for the last stage,
  // use simpler (Hamming) filter for the first stages where
  // scale factor is large enough (more than 2-3)
  //
  // For advanced filters (mks2013 and custom) - skip optimization,
  // because need to apply sharpening every time

  var filter;
  if (isLastStage || filter_info.q2f.indexOf(opts.filter) < 0) filter = opts.filter;else if (opts.filter === 'box') filter = 'box';else filter = 'hamming';
  opts = assign({}, opts, {
    toWidth: toWidth,
    toHeight: toHeight,
    filter: filter
  });
  var tmpCanvas;

  if (!isLastStage) {
    // create temporary canvas
    tmpCanvas = this.options.createCanvas(toWidth, toHeight);
  }

  return this.__tileAndResize(from, isLastStage ? to : tmpCanvas, opts).then(function () {
    if (isLastStage) return to;
    opts.width = toWidth;
    opts.height = toHeight;
    return _this4.__processStages(stages, tmpCanvas, to, opts);
  }).then(function (res) {
    if (tmpCanvas) {
      // Safari 12 workaround
      // https://github.com/nodeca/pica/issues/199
      tmpCanvas.width = tmpCanvas.height = 0;
    }

    return res;
  });
};

Pica.prototype.__resizeViaCreateImageBitmap = function (from, to, opts) {
  var _this5 = this;

  var toCtx = to.getContext('2d', {
    alpha: Boolean(opts.alpha)
  });
  this.debug('Resize via createImageBitmap()');
  return createImageBitmap(from, {
    resizeWidth: opts.toWidth,
    resizeHeight: opts.toHeight,
    resizeQuality: utils.cib_quality_name(filter_info.f2q[opts.filter])
  }).then(function (imageBitmap) {
    if (opts.canceled) return opts.cancelToken; // if no unsharp - draw directly to output canvas

    if (!opts.unsharpAmount) {
      toCtx.drawImage(imageBitmap, 0, 0);
      imageBitmap.close();
      toCtx = null;

      _this5.debug('Finished!');

      return to;
    }

    _this5.debug('Unsharp result');

    var tmpCanvas = _this5.options.createCanvas(opts.toWidth, opts.toHeight);

    var tmpCtx = tmpCanvas.getContext('2d', {
      alpha: Boolean(opts.alpha)
    });
    tmpCtx.drawImage(imageBitmap, 0, 0);
    imageBitmap.close();
    var iData = tmpCtx.getImageData(0, 0, opts.toWidth, opts.toHeight);

    _this5.__mathlib.unsharp_mask(iData.data, opts.toWidth, opts.toHeight, opts.unsharpAmount, opts.unsharpRadius, opts.unsharpThreshold);

    toCtx.putImageData(iData, 0, 0); // Safari 12 workaround
    // https://github.com/nodeca/pica/issues/199

    tmpCanvas.width = tmpCanvas.height = 0;
    iData = tmpCtx = tmpCanvas = toCtx = null;

    _this5.debug('Finished!');

    return to;
  });
};

Pica.prototype.resize = function (from, to, options) {
  var _this6 = this;

  this.debug('Start resize...');
  var opts = assign({}, DEFAULT_RESIZE_OPTS);

  if (!isNaN(options)) {
    opts = assign(opts, {
      quality: options
    });
  } else if (options) {
    opts = assign(opts, options);
  }

  opts.toWidth = to.width;
  opts.toHeight = to.height;
  opts.width = from.naturalWidth || from.width;
  opts.height = from.naturalHeight || from.height; // Legacy `.quality` option

  if (Object.prototype.hasOwnProperty.call(opts, 'quality')) {
    if (opts.quality < 0 || opts.quality > 3) {
      throw new Error("Pica: .quality should be [0..3], got ".concat(opts.quality));
    }

    opts.filter = filter_info.q2f[opts.quality];
  } // Prevent stepper from infinite loop


  if (to.width === 0 || to.height === 0) {
    return Promise.reject(new Error("Invalid output size: ".concat(to.width, "x").concat(to.height)));
  }

  if (opts.unsharpRadius > 2) opts.unsharpRadius = 2;
  opts.canceled = false;

  if (opts.cancelToken) {
    // Wrap cancelToken to avoid successive resolve & set flag
    opts.cancelToken = opts.cancelToken.then(function (data) {
      opts.canceled = true;
      throw data;
    }, function (err) {
      opts.canceled = true;
      throw err;
    });
  }

  var DEST_TILE_BORDER = 3; // Max possible filter window size

  opts.__destTileBorder = Math.ceil(Math.max(DEST_TILE_BORDER, 2.5 * opts.unsharpRadius | 0));
  return this.init().then(function () {
    if (opts.canceled) return opts.cancelToken; // if createImageBitmap supports resize, just do it and return

    if (_this6.features.cib) {
      if (filter_info.q2f.indexOf(opts.filter) >= 0) {
        return _this6.__resizeViaCreateImageBitmap(from, to, opts);
      }

      _this6.debug('cib is enabled, but not supports provided filter, fallback to manual math');
    }

    if (!CAN_USE_CANVAS_GET_IMAGE_DATA) {
      var err = new Error('Pica: cannot use getImageData on canvas, ' + "make sure fingerprinting protection isn't enabled");
      err.code = 'ERR_GET_IMAGE_DATA';
      throw err;
    } //
    // No easy way, let's resize manually via arrays
    //


    var stages = createStages(opts.width, opts.height, opts.toWidth, opts.toHeight, _this6.options.tile, opts.__destTileBorder);
    return _this6.__processStages(stages, from, to, opts);
  });
}; // RGBA buffer resize
//


Pica.prototype.resizeBuffer = function (options) {
  var _this7 = this;

  var opts = assign({}, DEFAULT_RESIZE_OPTS, options); // Legacy `.quality` option

  if (Object.prototype.hasOwnProperty.call(opts, 'quality')) {
    if (opts.quality < 0 || opts.quality > 3) {
      throw new Error("Pica: .quality should be [0..3], got ".concat(opts.quality));
    }

    opts.filter = filter_info.q2f[opts.quality];
  }

  return this.init().then(function () {
    return _this7.__mathlib.resizeAndUnsharp(opts);
  });
};

Pica.prototype.toBlob = function (canvas, mimeType, quality) {
  mimeType = mimeType || 'image/png';
  return new Promise(function (resolve) {
    if (canvas.toBlob) {
      canvas.toBlob(function (blob) {
        return resolve(blob);
      }, mimeType, quality);
      return;
    }

    if (canvas.convertToBlob) {
      resolve(canvas.convertToBlob({
        type: mimeType,
        quality: quality
      }));
      return;
    } // Fallback for old browsers


    var asString = atob(canvas.toDataURL(mimeType, quality).split(',')[1]);
    var len = asString.length;
    var asBuffer = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
      asBuffer[i] = asString.charCodeAt(i);
    }

    resolve(new Blob([asBuffer], {
      type: mimeType
    }));
  });
};

Pica.prototype.debug = function () {};

module.exports = Pica;

},{"./lib/mathlib":1,"./lib/mm_resize/resize_filter_info":7,"./lib/pool":13,"./lib/stepper":14,"./lib/tiler":15,"./lib/utils":16,"./lib/worker":17,"object-assign":23,"webworkify":24}]},{},[])("/index.js")
});
}(pica));

var Pica = pica.exports;

/**
 * Canvas helper class. Inserts {@link HTMLCanvasElement|element} and handles position and size adjustments.
 */
var Canvas = /*#__PURE__*/function () {
  /**
   * Reference to the HTML canvas {@link HTMLCanvasElement|element}.
   */

  /**
   * Canvas rendering context of {@link Canvas.element|the canvas element}.
   */

  /**
   * Creates an instance of the canvas helper class.
   */
  function Canvas() {
    _classCallCheck(this, Canvas);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "context", void 0);

    this.element = document.createElement('canvas');
    this.context = this.element.getContext('2d');
  }
  /**
   * Inserts canvas html element right after the reference element.
   *
   * @param refElement - Reference {@link HTMLElement|element} where we want position the canvas.
   */


  _createClass(Canvas, [{
    key: "insert",
    value: function insert(refElement) {
      var _refElement$parentNod;

      this.element.style.position = 'absolute';
      this.element.style.touchAction = 'none';
      this.adjustFromElement(refElement);
      (_refElement$parentNod = refElement.parentNode) === null || _refElement$parentNod === void 0 ? void 0 : _refElement$parentNod.insertBefore(this.element, refElement.nextSibling);
    }
    /**
     * Adjusts canvas size and position.
     *
     * @param width  - New width for canvas.
     * @param height - New height for canvas.
     * @param top    - New top position for canvas.
     * @param left   - New left position for canvas.
     */

  }, {
    key: "adjust",
    value: function adjust(width, height, top, left) {
      this.element.setAttribute('width', width.toString());
      this.element.setAttribute('height', height.toString());
      this.element.style.width = "".concat(width, "px");
      this.element.style.height = "".concat(height, "px");
      this.element.style.top = "".concat(top, "px");
      this.element.style.left = "".concat(left, "px");
    }
    /**
     * Adjust canvas size and position from existing element.
     *
     * @param element - Existing {@link HTMLElement|element} as reference.
     */

  }, {
    key: "adjustFromElement",
    value: function adjustFromElement(element) {
      this.adjust(element.clientWidth, element.clientHeight, element.offsetTop, element.offsetLeft);
    }
    /**
     * Clear the canvas area.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.context.clearRect(0, 0, this.element.width, this.element.height);
      return this;
    }
    /**
     * Draw stroke as a path on canvas area.
     *
     * @param stroke - {@link Stroke|Stroke} object with meta data.
     * @param ratio  - Image/canvas ratio.
     */

  }, {
    key: "drawStroke",
    value: function () {
      var _drawStroke = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(stroke, ratio) {
        var i, start, end;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(Array.isArray(stroke.points) === false || stroke.points.length < 2)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this.context.beginPath(); // Connect each points to get finally a stroke

                for (i = 0; i < stroke.points.length - 1; i++) {
                  start = stroke.points[i];
                  end = stroke.points[i + 1];
                  this.context.moveTo(start.x / ratio, start.y / ratio);
                  this.context.lineTo(end.x / ratio, end.y / ratio);
                }

                this.context.closePath();
                this.context.strokeStyle = stroke.color;
                this.context.lineWidth = stroke.width / ratio; // If stroke width is bigger as defined max-width (cause of image ratio),
                // we will set it as width.

                if (stroke.maxWidth > 0 && this.context.lineWidth > stroke.maxWidth) {
                  this.context.lineWidth = stroke.maxWidth;
                }

                this.context.lineJoin = stroke.join;
                this.context.lineCap = stroke.cap;
                this.context.miterLimit = stroke.miterLimit;
                this.context.stroke();

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function drawStroke(_x, _x2) {
        return _drawStroke.apply(this, arguments);
      }

      return drawStroke;
    }()
  }]);

  return Canvas;
}();

/**
 * Image sketchpad options.
 */

/**
 * Image sketchpad user options setting all properties as not required (Partial).
 */

/**
 * Image sketchpad default options.
 */
var DefaultOptions = {
  lineWidth: 5,
  lineMaxWidth: -1,
  lineColor: '#000',
  lineCap: 'round',
  lineJoin: 'round',
  lineMiterLimit: 10,
  enabled: true,
  writeJsonToHtmlAttribute: true
};

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Image sketchpad main class. It handles creation of canvas element, drawing on
 * it, and merge it with the image and handle the data as json out- or input.
 */

var ImageSketchpad = /*#__PURE__*/function () {
  /**
   * Canvas helper class.
   */

  /**
   * Pica for image resizing. Used for saving in browser resized images.
   */

  /**
   * Image element where we draw on it.
   */

  /**
   * Sketchpad settings, initialized with default options.
   */

  /**
   * Array of strokes which represents your sketch.
   */

  /**
   * Helper variable for "redo" method.
   */

  /**
   * Helper variable if user started drawing a line.
   */

  /**
   * Helper variable to get the save the active stroke during sketching is true.
   */

  /**
   * Register image adjustment on resize.
   */

  /**
   * Creates an instance of image sketchpad.
   *
   * @param image   - Image html element.
   * @param options - Sketchpad options as javascript object.
   *
   * @example
   *
   * Run image sketchpad
   *
   * # VanillaJS
   *
   * ```
   * const imageEl = document.getElementById('Image');
   * const sketchPad = ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
   * ```
   *
   */
  function ImageSketchpad(image, options) {
    var _this = this;

    _classCallCheck(this, ImageSketchpad);

    _defineProperty(this, "canvas", new Canvas());

    _defineProperty(this, "pica", new Pica({
      features: ['js', 'wasm']
    }));

    _defineProperty(this, "image", void 0);

    _defineProperty(this, "options", DefaultOptions);

    _defineProperty(this, "strokes", []);

    _defineProperty(this, "undoneStrokes", []);

    _defineProperty(this, "sketching", false);

    _defineProperty(this, "activeStroke", []);

    _defineProperty(this, "resizeHandler", void 0);

    // Check if element is defined and has a "src" attribute (simple check for image element)
    if (image === null || image === undefined || image.src === undefined) {
      this.throwError('Must pass in a html image element with "src" attribute');
    } // Throw error on double initialization (in theory: this should never happen)


    if (image.classList.contains('sketchpad-loaded') === true) {
      this.throwError('Double initialization');
    }

    this.image = image; // If some user options are given we will merge them with the default ones

    if (options) {
      this.setOptions(options);
    } // Create a initialization id and set it as data attribute and css class to the image


    var instanceId = Math.random().toString(36).slice(2, 11);
    this.image.classList.add('sketchpad-loaded');
    this.image.classList.add("sketchpad-".concat(instanceId));
    this.image.dataset['sketchpad'] = instanceId;

    this.resizeHandler = function () {
      if (_this.image.width !== _this.canvas.element.width) {
        _this.canvas.adjustFromElement(_this.image);

        _this.redrawAsync().catch(_this.throwError);
      }
    };

    this.canvas.insert(this.image); // Register event listeners

    this.listen().catch(this.throwError); // If we have a "data-sketchpad-json" attribute we will try to load the sketch

    if (this.image.dataset['sketchpadJson']) {
      this.loadJson(this.image.dataset['sketchpadJson']).catch(this.throwError);
    }
  }
  /**
   * Set sketchpad options.
   *
   * @param options - Sketchpad options.
   */


  _createClass(ImageSketchpad, [{
    key: "setOptions",
    value: function setOptions(options) {
      this.options = Object.assign(this.options, options);
      return this;
    }
    /**
     * Enables image sketchpad.
     */

  }, {
    key: "enable",
    value: function enable() {
      this.options.enabled = true;
      return this;
    }
    /**
     * Disables image sketchpad.
     */

  }, {
    key: "disable",
    value: function disable() {
      this.options.enabled = false;
      return this;
    }
    /**
     * Get a json string which can be used to load a sketch again.
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return JSON.stringify(Object.assign({}, {
        strokes: this.strokes,
        options: this.options
      }));
    }
  }, {
    key: "toJsonAsync",
    value: function () {
      var _toJsonAsync = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.toJson());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function toJsonAsync() {
        return _toJsonAsync.apply(this, arguments);
      }

      return toJsonAsync;
    }()
    /**
     * Load a sketch from a json string.
     *
     * @param json - JSON string to parse.
     */

  }, {
    key: "loadJson",
    value: function () {
      var _loadJson = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(json) {
        var object;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                object = JSON.parse(json);
                _context2.next = 7;
                break;

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                throw new Error(String(_context2.t0));

              case 7:
                this.image.dataset['sketchpadJson'] = json;
                this.strokes = object.strokes || [];
                this.setOptions(object.options).redrawAsync().catch(this.throwError);
                return _context2.abrupt("return", this);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 4]]);
      }));

      function loadJson(_x) {
        return _loadJson.apply(this, arguments);
      }

      return loadJson;
    }()
    /**
     * Clears the image sketchpad.
     */

  }, {
    key: "clear",
    value: function clear() {
      this.strokes = [];
      this.redrawAsync().catch(this.throwError);
      return this;
    }
    /**
     * UnDo the last drawing on your sketch.
     */

  }, {
    key: "undo",
    value: function undo() {
      if (this.strokes.length === 0) {
        return this;
      }

      var stroke = this.strokes.pop();
      this.undoneStrokes.push(stroke);
      this.redrawAsync().catch(this.throwError);
      return this;
    }
    /**
     * ReDo the last UnDone drawing on your sketch.
     */

  }, {
    key: "redo",
    value: function redo() {
      if (this.undoneStrokes.length === 0) {
        return this;
      }

      var stroke = this.undoneStrokes.pop();
      this.strokes.push(stroke);
      this.redrawAsync().catch(this.throwError);
      return this;
    }
    /**
     * Merges image with sketch and returns a base64 string as promise.
     *
     * @param originalSize - Download image with original size.
     */

  }, {
    key: "mergeImageWithSketch",
    value: function () {
      var _mergeImageWithSketch = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3() {
        var _this2 = this;

        var originalSize,
            tmpCanvas,
            imageSource,
            _this$canvas$element$,
            naturalSize,
            _args3 = arguments;

        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                originalSize = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : true;
                imageSource = this.image.src;

                if (!(originalSize === true)) {
                  _context3.next = 11;
                  break;
                }

                // Clone the canvas and redraw with image natural width and height to get an
                // original sized sketch before merging. For sure there is a better way to do that
                naturalSize = {
                  width: this.image.naturalWidth,
                  height: this.image.naturalHeight
                };
                tmpCanvas = this.canvas.element.cloneNode();
                drawToCanvas(this.canvas.element, tmpCanvas);
                this.canvas.adjust(naturalSize.width, naturalSize.height, 0, -(naturalSize.width * 2));
                (_this$canvas$element$ = this.canvas.element.parentNode) === null || _this$canvas$element$ === void 0 ? void 0 : _this$canvas$element$.insertBefore(tmpCanvas, this.canvas.element);
                this.redraw(1);
                _context3.next = 21;
                break;

              case 11:
                // Create a canvas with the resized image set by client width and height
                tmpCanvas = document.createElement('canvas');
                tmpCanvas.width = this.image.clientWidth;
                tmpCanvas.height = this.image.clientHeight;
                tmpCanvas.style.position = 'absolute';
                tmpCanvas.style.top = '0';
                tmpCanvas.style.left = "-".concat(this.image.clientWidth, "px");
                _context3.next = 19;
                return this.pica.resize(this.image, tmpCanvas, {
                  alpha: true
                });

              case 19:
                tmpCanvas = _context3.sent;
                imageSource = tmpCanvas.toDataURL();

              case 21:
                return _context3.abrupt("return", mergeImages([imageSource, this.canvas.element.toDataURL()]).then(function (b64Image) {
                  tmpCanvas.remove();

                  if (originalSize === true) {
                    _this2.canvas.adjustFromElement(_this2.image);

                    _this2.redraw();
                  }

                  return b64Image;
                }));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function mergeImageWithSketch() {
        return _mergeImageWithSketch.apply(this, arguments);
      }

      return mergeImageWithSketch;
    }()
    /**
     * Download merged image with sketch as png file.
     *
     * @param originalSize - Download image with original size.
     */

  }, {
    key: "download",
    value: function () {
      var _download2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
        var originalSize,
            fileName,
            _args4 = arguments;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                originalSize = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                fileName = this.image.src;
                fileName = fileName.toLowerCase().startsWith('data:') ? String(Date.now()) : String(String(fileName.split('\\').pop()).split('/').pop());
                fileName += '.sketch.png';
                return _context4.abrupt("return", this.mergeImageWithSketch(originalSize).then(function (b64) {
                  _download(b64, fileName, 'image/png');

                  return b64;
                }));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function download() {
        return _download2.apply(this, arguments);
      }

      return download;
    }()
    /**
     * Destroy the instance and remove the canvas.
     */

  }, {
    key: "destroy",
    value: function destroy() {
      window.removeEventListener('resize', this.resizeHandler, false);
      this.undoneStrokes = [];
      this.strokes = [];
      this.options = DefaultOptions;
      this.canvas.element.onpointerdown = null;
      this.canvas.element.remove();
    }
    /**
     * Register event listener for responsive adjustments and drawings.
     */

  }, {
    key: "listen",
    value: function () {
      var _listen = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
        var _this3 = this;

        var imgEventLoad;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                // If the image is not completely loaded we will add an event listener to
                // re-adjust the canvas
                if (this.image.complete === false) {
                  imgEventLoad = function imgEventLoad() {
                    _this3.resizeHandler();

                    _this3.image.removeEventListener('load', imgEventLoad);
                  };

                  this.image.addEventListener('load', imgEventLoad);
                }

                window.addEventListener('resize', this.resizeHandler, {
                  passive: true
                });

                this.canvas.element.onpointerdown = /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(event) {
                    return regenerator.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            if (!(_this3.options.enabled === false)) {
                              _context7.next = 2;
                              break;
                            }

                            return _context7.abrupt("return");

                          case 2:
                            _this3.canvas.element.setPointerCapture(event.pointerId);

                            _context7.next = 5;
                            return _this3.startStrokeHandler(event);

                          case 5:
                            _this3.canvas.element.onpointermove = /*#__PURE__*/function () {
                              var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(event) {
                                return regenerator.wrap(function _callee5$(_context5) {
                                  while (1) {
                                    switch (_context5.prev = _context5.next) {
                                      case 0:
                                        void _this3.drawStrokeHandler(event);

                                      case 1:
                                      case "end":
                                        return _context5.stop();
                                    }
                                  }
                                }, _callee5);
                              }));

                              return function (_x3) {
                                return _ref2.apply(this, arguments);
                              };
                            }();

                            _this3.canvas.element.onpointerup = /*#__PURE__*/function () {
                              var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(event) {
                                return regenerator.wrap(function _callee6$(_context6) {
                                  while (1) {
                                    switch (_context6.prev = _context6.next) {
                                      case 0:
                                        void _this3.endStrokeHandler(event);
                                        _this3.canvas.element.onpointermove = null;
                                        _this3.canvas.element.onpointerup = null;

                                      case 3:
                                      case "end":
                                        return _context6.stop();
                                    }
                                  }
                                }, _callee6);
                              }));

                              return function (_x4) {
                                return _ref3.apply(this, arguments);
                              };
                            }();

                          case 7:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }();

                return _context8.abrupt("return", this);

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function listen() {
        return _listen.apply(this, arguments);
      }

      return listen;
    }()
    /**
     * Starts stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */

  }, {
    key: "startStrokeHandler",
    value: function () {
      var _startStrokeHandler = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9(event) {
        var point, stroke;
        return regenerator.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this.sketching = true;
                point = this.getPointFromCursor(event);
                stroke = this.createStroke([point]);
                this.activeStroke[event.pointerId] = stroke;
                this.strokes.push(stroke);
                this.redraw();
                return _context9.abrupt("return", this);

              case 7:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function startStrokeHandler(_x5) {
        return _startStrokeHandler.apply(this, arguments);
      }

      return startStrokeHandler;
    }()
    /**
     * Draws stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */

  }, {
    key: "drawStrokeHandler",
    value: function () {
      var _drawStrokeHandler = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10(event) {
        var point;
        return regenerator.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.sketching === false)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", this);

              case 2:
                point = this.getPointFromCursor(event);
                this.pushPoint(point, this.activeStroke[event.pointerId]).redrawAsync().catch(this.throwError);
                return _context10.abrupt("return", this);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function drawStrokeHandler(_x6) {
        return _drawStrokeHandler.apply(this, arguments);
      }

      return drawStrokeHandler;
    }()
    /**
     * Ends stroke handler.
     *
     * @param event - {@link PointerEvent | Pointer event} is an extended mouse event which will handle touches too.
     */

  }, {
    key: "endStrokeHandler",
    value: function () {
      var _endStrokeHandler = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11(event) {
        var point;
        return regenerator.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!(this.sketching === false)) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", this);

              case 2:
                point = this.getPointFromCursor(event);
                this.pushPoint(point, this.activeStroke[event.pointerId]).redraw();

                if (this.options.writeJsonToHtmlAttribute === true) {
                  this.image.dataset['sketchpadJson'] = this.toJson();
                }

                this.sketching = false;
                this.activeStroke[event.pointerId] = undefined;
                return _context11.abrupt("return", this);

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function endStrokeHandler(_x7) {
        return _endStrokeHandler.apply(this, arguments);
      }

      return endStrokeHandler;
    }()
    /**
     * Get the image ratio.
     */

  }, {
    key: "getImageRatio",
    value: function getImageRatio() {
      return this.image.naturalWidth / this.image.width;
    }
    /**
     * Get a {@link Point | Point} from the cursor(mouse) or finger(touch).
     *
     * @param event - {@link PointerEvent | Pointer event} triggered from pointerdown, pointermove or pointerup.
     */

  }, {
    key: "getPointFromCursor",
    value: function getPointFromCursor(event) {
      var rect = this.canvas.element.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * this.getImageRatio(),
        y: (event.clientY - rect.top) * this.getImageRatio()
      };
    }
    /**
     * Create stroke from an array of {@link Point | Points}.
     *
     * @param points - Array of {@link Point | Points}.
     */

  }, {
    key: "createStroke",
    value: function createStroke(points) {
      return {
        points: points,
        width: this.options.lineWidth,
        maxWidth: this.options.lineMaxWidth,
        color: this.options.lineColor,
        cap: this.options.lineCap,
        join: this.options.lineJoin,
        miterLimit: this.options.lineMiterLimit
      };
    }
    /**
     * Push {@link Point | Point} to {@link Stroke | Stroke}.
     *
     * @param point  - {@link Point | Point} to push.
     * @param stroke - {@link Stroke | Stroke} to push into.
     */

  }, {
    key: "pushPoint",
    value: function pushPoint(point, stroke) {
      var _stroke, _stroke2, _stroke2$points;

      stroke = (_stroke = stroke) !== null && _stroke !== void 0 ? _stroke : this.strokes[this.strokes.length - 1];
      (_stroke2 = stroke) === null || _stroke2 === void 0 ? void 0 : (_stroke2$points = _stroke2.points) === null || _stroke2$points === void 0 ? void 0 : _stroke2$points.push(point);
      return this;
    }
    /**
     * Redraw the sketch on the canvas. Mean it clears first and draw all
     * strokes again.
     *
     * @param imageRatio - Redraw with a specified image ratio (for example if
     *                     you want draw the canvas in original size).
     */

  }, {
    key: "redraw",
    value: function redraw(imageRatio) {
      var _imageRatio;

      imageRatio = (_imageRatio = imageRatio) !== null && _imageRatio !== void 0 ? _imageRatio : this.getImageRatio();
      this.canvas.clear();

      var _iterator = _createForOfIteratorHelper(this.strokes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var stroke = _step.value;
          this.canvas.drawStroke(stroke, imageRatio).catch(this.throwError);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this;
    }
    /**
     * Throws an error.
     *
     * @param this  - Self.
     * @param error - Error message.
     */

  }, {
    key: "throwError",
    value: function throwError(error) {
      throw new Error(String(error));
    }
    /**
     * Async method of {@link ImageSketchpad.redraw | ImageSketchpad.redraw()}
     */

  }, {
    key: "redrawAsync",
    value: function () {
      var _redrawAsync = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12() {
        return regenerator.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this.redraw());

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function redrawAsync() {
        return _redrawAsync.apply(this, arguments);
      }

      return redrawAsync;
    }()
  }]);

  return ImageSketchpad;
}();

/**
 * Save sketchpad instances to this object
 *
 * @internal
 */
var instances = {};
/**
 * Initialize new sketchpad or return an already initialized.
 *
 * @param element  - HTML image element.
 * @param options  - Image sketchpad options. {@link ImageSketchpad.DefaultOptions | Default Options}
 */

var init = function init(element, options) {
  if (element !== null && element !== void 0 && element.dataset['sketchpad'] && instances[element === null || element === void 0 ? void 0 : element.dataset['sketchpad']]) {
    return instances[element === null || element === void 0 ? void 0 : element.dataset['sketchpad']];
  }

  var newInstance = new ImageSketchpad(element, options);

  if (element !== null && element !== void 0 && element.dataset['sketchpad']) {
    instances[element.dataset['sketchpad']] = newInstance;
  }

  return newInstance;
};

export { init as default };
