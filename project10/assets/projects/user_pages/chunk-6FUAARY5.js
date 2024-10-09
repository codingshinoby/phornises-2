import {
  __async,
  __esm,
  __export,
  __objRest,
  __spreadValues,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/user_pages/app/javascript/lander/utils/error_with_cause.ts
var CFErrorWithCause, getErrorCause, _stackWithCauses, CFstackWithCauses;
var init_error_with_cause = __esm({
  "projects/user_pages/app/javascript/lander/utils/error_with_cause.ts"() {
    init_define_process();
    CFErrorWithCause = class _CFErrorWithCause extends Error {
      constructor(message, { cause = null } = {}) {
        super(message);
        this.name = _CFErrorWithCause.name;
        if (cause) {
          this.cause = cause;
        }
        this.message = message;
      }
    };
    getErrorCause = (err) => {
      if (!err || typeof err !== "object" || !("cause" in err)) {
        return;
      }
      if (typeof err.cause === "function") {
        const causeResult = err.cause();
        return causeResult instanceof Error ? causeResult : void 0;
      } else {
        return err.cause instanceof Error ? err.cause : void 0;
      }
    };
    _stackWithCauses = (err, seen) => {
      if (!(err instanceof Error)) return "";
      const stack = err.stack || "";
      if (seen.has(err)) {
        return stack + "\ncauses have become circular...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
      } else {
        return stack;
      }
    };
    CFstackWithCauses = (err) => _stackWithCauses(err, /* @__PURE__ */ new Set());
    globalThis.CFErrorWithCause = CFErrorWithCause;
    globalThis.CFstackWithCauses = CFstackWithCauses;
  }
});

// projects/user_pages/app/javascript/lander/utils/fetcher.ts
var fetcher_exports = {};
__export(fetcher_exports, {
  CFFetcherError: () => CFFetcherError,
  default: () => Fetcher,
  isResponseError: () => isResponseError
});
function isResponseError(response) {
  return typeof response.error == "string";
}
var CFFetcherErrorTypes, CFFetcherError, FetcherRequestDefaultOptions, Fetcher;
var init_fetcher = __esm({
  "projects/user_pages/app/javascript/lander/utils/fetcher.ts"() {
    init_define_process();
    init_error_with_cause();
    CFFetcherErrorTypes = {
      NETWORK_ERROR: "NETWORK_ERROR",
      SERVER_ERROR: "SERVER_ERROR"
    };
    globalThis.CFFetcherErrorTypes = CFFetcherErrorTypes;
    CFFetcherError = class extends CFErrorWithCause {
      constructor(type, options = {}) {
        super(type, options);
        this.name = "CFFetcherError";
        this.type = type;
      }
    };
    globalThis.CFFetcherError = CFFetcherError;
    FetcherRequestDefaultOptions = {
      retries: 1,
      timeoutMS: -1,
      timeoutAfterRetrial: 1e3,
      shouldCaptureServerError: false
    };
    Fetcher = class {
      constructor(options) {
        this.options = options || {};
      }
      /*
       * This fetch call is an extension of original fetch which only fires
       * api with a loading state before and after the call.
       * Can also debounce greater or less than 500ms if required.
       * The fetch request returns the JSON promise and is abortable
       */
      fetch(url, data, requestOptions) {
        return __async(this, null, function* () {
          const _a = __spreadValues(__spreadValues({}, FetcherRequestDefaultOptions), requestOptions), { callbackData, customEvent } = _a, enhancedFetchOptions = __objRest(_a, ["callbackData", "customEvent"]);
          let response;
          this.url = url;
          data = data || {};
          this.controller = new AbortController();
          this.signal = this.controller.signal;
          data.signal = this.signal;
          this.setLoading(true, callbackData, customEvent);
          try {
            response = yield this.enhancedFetch(url, data, enhancedFetchOptions);
            this.setLoading(false, callbackData, customEvent);
            if (this.options.debug) {
              console.log("[Fetch Request Completed]", response);
            }
            return response;
          } catch (error) {
            if (this.options.debug) {
              console.log("[Error During Fetch]", error);
            }
            this.setLoading(false, error, customEvent);
            if (!this.manuallyAborted) {
              throw error;
            }
          }
        });
      }
      enhancedFetch(url, fetchOpts, opts) {
        return __async(this, null, function* () {
          const { retries, timeoutMS, timeoutAfterRetrial, shouldCaptureServerError } = opts;
          let lastErr;
          for (let i = 0; i < retries; i++) {
            try {
              if (i > 0) {
                yield new Promise((resolve) => setTimeout(resolve, timeoutAfterRetrial));
              }
              if (shouldCaptureServerError) {
                return yield this.fetchWithTimeout(url, fetchOpts, timeoutMS).then((response) => {
                  if (response.status >= 500) {
                    throw new CFFetcherError(CFFetcherErrorTypes.SERVER_ERROR);
                  }
                  return response;
                });
              } else {
                return yield this.fetchWithTimeout(url, fetchOpts, timeoutMS);
              }
            } catch (err) {
              if (err instanceof CFFetcherError && err.type == CFFetcherErrorTypes.SERVER_ERROR) {
                throw err;
              }
              lastErr = err;
            }
          }
          throw new CFFetcherError(CFFetcherErrorTypes.NETWORK_ERROR, lastErr);
        });
      }
      fetchWithTimeout(url, opts, timeoutDuration = 1e3) {
        if (timeoutDuration > 0) {
          setTimeout(() => this.controller.abort(), timeoutDuration);
        }
        return fetch(url, opts);
      }
      abort() {
        if (this.options.debug) {
          console.log("[Aborting Request]", this.url);
        }
        this.manuallyAborted = true;
        this.controller.abort();
      }
      setLoading(isLoading, details, customName) {
        let loadingEvent;
        const startEvent = customName && customName + "Started" || "CFFetchStarted";
        const endEvent = customName && customName + "Finished" || "CFFetchFinished";
        if (isLoading && !this.loading) {
          if (this.options.debug) {
            console.log("[Loading Started]", startEvent);
          }
          this.loading = true;
          loadingEvent = new CustomEvent(startEvent, {
            detail: details
          });
        } else if (!isLoading && this.loading) {
          if (this.options.debug) {
            console.log("[Loading Finished/Aborted]", endEvent);
          }
          this.loading = false;
          loadingEvent = new CustomEvent(endEvent, {
            detail: details
          });
        }
        if (loadingEvent) {
          document.dispatchEvent(loadingEvent);
        }
      }
    };
    globalThis.CFFetcher = globalThis.CFFetcher || Fetcher;
    globalThis.CFFetch = (url, data, requestOptions) => {
      const fetcher = new Fetcher();
      return fetcher.fetch(url, data, requestOptions);
    };
  }
});

export {
  CFErrorWithCause,
  CFstackWithCauses,
  init_error_with_cause,
  CFFetcherError,
  fetcher_exports,
  init_fetcher
};
//# sourceMappingURL=chunk-6FUAARY5.js.map
