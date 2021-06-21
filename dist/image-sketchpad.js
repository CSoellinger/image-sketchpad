var ImageSketchpad = (function () {
  'use strict';

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
    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

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
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
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
    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };
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
    Gp[iteratorSymbol] = function() {
      return this;
    };

    Gp.toString = function() {
      return "[object Generator]";
    };

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
    // in case runtime.js accidentally runs in strict mode, we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    Function("r", "regeneratorRuntime = r")(runtime);
  }
  }(runtime));

  var regenerator = runtime.exports;

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

      this.element = void 0;
      this.context = void 0;
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
      value: function () {
        var _insert = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(refElement) {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.element.style.position = 'absolute';
                  this.adjustFromElement(refElement).catch(this.throwError);

                  if (refElement.parentNode) {
                    refElement.parentNode.insertBefore(this.element, refElement.nextSibling);
                  }

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function insert(_x) {
          return _insert.apply(this, arguments);
        }

        return insert;
      }()
      /**
       * Adjusts canvas size and position
       *
       * @param width   - New width for canvas
       * @param height  - New height for canvas
       * @param top     - New top position for canvas
       * @param left    - New left position for canvas
       */

    }, {
      key: "adjust",
      value: function () {
        var _adjust = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(width, height, top, left) {
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  this.element.setAttribute('width', width.toString());
                  this.element.setAttribute('height', height.toString());
                  this.element.style.width = "".concat(width, "px");
                  this.element.style.height = "".concat(height, "px");
                  this.element.style.top = "".concat(top, "px");
                  this.element.style.left = "".concat(left, "px");

                case 6:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function adjust(_x2, _x3, _x4, _x5) {
          return _adjust.apply(this, arguments);
        }

        return adjust;
      }()
      /**
       * Adjust canvas size and position from existing element
       *
       * @param element - Existing {@link HTMLElement|element} as reference
       */

    }, {
      key: "adjustFromElement",
      value: function () {
        var _adjustFromElement = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(element) {
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  this.adjust(element.clientWidth, element.clientHeight, element.offsetTop, element.offsetLeft).catch(this.throwError);

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function adjustFromElement(_x6) {
          return _adjustFromElement.apply(this, arguments);
        }

        return adjustFromElement;
      }()
      /**
       * Clear the canvas area
       */

    }, {
      key: "clear",
      value: function clear() {
        if (this.context === null) {
          return this;
        }

        this.context.clearRect(0, 0, this.element.width, this.element.height);
        return this;
      }
      /**
       * Draw stroke as a path on canvas area
       *
       * @param stroke  - {@link Stroke|Stroke} object with meta data
       * @param ratio   - Image/canvas ratio
       */

    }, {
      key: "drawStroke",
      value: function () {
        var _drawStroke = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(stroke, ratio) {
          var i, start, end;
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!(this.context === null || stroke.points === null)) {
                    _context4.next = 2;
                    break;
                  }

                  return _context4.abrupt("return");

                case 2:
                  this.context.beginPath(); // Connect each points to get finally a stroke

                  for (i = 0; i < stroke.points.length - 1; i++) {
                    start = stroke.points[i];
                    end = stroke.points[i + 1];
                    this.context.moveTo(start.x / ratio, start.y / ratio);
                    this.context.lineTo(end.x / ratio, end.y / ratio);
                  }

                  this.context.closePath();

                  if (stroke.color) {
                    this.context.strokeStyle = stroke.color;
                  }

                  if (stroke.width) {
                    this.context.lineWidth = stroke.width / ratio; // If stroke width is bigger as defined max-width (cause of image ratio),
                    // we will set it as width.

                    if ((stroke.maxWidth || 0) > 0 && this.context.lineWidth > (stroke.maxWidth || 0)) {
                      this.context.lineWidth = stroke.maxWidth || 0;
                    }
                  }

                  if (stroke.join) {
                    this.context.lineJoin = stroke.join;
                  }

                  if (stroke.cap) {
                    this.context.lineCap = stroke.cap;
                  }

                  if (stroke.miterLimit) {
                    this.context.miterLimit = stroke.miterLimit;
                  }

                  this.context.stroke();

                case 11:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        function drawStroke(_x7, _x8) {
          return _drawStroke.apply(this, arguments);
        }

        return drawStroke;
      }()
      /**
       * Throws an error
       *
       * @param error - Error object/message
       */

    }, {
      key: "throwError",
      value: function throwError(error) {
        throw new Error(String(error));
      }
    }]);

    return Canvas;
  }();

  /**
   * Image sketchpad options
   */

  /**
   * Image sketchpad default options
   */
  var DefaultOptions = {
    lineWidth: 5,
    lineMaxWidth: -1,
    lineColor: '#000',
    lineCap: 'round',
    lineJoin: 'round',
    lineMiterLimit: 10
  };
  /**
   * Image sketchpad user options with all properties as not required
   */

  function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  /**
   * Image sketchpad main class. It handles creation of canvas element, drawing on
   * it, and merge it with the image and handle the data as json out- or input.
   */

  var ImageSketchpad = /*#__PURE__*/function () {
    /**
     * Canvas helper class
     */

    /**
     * Image element where we draw on it.
     */

    /**
     * Sketchpad settings, initialized with default options
     */

    /**
     * Array of strokes which represents your sketch
     */

    /**
     * Enable/disable sketchpad
     */

    /**
     * Helper variable for "redo" method
     */

    /**
     * Helper variable if user started drawing a line
     */

    /**
     * Helper variable to get the save the active stroke during sketching is true
     */

    /**
     * Creates an instance of image sketchpad.
     *
     * @param image   - Image html element
     * @param options - Sketchpad options as javascript object.
     *
     * @example Run image sketchpad
     *
     * # VanillaJS
     *
     * ```
     * const imageEl = document.getElementById('Image');
     * const sketchPad = new ImageSketchpad(imageEl, { lineWidth: 5, lineMaxWidth: 10, lineColor: '#ff0000' });
     * ```
     */
    function ImageSketchpad(image, options) {
      var _this = this;

      _classCallCheck(this, ImageSketchpad);

      this.canvas = new Canvas();
      this.image = void 0;
      this.options = DefaultOptions;
      this.strokes = [];
      this.enabled = true;
      this.undoneStrokes = [];
      this.sketching = false;
      this.activeStroke = void 0;

      // Check if element is defined and has a "src" attribute (simple check for image element)
      if (image === null || image === undefined || image.src === undefined) {
        this.throwError('Must pass in a html image element');
      } // Throw error on double initialization (in theory: this should never happen)


      if (image.classList.contains('sketchpad-loaded') === true) {
        this.throwError('Double initialization');
      }

      this.image = image; // If some user options are given we will merge them with the default ones

      if (options) {
        this.setOptions(options);
      } // Create a initialization id and set it as data attribute and css class to the image


      if (this.image.classList.contains('sketchpad-loaded') === false) {
        var instanceId = Math.random().toString(36).slice(2, 11);
        this.image.classList.add('sketchpad-loaded');
        this.image.classList.add("sketchpad-".concat(instanceId));
        this.image.dataset.sketchpad = instanceId;
        this.canvas.insert(this.image).catch(this.throwError);
      } // If the image is not completely loaded we will add an event listener to
      // re-adjust the canvas


      if (this.image.complete === false) {
        var imgEventLoad = function imgEventLoad() {
          if (_this.image.width !== _this.canvas.element.width) {
            _this.canvas.adjustFromElement(_this.image).catch(_this.throwError);

            _this.redraw();
          }

          _this.image.removeEventListener('load', imgEventLoad);
        };

        this.image.addEventListener('load', imgEventLoad);
      } // Register event listeners


      this.listen().catch(this.throwError); // If we have a "data-sketchpad-json" attribute we will try to load the sketch

      if (this.image.dataset.sketchpadJson) {
        this.loadJson(this.image.dataset.sketchpadJson);
      }
    }
    /**
     * Set sketchpad options
     *
     * @param options - Sketchpad options
     */


    _createClass(ImageSketchpad, [{
      key: "setOptions",
      value: function setOptions(options) {
        this.options = Object.assign(this.options, options);
        return this;
      }
      /**
       * Enables image sketchpad
       */

    }, {
      key: "enable",
      value: function enable() {
        this.enabled = true;
        return this;
      }
      /**
       * Disables image sketchpad
       */

    }, {
      key: "disable",
      value: function disable() {
        this.enabled = false;
        return this;
      }
      /**
       * Get a json string which can be used to load a sketch again
       */

    }, {
      key: "toJson",
      value: function toJson() {
        return JSON.stringify(Object.assign({}, {
          strokes: this.strokes,
          options: this.options,
          imageRatio: this.getImageRatio()
        }));
      }
      /**
       * Load a sketch from a json string
       *
       * @param json - JSON string to parse
       */

    }, {
      key: "loadJson",
      value: function loadJson(json) {
        var object;

        try {
          object = JSON.parse(json);
        } catch (error) {
          throw new Error(String(error));
        }

        this.image.dataset.sketchpadJson = json;
        this.strokes = object.strokes || [];
        this.options = Object.assign(this.options, object.options || {});
        this.redraw();
        return this;
      }
      /**
       * Clears the image sketchpad
       */

    }, {
      key: "clear",
      value: function clear() {
        this.undoneStrokes = [];
        this.strokes = [];
        this.redraw();
        return this;
      }
      /**
       * UnDo the last drawing on your sketch
       */

    }, {
      key: "undo",
      value: function undo() {
        if (this.strokes.length === 0) {
          return this;
        }

        var stroke = this.strokes.pop();

        if (stroke) {
          this.undoneStrokes.push(stroke);
        }

        this.redraw();
        return this;
      }
      /**
       * ReDo the last UnDone drawing on your sketch
       */

    }, {
      key: "redo",
      value: function redo() {
        if (this.undoneStrokes.length === 0) {
          return this;
        }

        var stroke = this.undoneStrokes.pop();

        if (stroke) {
          this.strokes.push(stroke);
        }

        this.redraw();
        return this;
      }
      /**
       * Merges image with sketch and returns a base64 string as promise
       */

    }, {
      key: "mergeImageWithSketch",
      value: function () {
        var _mergeImageWithSketch = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt("return", mergeImages([this.image.src, this.canvas.element.toDataURL()]));

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function mergeImageWithSketch() {
          return _mergeImageWithSketch.apply(this, arguments);
        }

        return mergeImageWithSketch;
      }()
      /**
       * Download merged image with sketch as png file
       */

    }, {
      key: "download",
      value: function download() {
        var fileName = this.image.src;
        fileName = fileName.toLowerCase().startsWith('data:') ? String(Date.now()) : String(String(fileName.split('\\').pop()).split('/').pop());
        fileName += '.sketch.png';
        this.mergeImageWithSketch().then(function (b64) {
          var downloadLink = document.createElement('a');
          downloadLink.href = b64;
          downloadLink.download = fileName;
          downloadLink.click();
        }).catch(this.throwError);
        return this;
      }
      /**
       * Returns package version
       */

    }, {
      key: "version",
      value: function version() {
        return '1.0.0';
      }
      /**
       * Register event listener for responsive adjustments and drawings
       */

    }, {
      key: "listen",
      value: function () {
        var _listen = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
          var _this2 = this;

          var canvasEvents, _loop, _i, _canvasEvents;

          return regenerator.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  // Adjust the canvas on window resize
                  window.addEventListener('resize', function () {
                    if (_this2.image.width !== _this2.canvas.element.width) {
                      _this2.canvas.adjustFromElement(_this2.image).catch(_this2.throwError);

                      _this2.redraw();
                    }
                  }); // For drawings we need to start, draw and end a stroke

                  canvasEvents = [// On mousedown, touchstart we start drawing
                  {
                    events: ['mousedown', 'touchstart'],
                    caller: function caller(event) {
                      _this2.startStrokeHandler(event);
                    }
                  }, // Draw during mousemove, touchmove
                  {
                    events: ['mousemove', 'touchmove'],
                    caller: function caller(event) {
                      _this2.drawStrokeHandler(event);
                    }
                  }, // And finish the stroke after mouseup, mouseleave, touchend
                  {
                    events: ['mouseup', 'mouseleave', 'touchend'],
                    caller: function caller(event) {
                      _this2.endStrokeHandler(event);
                    }
                  }]; // Register the events

                  _loop = function _loop() {
                    var object = _canvasEvents[_i];

                    var _iterator = _createForOfIteratorHelper(object.events),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var name = _step.value;
                        var options = {};

                        if (name === 'touchstart' || name === 'touchmove') {
                          options = {
                            passive: true
                          };
                        }

                        _this2.canvas.element.addEventListener(name, function (event) {
                          if (_this2.enabled === false) {
                            return;
                          }

                          object.caller(event);
                        }, options);
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  };

                  for (_i = 0, _canvasEvents = canvasEvents; _i < _canvasEvents.length; _i++) {
                    _loop();
                  }

                  return _context2.abrupt("return", this);

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function listen() {
          return _listen.apply(this, arguments);
        }

        return listen;
      }()
      /**
       * Starts stroke handler
       *
       * @param event - mousedown, touchstart event
       */

    }, {
      key: "startStrokeHandler",
      value: function startStrokeHandler(event) {
        event.preventDefault();
        this.sketching = true;
        var point = this.getPointFromCursor(event);
        var stroke = this.createStroke([point]);
        this.activeStroke = stroke;
        this.strokes.push(stroke);
        this.redraw();
        return this;
      }
      /**
       * Draws stroke handler
       *
       * @param event - mousemove, touchmove event
       */

    }, {
      key: "drawStrokeHandler",
      value: function drawStrokeHandler(event) {
        event.preventDefault(); // Drawing was not started by startStrokeHandler

        if (this.sketching === false) {
          return this;
        }

        var point = this.getPointFromCursor(event);
        this.pushPoint(point, this.activeStroke).redraw();
        return this;
      }
      /**
       * Ends stroke handler
       *
       * @param event - mouseup, mouseleave, touchend event
       */

    }, {
      key: "endStrokeHandler",
      value: function endStrokeHandler(event) {
        event.preventDefault(); // Drawing was not started by startStrokeHandler

        if (this.sketching === false) {
          return this;
        }

        this.image.dataset.sketchpadJson = this.toJson();
        this.sketching = false; // Touchend events do not have a position

        if (this.isTouchEvent(event)) {
          this.activeStroke = undefined;
          return this;
        }

        var point = this.getPointFromCursor(event);
        this.pushPoint(point, this.activeStroke).redraw();
        this.activeStroke = undefined;
        return this;
      }
      /**
       * Get the image ratio
       */

    }, {
      key: "getImageRatio",
      value: function getImageRatio() {
        return this.image.naturalWidth / this.image.width;
      }
      /**
       * Get a {@link Point | Point} from the cursor(mouse) or finger(touch)
       *
       * @param event - mousedown, touchstart, mousemove, touchmove, mouseup, mouseleave, touchend event
       */

    }, {
      key: "getPointFromCursor",
      value: function getPointFromCursor(event) {
        var coord = {
          x: 0,
          y: 0
        };

        if (this.isTouchEvent(event)) {
          var touchEvent = event;
          coord.x = touchEvent.touches[0].pageX - this.canvas.element.offsetLeft;
          coord.y = touchEvent.touches[0].pageY - this.canvas.element.offsetTop;
        } else {
          var mouseEvent = event;
          var rect = this.canvas.element.getBoundingClientRect();
          coord.x = mouseEvent.clientX - rect.left;
          coord.y = mouseEvent.clientY - rect.top;
        }

        return {
          x: coord.x * this.getImageRatio(),
          y: coord.y * this.getImageRatio()
        };
      }
      /**
       * Create stroke from an array of {@link Point | Points}
       *
       * @param points - Array of {@link Point | Points}
       */

    }, {
      key: "createStroke",
      value: function createStroke(points) {
        return {
          points: points // this.options.lineWidth,
          // this.options.lineMaxWidth,
          // this.options.lineColor,
          // this.options.lineCap,
          // this.options.lineJoin,
          // this.options.lineMiterLimit

        };
      }
      /**
       * Push {@link Point | Point} to {@link Stroke | Stroke}
       *
       * @param point   - {@link Point | Point} to push
       * @param stroke  - {@link Stroke | Stroke} to push into
       */

    }, {
      key: "pushPoint",
      value: function pushPoint(point, stroke) {
        var _stroke;

        stroke = (_stroke = stroke) !== null && _stroke !== void 0 ? _stroke : this.strokes[this.strokes.length - 1];

        if (stroke.points) {
          stroke.points.push(point);
        }

        return this;
      }
      /**
       * Redraw the sketch on the canvas. Mean it clears first and draw all
       * strokes again
       */

    }, {
      key: "redraw",
      value: function redraw() {
        this.canvas.clear();

        var _iterator2 = _createForOfIteratorHelper(this.strokes),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var stroke = _step2.value;
            this.canvas.drawStroke(stroke, this.getImageRatio()).catch(this.throwError);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return this;
      }
      /**
       * Check if given event is a touch event
       *
       * @param event - Event to check
       */

    }, {
      key: "isTouchEvent",
      value: function isTouchEvent(event) {
        return event.type.startsWith('touch');
      }
      /**
       * Throws an error
       *
       * @param error - Error message
       */

    }, {
      key: "throwError",
      value: function throwError(error) {
        throw new Error(String(error));
      }
    }]);

    return ImageSketchpad;
  }();

  /**
   * Save sketchpad instances to this object
   */

  var instances = {};
  /**
   * Initialize new sketchpad or return an already initialized.
   *
   * @param element - HTML image element
   * @param options - Image sketchpad options
   */

  var init = function init(element, options) {
    var _element$dataset, _element$dataset2;

    if (element !== null && element !== void 0 && (_element$dataset = element.dataset) !== null && _element$dataset !== void 0 && _element$dataset.sketchpad && instances[element.dataset.sketchpad]) {
      return instances[element.dataset.sketchpad];
    }

    var newInstance = new ImageSketchpad(element, options);

    if (element !== null && element !== void 0 && (_element$dataset2 = element.dataset) !== null && _element$dataset2 !== void 0 && _element$dataset2.sketchpad) {
      instances[element.dataset.sketchpad] = newInstance;
    }

    return newInstance;
  };

  return init;

}());
