import {
  validateInput
} from "./chunk-LCRHDT5S.js";
import {
  CFErrorWithCause,
  CFFetcherError,
  CFstackWithCauses,
  init_error_with_cause,
  init_fetcher
} from "./chunk-6FUAARY5.js";
import {
  getSelectedVariant,
  init_addToCart
} from "./chunk-Y7ZKGN3W.js";
import {
  Cart,
  addPageScroll,
  atom,
  cleanEmptyObjectKeys,
  closeOnClickOutside,
  computed,
  deepEqual,
  formatNumberToCurrency,
  init_Cart,
  init_cf_utils,
  init_general,
  init_nanostores,
  listenKeys,
  map,
  onMount,
  removePageScroll,
  sleepMs
} from "./chunk-PBLRGFSG.js";
import {
  init_select_box_v2
} from "./chunk-THVZP4SD.js";
import {
  addError,
  resetInputErrors,
  validateValue
} from "./chunk-UXIIQL3U.js";
import {
  init_checkbox_v1,
  init_radio_v1
} from "./chunk-SO4UFY4C.js";
import {
  init_input_v1
} from "./chunk-LZ4JXIXT.js";
import {
  init_modal_v1
} from "./chunk-LWEF4ZVP.js";
import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  __async,
  __objRest,
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __spreadProps,
  __spreadValues,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/packs/checkout-v2.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-globals-v1.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-data-loader.ts
init_define_process();
init_general();
var getSSRGlobalResourceData = () => {
  var _a, _b, _c, _d, _e, _f, _g;
  const productSelectType = (_a = globalThis.globalResourceData.product_quantity_type) != null ? _a : "single";
  const { checkout_v2_state, contact } = (_b = globalThis == null ? void 0 : globalThis.sessionData) != null ? _b : {};
  const initialContactData = checkout_v2_state === "guest" ? {} : cleanEmptyObjectKeys({
    first_name: (_c = contact == null ? void 0 : contact.first_name) != null ? _c : "",
    last_name: (_d = contact == null ? void 0 : contact.last_name) != null ? _d : "",
    email: (_e = contact == null ? void 0 : contact.email) != null ? _e : "",
    phone_number: (_f = contact == null ? void 0 : contact.phone_number) != null ? _f : ""
  });
  const { products, productsById, variantsById, pricesById } = globalThis.globalResourceData;
  const savedPaymentMethods = (_g = contact == null ? void 0 : contact.payment_methods) != null ? _g : [];
  return {
    productSelectType,
    products,
    productsById,
    variantsById,
    pricesById,
    savedPaymentMethods,
    initialContactData
  };
};

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-globals-v1.ts
var CheckoutStates = {
  OTO: "oto",
  GUEST: "guest",
  SAVED: "saved",
  UPGRADE_DOWNGRADE: "upgradeDowngrade",
  REACTIVATE: "reactivate"
};
var StoreStates = {
  START: "start",
  INITIALIZING: "initializing",
  INITIALIZED: "initialized",
  FILLING_FORM: "filling-form",
  SUBMITTING: "submitting",
  SUBMITTED: "submitted"
};
var SummaryStates = {
  WAITING: "waiting",
  CALCULATING: "calculating",
  ERROR: "error",
  OK: "ok"
};
var CouponStates = {
  READY: "ready",
  APPLYING: "applying",
  APPLIED: "applied",
  ERROR: "error"
};
var PaymentStates = {
  START: "start",
  INITIALIZING: "initializing",
  LOADING: "loading",
  INITIALIZED: "initialized"
};
var SubmittingStates = {
  IDLE: "idle",
  START: "start",
  WAITING_ON_QUEUE: "waiting-on-queue",
  ERROR: "error",
  DONE: "done"
};
var PaypalStates = {
  IDLE: "idle",
  INITIALIZED: "initialized",
  ERROR: "error",
  ADDING_PAYMENT_METHOD: "adding-payment-method",
  PAYMENT_METHOD_APPROVED: "payment-method-approved"
};
var ErrorTypes = {
  REBILLY_ERROR: "rebilly-error",
  SERVER_ERROR: "server-error",
  UNHANDLED_SERVER_RESPONSE: "unhandled-server-response",
  EXCEEDED_MAX_RETRIES: "exceeded-max-retries",
  THREEDS_DECLINED_ERROR: "3ds-declined-error",
  THREEDS_DECLINED_CUSTOM_ERROR: "3ds-declined-custom-error",
  PAYPAL_DECLINED_ERROR: "paypal-declined-error",
  PAYPAL_CUSTOM_ERROR: "paypal-custom-error"
};
var states = {
  StoreStates,
  SummaryStates,
  PaymentStates,
  SubmittingStates,
  PaypalStates,
  CouponStates,
  ErrorTypes,
  CheckoutStates
};
var globals = getSSRGlobalResourceData();
var ssrDynamicData = globalThis.getSSRDynamicStoreData(globals.products);
window.Checkout = __spreadProps(__spreadValues(__spreadValues({}, states), globals), {
  ssrDynamicData,
  utils: buildUtils()
});
window.addEventListener("keydown", function(e) {
  var _a;
  if (e.keyIdentifier == "U+000A" || e.keyIdentifier == "Enter" || e.keyCode == 13) {
    if (((_a = Checkout.store) == null ? void 0 : _a.payment.type.get()) == "apple-pay") {
      e.preventDefault();
      return false;
    }
  }
}, true);
function buildUtils() {
  const hasErrors = (errors) => {
    var _a, _b;
    return ((_a = errors == null ? void 0 : errors.globalErrors) != null ? _a : []).length != 0 || Object.keys((_b = errors == null ? void 0 : errors.fields) != null ? _b : {}).length != 0;
  };
  const productErrors = (cart, showAllErrors) => {
    const errors = {
      globalErrors: [],
      fields: {}
    };
    if (showAllErrors) {
      const hasProducts = cart.items.filter((p) => !Checkout.productsById[p.product_id].bump).some((item) => item.quantity > 0);
      if (!hasProducts) {
        errors.globalErrors.push({ message: "At least one product should be selected" });
      }
    }
    return cleanupEmptyErrors(errors);
  };
  const addressErrors = (address, showAllErrors, fields) => {
    const errors = {
      globalErrors: [],
      fields: {}
    };
    fields.forEach((field) => {
      const value = address[field];
      if (value == void 0 && !showAllErrors) return;
      const { valid, message } = validateValue(field, value);
      if (!valid) {
        errors.fields[field] = { message };
      }
    });
    return cleanupEmptyErrors(errors);
  };
  const hasPhysicalProductsWithParams = (cart) => {
    return cart.items.some(({ product_id, variant_id }) => {
      const product = Checkout.productsById[product_id];
      const variant = Checkout.variantsById[variant_id];
      let productType = variant == null ? void 0 : variant.product_type;
      productType = productType || (product == null ? void 0 : product.product_type);
      return productType == "physical";
    });
  };
  const billingErrors = (billing, billingSameAsShipping, showAllErrors, cart, mode, billingFields, billingApiErrorsByField, paymentType) => {
    if (hasPhysicalProductsWithParams(cart) && billingSameAsShipping || mode == Checkout.CheckoutStates.UPGRADE_DOWNGRADE || mode == Checkout.CheckoutStates.OTO || paymentType == "apple-pay") {
      return null;
    } else if (billingApiErrorsByField) {
      return {
        fields: billingApiErrorsByField
      };
    } else if (mode == Checkout.CheckoutStates.REACTIVATE || mode == Checkout.CheckoutStates.SAVED) {
      const savedBillingAddresses = Checkout.store.billing_addresses.get();
      const isActiveAddressSaved = savedBillingAddresses.find((addr) => addr.id == billing.id);
      if (!isActiveAddressSaved) {
        return addressErrors(billing, showAllErrors, billingFields);
      }
      return null;
    } else {
      return addressErrors(billing, showAllErrors, billingFields);
    }
  };
  const shippingErrors = (shipping, showAllErrors, cart, mode, shippingFields, paymentType) => {
    if (!hasPhysicalProductsWithParams(cart) || mode == Checkout.CheckoutStates.UPGRADE_DOWNGRADE || paymentType == "apple-pay") {
      return null;
    } else {
      return addressErrors(shipping, showAllErrors, shippingFields);
    }
  };
  const cleanupEmptyErrors = (errors) => {
    if (errors.globalErrors.length == 0) delete errors.globalErrors;
    if (Object.keys(errors.fields).length == 0) delete errors.fields;
    if (Object.keys(errors).length == 0) return null;
    return errors;
  };
  return {
    productErrors,
    billingErrors,
    shippingErrors,
    addressErrors,
    cleanupEmptyErrors,
    hasErrors,
    hasPhysicalProductsWithParams,
    skipBillingAddress: (store) => {
      const isNotDigitalWalletPayment = store.payment.type.get() != "apple-pay";
      return isNotDigitalWalletPayment && store.billingFields.get().length == 0;
    },
    hasPhysicalProducts: (store) => {
      const cart = Checkout.computed.checkoutCart.get();
      return hasPhysicalProductsWithParams(cart);
    },
    hasValidDataForOrderPreview: (options) => {
      const mode = Checkout.store.checkout.mode.get();
      const cart = Checkout.computed.checkoutCart.get();
      const billing = Checkout.store.billing.get();
      const shipping = Checkout.store.shipping.get();
      const billingSameAsShipping = Checkout.store.billingSameAsShipping.get();
      const billingApiErrorsByField = Checkout.store.billingApiErrorsByField.get();
      const paymentType = Checkout.store.payment.type.get();
      const showAllBillingErrors = true;
      const showAllShippingErrors = true;
      const showAllProductErrors = true;
      const pErrors = productErrors(cart, showAllProductErrors);
      const bErrors = billingErrors(billing, billingSameAsShipping, showAllBillingErrors, cart, mode, options.billingFields, billingApiErrorsByField, paymentType);
      const sErrors = shippingErrors(shipping, showAllShippingErrors, cart, mode, options.shippingFields, paymentType);
      return !hasErrors(pErrors) && !hasErrors(bErrors) && !hasErrors(sErrors);
    },
    canSubmit: () => {
      const state = Checkout.store.state.get();
      const summary = Checkout.store.summary.get();
      return state == Checkout.StoreStates.FILLING_FORM && summary.state == Checkout.SummaryStates.OK;
    }
  };
}

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-saved-multiple-payments-preview-v1.ts
init_define_process();
init_runtime();
var CheckoutSavedMultiplePaymentsPreviewV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    Checkout.computed.paymentMethod.subscribe((payment_method) => {
      this.current_payment_method = payment_method || { type: "new-payment" };
      this.render();
    });
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a;
    const is_server = true;
    const current_payment_method = (_a = this.current_payment_method) != null ? _a : null;
    let html = "";
    {
      html += `  `;
      if (current_payment_method.type == "new-payment") {
        html += `<div class="elSelectText"> New Payment Method </div>`;
      } else if (current_payment_method.type == "payment-card") {
        html += `<div class="elSelectText"><i class="fab fa-cc-${current_payment_method.icon}"></i><span class="elSelectTextMaskedNumber"> ${current_payment_method.details}</span></div>`;
      } else if (current_payment_method.type == "paypal") {
        html += `<div class="elSelectText"><i class="fab fa-paypal"></i>${current_payment_method.details}</div>`;
      }
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutSavedMultiplePaymentsPreviewV1"] = CheckoutSavedMultiplePaymentsPreviewV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-configuration-error-v1.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-critical-errors.ts
init_define_process();
init_error_with_cause();
init_fetcher();
var CheckoutCriticalError = class extends CFErrorWithCause {
  constructor(message, options) {
    super(message, options);
    __publicField(this, "name");
    this.name = "CheckoutCriticalError";
  }
};
var ERROR_CODES = {
  EMPTY_PRODUCTS_ERROR: "EMPTY_PRODUCTS_ERROR",
  EMPTY_PAYMENT_METHODS_ERROR: "EMPTY_PAYMENT_METHODS_ERROR",
  UNEXPECTED_INITIALIZATION_ERROR: "UNEXPECTED_INITIALIZATION_ERROR",
  FETCH_FEATURE_FLAGS_ERROR: "FETCH_FEATURE_FLAGS_ERROR",
  FETCH_COUNTRIES_STATES_ERROR: "FETCH_COUNTRIES_STATES_ERROR",
  PAI_INITIALIZATION_SCRIPT_ERROR: "PAI_INITIALIZATION_SCRIPT_ERROR",
  PAI_INITIALIZATION_TIMEOUT_ERROR: "PAI_INITIALIZATION_TIMEOUT_ERROR",
  PAI_INITIALIZATION_READY_TIMEOUT_ERROR: "PAI_INITIALIZATION_READY_TIMEOUT_ERROR",
  FETCH_EXISTING_ORDERS_ERROR: "FETCH_EXISTING_ORDERS_ERROR",
  FETCH_PHONE_UTILS_ERROR: "FETCH_PHONE_UTILS_ERROR"
};
var displayAndLogCriticalError = (checkoutCriticalError) => {
  var _a;
  const criticalErrors = globalThis.Checkout.store.criticalErrors.get();
  const originalError = checkoutCriticalError.cause;
  if (originalError instanceof CFFetcherError) {
    const fetchError = originalError;
    globalThis.Checkout.store.criticalErrors.set([
      ...criticalErrors,
      { code: checkoutCriticalError.message, fetchErrorType: fetchError.type }
    ]);
  } else {
    globalThis.Checkout.store.criticalErrors.set([...criticalErrors, { code: checkoutCriticalError.message }]);
  }
  console.error(CFstackWithCauses(checkoutCriticalError));
  (_a = globalThis.Bugsnag) == null ? void 0 : _a.notify(checkoutCriticalError);
};

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-configuration-error-v1.ts
init_runtime();
var CheckoutConfigurationErrorV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "errorMessageMapping", {
      [ERROR_CODES.EMPTY_PAYMENT_METHODS_ERROR]: "Set Up Payments.ai to Start Collecting Orders",
      [ERROR_CODES.EMPTY_PRODUCTS_ERROR]: "There are no products configured."
    });
  }
  mount() {
    const prettifyErrorMessage = (error) => {
      if (this.errorMessageMapping[error.code]) return this.errorMessageMapping[error.code];
      if (error.fetchErrorType == CFFetcherErrorTypes.NETWORK_ERROR) {
        return `A critical network error is preventing checkout from continuing. 
Please check your connection and try again after reloading the page. If the problem persists, 
please contact support. Error code: ${error.code}`;
      } else {
        return `A critical server error occurred during checkout. Please retry later, and/or contact support. Error code: ${error.code}`;
      }
    };
    Checkout.store.criticalErrors.subscribe((errors) => {
      this.errors = errors.map(prettifyErrorMessage);
      ;
      this.render();
    });
    this.errors = Checkout.store.criticalErrors.get().map(prettifyErrorMessage);
    this.render();
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a;
    const is_server = true;
    const errors = (_a = this.errors) != null ? _a : [];
    let html = "";
    {
      html += `<div class="elCheckoutConfigError`;
      if (errors.length == 0) {
        html += ` elHide`;
      }
      html += `">`;
      const c0 = errors;
      const fl1 = new CF2ForloopDrop(c0.length);
      for (const error of c0) {
        const forloop = fl1;
        html += `<span>${error}</span>`;
        forloop.next();
      }
      html += `</div>`;
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutConfigurationErrorV1"] = CheckoutConfigurationErrorV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-tos-v1.ts
init_define_process();
init_checkbox_v1();
init_runtime();
var CheckoutTosV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    const input = this.element.querySelector("input");
    input.addEventListener("change", (event2) => {
      Checkout.store.tos.accepted.set(event2.target.checked);
    });
  }
};
window["CheckoutTosV1"] = CheckoutTosV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-submit-notification-v1.ts
init_define_process();
init_runtime();
var CheckoutSubmitNotificationV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    Checkout.store.submitting.listen((submitting) => {
      const state = submitting.state;
      switch (state) {
        case Checkout.SubmittingStates.IDLE: {
          this.setStatus("", "");
          break;
        }
        case Checkout.SubmittingStates.START: {
          this.setStatus("", "");
          break;
        }
        case Checkout.SubmittingStates.WAITING_ON_QUEUE: {
          this.setStatus("Waiting on queue", `(Retrying in ${submitting.remainingSeconds}s)`);
          break;
        }
        case Checkout.SubmittingStates.ERROR: {
          switch (submitting.code) {
            case Checkout.ErrorTypes.REBILLY_ERROR:
            case Checkout.ErrorTypes.SERVER_ERROR:
            case Checkout.ErrorTypes.UNHANDLED_SERVER_RESPONSE:
            case Checkout.ErrorTypes.EXCEEDED_MAX_RETRIES: {
              this.setStatus("Failed to submit", "Retry again in a few seconds", submitting.message ? submitting.message : "");
              break;
            }
            case Checkout.ErrorTypes.THREEDS_DECLINED_ERROR: {
              this.setStatus("Failed to submit", "Transaction declined");
              break;
            }
            case Checkout.ErrorTypes.SERVER_ERROR_WITH_MESSAGE: {
              this.setStatus("Failed to submit", submitting.message);
              break;
            }
            case Checkout.ErrorTypes.THREEDS_DECLINED_CUSTOM_ERROR: {
              this.setStatus("Failed to submit", submitting.message);
              break;
            }
          }
          break;
        }
        case Checkout.SubmittingStates.DONE: {
          break;
        }
      }
    });
  }
  setStatus(text, subtext, extratext = "") {
    if (text) {
      this.element.querySelector(".mainText").classList.remove("elHide");
      this.element.querySelector(".mainText").innerHTML = text;
    } else {
      this.element.querySelector(".mainText").classList.add("elHide");
    }
    if (subtext) {
      this.element.querySelector(".subText").classList.remove("elHide");
      this.element.querySelector(".subText").innerHTML = subtext;
    } else {
      this.element.querySelector(".subText").classList.add("elHide");
    }
    if (extratext) {
      this.element.querySelector(".extraText").classList.remove("elHide");
      this.element.querySelector(".extraText").innerHTML = extratext;
    } else {
      this.element.querySelector(".extraText").classList.add("elHide");
    }
  }
};
window["CheckoutSubmitNotificationV1"] = CheckoutSubmitNotificationV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-coupon-form-v1.ts
init_define_process();
init_input_v1();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-summary.ts
init_define_process();
init_general();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Utils/checkout-path.ts
init_define_process();
var renderedPath = () => {
  var _a;
  const renderedPage = (_a = document.cookie.split("; ").find((x) => x.match(/^cfhoy_rendered_page=/))) == null ? void 0 : _a.split("=")[1];
  return renderedPage != null ? renderedPage : window.location.pathname;
};
var renderedHref = () => {
  const url = new URL(window.location.href);
  url.pathname = renderedPath();
  return url.toString();
};

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Utils/checkout-address.ts
init_define_process();
init_general();
var STATES_WITH_POSTAL_CODE = /* @__PURE__ */ new Set(["US", "GB", "CA", "FI", "FR", "IT", "ES"]);
var backfillAddressId = (address) => {
  if (address.id) return address;
  let addressId = "no-id#";
  addressId += [address.country, address.state, address.city, address.zip, address.address, address.address_2].filter(Boolean).join(":");
  return __spreadProps(__spreadValues({}, address), { id: addressId });
};
var backfillAddressesId = (addresses) => {
  return addresses.map((address) => backfillAddressId(address));
};
var isSavedAddress = (address) => {
  return address.id && !String(address.id).includes("no-id#");
};
var fieldsForCountry = (fields, country) => {
  const fieldsLength = Object.keys(fields).length;
  if (fieldsLength > 0 && fieldsLength <= 2) {
    const hasPostalCode = STATES_WITH_POSTAL_CODE.has(country);
    if (hasPostalCode) {
      return ["country", "zip"];
    } else {
      return ["country"];
    }
  }
  return fields;
};
var addressToString = (address) => {
  let str = "";
  if (address.address) {
    str = address.address;
    if (address.address2) {
      str += `, ${address.address2}`;
    }
    if (address.city) {
      str += `. ${address.city}`;
    }
    if (address.state) {
      str += `, ${address.state}`;
    }
    if (address.zip) {
      str += ` ${address.zip}`;
    }
    if (address.country) {
      str += `, ${address.country}`;
    }
  } else {
    if (address.zip) {
      str += `${address.zip}, `;
    }
    if (address.country) {
      str += `${address.country}`;
    }
  }
  return str;
};
var parseAddressByFields = (address, fields, shouldBackfill = true) => {
  const addressByFields = fields.reduce((acc, field) => {
    var _a;
    acc[field] = (_a = address[field]) != null ? _a : shouldBackfill ? globalThis.Checkout.contactLocale[field] : null;
    return acc;
  }, {});
  return cleanEmptyObjectKeys(__spreadProps(__spreadValues({}, addressByFields), { id: address.id }));
};

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-summary.ts
var PreviewError = class extends Error {
  constructor(message, details) {
    super(message);
    __publicField(this, "details");
    this.name = this.constructor.name;
    this.details = details;
    if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor);
  }
};
var _sendOrderPreviewTimer, _lastOrderPreviewData, _controllerOrderPreview, _orderPreviewSignal, _couponStateBeforeApplying, _pendingFetch, _skipOrderSummaryUpdate, _CheckoutSummary_static, createOrderPreviewSignal_fn, setLoadingShippingOptions_fn, backfillBillingAddress_fn, processOrderPreviewResponseForSummary_fn, buildCartDetails_fn, buildOrderPreviewPayload_fn, buildAddressParams_fn;
var CheckoutSummary = class {
  static skipOrderSummaryUpdateWithCb(cb) {
    __privateSet(this, _skipOrderSummaryUpdate, true);
    cb();
    __privateSet(this, _skipOrderSummaryUpdate, false);
  }
  static sendOrderPreview(options) {
    const isCouponValidation = !!(options == null ? void 0 : options.isCouponValidation);
    if (__privateGet(this, _skipOrderSummaryUpdate)) return;
    const billingFields = globalThis.Checkout.store.billingFields.get();
    const shippingFields = globalThis.Checkout.store.shippingFields.get();
    if (!globalThis.Checkout.utils.hasValidDataForOrderPreview({ billingFields, shippingFields })) {
      if (globalThis.Checkout.store.summary.get().state != globalThis.Checkout.SummaryStates.WAITING) {
        globalThis.Checkout.store.summary.set({ state: globalThis.Checkout.SummaryStates.WAITING });
      }
      __privateSet(this, _lastOrderPreviewData, null);
      return;
    }
    const dataToPreview = __privateMethod(this, _CheckoutSummary_static, buildOrderPreviewPayload_fn).call(this, {
      billingAddress: globalThis.Checkout.store.billing.get(),
      shippingAddress: globalThis.Checkout.store.shipping.get(),
      shippingOption: globalThis.Checkout.store.shippingOption.get()
    }, {
      skipBillingAddress: globalThis.Checkout.utils.skipBillingAddress(globalThis.Checkout.store)
    });
    if (!isCouponValidation && deepEqual(dataToPreview, __privateGet(this, _lastOrderPreviewData))) {
      return;
    }
    __privateGet(this, _sendOrderPreviewTimer) && clearTimeout(__privateGet(this, _sendOrderPreviewTimer));
    if (__privateGet(this, _controllerOrderPreview) && __privateGet(this, _pendingFetch) && !__privateGet(this, _pendingFetch).done && !__privateGet(this, _pendingFetch).aborted) {
      __privateGet(this, _controllerOrderPreview).abort();
    }
    if (globalThis.Checkout.store.summary.get().state != globalThis.Checkout.SummaryStates.CALCULATING) {
      if (globalThis.Checkout.store.payment.type.get() == "apple-pay") {
        globalThis.Checkout.store.isUpdatingRebilly.set(true);
      }
      globalThis.Checkout.store.summary.set({ state: globalThis.Checkout.SummaryStates.CALCULATING });
    }
    const couponStateBeforeApplying = globalThis.Checkout.store.coupons.state.get();
    if (isCouponValidation && couponStateBeforeApplying != globalThis.Checkout.CouponStates.APPLYING) {
      __privateSet(this, _couponStateBeforeApplying, couponStateBeforeApplying);
      globalThis.Checkout.store.coupons.state.set(globalThis.Checkout.CouponStates.APPLYING);
    }
    const thisFetch = __privateSet(this, _pendingFetch, {});
    __privateMethod(this, _CheckoutSummary_static, setLoadingShippingOptions_fn).call(this, dataToPreview);
    clearTimeout(__privateGet(this, _sendOrderPreviewTimer));
    __privateSet(this, _sendOrderPreviewTimer, setTimeout(() => {
      return this.fetchOrderPreview({ thisFetch });
    }, 500));
  }
  static fetchOrderPreview(options) {
    var _a, _b;
    options = options != null ? options : {};
    const thisFetch = (_a = options.thisFetch) != null ? _a : {};
    const callRebillyUpdate = (_b = options.callRebillyUpdate) != null ? _b : true;
    const dataToPreview = __privateMethod(this, _CheckoutSummary_static, buildOrderPreviewPayload_fn).call(this, {
      billingAddress: globalThis.Checkout.store.billing.get(),
      shippingAddress: globalThis.Checkout.store.shipping.get(),
      shippingOption: globalThis.Checkout.store.shippingOption.get()
    }, {
      skipBillingAddress: globalThis.Checkout.utils.skipBillingAddress(globalThis.Checkout.store)
    });
    __privateSet(this, _lastOrderPreviewData, dataToPreview);
    let summaryData;
    let orderPreviewError;
    __privateMethod(this, _CheckoutSummary_static, createOrderPreviewSignal_fn).call(this);
    return fetch(window.location.origin + renderedPath() + "/order_preview", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(dataToPreview),
      signal: __privateGet(this, _orderPreviewSignal)
    }).then((response) => response == null ? void 0 : response.json()).then((data) => {
      if (!data) return;
      if (data.error) throw new PreviewError(data.error, data.details);
      summaryData = data;
    }).catch((error) => {
      if (error.name == "AbortError") {
        thisFetch.aborted = true;
      } else {
        console.error(error);
        orderPreviewError = error;
      }
    }).finally(() => {
      var _a2, _b2;
      if (thisFetch.aborted) {
        return;
      }
      if (summaryData) {
        const { shipping_quotes_response, selected_shipping_option } = summaryData;
        this.skipOrderSummaryUpdateWithCb(() => {
          var _a3;
          globalThis.Checkout.store.shippingOptions.set((_a3 = shipping_quotes_response == null ? void 0 : shipping_quotes_response.options) != null ? _a3 : []);
          globalThis.Checkout.store.shippingOption.set(selected_shipping_option);
          globalThis.Checkout.store.loadingShipping.set(false);
          __privateMethod(this, _CheckoutSummary_static, backfillBillingAddress_fn).call(this, summaryData);
        });
        const currentCode = globalThis.Checkout.store.coupons.currentCode.get();
        const couponCodeApplied = (_a2 = summaryData.discounts) == null ? void 0 : _a2.find(
          (discount) => {
            var _a3;
            return ((_a3 = discount.code) == null ? void 0 : _a3.toUpperCase()) == (currentCode == null ? void 0 : currentCode.toUpperCase());
          }
        );
        if (couponCodeApplied) {
          globalThis.Checkout.store.coupons.appliedCode.set(currentCode);
          globalThis.Checkout.store.coupons.state.set(globalThis.Checkout.CouponStates.APPLIED);
        } else {
          globalThis.Checkout.store.coupons.state.set(globalThis.Checkout.CouponStates.READY);
        }
        const newSummaryStoreData = {
          state: globalThis.Checkout.SummaryStates.OK,
          data: __privateMethod(this, _CheckoutSummary_static, processOrderPreviewResponseForSummary_fn).call(this, summaryData)
        };
        globalThis.Checkout.store.summary.set(newSummaryStoreData);
        this.updateRebillyTransactionData(callRebillyUpdate);
      } else if (orderPreviewError) {
        globalThis.Checkout.store.loadingShipping.set(false);
        const error = (_b2 = orderPreviewError.details) == null ? void 0 : _b2[0];
        if ((error == null ? void 0 : error.type) == "InvalidPostalCodeError") {
          globalThis.Checkout.store.summary.set({
            state: globalThis.Checkout.SummaryStates.WAITING
          });
          globalThis.Checkout.store.showAllErrors.billing.set(true);
          globalThis.Checkout.store.billingApiErrorsByField.set({ zip: { message: error.message } });
          this.updateRebillyTransactionData(false);
        } else if ((error == null ? void 0 : error.type) == "InvalidCouponError") {
          globalThis.Checkout.store.coupons.appliedCode.set("");
          globalThis.Checkout.store.coupons.errorMessage.set(error.message);
          globalThis.Checkout.store.coupons.state.set(globalThis.Checkout.CouponStates.ERROR);
          globalThis.Checkout.store.summary.set({
            state: globalThis.Checkout.SummaryStates.OK,
            data: __privateMethod(this, _CheckoutSummary_static, processOrderPreviewResponseForSummary_fn).call(this, error.preview)
          });
          this.updateRebillyTransactionData(callRebillyUpdate);
        } else {
          globalThis.Checkout.store.coupons.state.set(__privateGet(this, _couponStateBeforeApplying));
          const newSummaryStoreData = { state: globalThis.Checkout.SummaryStates.ERROR };
          globalThis.Checkout.store.summary.set(newSummaryStoreData);
          this.updateRebillyTransactionData(false);
        }
      }
      thisFetch.done = true;
    });
  }
  static fetchOrderSummaryForExpress(payload, options) {
    const dataToPreview = __privateMethod(this, _CheckoutSummary_static, buildOrderPreviewPayload_fn).call(this, {
      billingAddress: payload.billingAddress,
      shippingAddress: payload.shippingAddress,
      shippingOption: payload.shippingOption
    }, {
      skipBillingAddress: false
    });
    let summaryData;
    __privateMethod(this, _CheckoutSummary_static, createOrderPreviewSignal_fn).call(this);
    return fetch(window.location.origin + renderedPath() + "/order_preview", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(dataToPreview),
      signal: __privateGet(this, _orderPreviewSignal)
    }).then((response) => response == null ? void 0 : response.json()).then((data) => {
      if (!data) return;
      if (data.error) throw new PreviewError(data.error, data.details);
      summaryData = data;
      return { summary: summaryData, data: __privateMethod(this, _CheckoutSummary_static, processOrderPreviewResponseForSummary_fn).call(this, summaryData), error: null };
    }).catch((error) => {
      var _a;
      return { summary: {}, data: {}, error: ((_a = error == null ? void 0 : error.details) == null ? void 0 : _a[0]) || error };
    });
  }
  static updateRebillyTransactionData(shouldCallRebilly) {
    var _a;
    const mode = globalThis.Checkout.store.checkout.mode.get();
    const summary = globalThis.Checkout.store.summary.get();
    const cart = globalThis.Checkout.computed.checkoutCart.get();
    const shippingEnabled = globalThis.Checkout.utils.hasPhysicalProducts();
    const summaryData = summary.data;
    const lineItems = (_a = summaryData == null ? void 0 : summaryData.line_items) != null ? _a : [];
    const RebillyFullyInitialized = globalThis.Checkout.store.payment.state.get() == globalThis.Checkout.PaymentStates.INITIALIZED;
    if (!shouldCallRebilly || mode == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE || !lineItems.length || !RebillyFullyInitialized) {
      globalThis.Checkout.store.isUpdatingRebilly.set(false);
      return;
    }
    const transactionData = this.buildTransactionData(summaryData, cart, shippingEnabled);
    globalThis.Rebilly.update({ transactionData }).then(() => {
      globalThis.Checkout.store.isUpdatingRebilly.set(false);
    });
  }
  static buildTransactionData(summaryData, cart, shippingEnabled) {
    var _a, _b;
    const { currency, line_items } = summaryData;
    const lineItems = line_items.map(({ price, description }, index) => {
      let label;
      if (line_items.length == cart.items.length) {
        const variantId = cart.items[index].variant_id;
        const variant = globalThis.Checkout.variantsById[variantId];
        label = variant.name;
      } else {
        label = description;
      }
      return {
        label,
        amount: price
      };
    });
    if (((_a = summaryData.tax) == null ? void 0 : _a.amount) > 0) {
      lineItems.push({
        label: "Taxes",
        amount: summaryData.tax.amount
      });
    }
    if (((_b = summaryData.shipping) == null ? void 0 : _b.amount) > 0) {
      lineItems.push({
        label: "Shipping",
        amount: summaryData.shipping.amount
      });
    }
    return {
      currency,
      amount: summaryData.total.amount,
      label: "Total Purchase",
      lineItems,
      requestShipping: shippingEnabled
    };
  }
};
_sendOrderPreviewTimer = new WeakMap();
_lastOrderPreviewData = new WeakMap();
_controllerOrderPreview = new WeakMap();
_orderPreviewSignal = new WeakMap();
_couponStateBeforeApplying = new WeakMap();
_pendingFetch = new WeakMap();
_skipOrderSummaryUpdate = new WeakMap();
_CheckoutSummary_static = new WeakSet();
createOrderPreviewSignal_fn = function() {
  __privateSet(this, _controllerOrderPreview, new AbortController());
  __privateSet(this, _orderPreviewSignal, __privateGet(this, _controllerOrderPreview).signal);
};
setLoadingShippingOptions_fn = function(dataToPreview) {
  var _a, _c, _d;
  const _b = (_a = dataToPreview == null ? void 0 : dataToPreview.order) != null ? _a : {}, { selected_shipping_option: _tmpShippingOption1 } = _b, dataToPreviewWithoutShippingOption = __objRest(_b, ["selected_shipping_option"]);
  const _e = (_d = (_c = __privateGet(this, _lastOrderPreviewData)) == null ? void 0 : _c.order) != null ? _d : {}, { selected_shipping_option: _tmpShippingOption2 } = _e, lastOrderPreviewDataWithoutShippingOption = __objRest(_e, ["selected_shipping_option"]);
  if (!deepEqual(dataToPreviewWithoutShippingOption, lastOrderPreviewDataWithoutShippingOption)) {
    globalThis.Checkout.store.loadingShipping.set(true);
  }
};
backfillBillingAddress_fn = function(summaryData) {
  const checkoutBilling = globalThis.Checkout.store.billing.get();
  if (summaryData.billing_address) {
    const { city: summaryCity, region: summaryRegion } = summaryData.billing_address;
    if (!checkoutBilling.city || !checkoutBilling.state) {
      globalThis.Checkout.store.billing.set(__spreadValues(__spreadValues(__spreadValues({}, checkoutBilling), !checkoutBilling.city ? { city: summaryCity } : {}), !checkoutBilling.state ? { state: summaryRegion } : {}));
    }
  }
};
processOrderPreviewResponseForSummary_fn = function(summaryData) {
  var _a, _b;
  return __spreadValues(__spreadValues({
    currency: summaryData.currency,
    line_items: summaryData.line_items,
    total: {
      amount: parseFloat(summaryData.total_amount.amount),
      formatted: summaryData.total_amount_formatted
    },
    discount: {
      amount: parseFloat(summaryData.discount_amount.amount),
      formatted: summaryData.discount_amount_formatted
    },
    discounts: ((_a = summaryData.discounts) != null ? _a : []).map((discount) => {
      return {
        name: discount.name,
        code: discount.code,
        amount_formatted: "-" + formatNumberToCurrency(summaryData.currency_symbol, discount.amount)
      };
    }),
    subtotal: {
      amount: parseFloat(summaryData.subtotal_amount.amount),
      formatted: summaryData.subtotal_amount_formatted
    },
    shipping: {
      amount: parseFloat(summaryData.shipping_amount.amount),
      formatted: summaryData.shipping_amount_formatted
    },
    tax: {
      amount: parseFloat(summaryData.tax_amount.amount),
      formatted: summaryData.tax_amount_formatted
    }
  }, ((_b = summaryData.upcoming_invoice) == null ? void 0 : _b.interim_amount) ? {
    interim: {
      amount: parseFloat(summaryData.upcoming_invoice.interim_amount.amount),
      formatted: summaryData.upcoming_invoice.interim_amount_formatted
    }
  } : {}), summaryData.upcoming_invoice ? {
    upcoming_invoice: {
      line_items: summaryData.upcoming_invoice.line_items.filter((i) => i.interim).map((item) => {
        return {
          variant_name: item.variant_name,
          quantity: item.quantity,
          amount: parseFloat(item.amount.amount),
          formatted: item.amount_formatted
        };
      })
    }
  } : {});
};
buildCartDetails_fn = function() {
  const cart = globalThis.Checkout.computed.checkoutCart.get();
  const orderId = cart.order_id;
  const lineItems = cart.items.map(({ price_id, line_item_id, variant_id, quantity }) => {
    const data = __spreadProps(__spreadValues({
      variant_id,
      price_id
    }, line_item_id ? { line_item_id } : {}), {
      quantity
    });
    return data;
  });
  return { order_id: orderId, line_items: lineItems };
};
buildOrderPreviewPayload_fn = function(payload, options) {
  const couponState = globalThis.Checkout.store.coupons.state.get();
  let couponCode;
  if (couponState == globalThis.Checkout.CouponStates.APPLYING) {
    couponCode = globalThis.Checkout.store.coupons.currentCode.get();
  } else {
    couponCode = globalThis.Checkout.store.coupons.appliedCode.get();
  }
  const selected_shipping_option = payload.shippingOption;
  return {
    order: __spreadValues(__spreadValues(__spreadValues({
      full_preview: true,
      should_backfill_billing_address: true,
      coupon_codes: globalThis.Checkout.store.featureFlags.isCouponEnabled.get() ? couponCode : []
    }, (selected_shipping_option == null ? void 0 : selected_shipping_option.amount) ? { selected_shipping_option } : {}), __privateMethod(this, _CheckoutSummary_static, buildAddressParams_fn).call(this, { billingAddress: payload.billingAddress, shippingAddress: payload.shippingAddress }, options)), __privateMethod(this, _CheckoutSummary_static, buildCartDetails_fn).call(this))
  };
};
buildAddressParams_fn = function(addressParams, options) {
  const billing = addressParams.billingAddress;
  const shipping = addressParams.shippingAddress;
  const mode = globalThis.Checkout.store.checkout.mode.get();
  if (mode == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE) {
    return;
  }
  let billingData, shippingData;
  if (isSavedAddress(billing)) {
    billingData = {
      id: billing.id
    };
  } else {
    billingData = {
      address_one: billing.address,
      address_two: billing.address_2,
      city: billing.city,
      state: billing.state,
      country: billing.country,
      postal_code: billing.zip
    };
  }
  if (isSavedAddress(shipping)) {
    shippingData = {
      id: shipping.id,
      address_one: shipping.address,
      address_two: shipping.address_2,
      city: shipping.city,
      state: shipping.state,
      country: shipping.country,
      postal_code: shipping.zip
    };
  } else {
    shippingData = {
      address_one: shipping.address,
      address_two: shipping.address_2,
      city: shipping.city,
      state: shipping.state,
      country: shipping.country,
      postal_code: shipping.zip
    };
  }
  if (globalThis.Checkout.utils.hasPhysicalProducts()) {
    const billingSameAsShippingData = globalThis.Checkout.store.billingSameAsShipping.get();
    if (options.skipBillingAddress) {
      return { delivery_address: shippingData };
    }
    if (mode == globalThis.Checkout.CheckoutStates.OTO) {
      return {
        delivery_address: shippingData,
        billing_address: billingData
      };
    }
    if (billingSameAsShippingData) {
      return {
        delivery_address: shippingData,
        billing_address: shippingData
      };
    } else {
      return {
        delivery_address: shippingData,
        billing_address: billingData
      };
    }
  } else {
    if (options.skipBillingAddress) return;
    return { billing_address: billingData };
  }
};
__privateAdd(CheckoutSummary, _CheckoutSummary_static);
__privateAdd(CheckoutSummary, _sendOrderPreviewTimer);
__privateAdd(CheckoutSummary, _lastOrderPreviewData);
__privateAdd(CheckoutSummary, _controllerOrderPreview);
__privateAdd(CheckoutSummary, _orderPreviewSignal);
__privateAdd(CheckoutSummary, _couponStateBeforeApplying);
__privateAdd(CheckoutSummary, _pendingFetch);
__privateAdd(CheckoutSummary, _skipOrderSummaryUpdate);

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-coupon-form-v1.ts
init_runtime();
var CheckoutCouponFormV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  hydrate(store) {
    this.checkoutStore = store;
    this.isCouponFgEnabled = this.checkoutStore.featureFlags.isCouponEnabled.get();
    if (!this.isCouponFgEnabled) {
      this.element.remove();
      return;
    }
    this.element.classList.remove("hide");
    this.isCouponReadySubs = Checkout.computed.isCouponReady.subscribe((isCouponReady) => {
      this.updateElementWithCanApply(isCouponReady);
    });
    this.currentCodeListen = this.checkoutStore.coupons.currentCode.listen((value) => {
      this.setInputValue(value);
    });
    this.couponsStateListen = this.checkoutStore.coupons.state.listen((state) => {
      this.updateElementWithCouponState(state);
    });
    this.renderElement();
    this.setupInputListeners();
  }
  cleanup() {
    var _a, _b, _c;
    (_a = this.isCouponReadySubs) == null ? void 0 : _a.call(this);
    (_b = this.currentCodeListen) == null ? void 0 : _b.call(this);
    (_c = this.couponsStateListen) == null ? void 0 : _c.call(this);
  }
  updateElementWithCanApply(isCouponReady) {
    if (isCouponReady) {
      const appliedCode = Checkout.store.coupons.appliedCode.get();
      if (!appliedCode) {
        this.enableCoupon();
      }
    } else {
      this.disableCoupon();
    }
  }
  updateElementWithCouponState(state) {
    switch (state) {
      case Checkout.CouponStates.READY: {
        this.clearError();
        this.enableCoupon();
        this.updateLoader(false);
        break;
      }
      case Checkout.CouponStates.ERROR: {
        this.setError(this.checkoutStore.coupons.errorMessage.get());
        this.enableCoupon();
        this.updateLoader(false);
        break;
      }
      case Checkout.CouponStates.APPLIED: {
        this.clearError();
        this.disableCoupon();
        this.updateLoader(false);
        break;
      }
      case Checkout.CouponStates.APPLYING: {
        this.disableCoupon();
        this.clearError();
        this.updateLoader(true);
        break;
      }
    }
  }
  renderElement() {
    const currentCode = this.checkoutStore.coupons.currentCode.get();
    const appliedCode = this.checkoutStore.coupons.appliedCode.get();
    const coupon = currentCode || appliedCode;
    if (coupon) {
      this.getCouponInput().value = coupon;
      this.getCouponInputContainer().classList.add("hasValue");
    }
    const state = this.checkoutStore.coupons.state.get();
    this.updateElementWithCouponState(state);
    const isCouponReady = Checkout.computed.isCouponReady.get();
    this.updateElementWithCanApply(isCouponReady);
  }
  setupInputListeners() {
    const input = this.getCouponInput();
    if (input !== null) {
      input.addEventListener("blur", () => {
        var _a;
        this.checkoutStore.coupons.currentCode.set((_a = input.value) == null ? void 0 : _a.trim());
      });
      input.addEventListener("focus", () => {
        if (!input.value) {
          this.clearError();
        }
      });
      input.addEventListener("change", () => {
        this.clearError();
      });
    }
    this.getCouponApplyButton().addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const code = this.checkoutStore.coupons.currentCode.get();
      if (!code) {
        this.checkoutStore.coupons.errorMessage.set("Discount code is blank");
        this.checkoutStore.coupons.state.set(Checkout.CouponStates.ERROR);
        return;
      }
      CheckoutSummary.sendOrderPreview({ isCouponValidation: true });
    });
  }
  enableCoupon() {
    this.getCouponApplyButton().setAttribute("data-disabled", false);
    this.getCouponInput().removeAttribute("disabled");
  }
  disableCoupon() {
    this.getCouponApplyButton().setAttribute("data-disabled", true);
    this.getCouponInput().setAttribute("disabled", true);
  }
  updateLoader(isLoading) {
    if (isLoading == void 0) {
      isLoading = this.lastLoading;
    } else {
      this.lastLoading = isLoading;
    }
    this.getCouponButtonContainer().dataset.loading = isLoading;
  }
  setInputValue(value) {
    const input = this.getCouponInput();
    value = value == null ? void 0 : value.trim();
    if (value) {
      input.value = value;
      this.getCouponInputContainer().classList.add("hasValue");
    } else {
      input.value = "";
      this.getCouponInputContainer().classList.remove("hasValue");
    }
  }
  setError(message) {
    this.getCouponErrorContainer().innerHTML = message;
    this.getCouponInputContainer().classList.add("elInputError");
    this.getCouponIconContainer().classList.add("elInputError");
  }
  clearError() {
    this.getCouponErrorContainer().innerHTML = "";
    this.getCouponInputContainer().classList.remove("elInputError");
    this.getCouponIconContainer().classList.remove("elInputError");
  }
  getCouponInput() {
    return this.element.querySelector("input");
  }
  getCouponInputContainer() {
    return this.element.querySelector(".elCheckoutCouponCodeInput,.elCheckoutCartCouponCodeInput");
  }
  getCouponApplyButton() {
    return this.element.querySelector('.elCheckoutCouponCodeButton a[href="#check-coupon-code"],.elCheckoutCartCouponCodeButton a[href="#check-coupon-code"]');
  }
  getCouponButtonContainer() {
    return this.element.querySelector(".elCheckoutCouponCodeButton,.elCheckoutCartCouponCodeButton");
  }
  getCouponErrorContainer() {
    return this.element.querySelector(".elCouponCodeError");
  }
  getCouponIconContainer() {
    return this.element.querySelector(".elCheckoutCouponFormWrapper,.elCheckoutCartCouponFormWrapper");
  }
};
window["CheckoutCouponFormV1"] = CheckoutCouponFormV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-threeds-frame-v1.ts
init_define_process();
init_runtime();
var CheckoutThreedsFrameV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    Checkout.store.threeds.listen((threeds) => {
      if (threeds.show) {
        const approvalUrl = threeds.approvalUrl;
        const iframe = document.createElement("iframe");
        const orderStautsIframe = "/cf_order_status?disable-dispatch=true";
        iframe.onload = (evt) => {
          if (evt.target.src.includes(orderStautsIframe)) {
            this.element.classList.remove("elHide");
            iframe.src = approvalUrl;
          }
        };
        this.element.innerHTML = "";
        this.element.appendChild(iframe);
        iframe.src = orderStautsIframe;
      } else {
        this.element.classList.add("elHide");
        this.element.innerHTML = "";
      }
    });
  }
};
window["CheckoutThreedsFrameV1"] = CheckoutThreedsFrameV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-order-summary-v1.ts
init_define_process();
init_cf_utils();
init_Cart();
init_runtime();
var CheckoutOrderSummaryV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  initializeWithStore(store, checkoutComputed) {
    this.checkoutStore = store;
    [
      checkoutComputed.checkoutCart,
      this.checkoutStore.summary
    ].forEach((store2) => {
      store2.listen(() => {
        this.renderSummaryDetails();
      });
    });
    nanostores.computed([Checkout.store.payment.type], (paymentType) => paymentType == "apple-pay").subscribe((isDigitalWalletPaymentType) => {
      if (isDigitalWalletPaymentType && !this.couponFieldEnabled) {
        this.hide();
      } else {
        this.show();
      }
    });
    this.renderSummaryDetails();
    Checkout.store.state.listen((state) => {
      if (state === Checkout.StoreStates.FILLING_FORM) {
        this.renderSummaryDetails();
      }
    });
    if (globalResourceData.resourceName == "checkout" && this.mobileBehavior != null) {
      closeOnClickOutside(this.element, () => {
        addPageScroll();
        this.element.classList.remove("elOrderSummaryMobileOpen");
      });
    }
  }
  show() {
    this.element.classList.remove("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
  renderSummaryDetails() {
    const summary = this.checkoutStore.summary.get();
    this.state = summary.state;
    this.summary = !summary.data ? {} : summary.data;
    this.hasPhysicalProducts = Checkout.utils.hasPhysicalProducts();
    const is_checkout_page = globalResourceData.resourceName == "checkout";
    const cartItems = is_checkout_page ? Cart.stores.cartData.get().items : Checkout.computed.checkoutCart.get().items;
    this.items = cartItems.map(({ product_id, variant_id, price_id, quantity }) => {
      var _a, _b, _c, _d, _e, _f;
      const variant = Checkout.variantsById[variant_id];
      const price = Checkout.pricesById[price_id];
      const product = Checkout.productsById[product_id];
      const variantNamesArray = variant.property_value_ids.map((property_value_id) => {
        return product.all_properties_values[property_value_id];
      });
      return {
        productName: is_checkout_page ? product.name : variant.name,
        image_url: (_a = variant.image) != null ? _a : product.image,
        priceName: price.name,
        imageUrl: (_f = (_d = (_c = variant.image) != null ? _c : (_b = variant.images) == null ? void 0 : _b[0]) != null ? _d : product.image) != null ? _f : (_e = product.images) == null ? void 0 : _e[0],
        variantNames: variantNamesArray.length > 0 ? variantNamesArray.join(", ") : void 0,
        quantity
      };
    });
    let couponForm = this.getComponent("CheckoutCouponForm/V1");
    couponForm == null ? void 0 : couponForm.cleanup(this.checkoutStore);
    this.render(true);
    this.hydrate();
    couponForm = this.getComponent("CheckoutCouponForm/V1");
    couponForm == null ? void 0 : couponForm.hydrate(this.checkoutStore);
  }
  hydrate() {
    var _a, _b, _c;
    (_a = this.element.querySelector(".elOrderSummaryHead")) == null ? void 0 : _a.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.open = !this.open;
      this.renderSummaryDetails();
    });
    (_b = this.element.querySelector(".elOrderSummaryCouponClear")) == null ? void 0 : _b.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.checkoutStore.coupons.currentCode.set("");
      this.checkoutStore.coupons.appliedCode.set("");
      CheckoutSummary.sendOrderPreview();
    });
    (_c = this.element.querySelector(".elOrderSummaryHeader")) == null ? void 0 : _c.addEventListener("click", () => {
      if (this.element.classList.contains("elOrderSummaryMobileOpen")) {
        addPageScroll();
        this.element.classList.remove("elOrderSummaryMobileOpen");
      } else {
        removePageScroll();
        this.element.classList.add("elOrderSummaryMobileOpen");
      }
    });
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    const is_server = true;
    const couponFieldEnabled = (_a = this.couponFieldEnabled) != null ? _a : null;
    const open = (_b = this.open) != null ? _b : null;
    const state = (_c = this.state) != null ? _c : "ok";
    const items = (_d = this.items) != null ? _d : [];
    const summary = (_e = this.summary) != null ? _e : {};
    const hasPhysicalProducts = (_f = this.hasPhysicalProducts) != null ? _f : false;
    const billingFields = (_g = this.billingFields) != null ? _g : null;
    const shippingFields = (_h = this.shippingFields) != null ? _h : null;
    const mobileBehavior = (_i = this.mobileBehavior) != null ? _i : null;
    const linkWithCheckout = this.element.getAttribute("data-param-linkWithCheckout");
    const linkedCheckoutId = this.element.getAttribute("data-param-linkedCheckoutId");
    let html = "";
    {
      if (globalResourceData.resourceName == "checkout") {
        if (linkWithCheckout) {
          html += `<div class="elCheckoutWrapper">`;
          if (linkWithCheckout == "true" || linkWithCheckout == true) {
            html += `<div class="elCheckoutOuterFrame"></div>`;
          }
          const is_checkout_page = globalResourceData.resourceName == "checkout";
          if (is_checkout_page) {
            html += `<div class="elOrderSummaryHeader`;
            if (!mobileBehavior || false) {
              html += ` forceHide`;
            }
            html += `"><div class="elOrderSummaryHeaderClosed"><div><span>View Order Summary</span><i class="fas fa-chevron-down"></i></div>`;
            if (state == "ok") {
              html += `<span class="elOrderSummaryHeaderTotal">`;
              if (summary.interim) {
                html += `${summary.interim.formatted}`;
              } else {
                html += `${summary.total.formatted}`;
              }
              html += `</span>`;
            }
            html += `</div><div class="elOrderSummaryHeaderOpenned"><span>Close Order Summary</span><i class="fas fa-chevron-up"></i></div></div>`;
            html += `<div class="elOrderSummaryBody elCheckoutSummaryResource"><div class="elCartOrderSummaryItems">`;
            const c0 = items;
            const fl1 = new CF2ForloopDrop(c0.length);
            for (const item of c0) {
              const forloop = fl1;
              html += `<div class="elCartOrderSummaryRow"><div class="elCartOrderSummaryRowLeft">`;
              const imageUrl = item.imageUrl;
              html += `<div class="elCartOrderSummaryProductImageContainer `;
              if (!imageUrl) {
                html += `elCartOrderSummaryEmptyImageContainer`;
              }
              html += `">`;
              if (imageUrl) {
                html += `<div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
                if (!imageUrl && true && true) {
                  html += ` forceHide`;
                }
                html += `" data-liquid-replace="item">`;
                if (imageUrl || false) {
                  html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
                } else if (false) {
                  html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
                }
                html += `</div>`;
              }
              if (item.quantity && item.quantity > 0) {
                html += `<div class="elCartOrderSummaryProductImageBadge">${item.quantity}</div>`;
              }
              html += `</div><div class="elCartOrderSummaryRowLeftTextContainer"><div class="elCartOrderSummaryWithImageSubRow elOrderSummaryProductNameRow">${item.productName}</div>`;
              if (item.variantNames) {
                html += `<div class="elCartOrderSummaryWithImageSubRow elOrderSummaryProductDescriptionRow">${item.variantNames}</div>`;
              }
              html += `</div></div><div class="elCartOrderSummaryRowRight"><span>${item.priceName}</span></div></div>`;
              forloop.next();
            }
            html += `</div><div class="elOrderSummaryTotals">`;
            if (couponFieldEnabled && couponFieldEnabled != "false") {
              html += `<hr class="elCartOrderSummaryDivider"/>`;
              html += `<div data-page-element="CheckoutCouponForm/V1" class="elCheckoutCouponFormContainer id-CheckoutCouponForm/V1 hide" data-liquid-replace="item">`;
              const is_checkout_page2 = globalResourceData.resourceName == "checkout";
              if (is_checkout_page2) {
                html += `<div class="elCheckoutCartCouponFormWrapper"><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCartCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Discount Code" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Discount Code</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCartCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCartCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Add</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
              } else {
                html += `<div class="elCheckoutCouponFormWrapper"><i data-page-element="IconNode" class="fa-fw fa_icon fa_prepended elCheckoutCouponTagIcon fa fa-tag id-IconNode"></i><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Enter Coupon" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Enter Coupon</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Apply</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
              }
              html += `<paragraph-v1 class="elCouponCodeError"></paragraph-v1></div>`;
            }
            html += `<hr class="elCartOrderSummaryDivider"/><div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Subtotal </div><div class="elOrderSummaryRowRight">`;
            if (summary.subtotal) {
              html += `${summary.subtotal.formatted}`;
            } else {
              html += `--`;
            }
            html += `</div></div>`;
            if (summary.discount && summary.discount.amount > 0 && summary.discounts.length > 0) {
              const c2 = summary.discounts;
              const fl3 = new CF2ForloopDrop(c2.length);
              for (const discount of c2) {
                const forloop = fl3;
                html += `<div class="elOrderSummaryRow elOrderSummaryDiscountRow"><div class="elOrderSummaryRowLeft"> Discount `;
                if (discount.code) {
                  html += `(`;
                  html += `${discount.code})`;
                }
                html += `<span class="elOrderSummaryCouponClear">X</span></div><div class="elOrderSummaryRowRight">${summary.discount.formatted}</div></div>`;
                forloop.next();
              }
            }
            if (hasPhysicalProducts) {
              html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Shipping </div><div class="elOrderSummaryRowRight">`;
              if (!summary || !summary.shipping) {
                html += ` Calculated when shipping is entered `;
              } else if (summary.shipping.amount > 0) {
                html += `${summary.shipping.formatted}`;
              } else {
                html += ` FREE `;
              }
              html += `</div></div>`;
            }
            html += `<hr class="elCartOrderSummaryDivider"/><div class="elOrderSummaryRow"><div class="elCartOrderSummaryRowLeftTextContainer"><div class="elCartOrderSummarySubRow elCartOrderSummarySubRowTotalText"> Total </div></div><div class="elCartOrderSummaryRowRight"><span class="elCartOrderSummarySubRowTotalPrice">`;
            if (summary.interim) {
              html += `${summary.interim.formatted}`;
            } else {
              if (summary.total) {
                html += `${summary.total.formatted}`;
              } else {
                html += `--`;
              }
            }
            html += `</span></div></div></div></div>`;
          } else {
            html += `<div class="elOrderSummaryHead"><div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"><i class="fa fa-shopping-basket"></i><span class="elOrderSummaryHeadText">Summary</span></div><div class="elOrderSummaryRowRight">`;
            if (state == "waiting") {
              html += `<span> For more details, fill the form <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
            } else if (state == "calculating") {
              html += `<span> Calculating <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
            } else if (state == "error") {
              html += `<span> Something Unexpected Happened! <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
            }
            if (open) {
              html += `<i class="fas fa-chevron-up elOrderSummaryToggleable"></i>`;
            } else {
              if (state == "ok") {
                html += `<span class="elOrderSummaryTotalPrice">`;
                if (summary.interim) {
                  html += `${summary.interim.formatted}`;
                } else {
                  html += `${summary.total.formatted}`;
                }
                html += `</span>`;
              }
              html += `<i class="fas fa-chevron-down elOrderSummaryToggleable"></i>`;
            }
            html += `</div></div></div>`;
            if (open) {
              if (couponFieldEnabled && couponFieldEnabled != "false") {
                html += `<div data-page-element="CheckoutCouponForm/V1" class="elCheckoutCouponFormContainer id-CheckoutCouponForm/V1 hide" data-liquid-replace="item">`;
                const is_checkout_page2 = globalResourceData.resourceName == "checkout";
                if (is_checkout_page2) {
                  html += `<div class="elCheckoutCartCouponFormWrapper"><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCartCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Discount Code" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Discount Code</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCartCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCartCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Add</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
                } else {
                  html += `<div class="elCheckoutCouponFormWrapper"><i data-page-element="IconNode" class="fa-fw fa_icon fa_prepended elCheckoutCouponTagIcon fa fa-tag id-IconNode"></i><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Enter Coupon" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Enter Coupon</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Apply</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
                }
                html += `<paragraph-v1 class="elCouponCodeError"></paragraph-v1></div>`;
              }
              html += `<div class="elOrderSummaryBody">`;
              const c4 = items;
              const fl5 = new CF2ForloopDrop(c4.length);
              for (const item of c4) {
                const forloop = fl5;
                html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft">${item.productName}</div><div class="elOrderSummaryRowRight">`;
                if (item.quantity && item.quantity > 1) {
                  html += `<span class="elOrderSummaryQuantity">Qty ${item.quantity}</span>`;
                }
                html += `<span>${item.priceName}</span></div></div>`;
                forloop.next();
              }
              if (state == "ok") {
                if (summary.upcoming_invoice && summary.upcoming_invoice.line_items.length) {
                  html += `<hr class="elOrderSummaryDivider"/>`;
                  const c6 = summary.upcoming_invoice.line_items;
                  const fl7 = new CF2ForloopDrop(c6.length);
                  for (const item of c6) {
                    const forloop = fl7;
                    html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft">${item.variant_name}</div><div class="elOrderSummaryRowRight">`;
                    if (item.quantity && item.quantity > 1) {
                      html += `<span class="elOrderSummaryQuantity">Qty ${item.quantity}</span>`;
                    }
                    html += `<span>${item.formatted}</span></div></div>`;
                    forloop.next();
                  }
                }
                html += `<hr class="elOrderSummaryDivider"/>`;
                html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Taxes </div><div class="elOrderSummaryRowRight">${summary.tax.formatted}</div></div>`;
                if (summary.discount.amount > 0 && summary.discounts.length > 0) {
                  const c8 = summary.discounts;
                  const fl9 = new CF2ForloopDrop(c8.length);
                  for (const discount of c8) {
                    const forloop = fl9;
                    html += `<div class="elOrderSummaryRow elOrderSummaryDiscountRow"><div class="elOrderSummaryRowLeft"> Discount `;
                    if (discount.code) {
                      html += `(`;
                      html += `${discount.code})`;
                    }
                    html += `<span class="elOrderSummaryCouponClear">X</span></div><div class="elOrderSummaryRowRight">${summary.discount.formatted}</div></div>`;
                    forloop.next();
                  }
                }
                if (hasPhysicalProducts) {
                  html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Shipping </div><div class="elOrderSummaryRowRight">`;
                  if (summary.shipping.amount > 0) {
                    html += `${summary.shipping.formatted}`;
                  } else {
                    html += ` FREE `;
                  }
                  html += `</div></div>`;
                }
                html += `<hr class="elOrderSummaryDivider"/>`;
                html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Total </div><div class="elOrderSummaryRowRight"><span class="elOrderSummaryTotalPrice">`;
                if (summary.interim) {
                  html += `${summary.interim.formatted}`;
                } else {
                  html += `${summary.total.formatted}`;
                }
                html += `</span></div></div>`;
              }
              html += `</div>`;
            }
          }
          html += `</div>`;
        }
      } else {
        html += `<div class="elCheckoutWrapper">`;
        if (linkWithCheckout == "true" || linkWithCheckout == true) {
          html += `<div class="elCheckoutOuterFrame"></div>`;
        }
        const is_checkout_page = globalResourceData.resourceName == "checkout";
        if (is_checkout_page) {
          html += `<div class="elOrderSummaryHeader`;
          if (!mobileBehavior || false) {
            html += ` forceHide`;
          }
          html += `"><div class="elOrderSummaryHeaderClosed"><div><span>View Order Summary</span><i class="fas fa-chevron-down"></i></div>`;
          if (state == "ok") {
            html += `<span class="elOrderSummaryHeaderTotal">`;
            if (summary.interim) {
              html += `${summary.interim.formatted}`;
            } else {
              html += `${summary.total.formatted}`;
            }
            html += `</span>`;
          }
          html += `</div><div class="elOrderSummaryHeaderOpenned"><span>Close Order Summary</span><i class="fas fa-chevron-up"></i></div></div>`;
          html += `<div class="elOrderSummaryBody elCheckoutSummaryResource"><div class="elCartOrderSummaryItems">`;
          const c10 = items;
          const fl11 = new CF2ForloopDrop(c10.length);
          for (const item of c10) {
            const forloop = fl11;
            html += `<div class="elCartOrderSummaryRow"><div class="elCartOrderSummaryRowLeft">`;
            const imageUrl = item.imageUrl;
            html += `<div class="elCartOrderSummaryProductImageContainer `;
            if (!imageUrl) {
              html += `elCartOrderSummaryEmptyImageContainer`;
            }
            html += `">`;
            if (imageUrl) {
              html += `<div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
              if (!imageUrl && true && true) {
                html += ` forceHide`;
              }
              html += `" data-liquid-replace="item">`;
              if (imageUrl || false) {
                html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
              } else if (false) {
                html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
              }
              html += `</div>`;
            }
            if (item.quantity && item.quantity > 0) {
              html += `<div class="elCartOrderSummaryProductImageBadge">${item.quantity}</div>`;
            }
            html += `</div><div class="elCartOrderSummaryRowLeftTextContainer"><div class="elCartOrderSummaryWithImageSubRow elOrderSummaryProductNameRow">${item.productName}</div>`;
            if (item.variantNames) {
              html += `<div class="elCartOrderSummaryWithImageSubRow elOrderSummaryProductDescriptionRow">${item.variantNames}</div>`;
            }
            html += `</div></div><div class="elCartOrderSummaryRowRight"><span>${item.priceName}</span></div></div>`;
            forloop.next();
          }
          html += `</div><div class="elOrderSummaryTotals">`;
          if (couponFieldEnabled && couponFieldEnabled != "false") {
            html += `<hr class="elCartOrderSummaryDivider"/>`;
            html += `<div data-page-element="CheckoutCouponForm/V1" class="elCheckoutCouponFormContainer id-CheckoutCouponForm/V1 hide" data-liquid-replace="item">`;
            const is_checkout_page2 = globalResourceData.resourceName == "checkout";
            if (is_checkout_page2) {
              html += `<div class="elCheckoutCartCouponFormWrapper"><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCartCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Discount Code" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Discount Code</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCartCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCartCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Add</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
            } else {
              html += `<div class="elCheckoutCouponFormWrapper"><i data-page-element="IconNode" class="fa-fw fa_icon fa_prepended elCheckoutCouponTagIcon fa fa-tag id-IconNode"></i><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Enter Coupon" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Enter Coupon</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Apply</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
            }
            html += `<paragraph-v1 class="elCouponCodeError"></paragraph-v1></div>`;
          }
          html += `<hr class="elCartOrderSummaryDivider"/><div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Subtotal </div><div class="elOrderSummaryRowRight">`;
          if (summary.subtotal) {
            html += `${summary.subtotal.formatted}`;
          } else {
            html += `--`;
          }
          html += `</div></div>`;
          if (summary.discount && summary.discount.amount > 0 && summary.discounts.length > 0) {
            const c12 = summary.discounts;
            const fl13 = new CF2ForloopDrop(c12.length);
            for (const discount of c12) {
              const forloop = fl13;
              html += `<div class="elOrderSummaryRow elOrderSummaryDiscountRow"><div class="elOrderSummaryRowLeft"> Discount `;
              if (discount.code) {
                html += `(`;
                html += `${discount.code})`;
              }
              html += `<span class="elOrderSummaryCouponClear">X</span></div><div class="elOrderSummaryRowRight">${summary.discount.formatted}</div></div>`;
              forloop.next();
            }
          }
          if (hasPhysicalProducts) {
            html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Shipping </div><div class="elOrderSummaryRowRight">`;
            if (!summary || !summary.shipping) {
              html += ` Calculated when shipping is entered `;
            } else if (summary.shipping.amount > 0) {
              html += `${summary.shipping.formatted}`;
            } else {
              html += ` FREE `;
            }
            html += `</div></div>`;
          }
          html += `<hr class="elCartOrderSummaryDivider"/><div class="elOrderSummaryRow"><div class="elCartOrderSummaryRowLeftTextContainer"><div class="elCartOrderSummarySubRow elCartOrderSummarySubRowTotalText"> Total </div></div><div class="elCartOrderSummaryRowRight"><span class="elCartOrderSummarySubRowTotalPrice">`;
          if (summary.interim) {
            html += `${summary.interim.formatted}`;
          } else {
            if (summary.total) {
              html += `${summary.total.formatted}`;
            } else {
              html += `--`;
            }
          }
          html += `</span></div></div></div></div>`;
        } else {
          html += `<div class="elOrderSummaryHead"><div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"><i class="fa fa-shopping-basket"></i><span class="elOrderSummaryHeadText">Summary</span></div><div class="elOrderSummaryRowRight">`;
          if (state == "waiting") {
            html += `<span> For more details, fill the form <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
          } else if (state == "calculating") {
            html += `<span> Calculating <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
          } else if (state == "error") {
            html += `<span> Something Unexpected Happened! <i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span>`;
          }
          if (open) {
            html += `<i class="fas fa-chevron-up elOrderSummaryToggleable"></i>`;
          } else {
            if (state == "ok") {
              html += `<span class="elOrderSummaryTotalPrice">`;
              if (summary.interim) {
                html += `${summary.interim.formatted}`;
              } else {
                html += `${summary.total.formatted}`;
              }
              html += `</span>`;
            }
            html += `<i class="fas fa-chevron-down elOrderSummaryToggleable"></i>`;
          }
          html += `</div></div></div>`;
          if (open) {
            if (couponFieldEnabled && couponFieldEnabled != "false") {
              html += `<div data-page-element="CheckoutCouponForm/V1" class="elCheckoutCouponFormContainer id-CheckoutCouponForm/V1 hide" data-liquid-replace="item">`;
              const is_checkout_page2 = globalResourceData.resourceName == "checkout";
              if (is_checkout_page2) {
                html += `<div class="elCheckoutCartCouponFormWrapper"><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCartCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Discount Code" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Discount Code</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCartCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCartCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Add</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
              } else {
                html += `<div class="elCheckoutCouponFormWrapper"><i data-page-element="IconNode" class="fa-fw fa_icon fa_prepended elCheckoutCouponTagIcon fa fa-tag id-IconNode"></i><div data-page-element="Input/V1" class="elFormItemWrapper elInputWrapper de-input-block elCheckoutCouponCodeInput id-Input/V1 labelInside" type="coupon_codes" data-liquid-replace="item"><input class="elFormItem elInput inputHolder " value="" type="text" name="coupon_codes" pattern="" autocomplete="" inputtype="" data-prevent-submit="" data-prevent-garlic="true" placeholder="Enter Coupon" maxlength=""/><div class="elLabel"><div class="borderHolder"></div><div class="borderHolder labelText"><label>Enter Coupon</label></div><div class="borderHolder"></div></div><div class="inputHolder" data-input-status-type="true" data-error-container="true"></div><div class="input-icon"><i class="fas fa-exclamation"></i></div></div><div class="elCheckoutCouponCodeButtonWrapper"><div data-page-element="Button/V1" class="elBTN elCheckoutCouponCodeButton id-Button/V1" data-liquid-replace="item"><a target="_self" href="#check-coupon-code" class="elButton" aria-label="" data-disabled="false" data-show-button-ids="" data-hide-button-ids="" data-on-submit-go-to="" data-param-submittingText="Submitting..." data-style-guide-button="" rel="noopener"><span class="elButtonMain"><i class="fas fa-spinner fa-spin elButtonSpinner elButtonText"></i><span class="elButtonMainText elButtonText">Apply</span></span><span class="elButtonSub"></span></a></div><span class="elCheckoutCouponCodeButtonLoading"><i style="margin:0px 10px;" class="fas fa-spinner fa-spin"></i></span></div></div>`;
              }
              html += `<paragraph-v1 class="elCouponCodeError"></paragraph-v1></div>`;
            }
            html += `<div class="elOrderSummaryBody">`;
            const c14 = items;
            const fl15 = new CF2ForloopDrop(c14.length);
            for (const item of c14) {
              const forloop = fl15;
              html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft">${item.productName}</div><div class="elOrderSummaryRowRight">`;
              if (item.quantity && item.quantity > 1) {
                html += `<span class="elOrderSummaryQuantity">Qty ${item.quantity}</span>`;
              }
              html += `<span>${item.priceName}</span></div></div>`;
              forloop.next();
            }
            if (state == "ok") {
              if (summary.upcoming_invoice && summary.upcoming_invoice.line_items.length) {
                html += `<hr class="elOrderSummaryDivider"/>`;
                const c16 = summary.upcoming_invoice.line_items;
                const fl17 = new CF2ForloopDrop(c16.length);
                for (const item of c16) {
                  const forloop = fl17;
                  html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft">${item.variant_name}</div><div class="elOrderSummaryRowRight">`;
                  if (item.quantity && item.quantity > 1) {
                    html += `<span class="elOrderSummaryQuantity">Qty ${item.quantity}</span>`;
                  }
                  html += `<span>${item.formatted}</span></div></div>`;
                  forloop.next();
                }
              }
              html += `<hr class="elOrderSummaryDivider"/>`;
              html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Taxes </div><div class="elOrderSummaryRowRight">${summary.tax.formatted}</div></div>`;
              if (summary.discount.amount > 0 && summary.discounts.length > 0) {
                const c18 = summary.discounts;
                const fl19 = new CF2ForloopDrop(c18.length);
                for (const discount of c18) {
                  const forloop = fl19;
                  html += `<div class="elOrderSummaryRow elOrderSummaryDiscountRow"><div class="elOrderSummaryRowLeft"> Discount `;
                  if (discount.code) {
                    html += `(`;
                    html += `${discount.code})`;
                  }
                  html += `<span class="elOrderSummaryCouponClear">X</span></div><div class="elOrderSummaryRowRight">${summary.discount.formatted}</div></div>`;
                  forloop.next();
                }
              }
              if (hasPhysicalProducts) {
                html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Shipping </div><div class="elOrderSummaryRowRight">`;
                if (summary.shipping.amount > 0) {
                  html += `${summary.shipping.formatted}`;
                } else {
                  html += ` FREE `;
                }
                html += `</div></div>`;
              }
              html += `<hr class="elOrderSummaryDivider"/>`;
              html += `<div class="elOrderSummaryRow"><div class="elOrderSummaryRowLeft"> Total </div><div class="elOrderSummaryRowRight"><span class="elOrderSummaryTotalPrice">`;
              if (summary.interim) {
                html += `${summary.interim.formatted}`;
              } else {
                html += `${summary.total.formatted}`;
              }
              html += `</span></div></div>`;
            }
            html += `</div>`;
          }
        }
        html += `</div>`;
      }
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutOrderSummaryV1"] = CheckoutOrderSummaryV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-address-form-v1.ts
init_define_process();
init_nanostores();
init_input_v1();
init_select_box_v2();
init_runtime();
var CheckoutAddressFormV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    if (this.useCheckoutStore) {
      this.store = Checkout.store[this.type];
      this.fields = Checkout.store[`${this.type}Fields`];
      this.showAllErrors = Checkout.store.showAllErrors[this.type];
      this.formErrors = Checkout.computed[`${this.type}Errors`];
    } else {
      this.store = map({});
      this.fields = atom([...Checkout.store[`${this.type}Fields`].get()]);
      this.showAllErrors = atom(false);
      this.formErrors = computed([this.store, this.showAllErrors], (store, showAllErrors) => {
        const fields = this.fields.get();
        return Checkout.utils.addressErrors(store, showAllErrors, fields);
      });
      const initializeFromSavedContact = () => {
        const values = this.store.get();
        const fields = this.fields.get();
        const fieldsValues = parseAddressByFields(values, fields);
        this.store.set(fieldsValues);
        const { country, state } = this.store.get();
        if (country) {
          this.setInputValue("country", country);
        }
        if (state && this.hasState()) {
          this.setInputValue("state", state);
        }
      };
      Checkout.store.state.listen((newState) => {
        if (newState == Checkout.StoreStates.INITIALIZED) {
          initializeFromSavedContact();
        }
      });
      Checkout.store.checkout.mode.listen((newMode) => {
        if (newMode === "saved") {
          initializeFromSavedContact();
        }
      });
      this.store.listen((address) => {
        const fields = this.fields.get();
        const addressFields = fieldsForCountry(fields, address.country);
        this.fields.set(addressFields);
      });
    }
    this.store.listen((fieldValues) => {
      this.fields.get().forEach((prop) => {
        this.setInputValue(prop, fieldValues[prop]);
      });
    });
    this.formErrors.subscribe((errors) => {
      if (!this.disableInputValidationOnBlur) {
        this.checkErrors(errors);
      } else {
        if (this.showAllErrors.get()) this.checkErrors(errors);
      }
    });
    this.setupAutocomplete();
    this.setupInputListeners();
  }
  hasState() {
    return this.fields.get().includes("state");
  }
  hasPostalCode(fields) {
    return (fields != null ? fields : this.fields.get()).includes("zip");
  }
  checkErrors(errors) {
    const errorWrapper = this.element.querySelector(".elCheckoutFormErrors");
    errorWrapper.classList.add("elHide");
    this.fields.get().forEach((prop) => {
      const input = this.getInputFromName(prop);
      resetInputErrors(input);
    });
    if (Checkout.utils.hasErrors(errors)) {
      const fieldErrors = errors.fields;
      if (fieldErrors) {
        const errors2 = [];
        Object.entries(fieldErrors).forEach(([field, error]) => {
          const { message } = error;
          errors2.push(message);
          const input = this.getInputFromName(field);
          addError(input);
        });
        if (errors2.length) {
          const listErrors = `<ul>${errors2.map((err) => `<li>${err}</li>`).join("")}</ul>`;
          errorWrapper.innerHTML = listErrors;
          errorWrapper.classList.remove("elHide");
        } else {
          errorWrapper.classList.add("elHide");
        }
      }
    }
  }
  getInputFromName(name) {
    return this.element.querySelector(`[name='${this.type}_${name}']`);
  }
  getWrapperElement(prop) {
    const input = this.getInputFromName(prop);
    return input.closest(".elFormItemWrapper");
  }
  setInputValue(fieldName, value) {
    const input = this.getInputFromName(fieldName);
    value = value == null ? void 0 : value.trim();
    if (value) {
      if (fieldName === "country") {
        !this.populatedCountries && this.populateCountries();
        this.populatedCountries = true;
        if (this.hasState()) this.populateStates();
      }
      input.value = value;
      $(input).parents(".elFormItemWrapper").addClass("hasValue");
    } else {
      input.value = "";
      $(input).parents(".elFormItemWrapper").removeClass("hasValue");
    }
  }
  setupAutocomplete() {
    var _a, _b;
    if (!((_b = (_a = window.google) == null ? void 0 : _a.maps) == null ? void 0 : _b.places)) return;
    const addressInput = this.getInputFromName("address");
    if (!addressInput) return;
    const autoComplete = new window.google.maps.places.Autocomplete(addressInput, {
      fields: ["address_components", "name"],
      types: ["address"]
    });
    const autoCompleteLsr = autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      const valueByComponentType = place.address_components.reduce((acc, component) => {
        const type = component.types;
        if (type.includes("locality")) {
          acc["locality"] = component.long_name;
        } else if (type.includes("administrative_area_level_2")) {
          acc["administrative_area_level_2"] = component.long_name;
        } else if (type.includes("administrative_area_level_1")) {
          acc["administrative_area_level_1"] = component.short_name;
        } else if (type.includes("country")) {
          acc["country"] = component.short_name;
        } else if (type.includes("postal_code")) {
          acc["postal_code"] = component.long_name;
        }
        return acc;
      }, {});
      const address = { address: place.name };
      address.country = valueByComponentType["country"];
      const stateMap = this.stateMap(address.country);
      const stateValue = valueByComponentType["administrative_area_level_1"];
      address.state = stateMap.mapByCode[stateValue] ? stateValue : stateMap.mapByGoogleName[stateValue];
      if (!address.state) {
        address.state = this.firstStateFromCountry(address.country);
      }
      address.city = valueByComponentType["locality"] || valueByComponentType["administrative_area_level_2"];
      address.zip = valueByComponentType["postal_code"];
      this.store.set(address);
      this.validateFormFields();
    });
    if (!window.gm_authFailureSet) {
      window.gm_authFailure = () => {
        const inputTargets = document.querySelectorAll(".pac-target-input");
        inputTargets.forEach((input, index) => {
          input.disabled = false;
          input.placeholder = "Address";
          input.style.backgroundImage = "";
          if (window.prevCheckoutAddressFocus == input) {
            input.focus();
          }
        });
      };
      window.gm_authFailureSet = true;
    }
    this.enableBrowserAutoCompleteWhenBlank(autoCompleteLsr);
  }
  updateFields(country) {
    const addressFields = fieldsForCountry(this.fields.get(), country);
    this.fields.set(addressFields);
  }
  setupInputListeners() {
    this.fields.get().forEach((prop) => {
      const input = this.getInputFromName(prop);
      if (input !== null) {
        if (prop === "state" || prop === "country") {
          input.addEventListener("input", () => {
            if (prop === "country") {
              const firstStateValue = this.firstStateFromCountry(input.value);
              if (this.hasState()) {
                this.store.set(__spreadProps(__spreadValues({}, this.store.get()), {
                  country: input.value,
                  state: firstStateValue
                }));
              } else {
                this.store.set(__spreadProps(__spreadValues({}, this.hasPostalCode() ? this.store.get() : {}), {
                  country: input.value
                }));
              }
            } else {
              const value = input.value;
              setTimeout(() => {
                this.store.setKey(prop, value);
              });
            }
          });
        } else {
          input.addEventListener("blur", () => {
            this.store.setKey(prop, input.value);
            if (!this.disableInputValidationOnBlur) {
              this.checkErrors(this.formErrors.get());
            } else {
              if (this.showAllErrors.get()) this.checkErrors(this.formErrors.get());
            }
          });
        }
      }
    });
    this.fields.listen((fields) => {
      this.updatePostalCode(fields);
    });
    this.updatePostalCode();
  }
  updatePostalCode(fields) {
    const hasPostalCode = this.hasPostalCode(fields);
    const zipInputWrapper = this.getWrapperElement("zip");
    const countryWrapper = this.getWrapperElement("country");
    if (hasPostalCode) {
      zipInputWrapper.classList.remove("elHide");
      countryWrapper.classList.remove("elInputOuterBottomLeftCorner");
      countryWrapper.classList.remove("elInputOuterBottomRightCorner");
    } else {
      zipInputWrapper.classList.add("elHide");
      countryWrapper.classList.add("elInputOuterBottomLeftCorner");
      countryWrapper.classList.add("elInputOuterBottomRightCorner");
    }
  }
  validateFormFields() {
    const address = this.store.get();
    const errors = Checkout.utils.addressErrors(address, true, this.fields.get());
    if (Checkout.utils.hasErrors(errors)) {
      this.showAllErrors.set(true);
      return false;
    } else {
      return true;
    }
  }
  populateCountries() {
    const topMapping = ["US", "CA", "GB", "IE", "AU", "NZ"];
    const topHash = topMapping.reduce((acc, val) => {
      acc[val] = true;
      return acc;
    }, {});
    const topOptions = topMapping.map((iso2) => ({ iso2 }));
    const remainingOptions = [];
    Checkout.allCountries.forEach((item) => {
      if (topHash[item.iso2]) {
        const option = topOptions.find((option2) => option2.iso2 == item.iso2);
        option.name = item.name;
      } else {
        remainingOptions.push(item);
      }
    });
    let html = "";
    topOptions.forEach((item) => html += `<option value="${item.iso2}" > ${item.name} </option>`);
    remainingOptions.forEach((item) => html += `<option value="${item.iso2}" > ${item.name} </option>`);
    const countrySelect = this.getInputFromName("country");
    countrySelect.innerHTML = html;
  }
  populateStates() {
    var _a, _b;
    const countryValue = this.store.get().country;
    const statesSelect = this.getInputFromName("state");
    let html = "";
    const countryData = Checkout.allCountries.find((country) => countryValue == country.iso2);
    countryData.regions.forEach((region, index) => {
      html += `<option value="${region.state_code}" > ${region.name} </option>`;
    });
    const firstStateValue = (_b = (_a = countryData.regions) == null ? void 0 : _a[0]) == null ? void 0 : _b.state_code;
    if (firstStateValue) {
      $(statesSelect).parents(".elFormItemWrapper").show();
      statesSelect.innerHTML = html;
    } else {
      $(statesSelect).parents(".elFormItemWrapper").hide();
      statesSelect.innerHTML = "";
    }
  }
  stateMap(countryValue) {
    const stateMap = {
      mapByCode: {},
      mapByGoogleName: {}
    };
    const countryData = Checkout.allCountries.find((country) => countryValue == country.iso2);
    countryData.regions.forEach((region, index) => {
      stateMap.mapByCode[region.state_code] = true;
      stateMap.mapByGoogleName[region.google_name] = region.state_code;
    });
    return stateMap;
  }
  firstStateFromCountry(countryValue) {
    var _a, _b;
    const countryData = Checkout.allCountries.find((country) => country.iso2 == countryValue);
    return (_b = (_a = countryData.regions) == null ? void 0 : _a[0]) == null ? void 0 : _b.state_code;
  }
  enableBrowserAutoCompleteWhenBlank(autoCompleteLsr) {
    const addressInput = this.getInputFromName("address");
    const autoCompleteValue = addressInput.getAttribute("autocomplete");
    const observer = new MutationObserver(function(mutationsList, observer2) {
      var _a;
      for (const mutation of mutationsList) {
        if (mutation.attributeName == "autocomplete" && mutation.target.getAttribute("autocomplete") == "off") {
          observer2.disconnect();
          if ((_a = mutation.target.value) == null ? void 0 : _a.length) {
            mutation.target.setAttribute("autocomplete", "none");
          } else {
            mutation.target.setAttribute("autocomplete", autoCompleteValue);
          }
        }
      }
    });
    observer.observe(addressInput, { attributes: true });
    addressInput.addEventListener("input", (e) => {
      var _a;
      if ((_a = e.target.value) == null ? void 0 : _a.length) {
        e.target.setAttribute("autocomplete", "none");
      } else {
        e.target.setAttribute("autocomplete", autoCompleteValue);
      }
    });
    addressInput.addEventListener("blur", (e) => {
      window.prevCheckoutAddressFocus = addressInput;
      setTimeout(() => {
        if ($(addressInput).hasClass("gm-err-autocomplete")) {
          if (window.google.maps.event) {
            window.google.maps.event.removeListener(this.autoCompleteLsr);
            window.google.maps.event.clearInstanceListeners(addressInput);
          }
        }
      });
    });
  }
};
window["CheckoutAddressFormV1"] = CheckoutAddressFormV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-billing-address-v1.ts
init_define_process();
init_checkbox_v1();
init_runtime();
var CheckoutBillingAddressV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.type = "billing";
    this.getCheckbox().addEventListener("change", (evt) => {
      evt.stopPropagation();
      const value = !!evt.target.checked;
      Checkout.store.billingSameAsShipping.set(value);
      if (!value) {
        const shippingData = Checkout.store.shipping.get();
        const newBillingData = parseAddressByFields(shippingData, this.fields, false);
        Checkout.store.billing.set(newBillingData);
      }
    });
    Checkout.store.billingSameAsShipping.listen((value) => {
      this.getCheckbox().checked = value;
      if (value) {
        this.hideForm();
      } else {
        this.showForm();
      }
    });
    nanostores.computed(
      [Checkout.computed.hasPhysicalProducts, Checkout.store.billingSameAsShipping],
      (hasPhysicalProducts, billingSameAsShipping) => ({ hasPhysicalProducts, billingSameAsShipping })
    ).subscribe(({ hasPhysicalProducts, billingSameAsShipping }) => {
      if (hasPhysicalProducts) {
        this.showBillingSameAsShipping();
        if (billingSameAsShipping) {
          this.hideForm();
        } else {
          this.showForm();
        }
      } else {
        this.hideBillingSameAsShipping();
        this.showForm();
      }
    });
    nanostores.computed([Checkout.store.payment.type], (paymentType) => paymentType != "apple-pay").subscribe((display) => {
      if (display) {
        this.show();
      } else {
        this.hide();
      }
    });
  }
  show() {
    this.element.classList.remove("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
  showForm() {
    this.element.querySelector(".elBillingForm").classList.remove("elHide");
  }
  hideForm() {
    this.element.querySelector(".elBillingForm").classList.add("elHide");
  }
  getCheckboxContainer() {
    return this.element.querySelector(".elShippingSameAsBillingContainer");
  }
  getCheckbox() {
    return this.getCheckboxContainer().querySelector("input");
  }
  showBillingSameAsShipping() {
    this.getCheckboxContainer().classList.remove("elHide");
  }
  hideBillingSameAsShipping() {
    this.getCheckboxContainer().classList.add("elHide");
  }
};
window["CheckoutBillingAddressV1"] = CheckoutBillingAddressV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-shipping-address-v1.ts
init_define_process();
init_runtime();
var CheckoutShippingAddressV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.contentEl = this.element.querySelector("div");
    const shouldDisplay = nanostores.computed([
      Checkout.computed.isNewDigitalWalletPayment,
      Checkout.computed.hasPhysicalProducts
    ], (isNewDigitalWalletPayment, hasPhysicalProducts) => {
      return hasPhysicalProducts && !isNewDigitalWalletPayment;
    });
    shouldDisplay.subscribe((display) => {
      if (display) {
        this.show();
      } else {
        this.hide();
      }
    });
  }
  show() {
    this.element.classList.remove("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
};
window["CheckoutShippingAddressV1"] = CheckoutShippingAddressV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-multi-step-v2.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-machine.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-existing-orders.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/CheckoutProductSelect/V2/checkoutProductSelect.ts
init_define_process();
init_general();
init_nanostores();
init_addToCart();
var registerProductEventListeners = (pcc) => {
  registerUpdatableOrders(pcc);
  registerVariantEventListeners(pcc);
};
var updateCardByProductIdState = (productId, data) => {
  const oldState = globalThis.Checkout.store.productCardByProductId.get()[productId];
  const newState = cleanEmptyObjectKeys(__spreadValues(__spreadValues({}, oldState), data));
  globalThis.Checkout.store.productCardByProductId.setKey(productId, newState);
  updateProductCarousel(productId, newState.variantId);
};
var updateProductCarousel = (productId, variantId) => {
  document.dispatchEvent(
    new CustomEvent("ProductCarousel:Update", {
      detail: {
        productId,
        variantId
      }
    })
  );
};
var registerOneTimeCardElementListeners = (productCardComponents, onMountCallback) => {
  productCardComponents.forEach((pcc) => {
    const anyUpdatableOrders = globalThis.Checkout.computed.anyUpdatableOrders.get();
    const initialPccState = globalThis.Checkout.store.productCardByProductId.get()[pcc.product.id];
    renderPcc(pcc, initialPccState, anyUpdatableOrders, onMountCallback);
    listenKeys(globalThis.Checkout.store.productCardByProductId, [pcc.product.id], () => {
      const newPccState = globalThis.Checkout.store.productCardByProductId.get()[pcc.product.id];
      const anyUpdatableOrders2 = globalThis.Checkout.computed.anyUpdatableOrders.get();
      renderPcc(pcc, newPccState, anyUpdatableOrders2, onMountCallback);
    });
  });
  productCardComponents.forEach((pcc) => {
    const element = pcc.element;
    element.addEventListener("click", (evt) => {
      if (pcc.selectType == "quantity") return;
      const button = evt.target.closest("a");
      if (button && !button.closest(".elProductCardModernButton")) return;
      if (pcc.selectType == "single") {
        for (const otherPcc of productCardComponents) {
          if (otherPcc == pcc || !otherPcc.isChecked) continue;
          updateCardByProductIdState(otherPcc.product.id, { quantity: 0 });
        }
        if (pcc.id.includes("Bump")) {
          if (pcc.isChecked) {
            updateCardByProductIdState(pcc.product.id, { quantity: 0 });
          } else {
            updateCardByProductIdState(pcc.product.id, { quantity: 1 });
          }
        } else {
          updateCardByProductIdState(pcc.product.id, { quantity: 1 });
        }
      } else if (pcc.selectType == "multiple") {
        if (pcc.isChecked) {
          updateCardByProductIdState(pcc.product.id, { quantity: 0 });
        } else {
          updateCardByProductIdState(pcc.product.id, { quantity: 1 });
        }
      }
    });
  });
};
var registerEventListeners = (pcc, onMountCallback) => {
  registerPriceEventListeners(pcc);
  onMountCallback && onMountCallback(pcc);
  if (pcc.selectType == "quantity") {
    registerQuantityEventListeners(pcc);
  }
};
var registerVariantEventListeners = (pcc) => {
  const element = pcc.element;
  const variantSelects = element.querySelectorAll(".elVariantSelector");
  variantSelects.forEach((select, index) => {
    select.addEventListener("click", (evt) => {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
    });
    select.addEventListener("change", (evt) => {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
      const newValues = [...variantSelects].map((e) => e.value);
      const selectedVariantId = getSelectedVariant(pcc, index, newValues);
      const newVariant = pcc.product.variants.find((v) => v.id == String(selectedVariantId));
      const newPrice = newVariant.prices[0];
      updateCardByProductIdState(pcc.product.id, {
        variantId: newVariant.id,
        priceId: newPrice.id
      });
    });
  });
};
var registerUpdatableOrders = (pcc) => {
  const element = pcc.element;
  const previousOrders = element.querySelectorAll(".elProductCardOrder");
  const newOrder = element.querySelector(".elProductCardNewOrder");
  previousOrders == null ? void 0 : previousOrders.forEach((orderElement) => {
    const showOrderDetailsLink = orderElement.querySelector(".elProductCardShowOrderDetailsLink");
    const upgradeAndDowngradeSelector = orderElement.querySelector('[name="upgradeDowngrade"]');
    const orderIndex = Number(orderElement.getAttribute("data-order-index"));
    const order = pcc.updatableOrders[orderIndex];
    orderElement.addEventListener("click", (evt) => {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
      const productId = pcc.product.id;
      const renderType = order.type;
      const cardDetails = pcc.updatableOrders[orderIndex].updatableItems[0].cardDetails;
      const updateCardNewState = {
        selectedOrderIndex: orderIndex,
        selectedUpdatableCartItemIndex: 0,
        renderType,
        variantId: cardDetails.variantId,
        priceId: cardDetails.priceId,
        cartItemRenderType: renderType,
        cartItemOrderId: cardDetails.orderId,
        cartItemLineItemId: cardDetails.lineItemId
      };
      updateCardByProductIdState(productId, updateCardNewState);
    });
    showOrderDetailsLink == null ? void 0 : showOrderDetailsLink.addEventListener("click", (evt) => {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
      globalThis.Checkout.store.selectedOrderDetailId.set(order.id);
    });
    upgradeAndDowngradeSelector == null ? void 0 : upgradeAndDowngradeSelector.addEventListener("click", (evt) => {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();
    });
    upgradeAndDowngradeSelector == null ? void 0 : upgradeAndDowngradeSelector.addEventListener("change", (evt) => {
      evt.stopImmediatePropagation();
      evt.stopPropagation();
      evt.preventDefault();
      const updatableItemIndex = Number(evt.target.value);
      const cardDetails = order.updatableItems[updatableItemIndex].cardDetails;
      const updateCardNewState = {
        selectedUpdatableCartItemIndex: updatableItemIndex,
        variantId: cardDetails.variantId,
        priceId: cardDetails.priceId,
        cartItemOrderId: cardDetails.orderId,
        cartItemLineItemId: cardDetails.lineItemId
      };
      updateCardByProductIdState(pcc.product.id, updateCardNewState);
    });
  });
  newOrder == null ? void 0 : newOrder.addEventListener("click", () => {
    const variant = pcc.product.variants[0];
    const variantId = variant.id;
    const priceId = variant.prices[0].id;
    const productId = pcc.product.id;
    const updateCardNewState = {
      variantId,
      priceId,
      selectedOrderIndex: -1,
      selectedUpdatableCartItemIndex: 0,
      cartItemRenderType: void 0,
      cartItemOrderId: void 0,
      cartItemLineItemId: void 0
    };
    updateCardByProductIdState(productId, updateCardNewState);
  });
};
var registerPriceEventListeners = (pcc) => {
  const element = pcc.element;
  const variantPriceSelector = element.querySelector('[name="variant_price"]');
  variantPriceSelector == null ? void 0 : variantPriceSelector.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    evt.stopPropagation();
  });
  variantPriceSelector == null ? void 0 : variantPriceSelector.addEventListener("change", (evt) => {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    const newPriceId = Number(evt.target.value);
    updateCardByProductIdState(pcc.product.id, { priceId: newPriceId });
  });
};
var registerQuantityEventListeners = (pcc) => {
  const element = pcc.element;
  const [minusButton, plusButton] = element.querySelectorAll(".elProductInputControls button");
  const input = element.querySelector(".elProductInputControls input");
  minusButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (pcc.quantity === 0) return;
    const newQuantity = pcc.quantity - 1;
    updateCardByProductIdState(pcc.product.id, { quantity: newQuantity });
  });
  plusButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    const newQuantity = pcc.quantity + 1;
    updateCardByProductIdState(pcc.product.id, { quantity: newQuantity });
  });
  input.addEventListener("blur", (evt) => {
    const newQuantity = parseInt(evt.target.value);
    if (newQuantity == 0 || isNaN(newQuantity)) {
      updateCardByProductIdState(pcc.product.id, { quantity: 0 });
    } else {
      updateCardByProductIdState(pcc.product.id, { quantity: newQuantity });
    }
  });
};
var renderAndMount = (pcc, onMountCallback) => {
  pcc.render();
  if (pcc.skipMountOnRender) return;
  registerEventListeners(pcc, onMountCallback);
};
var renderPcc = (pcc, updates, anyUpdatableOrders, onMountCallback) => {
  let newSelectType;
  if (anyUpdatableOrders) {
    newSelectType = "single";
  } else if (!pcc.product.bump) {
    newSelectType = globalThis.Checkout.productSelectType;
  } else {
    newSelectType = pcc.selectType;
  }
  if (pcc.renderType == updates.renderType && pcc.variant.id == updates.variantId && pcc.selected_price.id == updates.priceId && pcc.quantity == updates.quantity && pcc.selectType == newSelectType && pcc.selectedOrderIndex == updates.selectedOrderIndex && pcc.selectedUpdatableCartItemIndex == updates.selectedUpdatableCartItemIndex && pcc.updatableOrders == updates.updatableOrders)
    return;
  pcc.renderType = updates.renderType;
  pcc.variant = globalThis.Checkout.variantsById[updates.variantId];
  pcc.selected_price = globalThis.Checkout.pricesById[updates.priceId];
  pcc.quantity = updates.quantity;
  pcc.selectType = newSelectType;
  pcc.selectedOrderIndex = updates.selectedOrderIndex;
  pcc.selectedUpdatableCartItemIndex = updates.selectedUpdatableCartItemIndex;
  pcc.updatableOrders = updates.updatableOrders;
  pcc.isChecked = updates.quantity > 0;
  if (pcc.isChecked) {
    pcc.element.classList.add("elProductSelected");
  } else {
    pcc.element.classList.remove("elProductSelected");
  }
  renderAndMount(pcc, onMountCallback);
};

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-existing-orders.ts
var REACTAVATABLE_SERVICE_STATUS = ["canceled", "churned"];
var _hasReactivatableItems, _hasUpgradeDowngradeItems, _productCardDetails, _productCardDetailsObj;
var CheckoutExistingOrders = class {
  static fetch() {
    if (globalThis.globalResourceData.resourceName == "checkout") return Promise.resolve();
    const orderId = new URLSearchParams(window.location.search).get("manage_order_id");
    const params = orderId ? `?manage_order_id=${orderId}` : "";
    return globalThis.CFFetch(
      `${window.location.origin}${renderedPath()}/existing_orders${params}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      },
      { retries: 3, shouldCaptureServerError: true }
    ).then((response) => response.json()).then((data) => {
      this.cleanUp();
      this.processExistingOrdersResponse(data);
    }).catch((e) => {
      throw new CheckoutCriticalError(ERROR_CODES.FETCH_EXISTING_ORDERS_ERROR, {
        cause: e
      });
    });
  }
  static cleanUp() {
    __privateSet(this, _hasReactivatableItems, false);
    __privateSet(this, _hasUpgradeDowngradeItems, false);
    this.orderDetailsByOrderId = {};
    __privateSet(this, _productCardDetails, {});
    __privateSet(this, _productCardDetailsObj, {});
  }
  static processExistingOrdersResponse(existingOrdersResponse) {
    existingOrdersResponse.orders.forEach((order) => {
      const orderId = order.id;
      this.orderDetailsByOrderId[orderId] = order;
      const orderNumber = order.order_number;
      order.line_items.forEach((lineItem) => {
        const productId = lineItem.product_id;
        const lineItemSubscriptionDetails = lineItem.subscription_details;
        if (REACTAVATABLE_SERVICE_STATUS.includes(lineItemSubscriptionDetails == null ? void 0 : lineItemSubscriptionDetails.status) && (lineItemSubscriptionDetails == null ? void 0 : lineItemSubscriptionDetails.reactivatable)) {
          this.processReactivation(lineItem, orderId, orderNumber, productId);
        } else {
          this.processUpgradeDowngrades(lineItem, orderId, orderNumber, productId);
        }
      });
    });
    if (__privateGet(this, _hasReactivatableItems) || __privateGet(this, _hasUpgradeDowngradeItems)) {
      this.processUpdatableObj();
      this.updateSelectedCardItem();
    }
  }
  static processUpdatableObj() {
    __privateSet(this, _productCardDetails, {});
    Object.keys(__privateGet(this, _productCardDetailsObj)).forEach((k) => {
      __privateGet(this, _productCardDetails)[k] = {
        updatableOrders: Object.values(__privateGet(this, _productCardDetailsObj)[k].updatableOrders).reverse()
      };
    });
  }
  static processReactivation(lineItem, orderId, orderNumber, productId) {
    const lineItemId = lineItem.id;
    const variantId = lineItem.variant_id;
    const priceId = lineItem.price_id;
    if (!globalThis.Checkout.variantsById[variantId] || !globalThis.Checkout.pricesById[priceId]) {
      return;
    }
    __privateSet(this, _hasReactivatableItems, true);
    this.storeProductCardDetails(
      globalThis.Checkout.CheckoutStates.REACTIVATE,
      orderId,
      orderNumber,
      lineItemId,
      productId,
      variantId,
      priceId
    );
  }
  static processUpgradeDowngrades(lineItem, orderId, orderNumber, productId) {
    const lineItemId = lineItem.id;
    lineItem.upgrade_downgrade_options.forEach((upgradeDowngrade) => {
      const variantId = upgradeDowngrade.variant_to_id;
      const priceId = upgradeDowngrade.price_to_id;
      if (!globalThis.Checkout.variantsById[variantId] || !globalThis.Checkout.pricesById[priceId]) {
        return;
      }
      __privateSet(this, _hasUpgradeDowngradeItems, true);
      this.storeProductCardDetails(
        globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE,
        orderId,
        orderNumber,
        lineItemId,
        productId,
        variantId,
        priceId,
        upgradeDowngrade.direction
      );
    });
  }
  static storeProductCardDetails(type, orderId, orderNumber, lineItemId, productId, variantId, priceId, direction) {
    var _a, _b;
    __privateGet(this, _productCardDetailsObj)[productId] = (_a = __privateGet(this, _productCardDetailsObj)[productId]) != null ? _a : {
      updatableOrders: {}
    };
    const updatableOrders = __privateGet(this, _productCardDetailsObj)[productId].updatableOrders;
    updatableOrders[orderId] = (_b = updatableOrders[orderId]) != null ? _b : {
      type,
      id: orderId,
      number: orderNumber,
      updatableItems: []
    };
    const { name: variantName } = globalThis.Checkout.variantsById[variantId];
    const { name: priceName } = globalThis.Checkout.pricesById[priceId];
    const updatableItems = updatableOrders[orderId].updatableItems;
    updatableItems.push({
      variantName,
      priceName,
      direction: direction ? (direction == null ? void 0 : direction.charAt(0).toUpperCase()) + (direction == null ? void 0 : direction.slice(1)) : null,
      cardDetails: __spreadValues({
        variantId,
        priceId
      }, type == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE ? {
        orderId,
        lineItemId
      } : {})
    });
  }
  static updateSelectedCardItem() {
    var _a, _b, _c;
    let selectedCartItemDetail;
    globalThis.Checkout.computed.checkoutCart.get().items.find(({ product_id, variant_id, price_id }) => {
      var _a2, _b2, _c2;
      const cardDetails = (_a2 = __privateGet(this, _productCardDetails)[product_id]) == null ? void 0 : _a2.updatableOrders[0].updatableItems[0].cardDetails;
      if (!globalThis.Checkout.productsById[product_id].bump && __privateGet(this, _productCardDetails)[product_id]) {
        selectedCartItemDetail = {};
        selectedCartItemDetail.variantId = (_b2 = cardDetails == null ? void 0 : cardDetails.variantId) != null ? _b2 : variant_id;
        selectedCartItemDetail.priceId = (_c2 = cardDetails == null ? void 0 : cardDetails.priceId) != null ? _c2 : price_id;
        selectedCartItemDetail.productId = product_id;
        return true;
      }
    });
    if (!selectedCartItemDetail) {
      selectedCartItemDetail = {};
      const product = globalThis.Checkout.products.filter((p) => !p.bump)[0];
      const cardDetails = (_a = __privateGet(this, _productCardDetails)[product.id]) == null ? void 0 : _a.updatableOrders[0].updatableItems[0].cardDetails;
      const variant = product.variants[0];
      const price = variant.prices[0];
      selectedCartItemDetail.variantId = (_b = cardDetails == null ? void 0 : cardDetails.variantId) != null ? _b : Number(variant.id);
      selectedCartItemDetail.priceId = (_c = cardDetails == null ? void 0 : cardDetails.priceId) != null ? _c : Number(price.id);
      selectedCartItemDetail.productId = product.id;
    }
    const productCardsById = globalThis.Checkout.store.productCardByProductId.get();
    Object.keys(productCardsById).forEach((productId) => {
      var _a2;
      const hasUpdatablePccState = !!__privateGet(this, _productCardDetails)[productId];
      if (hasUpdatablePccState) {
        const order = __privateGet(this, _productCardDetails)[productId].updatableOrders[0];
        const cartItem = order.updatableItems[0].cardDetails;
        const updatablePccState = (_a2 = __privateGet(this, _productCardDetails)[productId]) != null ? _a2 : {};
        updatablePccState.selectedOrderIndex = 0;
        updatablePccState.selectedUpdatableCartItemIndex = 0;
        updatablePccState.cartItemOrderId = cartItem.orderId;
        updatablePccState.cartItemLineItemId = cartItem.lineItemId;
        updatablePccState.cartItemRenderType = updatablePccState.renderType = order.type;
        updatablePccState.variantId = cartItem.variantId;
        updatablePccState.priceId = cartItem.priceId;
        const isProductInCart = selectedCartItemDetail.productId == productId;
        if (isProductInCart) {
          updatablePccState.variantId = selectedCartItemDetail.variantId;
          updatablePccState.priceId = selectedCartItemDetail.priceId;
          updatablePccState.quantity = 1;
        }
        updateCardByProductIdState(productId, __spreadValues({}, updatablePccState));
      }
    });
  }
};
_hasReactivatableItems = new WeakMap();
_hasUpgradeDowngradeItems = new WeakMap();
_productCardDetails = new WeakMap();
_productCardDetailsObj = new WeakMap();
__privateAdd(CheckoutExistingOrders, _hasReactivatableItems, false);
__privateAdd(CheckoutExistingOrders, _hasUpgradeDowngradeItems, false);
__privateAdd(CheckoutExistingOrders, _productCardDetails, {});
__privateAdd(CheckoutExistingOrders, _productCardDetailsObj, {});
__publicField(CheckoutExistingOrders, "orderDetailsByOrderId", {});

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-digital-wallet.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-submit.ts
init_define_process();
init_general();
var pageElementContexts = [
  { selector: '[data-page-element="ModalContainer/V1"]', context: "Modal" },
  { selector: '[data-page-element="ContentNode"]', context: "ContentNode" }
];
var _redirecTo, _threedsListenerEnabled, _formSubmitPayload, _CheckoutSubmit_static, leadSourceGenerator_fn, submitRebilly_fn, buildPurchaseCartDetails_fn, buildPaymentMethodDetails_fn, buildCustomFields_fn, buildRegistrationDetails_fn, shouldIncludeRegistration_fn, buildAddressParams_fn2, submitOrderAsync_fn, handleFormSubmitRedirect_fn, add3dsListener_fn;
var CheckoutSubmit = class {
  static submitFromButtonClick(submitButton) {
    var _a, _b;
    __privateMethod(this, _CheckoutSubmit_static, add3dsListener_fn).call(this);
    const checkoutElement = submitButton.closest(".elCheckout");
    if (this.checkSubmitShowErrors({ skipFields: /* @__PURE__ */ new Set(["payment"]) }) && this.checkSubmitShowErrors({ onlyFields: /* @__PURE__ */ new Set(["payment"]) }) && this.checkSubmit(checkoutElement)) {
      globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.SUBMITTING);
      globalThis.Checkout.store.submitting.set({
        state: globalThis.Checkout.SubmittingStates.START
      });
      const isUpgradeDowngrade = globalThis.Checkout.store.checkout.mode.get() == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE;
      const capturedPaymentMethodId = globalThis.Checkout.store.payment.id.get();
      const canSkipSubmitRebilly = isUpgradeDowngrade || capturedPaymentMethodId;
      if (canSkipSubmitRebilly) {
        const payload = this.buildPayloadFromStore({
          contact: globalThis.Checkout.store.contact.get(),
          shippingAddress: globalThis.Checkout.store.shipping.get(),
          billingAddress: globalThis.Checkout.store.billing.get(),
          paymentMethodDetails: (_a = __privateMethod(this, _CheckoutSubmit_static, buildPaymentMethodDetails_fn).call(this)) != null ? _a : {},
          selectedShippingOption: globalThis.Checkout.store.shippingOption.get(),
          skipBillingAddress: globalThis.Checkout.utils.skipBillingAddress(globalThis.Checkout.store)
        });
        return this.submit(payload);
      } else {
        const paymentType = globalThis.Checkout.store.payment.type.get();
        if (paymentType == "payment-card") {
          return __privateMethod(this, _CheckoutSubmit_static, submitRebilly_fn).call(this).then((tokenData) => {
            var _a2;
            globalThis.Checkout.store.payment[paymentType].token.set(tokenData.id);
            const payload = this.buildPayloadFromStore({
              contact: globalThis.Checkout.store.contact.get(),
              shippingAddress: globalThis.Checkout.store.shipping.get(),
              billingAddress: globalThis.Checkout.store.billing.get(),
              paymentMethodDetails: (_a2 = __privateMethod(this, _CheckoutSubmit_static, buildPaymentMethodDetails_fn).call(this)) != null ? _a2 : {},
              selectedShippingOption: globalThis.Checkout.store.shippingOption.get(),
              skipBillingAddress: globalThis.Checkout.utils.skipBillingAddress(globalThis.Checkout.store)
            });
            return this.submit(payload);
          });
        } else {
          const payload = this.buildPayloadFromStore({
            contact: globalThis.Checkout.store.contact.get(),
            shippingAddress: globalThis.Checkout.store.shipping.get(),
            billingAddress: globalThis.Checkout.store.billing.get(),
            paymentMethodDetails: (_b = __privateMethod(this, _CheckoutSubmit_static, buildPaymentMethodDetails_fn).call(this)) != null ? _b : {},
            selectedShippingOption: globalThis.Checkout.store.shippingOption.get(),
            skipBillingAddress: globalThis.Checkout.utils.skipBillingAddress(globalThis.Checkout.store)
          });
          return this.submit(payload);
        }
      }
    }
  }
  static checkSubmitShowErrors(options) {
    const { onlyFields, skipFields } = options != null ? options : {};
    return Object.entries(globalThis.Checkout.computed.errorsByName).map(([name, computed2]) => {
      if (onlyFields && !onlyFields.has(name)) return true;
      if (skipFields && skipFields.has(name)) return true;
      globalThis.Checkout.store.showAllErrors[name].set(true);
      return !globalThis.Checkout.utils.hasErrors(computed2.get());
    }).every((v) => !!v);
  }
  static checkSubmit(checkoutElement) {
    if (globalThis.Checkout.utils.canSubmit() && this.checkValidCustomFields(checkoutElement)) {
      return true;
    } else {
      globalThis.Checkout.store.incrScrollToFirstVisibleError.set(
        globalThis.Checkout.store.incrScrollToFirstVisibleError.get() + 1
      );
      return false;
    }
  }
  static getCheckoutContext(checkoutElement) {
    let found;
    pageElementContexts.find(({ selector }) => {
      found = checkoutElement.closest(selector);
      return found;
    });
    return found;
  }
  static checkValidCustomFields(checkoutElement) {
    const contextElement = this.getCheckoutContext(checkoutElement);
    if (!contextElement) return true;
    contextElement.querySelectorAll(".elFormItemWrapper:not(.elCheckout .elFormItemWrapper)").forEach((el) => {
      el.classList.remove("elInputError", "elInputWarning", "elInputValid");
    });
    const formItems = Array.from(
      contextElement.querySelectorAll(".elFormItem.required1:not(.elCheckout .elFormItem.required1)")
    ).filter((input) => !!input.getAttribute("data-custom-type") || input.getAttribute("type") == "checkbox");
    const results = [];
    formItems.forEach((input) => {
      const result = validateInput(input);
      results.push(result);
      let thisInput = $(input);
      const parent = thisInput.parents(".elFormItemWrapper");
      thisInput = parent.length && parent.find(".inputHolder, .borderHolder, .elCheckbox").length ? parent.find(".inputHolder, .borderHolder, .elCheckbox") : thisInput;
      if (result) {
        thisInput.css("border-color", "#4a8920");
        thisInput.css("border-width", "3px");
      } else {
        thisInput.css("border-color", "#B91517");
        thisInput.css("border-width", "3px");
      }
    });
    return results.every((r) => !!r);
  }
  static buildPayloadFromStore(payload) {
    var _a, _b, _c;
    const addressParams = (_a = __privateMethod(this, _CheckoutSubmit_static, buildAddressParams_fn2).call(this, {
      billingAddress: payload.billingAddress,
      shippingAddress: payload.shippingAddress
    }, {
      skipBillingAddress: payload.skipBillingAddress
    })) != null ? _a : {};
    const paymentDetails = payload.paymentMethodDetails;
    const purchaseCartDetails = __privateMethod(this, _CheckoutSubmit_static, buildPurchaseCartDetails_fn).call(this);
    const customFields = __privateMethod(this, _CheckoutSubmit_static, buildCustomFields_fn).call(this);
    const contact = payload.contact;
    const couponCode = globalThis.Checkout.store.featureFlags.isCouponEnabled.get() && globalThis.Checkout.store.coupons.appliedCode.get();
    const couponData = couponCode ? { coupon_codes: [couponCode] } : {};
    const rebillyPayload = __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, customFields ? customFields : {}), {
      contact: __spreadValues(__spreadValues({}, contact), (_b = addressParams.shipping) != null ? _b : {})
    }), (_c = addressParams.billing) != null ? _c : {}), {
      purchase: __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, couponData), purchaseCartDetails), paymentDetails), {
        process_new_order: true
      })
    });
    if (__privateMethod(this, _CheckoutSubmit_static, shouldIncludeRegistration_fn).call(this)) rebillyPayload["registration"] = __privateMethod(this, _CheckoutSubmit_static, buildRegistrationDetails_fn).call(this);
    const selected_shipping_option = payload.selectedShippingOption;
    if (selected_shipping_option && Object.keys(selected_shipping_option).length > 1) {
      rebillyPayload.purchase.selected_shipping_option = selected_shipping_option;
    }
    if (__privateGet(this, _redirecTo)) {
      rebillyPayload.redirect_to = __privateGet(this, _redirecTo);
    }
    if (globalThis.straightforward_onboarding_flow_redirect_url) {
      rebillyPayload.straightforward_onboarding_flow_redirect_url = globalThis.straightforward_onboarding_flow_redirect_url;
    }
    return rebillyPayload;
  }
  static generateShippingOptionId(shippingOption) {
    return [shippingOption.description, shippingOption.amount_formatted].join("$");
  }
  static buildDigitalWalletTransactionData(summaryData, cart, shippingEnabled, shippingOptions) {
    var _a, _b;
    const { line_items } = summaryData;
    const lineItems = line_items.map(({ price, description }, index) => {
      let label;
      if (line_items.length == cart.items.length) {
        const variantId = cart.items[index].variant_id;
        const variant = globalThis.Checkout.variantsById[variantId];
        label = variant.name;
      } else {
        label = description;
      }
      return {
        label,
        amount: price
      };
    });
    if (((_a = summaryData.tax) == null ? void 0 : _a.amount) > 0) {
      lineItems.push({
        label: "Taxes",
        amount: summaryData.tax.amount
      });
    }
    if (((_b = summaryData.shipping) == null ? void 0 : _b.amount) > 0) {
      lineItems.push({
        label: "Shipping",
        amount: summaryData.shipping.amount
      });
    }
    return __spreadValues({
      amount: summaryData.total.amount,
      lineItems
    }, shippingEnabled ? {
      status: shippingOptions.length ? "success" : "fail",
      shippingOptions: shippingOptions.map((shippingOption) => ({
        id: this.generateShippingOptionId(shippingOption),
        label: shippingOption.description,
        description: "",
        amount: Number(shippingOption.amount.amount)
      }))
    } : {});
  }
  static submit(payload) {
    if (localStorage.getItem("cf2:devtools:enabled")) {
      console.log("submitted data", payload);
    }
    globalThis.CFDispatchEvent(globalThis.CFEvents.FORM_SUBMITTED, payload);
    let timer = null;
    __privateMethod(this, _CheckoutSubmit_static, submitOrderAsync_fn).call(this, payload, 3, () => {
      clearInterval(timer);
      globalThis.Checkout.store.submitting.set({
        state: globalThis.Checkout.SubmittingStates.START
      });
    }, (sleepTime) => {
      let remainingSeconds = sleepTime / 1e3;
      clearInterval(timer);
      timer = setInterval(() => {
        remainingSeconds -= 1;
        globalThis.Checkout.store.submitting.set({
          state: globalThis.Checkout.SubmittingStates.WAITING_ON_QUEUE,
          remainingSeconds
        });
      }, 1e3);
    }).then((response) => {
      var _a;
      if (response.ok) {
        __privateSet(this, _formSubmitPayload, payload);
        const rawFlashes = response.headers.get("X-CF2-FLASHES");
        const flashes = JSON.parse(rawFlashes != null ? rawFlashes : "{}");
        if (flashes.error) {
          globalThis.Checkout.store.submitting.set({
            state: globalThis.Checkout.SubmittingStates.ERROR,
            code: globalThis.Checkout.ErrorTypes.SERVER_ERROR_WITH_MESSAGE,
            message: flashes.error
          });
        } else {
          globalThis.CFDispatchEvent(globalThis.CFEvents.FORM_SUBMITTED_OK, payload);
          if (response.headers.get("X-CF2-APPROVAL-URL")) {
            globalThis.Checkout.store.threeds.set({
              show: true,
              approvalUrl: response.headers.get("X-CF2-APPROVAL-URL")
            });
          } else {
            globalThis.Checkout.store.submitting.set({
              state: globalThis.Checkout.SubmittingStates.DONE
            });
            globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.SUBMITTED);
            globalThis.CFDispatchEvent(globalThis.CFEvents.FORM_SUBMITTED_FINALIZED, payload);
            __privateMethod(this, _CheckoutSubmit_static, handleFormSubmitRedirect_fn).call(this, response, response.headers.get("Location"));
          }
        }
      } else if (response.status >= 300 && response.status < 400) {
        globalThis.Checkout.store.submitting.set({
          state: globalThis.Checkout.SubmittingStates.DONE
        });
        globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.SUBMITTED);
        globalThis.CFDispatchEvent(globalThis.CFEvents.FORM_SUBMITTED_FINALIZED, payload);
        __privateMethod(this, _CheckoutSubmit_static, handleFormSubmitRedirect_fn).call(this, response, (_a = response.headers.get("Location")) != null ? _a : globalThis.location.href);
      } else if (response.status === 429) {
        clearInterval(timer);
        globalThis.Checkout.store.submitting.set({
          state: globalThis.Checkout.SubmittingStates.ERROR,
          code: globalThis.Checkout.ErrorTypes.EXCEEDED_MAX_RETRIES
        });
      } else {
        globalThis.Checkout.store.submitting.set({
          state: globalThis.Checkout.SubmittingStates.ERROR,
          code: globalThis.Checkout.ErrorTypes.UNHANDLED_SERVER_RESPONSE
        });
      }
    }).catch((err) => {
      console.error(err);
      clearInterval(timer);
      globalThis.Checkout.store.submitting.set({
        state: globalThis.Checkout.SubmittingStates.ERROR,
        code: globalThis.Checkout.ErrorTypes.SERVER_ERROR
      });
    });
  }
};
_redirecTo = new WeakMap();
_threedsListenerEnabled = new WeakMap();
_formSubmitPayload = new WeakMap();
_CheckoutSubmit_static = new WeakSet();
leadSourceGenerator_fn = function() {
  const DEFAULT_MAX_CHARS_LENGTH = 512;
  const leadQueryParamMapping = {
    utm_source: {
      name: "source"
    },
    utm_medium: {
      name: "medium"
    },
    utm_campaign: {
      name: "campaign"
    },
    utm_term: {
      name: "term"
    },
    utm_content: {
      name: "content"
    },
    affiliate: {},
    subAffiliate: {},
    clickId: {},
    salesAgent: {}
  };
  const params = new URLSearchParams(globalThis.location.search);
  return Array.from(params.keys()).reduce((acc, key) => {
    var _a;
    const mappedValue = leadQueryParamMapping[key];
    if (mappedValue) {
      const paramValue = params.get(key);
      const leadSourceName = (_a = mappedValue.name) != null ? _a : key;
      acc[leadSourceName] = paramValue.substring(0, DEFAULT_MAX_CHARS_LENGTH);
    }
    return acc;
  }, {});
};
submitRebilly_fn = function() {
  const selectedPaymentMethod = globalThis.Checkout.store.payment.type.get();
  const Rebilly = globalThis.Rebilly;
  let extraData = {
    method: selectedPaymentMethod
  };
  const leadSource = __privateMethod(this, _CheckoutSubmit_static, leadSourceGenerator_fn).call(this);
  if (Object.keys(leadSource).length) {
    extraData = __spreadProps(__spreadValues({}, extraData), { leadSource });
  }
  const form = document.querySelector("#cfAR");
  const rebillyDataMapping = {
    firstName: "first_name",
    lastName: "last_name",
    emails: "email"
  };
  const rebillyFieldKeyMapping = {
    "paymentInstrument.cvv": "cvv"
  };
  Object.entries(rebillyDataMapping).forEach(([rebillyKey, dataKey]) => {
    const input = form.querySelector(`[data-rebilly="${rebillyKey}"]`);
    if (input) {
      input.value = globalThis.Checkout.store.contact.get()[dataKey];
    }
  });
  return Rebilly.createToken(form, extraData).catch((e) => {
    console.error(e);
    if (e.invalidFields && e.invalidFields.length) {
      e.invalidFields.forEach((error) => {
        const key = rebillyFieldKeyMapping[error.field];
        if (key) {
          const event2 = { valid: false, error: { message: error.message } };
          globalThis.Checkout.store.payment["payment-card"].events.setKey(key, event2);
        }
      });
      globalThis.Checkout.store.submitting.set({
        state: globalThis.Checkout.SubmittingStates.ERROR,
        code: globalThis.Checkout.ErrorTypes.REBILLY_ERROR
      });
    } else {
      let message = e.message;
      if (e.details.length) {
        const details = e.details.join(" - ");
        message = `${message} - ${details}`;
      }
      globalThis.Checkout.store.submitting.set({
        state: globalThis.Checkout.SubmittingStates.ERROR,
        code: globalThis.Checkout.ErrorTypes.REBILLY_ERROR,
        message
      });
    }
    globalThis.Checkout.store.incrScrollToFirstVisibleError.set(
      globalThis.Checkout.store.incrScrollToFirstVisibleError.get() + 1
    );
  });
};
buildPurchaseCartDetails_fn = function() {
  const checkoutCart = globalThis.Checkout.computed.checkoutCart.get();
  const lineItems = checkoutCart.items.map(
    ({ variant_id, price_id, line_item_id, quantity }) => {
      return __spreadValues({
        id: variant_id,
        quantity,
        price_id
      }, line_item_id ? { line_item_id } : {});
    }
  );
  return { order_id: checkoutCart.order_id, product_variants: lineItems };
};
buildPaymentMethodDetails_fn = function() {
  const mode = globalThis.Checkout.store.checkout.mode.get();
  if (mode == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE) return;
  const payment_method_type = globalThis.Checkout.store.payment.type.get();
  const rebilly_token = globalThis.Checkout.store.payment[payment_method_type].token.get();
  const payment_method_id = globalThis.Checkout.store.payment.id.get();
  if (payment_method_id) return { payment_method_id, rebilly_token: null };
  return {
    payment_method_id: null,
    payment_method_type,
    rebilly_token
  };
};
buildCustomFields_fn = function() {
  const fields = {};
  document.querySelectorAll(
    "[type='custom_type'], select[data-custom-type], [type='custom_type'] [type='checkbox']"
  ).forEach((input) => {
    fields[input.name] = input.type === "checkbox" ? input.checked : input.value;
  });
  return fields;
};
buildRegistrationDetails_fn = function() {
  return {
    calendar_event_id: document.getElementsByName("registration[calendar_event_id]")[0].value,
    occurs_at: document.getElementsByName("registration[occurs_at]")[0].value
  };
};
shouldIncludeRegistration_fn = function() {
  var _a;
  return ((_a = document.getElementsByName("registration[calendar_event_id]")) == null ? void 0 : _a.length) > 0;
};
buildAddressParams_fn2 = function(addressParams, options) {
  var _a, _b;
  const mode = globalThis.Checkout.store.checkout.mode.get();
  const billing = (_a = addressParams.billingAddress) != null ? _a : {};
  const shipping = (_b = addressParams.shippingAddress) != null ? _b : {};
  if (mode == globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE) {
    return;
  }
  let billing_address_attributes, physical_address_attributes;
  if (isSavedAddress(billing)) {
    billing_address_attributes = {
      id: billing.id
    };
  } else {
    billing_address_attributes = {
      address_one: billing.address,
      address_two: billing.address_2,
      city: billing.city,
      region_name: billing.state,
      country_id: billing.country,
      postal_code: billing.zip
    };
  }
  if (isSavedAddress(shipping)) {
    physical_address_attributes = {
      id: shipping.id
    };
  } else {
    physical_address_attributes = {
      address_one: shipping.address,
      address_two: shipping.address_2,
      city: shipping.city,
      region_name: shipping.state,
      country_id: shipping.country,
      postal_code: shipping.zip
    };
  }
  if (globalThis.Checkout.utils.hasPhysicalProducts()) {
    const billingSameAsShipping = globalThis.Checkout.store.billingSameAsShipping.get();
    if (options.skipBillingAddress) {
      return { shipping: { shipping_addresses_attributes: [{ physical_address_attributes }] } };
    }
    if (mode == globalThis.Checkout.CheckoutStates.OTO) {
      return {
        shipping: { shipping_addresses_attributes: [{ physical_address_attributes }] },
        billing: { billing_address_attributes, billing_same_as_shipping: false }
      };
    }
    if (billingSameAsShipping) {
      return {
        shipping: { shipping_addresses_attributes: [{ physical_address_attributes }] },
        billing: { billing_same_as_shipping: true }
      };
    } else {
      return {
        shipping: { shipping_addresses_attributes: [{ physical_address_attributes }] },
        billing: { billing_address_attributes, billing_same_as_shipping: false }
      };
    }
  } else {
    if (options.skipBillingAddress) return;
    return { billing: { billing_address_attributes } };
  }
};
submitOrderAsync_fn = function(data, maxRetries = 3, onBeforeSubmit, onRetryAfter) {
  return __async(this, null, function* () {
    let response;
    for (let i = 0; i < maxRetries; i++) {
      onBeforeSubmit();
      response = yield fetch(renderedHref(), {
        credentials: "same-origin",
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "X-CF2-POST-TYPE": "submit"
        }
      }).then((res) => {
        if (res.status >= 500) {
          console.error(res);
          throw Error("500 error");
        }
        return res;
      });
      if (response.status === 429) {
        const sleepTime = parseInt(response.headers.get("Retry-After"));
        onRetryAfter(sleepTime);
        console.log(`Waiting on queue, retrying after ${sleepTime}`);
        yield sleepMs(sleepTime);
      } else {
        break;
      }
    }
    return response;
  });
};
handleFormSubmitRedirect_fn = function(response, urlToRedirect) {
  return __async(this, null, function* () {
    var _a;
    const userRedirectSignInUrl = response.headers.get("X-CF2-USER-REDIRECT-URL");
    const signInToken = response.headers.get("X-CF2-USER-SIGN-IN-TOKEN");
    if (userRedirectSignInUrl && signInToken && globalThis.straightforward_onboarding_flow_enabled) {
      const shouldRedirectImmediately = globalThis.straightforward_onboarding_flow_redirect_url;
      if (shouldRedirectImmediately) {
        globalThis.location.href = userRedirectSignInUrl;
      } else {
        const MAX_WAIT_TIME = 120;
        let fetchedActiveWorkspace;
        const startTime = Date.now();
        while (true) {
          const currentTime = Date.now();
          const elapsedTime = (currentTime - startTime) / 1e3;
          if (elapsedTime > MAX_WAIT_TIME) {
            fetchedActiveWorkspace = false;
            break;
          }
          const meRequest = `https://accounts.${globalThis.cfRootDomain}/me.json?token=${encodeURIComponent(
            signInToken
          )}`;
          const response2 = yield fetch(meRequest);
          if (response2.ok) {
            const responseJson = yield response2.json();
            const team = responseJson.teams[0];
            const workspaceCreationStatus = (_a = team == null ? void 0 : team.workspaces[0]) == null ? void 0 : _a.creation_status;
            if ((team == null ? void 0 : team.subscription_status) == "active" && workspaceCreationStatus == "install_finalized") {
              globalThis.location.href = userRedirectSignInUrl;
              fetchedActiveWorkspace = true;
              break;
            }
          }
          yield new Promise((resolve) => setTimeout(resolve, 4e3));
        }
        if (!fetchedActiveWorkspace) globalThis.location.href = urlToRedirect;
      }
    } else {
      globalThis.location.href = urlToRedirect;
    }
  });
};
add3dsListener_fn = function() {
  if (__privateGet(this, _threedsListenerEnabled)) return;
  __privateSet(this, _threedsListenerEnabled, true);
  globalThis.addEventListener("message", (event2) => {
    if (event2.data.sender == "CfOrderStatus") {
      const orderDetails = event2.data.details;
      if (__privateGet(this, _redirecTo)) {
        orderDetails.redirect_to = __privateGet(this, _redirecTo);
      }
      if (globalThis.straightforward_onboarding_flow_redirect_url) {
        orderDetails.straightforward_onboarding_flow_redirect_url = globalThis.straightforward_onboarding_flow_redirect_url;
      }
      fetch(renderedHref(), {
        credentials: "same-origin",
        method: "post",
        body: JSON.stringify(orderDetails),
        headers: {
          "Content-Type": "application/json",
          "X-CF2-POST-TYPE": "submit"
        }
      }).then((response) => {
        if (orderDetails["orderResult"] == "declined") {
          globalThis.Checkout.store.submitting.set({
            state: globalThis.Checkout.SubmittingStates.ERROR,
            code: globalThis.Checkout.ErrorTypes.THREEDS_DECLINED_ERROR
          });
        } else {
          if (response.ok) {
            globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.SUBMITTED);
            globalThis.CFDispatchEvent(globalThis.CFEvents.FORM_SUBMITTED_FINALIZED, __privateGet(this, _formSubmitPayload));
            __privateMethod(this, _CheckoutSubmit_static, handleFormSubmitRedirect_fn).call(this, response, response.headers.get("Location"));
          } else {
            response.json().then((r) => {
              globalThis.Checkout.store.submitting.set({
                state: globalThis.Checkout.SubmittingStates.ERROR,
                code: globalThis.Checkout.ErrorTypes.THREEDS_DECLINED_CUSTOM_ERROR,
                message: r.error
              });
            });
          }
        }
        globalThis.Checkout.store.threeds.set({
          show: false,
          approvalUrl: null
        });
      });
    }
  });
};
__privateAdd(CheckoutSubmit, _CheckoutSubmit_static);
__privateAdd(CheckoutSubmit, _redirecTo, document.querySelector('[href="#submit-checkout-form"]').getAttribute("data-on-submit-go-to"));
__privateAdd(CheckoutSubmit, _threedsListenerEnabled, false);
__privateAdd(CheckoutSubmit, _formSubmitPayload, null);

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-digital-wallet.ts
var _CheckoutDigitalWallet_static, updateRebillyWithCallback_fn;
var CheckoutDigitalWallet = class {
  static initialize() {
    globalThis.Rebilly.on("token-ready", (data, extraData) => {
      var _a;
      const paymentType = globalThis.Checkout.store.payment.type.get();
      const paymentMethod = data.method;
      const paymentInstrumentMethod = (_a = data.paymentInstrument) == null ? void 0 : _a.type;
      CheckoutSummary.skipOrderSummaryUpdateWithCb(() => {
        var _a2, _b, _c, _d;
        if (paymentMethod == "digital-wallet" && paymentInstrumentMethod == "Apple Pay") {
          let rebillyShippingAddress, rebillyBillingAddress;
          const shippingAddress = (_a2 = extraData == null ? void 0 : extraData.shippingDetails) == null ? void 0 : _a2.address;
          const billingAddress = data.billingAddress;
          const { emailAddress: shippingEmail, familyName: shippingLN, givenName: shippingFN } = shippingAddress != null ? shippingAddress : {};
          const {
            firstName: billingFN,
            lastName: billingLN
            // address: billingAddr,
            // address2: billingAddr2,
          } = billingAddress;
          if (globalThis.Checkout.computed.hasPhysicalProducts.get()) {
            rebillyShippingAddress = {
              address: (_b = shippingAddress.addressLines) == null ? void 0 : _b[0],
              address_2: (_c = shippingAddress.addressLines) == null ? void 0 : _c[1],
              country: shippingAddress.countryCode.toUpperCase(),
              city: shippingAddress.locality,
              zip: shippingAddress.postalCode,
              state: shippingAddress.administrativeArea
            };
          }
          rebillyBillingAddress = {
            address: billingAddress.address,
            address_2: billingAddress.address2,
            country: billingAddress.country.toUpperCase(),
            city: billingAddress.city,
            zip: billingAddress.postalCode,
            state: billingAddress.region
          };
          let contact;
          if (globalThis.Checkout.computed.useDigitalWalletForUpdatingContactStore.get()) {
            contact = {
              email: shippingEmail,
              first_name: [shippingFN, billingFN].find(Boolean),
              last_name: [shippingLN, billingLN].find(Boolean),
              phone_number: globalThis.Checkout.store.contact.get().phone_number
            };
          }
          const payload = CheckoutSubmit.buildPayloadFromStore({
            contact: contact != null ? contact : globalThis.Checkout.store.contact.get(),
            shippingAddress: rebillyShippingAddress,
            billingAddress: rebillyBillingAddress,
            paymentMethodDetails: {
              payment_method_id: null,
              payment_method_type: "apple-pay",
              rebilly_token: data.id
            },
            selectedShippingOption: (_d = this.transactionShippingOption) != null ? _d : {},
            skipBillingAddress: false
          });
          CheckoutSubmit.submit(payload);
        } else {
          globalThis.Checkout.store.payment[paymentType].token.set(data.id);
        }
      });
    });
    globalThis.Rebilly.on("shipping-address-changed", (shippingAddress, updateShippingOptions) => {
      CheckoutSummary.skipOrderSummaryUpdateWithCb(() => {
        this.transactionShipping = {
          country: shippingAddress.countryCode.toUpperCase(),
          city: shippingAddress.locality,
          zip: shippingAddress.postalCode,
          state: shippingAddress.administrativeArea
        };
      });
      __privateMethod(this, _CheckoutDigitalWallet_static, updateRebillyWithCallback_fn).call(this, updateShippingOptions);
    });
    globalThis.Rebilly.on("shipping-option-changed", (selectedShippingOption, updateTransaction) => {
      CheckoutSummary.skipOrderSummaryUpdateWithCb(() => {
        const shippingOptions = globalThis.Checkout.store.shippingOptions.get();
        this.transactionShippingOption = shippingOptions.find(
          (s) => CheckoutSubmit.generateShippingOptionId(s) == selectedShippingOption.id
        );
      });
      __privateMethod(this, _CheckoutDigitalWallet_static, updateRebillyWithCallback_fn).call(this, updateTransaction);
    });
    globalThis.Rebilly.on("billing-address-changed", (billingAddress, updateTransaction) => {
      CheckoutSummary.skipOrderSummaryUpdateWithCb(() => {
        billingAddress && (this.transactionBilling = {
          country: billingAddress.countryCode.toUpperCase(),
          city: billingAddress.locality,
          zip: billingAddress.postalCode,
          state: billingAddress.administrativeArea
        });
      });
      __privateMethod(this, _CheckoutDigitalWallet_static, updateRebillyWithCallback_fn).call(this, updateTransaction);
    });
  }
};
_CheckoutDigitalWallet_static = new WeakSet();
updateRebillyWithCallback_fn = function(updateCallback) {
  var _a, _b, _c;
  CheckoutSummary.fetchOrderSummaryForExpress({
    billingAddress: (_a = this.transactionBilling) != null ? _a : {},
    shippingAddress: (_b = this.transactionShipping) != null ? _b : {},
    shippingOption: (_c = this.transactionShippingOption) != null ? _c : {}
  }).then(({ summary, data }) => {
    var _a2;
    const { shipping_quotes_response } = summary;
    const cart = globalThis.Checkout.computed.checkoutCart.get();
    const shippingEnabled = globalThis.Checkout.utils.hasPhysicalProducts();
    const shippingOptions = (_a2 = shipping_quotes_response == null ? void 0 : shipping_quotes_response.options) != null ? _a2 : [];
    const transactionData = CheckoutSubmit.buildDigitalWalletTransactionData(
      data,
      cart,
      shippingEnabled,
      shippingOptions
    );
    updateCallback(transactionData);
  });
};
__privateAdd(CheckoutDigitalWallet, _CheckoutDigitalWallet_static);
__publicField(CheckoutDigitalWallet, "oldShipping");
__publicField(CheckoutDigitalWallet, "oldBilling");
__publicField(CheckoutDigitalWallet, "oldBillingSameAsShipping");
__publicField(CheckoutDigitalWallet, "transactionShipping");
__publicField(CheckoutDigitalWallet, "transactionShippingOption");
__publicField(CheckoutDigitalWallet, "transactionBilling");

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-machine.ts
init_nanostores();
var INITIALIAZE_PAI_TIMEOUT = 6e4;
var loadPAIDeps = (addLoader = true, shouldDisplayAndLogOnCriticalError = true) => {
  if (globalThis.Checkout.store.payment.state.get() != globalThis.Checkout.PaymentStates.START) return;
  globalThis.Checkout.store.payment.state.set(globalThis.Checkout.PaymentStates.INITIALIZING);
  if (addLoader) globalThis.Checkout.store.payment.state.set(globalThis.Checkout.PaymentStates.LOADING);
  const js = document.createElement("script");
  js.src = "https://framepay.payments.ai/rebilly.js";
  const errorHandler = (errorType, cause) => {
    if (shouldDisplayAndLogOnCriticalError) {
      const error = new CheckoutCriticalError(errorType, { cause });
      displayAndLogCriticalError(error);
    }
  };
  const promise = new Promise((resolve, reject) => {
    js.onload = () => {
      intializePAI().then(() => {
        CheckoutSummary.updateRebillyTransactionData(true);
        resolve();
      }).catch((e) => {
        errorHandler(ERROR_CODES.PAI_INITIALIZATION_READY_TIMEOUT_ERROR, e);
        reject(new CheckoutCriticalError(ERROR_CODES.PAI_INITIALIZATION_READY_TIMEOUT_ERROR, { cause: e }));
      });
    };
    js.onerror = () => {
      const error = new Error("framepay JS onError load");
      errorHandler(ERROR_CODES.PAI_INITIALIZATION_TIMEOUT_ERROR, error);
      reject(new CheckoutCriticalError(ERROR_CODES.PAI_INITIALIZATION_TIMEOUT_ERROR, { cause: error }));
    };
  });
  document.head.appendChild(js);
  const css = document.createElement("link");
  css.href = "https://framepay.payments.ai/rebilly.css";
  css.rel = "stylesheet";
  document.head.appendChild(css);
  return promise;
};
var intializePAI = () => {
  globalThis.Checkout.PaypalCallbacks = {
    onInit: () => {
      console.log("[PayPal] - onInit called");
      globalThis.Checkout.store.payment.paypal.state.set({ state: globalThis.Checkout.PaypalStates.INITIALIZED });
    },
    onApprove: (data, actions) => {
      console.log("[PayPal] - onApprove called", data, actions);
      globalThis.Checkout.store.payment.paypal.state.set({
        state: globalThis.Checkout.PaypalStates.PAYMENT_METHOD_APPROVED
      });
    },
    onError: (data, actions) => {
      console.log("[PayPal] - onError called", data, actions);
      globalThis.Checkout.store.payment.paypal.state.set({
        state: globalThis.Checkout.PaypalStates.ERROR,
        code: globalThis.Checkout.ErrorTypes.PAYPAL_CUSTOM_ERROR,
        message: "Something unexpected happened"
      });
    },
    onCancel: (data, actions) => {
      console.log("[PayPal] - onCancel called", data, actions);
      globalThis.Checkout.store.payment.paypal.state.set({
        state: globalThis.Checkout.PaypalStates.ERROR,
        code: globalThis.Checkout.ErrorTypes.PAYPAL_DECLINED_ERROR
      });
    },
    onClick: (data, actions) => {
      console.log("[PayPal] - onClick called", data, actions);
      globalThis.Checkout.store.payment.paypal.state.set({
        state: globalThis.Checkout.PaypalStates.ADDING_PAYMENT_METHOD
      });
    }
  };
  const checkoutElement = document.querySelector('[data-page-element="Checkout/V2"]');
  const inputColor = getComputedStyle(checkoutElement).getPropertyValue("--input-color");
  const fontFamily = getComputedStyle(checkoutElement).getPropertyValue("--multiple-payments-font-family");
  const fontSize = getComputedStyle(checkoutElement).getPropertyValue("--multiple-payments-font-size");
  const rebillyKeys = document.getElementById("rebilly-keys");
  const publishableKey = rebillyKeys.getAttribute("data-rebilly-publishable-key");
  const organizationId = rebillyKeys.getAttribute("data-rebilly-organization-id");
  const websiteId = rebillyKeys.getAttribute("data-rebilly-website-id");
  const currency = rebillyKeys.getAttribute("data-rebilly-currency");
  const rebillyConfig = {
    publishableKey,
    organizationId,
    kountAccountId: "700000",
    // This is for capturing kount fraud sessions
    websiteId,
    // NOTE: need to add below otherwise this error happens: transactionData must contain an amount to fetch methods
    transactionData: {
      currency: currency || "USD",
      amount: 1,
      label: "Product Purchase"
    },
    icon: {
      color: inputColor
    },
    style: {
      base: {
        color: inputColor,
        fontFamily,
        fontSize,
        "::placeholder": {
          color: inputColor,
          fontFamily,
          fontSize
        }
      }
    }
  };
  CheckoutDigitalWallet.initialize();
  const promise = new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`Timeout error: Rebilly took more than ${INITIALIAZE_PAI_TIMEOUT} to load`));
    }, INITIALIAZE_PAI_TIMEOUT);
    globalThis.Rebilly.on("ready", () => {
      if (timeout) clearTimeout(timeout);
      globalThis.Checkout.store.payment.state.set(globalThis.Checkout.PaymentStates.INITIALIZED);
      resolve();
    });
  });
  globalThis.Rebilly.initialize(rebillyConfig);
  return promise;
};
var loadPhoneNumberLib = () => {
  return globalThis.intlTelInputGlobals.loadUtils("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.16/build/js/utils.js").catch((e) => {
    throw new CheckoutCriticalError(ERROR_CODES.FETCH_PHONE_UTILS_ERROR, { cause: e });
  });
};
var initializeCountries = (options) => {
  return Promise.all(
    [
      globalThis.CFFetch(
        "/cf_countries_states.json",
        {
          headers: { "Content-Type": "application/json" }
        },
        { retries: 3, shouldCaptureServerError: true }
      ).then(function(res) {
        return res.json();
      }).catch((e) => {
        throw new CheckoutCriticalError(ERROR_CODES.FETCH_COUNTRIES_STATES_ERROR, {
          cause: e
        });
      }),
      options.hasPhoneNumber && loadPhoneNumberLib()
    ].filter(Boolean)
  ).then(([countryStateReqResponse]) => {
    var _a, _b, _c, _d, _e, _f;
    globalThis.Checkout.allCountries = countryStateReqResponse.result;
    const defaultCountryCode = "US";
    const countryData = (_a = globalThis.Checkout.allCountries.find((c) => c.iso2 == globalThis.cfVisitorData.country)) != null ? _a : globalThis.Checkout.allCountries.find((c) => c.iso2 == defaultCountryCode);
    const stateData = (_d = (_b = countryData.regions) == null ? void 0 : _b.find((r) => r.iso2 == globalThis.cfVisitorData.regionCode)) != null ? _d : (_c = countryData.regions) == null ? void 0 : _c[0];
    const country = countryData.iso2;
    const state = stateData == null ? void 0 : stateData.state_code;
    globalThis.Checkout.contactLocale = {
      country,
      state
    };
    const initialShipping = globalThis.Checkout.store.shipping.get();
    globalThis.Checkout.store.shipping.set(__spreadProps(__spreadValues({}, initialShipping != null ? initialShipping : {}), {
      country: (_e = initialShipping == null ? void 0 : initialShipping.country) != null ? _e : country,
      state: (_f = initialShipping == null ? void 0 : initialShipping.state) != null ? _f : state
    }));
    let initialBilling = globalThis.Checkout.store.billing.get();
    if (globalThis.Checkout.store.checkout.mode.get() == "guest") {
      initialBilling = parseAddressByFields(initialBilling, options.billingFields);
    }
    globalThis.Checkout.store.billing.set(initialBilling);
    globalThis.Checkout.store.phoneNumberInitialized.set(true);
  });
};
var checkFeatureFlags = () => {
  return globalThis.CFFetch("/user_pages/api/v1/checkouts/feature_flags.json", {}, { retries: 3, shouldCaptureServerError: true }).then((res) => {
    return res.json();
  }).then((res) => {
    globalThis.Checkout.store.featureFlags.isShippingEnabled.set(res.feature_flags.is_shipping_enabled);
    globalThis.Checkout.store.featureFlags.isCouponEnabled.set(res.feature_flags.is_coupon_enabled);
  }).catch((e) => {
    throw new CheckoutCriticalError(ERROR_CODES.FETCH_FEATURE_FLAGS_ERROR, {
      cause: e
    });
  });
};
var initializeMachine = (options) => {
  globalThis.Checkout.store.state.listen((newState) => {
    switch (newState) {
      case globalThis.Checkout.StoreStates.INITIALIZING: {
        const isGuest = globalThis.Checkout.store.checkout.mode.get() == "guest";
        const isSaved = globalThis.Checkout.store.checkout.mode.get() == "saved";
        const isOTO = globalThis.Checkout.store.checkout.mode.get() == "oto";
        const paymentMethods = globalThis.Checkout.store.paymentMethods.get();
        const oneStepCheckout = document.querySelector('[data-page-element="Checkout/V2"][data-total-steps="1"]');
        const expressPaymentAvailable = globalThis.globalResourceData.expressEnabledPayments && globalThis.globalResourceData.expressEnabledPayments.length > 0;
        const shouldIntializePAI = oneStepCheckout && isGuest || !paymentMethods.length && (isSaved || isOTO) || expressPaymentAvailable && isSaved;
        Promise.all(
          [
            checkFeatureFlags(),
            shouldIntializePAI && loadPAIDeps(false, false),
            initializeCountries(options),
            !isGuest && Object.keys(globalThis.Checkout.productsById).length > 0 && CheckoutExistingOrders.fetch()
          ].filter((v) => !!v)
        ).then(() => {
          globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.INITIALIZED);
        }).catch((e) => {
          if (e instanceof CheckoutCriticalError) {
            displayAndLogCriticalError(e);
          } else {
            const initializationError = new CheckoutCriticalError(ERROR_CODES.UNEXPECTED_INITIALIZATION_ERROR, {
              cause: e
            });
            displayAndLogCriticalError(initializationError);
          }
        });
        break;
      }
      case globalThis.Checkout.StoreStates.INITIALIZED: {
        CheckoutSummary.sendOrderPreview();
        setTimeout(() => {
          globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.FILLING_FORM);
        });
        break;
      }
      case globalThis.Checkout.StoreStates.FILLING_FORM: {
        break;
      }
      case globalThis.Checkout.StoreStates.SUBMITTED: {
        break;
      }
    }
  });
  globalThis.Checkout.store.submitting.listen((submitting) => {
    const state = submitting.state;
    switch (state) {
      case globalThis.Checkout.SubmittingStates.ERROR: {
        globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.FILLING_FORM);
        break;
      }
      case globalThis.Checkout.SubmittingStates.DONE: {
        globalThis.Checkout.store.state.set(globalThis.Checkout.StoreStates.SUBMITTED);
        break;
      }
    }
  });
  globalThis.Checkout.store.billing.listen((billing) => {
    const fields = globalThis.Checkout.store.billingFields.get();
    const addressFields = fieldsForCountry(fields, billing.country);
    globalThis.Checkout.store.billingFields.set(addressFields);
  });
  globalThis.Checkout.store.payment.paypal.state.listen((submitting) => {
    const state = submitting.state;
    switch (state) {
      case globalThis.Checkout.PaypalStates.ERROR: {
        setTimeout(() => {
          globalThis.Checkout.store.payment.paypal.state.set({ state: globalThis.Checkout.PaypalStates.INITIALIZED });
        }, 3e3);
        break;
      }
    }
  });
  globalThis.Checkout.store.checkout.mode.listen((mode) => {
    if (mode === "guest") {
      const cart = globalThis.Checkout.computed.checkoutCart.get();
      const selectedProductId = cart.items[0].product_id;
      const productCardByProductId = globalThis.Checkout.store.productCardByProductId.get();
      if (globalThis.Checkout.computed.anyUpdatableOrders.get()) {
        Object.keys(productCardByProductId).forEach((productId) => {
          const isSelected = selectedProductId == productId;
          updateCardByProductIdState(productId, {
            quantity: isSelected ? 1 : 0,
            renderType: void 0,
            selectedOrderIndex: void 0,
            selectedUpdatableCartItemIndex: void 0,
            updatableOrders: void 0,
            cartItemOrderId: void 0,
            cartItemLineItemId: void 0,
            cartItemRenderType: void 0
          });
        });
        CheckoutExistingOrders.cleanUp();
      }
      globalThis.Checkout.store.contact.set({});
      globalThis.Checkout.store.shipping.set({
        country: globalThis.Checkout.contactLocale.country,
        state: globalThis.Checkout.contactLocale.state
      });
      const newBillingData = parseAddressByFields(globalThis.Checkout.contactLocale, options.billingFields);
      globalThis.Checkout.store.billing.set(newBillingData);
      globalThis.Checkout.store.payment.id.set(null);
    }
  });
  globalThis.Checkout.store.payment.id.listen((newPaymentId) => {
    if (!newPaymentId) loadPAIDeps();
  });
  const checkoutStatesChangedByCartItems = {
    [globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE]: true,
    [globalThis.Checkout.CheckoutStates.REACTIVATE]: true
  };
  computed([globalThis.Checkout.computed.modeLeaveEnterEvent, globalThis.Checkout.store.state], (ev, state) => {
    if ([globalThis.Checkout.StoreStates.START, globalThis.Checkout.StoreStates.INITIALIZING].includes(state)) return;
    const { enter } = ev;
    if (enter && !checkoutStatesChangedByCartItems[enter]) {
      globalThis.Checkout.store.checkout.lastModeIndependentOfCartItems.set(enter);
    }
    const oneStepCheckout = document.querySelector('[data-page-element="Checkout/V2"][data-total-steps="1"]');
    if (enter === "guest" && oneStepCheckout) {
      loadPAIDeps();
    }
    if (enter === "saved") {
      const contactPaymentMethod = globalThis.Checkout.store.paymentMethods.get();
      if (!(contactPaymentMethod == null ? void 0 : contactPaymentMethod.length)) {
        loadPAIDeps();
      }
    }
  }).subscribe(() => {
  });
  globalThis.Checkout.computed.checkoutCart.listen((cart) => {
    const currentMode = globalThis.Checkout.store.checkout.mode.get();
    let cartState;
    cart.items.forEach(({ type }) => {
      if (type) {
        if (cartState) {
          throw new Error(`Cart has more than one item of type ${type}`);
        }
        cartState = type;
      }
    });
    if (cartState && cartState != currentMode) {
      globalThis.Checkout.store.checkout.mode.set(cartState);
    } else if (!cartState && [globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE, globalThis.Checkout.CheckoutStates.REACTIVATE].includes(
      currentMode
    )) {
      const lastModeIndependentOfCartItems = globalThis.Checkout.store.checkout.lastModeIndependentOfCartItems.get();
      if (lastModeIndependentOfCartItems && lastModeIndependentOfCartItems != currentMode) {
        globalThis.Checkout.store.checkout.mode.set(lastModeIndependentOfCartItems);
      }
    }
  });
  let lastBilling;
  globalThis.Checkout.store.billing.listen((billing) => {
    if (globalThis.Checkout.store.billingApiErrorsByField.get()) globalThis.Checkout.store.billingApiErrorsByField.set();
    const backfilledBillingFromApi = options.billingFields.length == 2 && Object.keys(billing).length > 2;
    const updatedZipForSameAddress = !billing.id && (lastBilling == null ? void 0 : lastBilling.zip) != billing.zip;
    if (backfilledBillingFromApi && updatedZipForSameAddress) {
      const newBillingAddress = {
        country: billing.country,
        zip: billing.zip
      };
      globalThis.Checkout.store.billing.set(newBillingAddress);
    }
    lastBilling = billing;
  });
};

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-multi-step-v2.ts
init_runtime();
var CheckoutMultiStepV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "FORM_STRUCTURE_BY_TOTAL_STEPS", {
      2: [["contact", "shipping"], ["products", "shippingOption", "billing", "payment", "tos"]],
      3: [["products"], ["contact", "shipping"], ["shippingOption", "billing", "payment", "tos"]]
    });
    __publicField(this, "FORM_BY_STEP", Object.entries(this.FORM_STRUCTURE_BY_TOTAL_STEPS).reduce((acc1, item) => {
      const [totalSteps, form] = item;
      acc1[totalSteps] = {};
      form.reduce((acc2, form2, index) => {
        form2.forEach((field) => {
          acc2[field] = index;
        });
        return acc2;
      }, acc1[totalSteps]);
      return acc1;
    }, {}));
  }
  mount() {
    this.totalSteps = parseInt(this.totalSteps);
    this.totalStepsArray = [...Array(this.totalSteps).keys()];
    const body = this.element.querySelectorAll(".elMultiStepBody");
    const headers = this.element.querySelectorAll(".elMultiStepHeader");
    this.steps = this.totalStepsArray.map((i) => {
      return {
        body: body[i],
        header: headers[i]
      };
    });
    headers.forEach((header, stepNumber) => {
      header.addEventListener("click", (evt) => {
        evt.preventDefault();
        this.setStep(stepNumber);
      });
    });
    const buttons = this.element.querySelectorAll('[href="#!next-step"], [href="#!prev-step"], [href="#!open-step"]');
    buttons.forEach((button) => {
      const href = button.getAttribute("href");
      if (href === "#!next-step") {
        button.addEventListener("click", (evt) => {
          evt.preventDefault();
          if (button.dataset.disabled == "true") return;
          this.nextStep();
        });
      } else if (href === "#!prev-step") {
        button.addEventListener("click", (evt) => {
          evt.preventDefault();
          if (button.dataset.disabled == "true") return;
          this.prevStep();
        });
      }
    });
    Object.entries(Checkout.computed.errorsByName).forEach(([name, computed2]) => {
      computed2.subscribe((error) => {
        var _a, _b, _c;
        const currentStep = Checkout.store.checkout.step.get();
        let currentStepWithError = currentStep;
        let currentErrorElement = this.element.querySelector('.elMultiStepBody[data-step-state="active"]').querySelector(".checkout-general-errors-wrapper");
        const stepForField = this.FORM_BY_STEP[this.totalSteps][name];
        if (stepForField != void 0) {
          if (Checkout.utils.hasErrors(error) && stepForField < currentStep) {
            this.setStep(stepForField);
            Checkout.store.incrScrollToFirstVisibleError.set(
              Checkout.store.incrScrollToFirstVisibleError.get() + 1
            );
          }
          currentErrorElement = this.element.querySelector(`.elMultiStepBody[data-step-number="${stepForField + 1}"]`).querySelector(".checkout-general-errors-wrapper");
          currentStepWithError = stepForField;
        }
        const currentFormErrorStructure = this.FORM_STRUCTURE_BY_TOTAL_STEPS[this.totalSteps][currentStepWithError];
        const errors = currentFormErrorStructure.reduce((acc, formName) => {
          const error2 = Checkout.computed.errorsByName[formName].get();
          if (Checkout.utils.hasErrors(error2)) {
            acc.push({ name: formName, errors: error2 });
          }
          return acc;
        }, []);
        if (!errors || errors.length == 0) {
          currentErrorElement.classList.add("elHide");
        } else {
          const error2 = errors[0];
          if ((_c = (_b = (_a = error2.errors) == null ? void 0 : _a.globalErrors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) {
            const errorMessage = error2.errors.globalErrors[0].message;
            currentErrorElement.querySelector("span").innerHTML = errorMessage;
            currentErrorElement.classList.remove("elHide");
          } else {
            currentErrorElement.classList.add("elHide");
          }
        }
      });
    });
    Checkout.store.checkout.step.listen((newStep) => {
      this.changeStep(newStep);
    });
  }
  changeStep(newStep) {
    const activeUiStep = this.element.querySelector(".elMultiStepBody[data-step-state='active']").dataset.stepNumber;
    if (this.convertUiStepToData(activeUiStep) != newStep) {
      this.setStepActive(newStep);
    }
  }
  validateStep(step) {
    const currentStep = Checkout.store.checkout.step.get();
    const currentFormStructure = this.FORM_STRUCTURE_BY_TOTAL_STEPS[this.totalSteps][currentStep];
    const errors = currentFormStructure.reduce((acc, formName) => {
      Checkout.store.showAllErrors[formName].set(true);
      const error = Checkout.computed.errorsByName[formName].get();
      if (Checkout.utils.hasErrors(error)) {
        acc.push(error);
      }
      return acc;
    }, []);
    return errors.length == 0;
  }
  setStepActive(step) {
    this.totalStepsArray.forEach((stepNumber) => {
      const isCurrentStep = stepNumber == step;
      const activeText = isCurrentStep ? "active" : "inactive";
      this.steps[stepNumber].body.setAttribute("data-step-state", activeText);
      const header = this.steps[stepNumber].header;
      if (header) {
        header.setAttribute("data-step-state", activeText);
        if (header.children.length > 0) {
          header.children[0].setAttribute("data-step-state", activeText);
        }
      }
    });
    $([document.documentElement, document.body]).animate({
      scrollTop: $(this.element).offset().top - 50
    }, 200);
  }
  setStep(step) {
    Checkout.store.checkout.step.set(step);
  }
  nextStep() {
    const currentStep = Checkout.store.checkout.step.get();
    if (this.validateStep(currentStep)) {
      this.collectLeads();
      this.addPAIDeps(currentStep + 1);
      this.setStep(currentStep + 1);
    } else {
      Checkout.store.incrScrollToFirstVisibleError.set(
        Checkout.store.incrScrollToFirstVisibleError.get() + 1
      );
    }
  }
  prevStep() {
    const step = Checkout.store.checkout.step.get() - 1;
    this.setStep(step);
  }
  convertUiStepToData(step) {
    return parseInt(step) - 1;
  }
  collectLeads() {
    var _a;
    const currentStep = Checkout.store.checkout.step.get();
    const currentFormStructure = (_a = this.FORM_STRUCTURE_BY_TOTAL_STEPS[this.totalSteps]) == null ? void 0 : _a[currentStep];
    if (currentFormStructure == null ? void 0 : currentFormStructure.includes("contact")) {
      const contactDetails = Checkout.store.contact.get();
      window.CFDispatchEvent(window.CFEvents.FORM_SUBMITTED, { contact: contactDetails });
      fetch("/user_pages/api/contacts", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(contactDetails)
      }).then((response) => {
        if (response.ok) {
          window.CFDispatchEvent(window.CFEvents.FORM_SUBMITTED_OK, { contact: contactDetails });
        }
      });
    }
  }
  addPAIDeps(nextStep) {
    if (this.FORM_STRUCTURE_BY_TOTAL_STEPS[this.totalSteps][nextStep].includes("payment")) {
      loadPAIDeps();
    }
  }
};
window["CheckoutMultiStepV2"] = CheckoutMultiStepV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-login-v2.ts
init_define_process();
init_nanostores();
init_input_v1();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-auth.ts
init_define_process();
init_nanostores();
var PhoneVerificationOtpStates = /* @__PURE__ */ new Set([
  13 /* RequestingAnotherPhoneVerificationCode */,
  16 /* SubmittingPhoneVerificationCode */,
  17 /* PhoneVerificationSubmitError */,
  14 /* SentPhoneVerificationOtp */,
  19 /* FailedPhoneVerification */
]);
var PhoneVerificationRequestStates = /* @__PURE__ */ new Set([
  11 /* SuggestingPhoneVerification */,
  12 /* RequestingPhoneVerification */,
  15 /* FailedRequestPhoneVerification */
]);
var PhoneVerificationDialogStates = new Set(
  [18 /* PhoneVerificationSucceeded */].concat([...PhoneVerificationRequestStates]).concat([...PhoneVerificationOtpStates])
);
var AuthDialogStates = /* @__PURE__ */ new Set([
  4 /* AwaitingOtp */,
  5 /* FetchingOtpValidation */,
  6 /* InvalidOtp */,
  8 /* FetchingResendOtp */,
  9 /* FailedResendOtp */,
  // AuthMode.TryingAutoPhoneVerification,
  ...PhoneVerificationDialogStates
]);
var AuthFlow = {
  ["*"]: {
    submitOtp: 5 /* FetchingOtpValidation */,
    resendOtp: 8 /* FetchingResendOtp */,
    changeOtpSource: 8 /* FetchingResendOtp */,
    continueAsGuest: 21 /* ContinuingAsGuest */
  },
  [0 /* Initializing */]: {
    alreadySaved: 1 /* AlreadySavedMode */,
    noUser: 2 /* AwaitingEmail */
  },
  [2 /* AwaitingEmail */]: {
    gotEmail: 3 /* FetchingEmailCheck */
  },
  [3 /* FetchingEmailCheck */]: {
    sentOtp: 4 /* AwaitingOtp */,
    unrecognized: 21 /* ContinuingAsGuest */
  },
  [4 /* AwaitingOtp */]: {
    submitOtp: 5 /* FetchingOtpValidation */,
    resendOtp: 8 /* FetchingResendOtp */
  },
  [5 /* FetchingOtpValidation */]: {
    validOtp: 7 /* ValidOtp */,
    invalidOtp: 6 /* InvalidOtp */
  },
  [7 /* ValidOtp */]: {
    continueAsSaved: 20 /* ContinuingAsSaved */,
    suggestPhoneVerification: 11 /* SuggestingPhoneVerification */
  },
  [6 /* InvalidOtp */]: {
    resendOtp: 8 /* FetchingResendOtp */
  },
  [8 /* FetchingResendOtp */]: {
    sentOtp: 4 /* AwaitingOtp */,
    resendFailed: 9 /* FailedResendOtp */
  },
  [9 /* FailedResendOtp */]: {},
  // phone verification flow
  [11 /* SuggestingPhoneVerification */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    requestPhoneVerification: 12 /* RequestingPhoneVerification */
  },
  [12 /* RequestingPhoneVerification */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    sentPhoneVerificationOtp: 14 /* SentPhoneVerificationOtp */,
    failStartPhoneVerification: 15 /* FailedRequestPhoneVerification */,
    requestPhoneVerification: 12 /* RequestingPhoneVerification */
  },
  [15 /* FailedRequestPhoneVerification */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    requestPhoneVerification: 12 /* RequestingPhoneVerification */
  },
  [13 /* RequestingAnotherPhoneVerificationCode */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    sentPhoneVerificationOtp: 14 /* SentPhoneVerificationOtp */,
    failStartPhoneVerification: 15 /* FailedRequestPhoneVerification */,
    requestPhoneVerification: 13 /* RequestingAnotherPhoneVerificationCode */
  },
  [14 /* SentPhoneVerificationOtp */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    requestPhoneVerification: 13 /* RequestingAnotherPhoneVerificationCode */,
    submitPhoneVerificationCode: 16 /* SubmittingPhoneVerificationCode */
  },
  [16 /* SubmittingPhoneVerificationCode */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    verificationSucceeded: 18 /* PhoneVerificationSucceeded */,
    verificationFailed: 19 /* FailedPhoneVerification */,
    verificationSubmitError: 17 /* PhoneVerificationSubmitError */
  },
  [19 /* FailedPhoneVerification */]: {
    skipPhoneVerification: 20 /* ContinuingAsSaved */,
    submitPhoneVerificationCode: 16 /* SubmittingPhoneVerificationCode */,
    requestPhoneVerification: 13 /* RequestingAnotherPhoneVerificationCode */
  },
  [18 /* PhoneVerificationSucceeded */]: {
    continueAsSaved: 20 /* ContinuingAsSaved */
  }
};
var CheckoutAuth = class {
  static initializeOneClickCheckoutFlow() {
    globalThis.Checkout.auth = this;
    this.store = globalThis.Checkout.store.auth = {
      flow: map({
        from: void 0,
        event: void 0,
        to: 0 /* Initializing */
      }),
      otpRequestFailure: map({
        time: void 0,
        retry_in: 0,
        error: void 0
      }),
      otpLoginSource: atom(void 0),
      phoneVerificationRequest: map({
        time: void 0,
        count: 0,
        rejections: 0,
        error: void 0
      }),
      phoneVerificationOtp: map({
        time: void 0,
        count: 0,
        rejections: 0,
        error: void 0
      })
    };
    this.store.mode = computed(this.store.flow, (change) => change.to);
    const requireLogin = computed([this.store.mode], (mode) => AuthDialogStates.has(mode)), otpLoginOptions = computed(globalThis.Checkout.store.contact_pending_auth, (partialContact) => {
      const options = [];
      if (partialContact) {
        if (partialContact.is_phone_verified === true) {
          options.push("phone_number");
        }
        if (partialContact.email) {
          options.push("email");
        }
      }
      return options;
    }), suggestingPhoneVerification = computed([this.store.mode], (mode) => PhoneVerificationDialogStates.has(mode)), showingPhoneVerificationRequest = computed([this.store.mode], (mode) => PhoneVerificationRequestStates.has(mode)), showingPhoneOtp = computed([this.store.mode], (mode) => PhoneVerificationOtpStates.has(mode)), validGuestEmail = computed(
      [
        globalThis.Checkout.store.checkout.mode,
        globalThis.Checkout.store.contact,
        globalThis.Checkout.computed.contactErrors,
        globalThis.Checkout.computed.hideContactInformationForm
      ],
      (mode, { email }, errors, hideContactInformationForm) => {
        var _a;
        return mode === "guest" && !((_a = errors == null ? void 0 : errors.fields) == null ? void 0 : _a.email) && !hideContactInformationForm && email;
      }
    ), submittingPhoneVerification = computed(
      globalThis.Checkout.store.auth.mode,
      (mode) => mode === 16 /* SubmittingPhoneVerificationCode */
    ), RequestingPhoneVerification = computed(
      globalThis.Checkout.store.auth.mode,
      (mode) => mode === 12 /* RequestingPhoneVerification */
    ), phoneVerificationMessages = computed(
      globalThis.Checkout.store.auth.mode,
      (mode) => mode === 12 /* RequestingPhoneVerification */ ? "Requesting a new code..." : (
        // // TODO
        // mode === AuthMode.SentAnotherPhoneVerificationOtp ?
        //   "Resent code. Please check your messages." :
        ""
      )
    ), phoneVerificationRequestErrorMsg = computed(globalThis.Checkout.store.auth.mode, (mode) => {
      if ([15 /* FailedRequestPhoneVerification */].includes(mode)) {
        const { numberTaken, errors } = globalThis.Checkout.store.auth.flow.get().data;
        if (numberTaken) {
          return "Sorry, that phone number is already taken";
        }
        if (errors) {
          return `Error: ${errors}`;
        }
        return "Unknown error. Please check your connection and try again.";
      }
      return "";
    }), phoneVerificationErrorMsg = computed(globalThis.Checkout.store.auth.mode, (mode) => {
      if (mode === 19 /* FailedPhoneVerification */) {
        return "Invalid code. Please check and try again.";
      }
      if ([17 /* PhoneVerificationSubmitError */].includes(mode)) {
        return "Unknown error. Please check your connection and try again.";
      }
      return "";
    }), submittingOtp = computed(globalThis.Checkout.store.auth.mode, (mode) => mode === 5 /* FetchingOtpValidation */), requestingAnotherOtp = computed(globalThis.Checkout.store.auth.mode, (mode) => {
      return mode === 8 /* FetchingResendOtp */;
    }), resentOtp = atom(false), otpRequestError = computed(globalThis.Checkout.store.auth.otpRequestFailure, ({ error }) => error);
    otpLoginOptions.subscribe((options) => {
      if (options && this.store.otpLoginSource.get() === void 0) {
        this.store.otpLoginSource.set(options[0]);
      }
    });
    const retrySeconds = atom(0);
    onMount(retrySeconds, () => {
      let ticking;
      const unsub = this.store.otpRequestFailure.subscribe(({ time, retry_in }) => {
        stop();
        if (!retry_in) return;
        const t = /* @__PURE__ */ new Date();
        t.setSeconds(t.getSeconds() + retry_in);
        const update = () => {
          const now = Date.now();
          let diff = t.getTime() - now;
          if (diff <= 0) {
            diff = 0;
            stop();
          }
          retrySeconds.set(Math.ceil(diff / 1e3));
        };
        update();
        ticking = setInterval(update, 1e3);
      });
      return () => {
        unsub();
        stop();
      };
      function stop() {
        if (ticking) {
          clearInterval(ticking);
          ticking = void 0;
        }
      }
    });
    this.computed = globalThis.Checkout.computed.auth = {
      validGuestEmail,
      requireLogin,
      otpLoginOptions,
      showingPhoneOtp,
      submittingOtp,
      requestingAnotherOtp,
      retrySeconds,
      resentOtp,
      otpRequestError,
      suggestingPhoneVerification,
      showingPhoneVerificationRequest,
      submittingPhoneVerification,
      RequestingPhoneVerification,
      phoneVerificationRequestErrorMsg,
      phoneVerificationMessages,
      phoneVerificationErrorMsg
    };
    globalThis.Checkout.store.checkout.mode.listen((mode) => {
      if (mode === "guest") {
        this.continueAsGuest();
        this.fetchSignOff().catch((error) => {
          console.log("error signing off", error);
        });
      }
    });
    this.store.flow.listen((change) => {
      this.onFlowChange(change);
    });
    const uniqueEmailsFound = /* @__PURE__ */ new Set();
    this.computed.validGuestEmail.subscribe((email) => {
      if (!email || uniqueEmailsFound.has(email)) return;
      uniqueEmailsFound.add(email);
      this.send("gotEmail");
      this.fetchAuthentication(email);
    });
    if (globalThis.Checkout.store.checkout.mode.get() === "saved") {
      this.send("alreadySaved");
    } else {
      this.send("noUser");
    }
  }
  static onFlowChange({ to, data }) {
    if (to === 7 /* ValidOtp */) {
      const { source } = data;
      const lacksVerifiedPhone = source === "email" && globalThis.Checkout.store.contact_pending_auth.get().is_phone_verified !== true && !sessionStorage.getItem("skipped-phone-verification");
      const isSmsEnabled = globalThis.Checkout.store.contact_pending_auth.get().is_sms_enabled;
      const nextEvent = isSmsEnabled && lacksVerifiedPhone ? "suggestPhoneVerification" : "continueAsSaved";
      Promise.resolve().then(() => this.send(nextEvent));
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static send(eventId, data) {
    const modeName = this.store.mode.get();
    const modeConfig = AuthFlow[modeName];
    const nextMode = modeConfig && modeConfig[eventId] || AuthFlow["*"][eventId];
    if (nextMode) {
      this.store.flow.set({
        from: this.store.mode.get(),
        event: eventId,
        to: nextMode,
        data
      });
    }
  }
  static requestPhoneVerification() {
    var _a;
    const count = (_a = globalThis.Checkout.auth.store.phoneVerificationRequest.get().count) != null ? _a : 0;
    globalThis.Checkout.auth.store.phoneVerificationRequest.setKey("count", count + 1);
    this.fetchAddVerificationNumber().then((result) => {
      var _a2;
      if (result.ok) {
        globalThis.Checkout.auth.store.phoneVerificationRequest.setKey("error", void 0);
        this.send("sentPhoneVerificationOtp");
      } else {
        const count2 = (_a2 = globalThis.Checkout.auth.store.phoneVerificationRequest.get().rejections) != null ? _a2 : 0;
        globalThis.Checkout.auth.store.phoneVerificationRequest.setKey("rejections", count2 + 1);
        this.send("failStartPhoneVerification", result);
      }
    }).catch((err) => {
      console.log("request phone verification failed", err);
      globalThis.Checkout.auth.store.phoneVerificationRequest.setKey("error", err);
      this.send("failStartPhoneVerification");
    });
    this.send("requestPhoneVerification");
  }
  /*
      /user_pages/api/v1/contacts/request_authentication.json
      Param: email
      Response:
      📌 400: {result: false, errors: 'Invalid email'}
      📌 404 (contact not found): {result: false}
      ✅ 200: {result: true, contact: 
          {first_name: '', email: '', uuid: '', masked_phone: '', is_verified: '', is_phone_verified: '' }}
    */
  static fetchAuthentication(email) {
    fetch("/user_pages/api/v1/contacts/request_authentication.json?" + new URLSearchParams({ email }), {
      method: "GET"
    }).then((res) => {
      if (res.ok) {
        return res.json().then(({ result, contact }) => {
          const sentOTP = !!result;
          if (sentOTP) {
            globalThis.Checkout.store.contact_pending_auth.set(__spreadProps(__spreadValues({}, contact != null ? contact : {}), { authenticated: false }));
            this.send("sentOtp");
          }
        });
      }
    }).catch((err) => {
      console.log("fetch exception", err);
    });
  }
  static submitOtp(code) {
    this.send("submitOtp");
    this.fetchValidateCode(code);
  }
  static resendCode(optionalSource) {
    this.send("resendOtp", { optionalSource });
    return this.fetchResendCode(optionalSource);
  }
  static fetchResendCode(optionalSource) {
    const { email } = globalThis.Checkout.store.contact_pending_auth.get();
    const source = optionalSource || globalThis.Checkout.auth.store.otpLoginSource.get();
    this.store.otpRequestFailure.set({
      time: -1,
      retry_in: 0
    });
    return fetch("/user_pages/api/v1/contacts/resend_otp.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: optionalSource || source,
        email
      })
    }).then((res) => {
      if (res.ok) {
        globalThis.Checkout.auth.store.otpLoginSource.set(source);
      }
      return res;
    }).then((res) => this.fetchedResendCode(res)).catch((err) => {
      this.fetchedResendCode(void 0, err);
    });
  }
  static fetchedResendCode(res, error) {
    let sent;
    const fail = ({ retry_in, error: error2 } = {}) => {
      const time = /* @__PURE__ */ new Date();
      this.store.otpRequestFailure.set({
        time,
        retry_in,
        error: error2
      });
      this.send("resendFailed", { retry_in, time, error: error2 });
    };
    if (res) {
      if (res.ok) {
        return res.json().then((props) => {
          const { result } = props;
          sent = result;
          if (sent) {
            this.send("sentOtp");
          } else {
            fail();
          }
        });
      } else {
        if (res.status === 400) {
          return res.json().then((props) => {
            const { retry_in } = props;
            fail({ retry_in });
          }).catch(fail);
        }
      }
    }
    fail({ error });
  }
  /*
      PATCH: /user_pages/api/v1/contacts/validate_and_sign_in.json
        2a. Param: {otp: '', email: '', source: 'email' | 'phone_number' }
        2b. Response
      404 (contact not found): {result: false}
      400 (invalid OTP): {result: false}
      200: {result: true, contact: {first_name: ‘’, email: ‘’, uuid: ‘’, masked_phone: ‘’,
        is_verified: ‘’, is_phone_verified: ‘’, payment_methods: [], shipping_addresses: [], billing_addresses: [] }}
    */
  static fetchValidateCode(otp) {
    const { email } = globalThis.Checkout.store.contact_pending_auth.get();
    const source = globalThis.Checkout.auth.store.otpLoginSource.get();
    fetch("/user_pages/api/v1/contacts/validate_and_sign_in", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        source
      })
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const { result, contact } = data;
          if (result) {
            this.backfillContactFields(contact);
            CheckoutExistingOrders.fetch().then(() => {
              const isSelectedCartItemUpdatable = globalThis.Checkout.computed.checkoutCart.get().items.some((i) => i.type);
              if (isSelectedCartItemUpdatable) {
                globalThis.Checkout.store.checkout.lastModeIndependentOfCartItems.set("saved");
              } else {
                globalThis.Checkout.store.checkout.mode.set("saved");
              }
              this.send("validOtp", { source });
            });
          } else {
            this.otpFailed();
          }
        });
      } else {
        this.otpFailed();
      }
    }).catch((err) => {
      console.log("fetch auth exception", err);
      this.otpFailed();
    });
  }
  static fetchAddVerificationNumber() {
    console.log("fetchAddVerificationNumber");
    const { email, phone_number } = globalThis.Checkout.store.contact.get();
    return fetch("/user_pages/api/v1/contacts/request_otp_to_add_new_number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        phone_number
      })
    }).then((res) => {
      if (res.ok) {
        return res;
      }
      return res.json().then(({ result, errors }) => {
        const errorResult = {
          ok: false,
          errors,
          numberTaken: errors === "Phone number already taken"
        };
        return errorResult;
      });
    });
  }
  static submitVerifyPhoneCode(otp) {
    const { email, phone_number } = globalThis.Checkout.store.contact.get();
    this.send("submitPhoneVerificationCode");
    const fail = (err) => {
    };
    return fetch("/user_pages/api/v1/contacts/validate_and_associate_phone_number", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        email,
        phone_number,
        otp
      })
    }).then((res) => {
      if (res.ok) {
        this.send("verificationSucceeded");
      } else {
        this.send("verificationFailed");
      }
    }).catch((err) => {
      console.log("fetch auth exception", err);
      this.send("verificationSubmitError", { error: err });
    });
  }
  static continueAsGuest() {
    this.send("continueAsGuest");
  }
  static fetchSignOff() {
    return fetch("/contacts/sign_out", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin"
    }).then((res) => {
      if (!res.ok) {
        console.log("sign_out failed", res);
        throw new Error("Sign out failed");
      }
      return res;
    });
  }
  static otpFailed() {
    this.send("invalidOtp");
  }
  static backfillContactFields(data) {
    const {
      email,
      first_name,
      last_name,
      phone_number,
      uuid,
      is_phone_verified,
      is_sms_enabled,
      masked_phone,
      payment_methods,
      billing_addresses,
      shipping_addresses
    } = data;
    let newBilling = {};
    if (billing_addresses && billing_addresses.length > 0) {
      const backfilled_billing_addresses = backfillAddressesId(billing_addresses);
      newBilling = backfilled_billing_addresses[0];
      globalThis.Checkout.store.billing.set(newBilling);
      globalThis.Checkout.store.billing_addresses.set(backfilled_billing_addresses);
    } else {
      globalThis.Checkout.store.billing_addresses.set([]);
    }
    let newShipping = {};
    if (shipping_addresses && shipping_addresses.length > 0) {
      const backfilled_shipping_addresses = backfillAddressesId(shipping_addresses);
      newShipping = backfilled_shipping_addresses[0];
      globalThis.Checkout.store.shipping.set(newShipping);
      globalThis.Checkout.store.shipping_addresses.set(backfilled_shipping_addresses);
    } else {
      globalThis.Checkout.store.shipping_addresses.set([]);
    }
    globalThis.Checkout.store.billingSameAsShipping.set(Boolean(newBilling.id && newBilling.id == newShipping.id));
    if (payment_methods && payment_methods.length > 0) {
      globalThis.Checkout.store.paymentMethods.set([
        ...globalThis.Checkout.store.paymentMethods.get() || [],
        ...payment_methods
      ]);
      if (!globalThis.Checkout.store.payment.id.get()) {
        globalThis.Checkout.store.payment.id.set(payment_methods[0].id);
      }
      globalThis.Checkout.store.contact.set(__spreadProps(__spreadValues({}, globalThis.Checkout.store.contact.get()), {
        email,
        first_name,
        last_name,
        phone_number
      }));
      globalThis.Checkout.store.contact_pending_auth.set(__spreadProps(__spreadValues({}, globalThis.Checkout.store.contact.get()), {
        email,
        first_name,
        last_name,
        phone_number,
        uuid,
        is_phone_verified,
        is_sms_enabled,
        masked_phone,
        authenticated: true
      }));
    }
  }
  static skipPhoneVerification() {
    sessionStorage.setItem("skipped-phone-verification", "true");
    this.send("skipPhoneVerification");
  }
  static continueAfterPhoneVerification() {
    this.send("continueAsSaved");
  }
};
__publicField(CheckoutAuth, "store");
__publicField(CheckoutAuth, "computed");

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-login-v2.ts
init_runtime();
var CheckoutLoginV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    var _a;
    CheckoutAuth.initializeOneClickCheckoutFlow();
    this.mountPhoneVerificationSubform();
    this.firstNameInput = this.element.querySelector(".elCheckoutLogin_FirstName");
    this.deviceInfo = this.element.querySelector(".elCheckoutLogin_DeviceInfo");
    this.alternateOtp = this.element.querySelector(".elCheckoutLogin_AlternateSource");
    this.alternateOtpDeviceInfo = this.element.querySelector(".elCheckoutLogin_AlternateDeviceInfo");
    const resendCodeEl = this.element.querySelector(".elResendCode");
    const continueAsGuest = this.element.querySelector(".elLinkContinueAsGuest");
    function getOtpSourceDescription(source) {
      const partialContact = Checkout.store.contact_pending_auth.get();
      if (!partialContact) return "";
      return source === "email" ? "email address" : source === "phone_number" ? `phone number ending in ${partialContact.masked_phone}` : source;
    }
    const otpSource = Checkout.auth.store.otpLoginSource;
    const alternateOtpSource = computed([
      otpSource,
      Checkout.auth.computed.otpLoginOptions
    ], (otpSource2, otpOptions) => {
      return otpOptions.find((option) => option !== otpSource2);
    });
    this.bindText(this.firstNameInput, computed(Checkout.store.contact, (contact) => contact == null ? void 0 : contact.first_name));
    this.bindText(this.deviceInfo, otpSource, (otpSource2) => {
      return getOtpSourceDescription(otpSource2);
    });
    this.bindVisibility(this.alternateOtp, computed(alternateOtpSource, (alt) => !!alt));
    this.bindText(this.alternateOtpDeviceInfo, alternateOtpSource, getOtpSourceDescription);
    this.element.querySelector('[href="#change-otp-source"]').addEventListener("click", (ev) => {
      ev.preventDefault();
      const source = alternateOtpSource.get();
      CheckoutAuth.resendCode(source);
    });
    this.loginOtpInput = this.bindOtpInput(this.element.querySelector(".elCheckoutLoginInputContent .elOtpInput"), (code) => {
      CheckoutAuth.submitOtp(code);
    });
    this.loginOtpSubmit = this.element.querySelector('.elCheckoutLoginForm [href="#submit-otp-code"]');
    this.bindSubmitting(this.loginOtpSubmit.parentElement, CheckoutAuth.computed.submittingOtp);
    this.loginOtpSubmit.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.loginOtpInput.submit();
    });
    this.checkoutLoginInfo = this.element.querySelector(".elOtpInfo p span");
    this.checkoutLoginError = this.element.querySelector(".elOtpError p span");
    this.checkoutLoginStatus = this.element.querySelector(".elOtpSendStatus p span");
    (_a = this.element.querySelector(".elLinkResendCode")) == null ? void 0 : _a.addEventListener("click", () => {
      this.setErrorMessage("");
      CheckoutAuth.resendCode();
    });
    continueAsGuest == null ? void 0 : continueAsGuest.addEventListener("click", () => {
      if (Checkout.store.checkout.mode.get() !== "guest") {
        Checkout.store.checkout.mode.set("guest");
      } else {
        CheckoutAuth.continueAsGuest();
      }
    });
    CheckoutAuth.computed.requireLogin.listen((requireLogin) => {
      if (requireLogin) {
        this.show();
      } else {
        this.hide();
      }
    });
    CheckoutAuth.store.flow.listen((change) => {
      this.onFlowChange(change);
    });
    Checkout.store.state.listen((state) => {
      if (state === Checkout.StoreStates.INITIALIZED) {
        this.initializePhoneNumber();
      }
    });
    Checkout.store.checkout.mode.listen((state) => {
      if (state === "saved") {
        this.initializePhoneNumber();
      }
    });
    this.bindText(this.checkoutLoginInfo, CheckoutAuth.computed.requestingAnotherOtp, (active) => {
      return active ? `Requesting a new code...` : ``;
    });
    this.bindText(this.element.querySelector(".elResendOtpWaitTime"), CheckoutAuth.computed.retrySeconds, (seconds) => seconds.toString());
    this.bindVisibility(resendCodeEl, CheckoutAuth.computed.retrySeconds, (seconds) => !(seconds > 0));
    this.bindVisibility(this.element.querySelector(".elWaitToResendOtp"), CheckoutAuth.computed.retrySeconds, (seconds) => seconds > 0);
    CheckoutAuth.store.otpRequestFailure.subscribe(({ error }) => {
      if (error) {
        this.notifyNetworkError(error);
      }
    });
    this.bindVisibility(this.element.querySelector(".elCheckoutLoginForm"), CheckoutAuth.computed.suggestingPhoneVerification, false);
    this.bindVisibility(this.element.querySelector(".elCheckoutPhoneVerificationContainer"), CheckoutAuth.computed.suggestingPhoneVerification);
    this.bindVisibility(this.element.querySelector(".elCheckoutPhoneVerificationOtpInputContent"), CheckoutAuth.computed.showingPhoneOtp);
  }
  mountPhoneVerificationSubform() {
    this.phoneVerificationOtpInput = this.bindOtpInput(
      this.element.querySelector(".elCheckoutPhoneVerificationOtpInputContent .elOtpInput"),
      (code) => CheckoutAuth.submitVerifyPhoneCode(code)
    );
    this.phoneVerificationOtpSubmit = this.element.querySelector('.elCheckoutPhoneVerificationForm [href="#submit-otp-code"]');
    this.bindSubmitting(this.phoneVerificationOtpSubmit.parentElement, CheckoutAuth.computed.submittingPhoneVerification);
    this.phoneVerificationOtpSubmit.addEventListener("click", (ev) => {
      ev.preventDefault();
      this.phoneVerificationOtpInput.submit();
    });
    this.element.querySelector(".elContinueAfterPhoneVerification").addEventListener("click", (evt) => {
      evt.preventDefault();
      CheckoutAuth.continueAfterPhoneVerification();
    });
    Array.from(this.element.querySelectorAll(".elSkipPhoneVerification")).forEach((el) => {
      el.addEventListener("click", (ev) => {
        ev.preventDefault();
        CheckoutAuth.skipPhoneVerification();
      });
    });
    this.element.querySelector(".elVerifyPhoneButton > a").addEventListener("click", (ev) => {
      ev.preventDefault();
      CheckoutAuth.requestPhoneVerification();
    });
    this.bindSubmitting(this.element.querySelector(".elVerifyPhoneButton"), CheckoutAuth.computed.RequestingPhoneVerification);
    this.element.querySelector(".elLinkRerequestPhoneVerification").addEventListener("click", (ev) => {
      ev.preventDefault();
      CheckoutAuth.requestPhoneVerification();
    });
    CheckoutAuth.computed.phoneVerificationRequestErrorMsg.subscribe((msg) => {
      $(this.element.querySelector(".elPhoneVerificationRequestError")).text(msg);
    });
    CheckoutAuth.computed.phoneVerificationErrorMsg.subscribe((msg) => {
      $(this.element.querySelector(".elPhoneVerificationOtpError")).text(msg);
      if (msg) {
        this.phoneVerificationOtpInput.clear();
        this.phoneVerificationOtpInput.focus();
      }
    });
    this.bindText(this.element.querySelector(".elPhoneVerificationMessages"), CheckoutAuth.computed.phoneVerificationMessages);
    CheckoutAuth.computed.RequestingPhoneVerification.subscribe((pending) => {
      this.element.querySelector(".elLinkRerequestPhoneVerification").href = pending ? "" : "#";
      if (pending === false) {
        this.phoneVerificationOtpInput.focus();
      }
    });
    this.bindVisibility(this.element.querySelector(".elCheckoutPhoneVerificationForm"), CheckoutAuth.computed.showingPhoneOtp);
    this.bindVisibility(this.element.querySelector(".elPhoneVerificationRequest"), CheckoutAuth.computed.showingPhoneVerificationRequest);
  }
  show() {
    const { first_name, masked_phone, is_phone_verified } = Checkout.store.contact_pending_auth.get();
    this.element.classList.remove("hide");
    this.resetLoginOtpInputs();
    this.resetMessages();
    this.loginOtpInput.focus();
  }
  hide() {
    this.element.classList.add("hide");
  }
  setElText(el, text) {
    jQuery(el).text(text);
  }
  bindText(el, store, fn) {
    return store.subscribe((value) => {
      const text = fn ? fn(value) : value;
      this.setElText(el, (text == null ? void 0 : text.toString()) || "");
    });
  }
  bindVisibility(el, store, test) {
    return store.subscribe((value) => {
      let visible = test !== void 0 ? typeof test === "function" ? test(value) : test === value : value;
      el.hidden = !visible;
    });
  }
  onInvalidOtp() {
    this.setErrorMessage("You entered an invalid code. Try again or resend the code by clicking the link below.");
    this.resetLoginOtpInputs();
  }
  onResentCode() {
    this.loginOtpInput.focus();
  }
  notifyNetworkError(error) {
    this.setErrorMessage("Unable to send new verification code due to a network error. Check your connection and try again later.");
  }
  // TODO: factor out depencency on event and state strings
  // use computeds and prefer matching states to events
  onFlowChange({ event: event2, from, to }) {
    if (event2 === "submitOtp") {
      this.onSubmittingOtp();
    }
    if (event2 === "resentOtp") {
      this.onResentCode();
    }
    if (event2 === "invalidOtp") {
      this.onInvalidOtp();
    }
    if (event2 === "resendFailed") {
      const { error, retry_in } = to;
      if (error) {
        this.notifyNetworkError();
      } else if (retry_in) {
        this.loginOtpInput.focus();
      }
    }
    if (event2 === "verificationSucceeded") {
      this.element.querySelector(".elCheckoutPhoneVerificationConfirmation").hidden = false;
      this.element.querySelector(".elCheckoutPhoneVerificationForm").hidden = true;
    }
  }
  bindOtpInput(input, onSubmit) {
    const maxLength = Number(input.getAttribute("maxlength"));
    const getCode = () => {
      return input.value;
    };
    const submitIfValid = () => {
      const code = getCode();
      if (code.length === maxLength) {
        onSubmit(code);
      }
    };
    input.addEventListener("keydown", (ev) => {
      if (event.key === "Tab") {
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        submitIfValid();
        return;
      }
      if (event.key === "Backspace" || event.keycode === 37) {
        if (input.value.length === maxLength) {
          submitIfValid();
        }
      }
    });
    input.addEventListener("input", () => {
      input.style.setProperty("--_otp-digit", input.selectionStart);
      if (input.value.length === maxLength) {
        submitIfValid();
      }
    });
    function setEnabled(enabled) {
      input.disabled = !enabled;
    }
    function focus(index = 0) {
      input.style.setProperty("--_otp-digit", index);
      input.focus();
    }
    function clear() {
      input.style.setProperty("--_otp-digit", 0);
      input.value = "";
    }
    return { input, getCode, setEnabled, clear, focus, submit: submitIfValid };
  }
  onSubmittingOtp() {
    this.resetMessages();
  }
  resetLoginOtpInputs() {
    this.loginOtpInput.clear();
    this.loginOtpInput.focus();
  }
  // maybe keep
  resetMessages() {
    this.setErrorMessage("");
  }
  setErrorMessage(message) {
    this.checkoutLoginError.innerHTML = message;
  }
  bindLoader(el, store, test) {
    return store.subscribe((value) => {
      let visible = test !== void 0 ? typeof test === "function" ? test(value) : test === value : value;
      if (visible) {
        el.dataset.loader = true;
      } else {
        delete el.dataset.loader;
      }
    });
  }
  bindSubmitting(button, store) {
    const elButton = button.querySelector(".elButton");
    const buttonMain = button.querySelector(".elButtonMain");
    const buttonMainText = buttonMain.querySelector(".elButtonMainText");
    const spinner = buttonMain.querySelector(".elButtonSpinner");
    const buttonText = buttonMainText.innerHTML;
    const submittingText = elButton.getAttribute("data-param-submittingtext") || "Submitting...";
    store.listen((submitting) => {
      if (submitting) {
        spinner.style.display = "inline-block";
        buttonMainText.innerHTML = submittingText;
      } else {
        spinner.style.removeProperty("display");
        buttonMainText.innerHTML = buttonText;
        button.querySelector(".elButtonSub").innerHTML = "";
      }
    });
  }
  bindDisabled(el, store, test) {
    return store.subscribe((value) => {
      let disabled = test !== void 0 ? typeof test === "function" ? test(value) : test === value : value;
      el.disabled = disabled;
    });
  }
  // #region phone number form
  // ported from contact-form-v1
  getInputFromName(name) {
    return this.element.querySelector(`[name='${name}']`);
  }
  // TODO: The intlTelInput setup should be handled by the Input/V1 blueprint
  initializePhoneNumber() {
    const phoneInput = this.getInputFromName("phone_number");
    const initialCountry = Checkout.store.shipping.get().country;
    const iti = window.intlTelInput(phoneInput, {
      autoPlaceholder: "aggressive",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.16/build/js/utils.js",
      preferredCountries: ["us", "ca", "gb", "ie", "ai", "nz"],
      initialCountry: initialCountry.toLowerCase()
    });
    phoneInput.iti = iti;
    phoneInput.addEventListener("countrychange", () => {
      Checkout.store.contact.setKey("phone_number", phoneInput.iti.getNumber());
    });
    phoneInput.addEventListener("blur", () => {
      const value = phoneInput.iti.getNumber();
      Checkout.store.contact.setKey("phone_number", value);
    });
    const $phoneNumber = computed(Checkout.store.contact, ({ phone_number }) => phone_number);
    $phoneNumber.subscribe((phone_number) => {
      phoneInput.iti.setNumber(phone_number || "");
      if (phone_number) {
        $(phoneInput).parents(".elFormItemWrapper").addClass("hasValue");
      } else {
        $(phoneInput).parents(".elFormItemWrapper").removeClass("hasValue");
      }
    });
    const $phoneError = computed(Checkout.computed.contactErrors, (errors) => {
      var _a;
      this.checkForm(Checkout.computed.contactErrors.get());
      return (_a = errors == null ? void 0 : errors.fields) == null ? void 0 : _a.phone_number;
    });
    const $disableSubmit = computed([$phoneNumber, $phoneError], (phone_number, error) => {
      return !phone_number || error;
    });
    Checkout.computed.contactErrors.subscribe((contactErrors) => {
      this.checkForm(contactErrors);
    });
    $disableSubmit.subscribe((disable) => {
      this.element.querySelector(".elVerifyPhoneButton > a").dataset.disabled = disable;
    });
  }
  checkForm(contactErrors) {
    const fields = ["phone_number"];
    fields.forEach((prop) => {
      const input = this.getInputFromName(prop);
      resetInputErrors(input);
    });
    if (Checkout.utils.hasErrors(contactErrors)) {
      const fieldErrors = contactErrors.fields;
      if (fieldErrors) {
        fields.forEach((field) => {
          const error = fieldErrors[field];
          if (error) {
            const { message } = error;
            const input = this.getInputFromName(field);
            addError(input, message);
          }
        });
      }
    }
  }
  // #endregion phone number form
};
window["CheckoutLoginV2"] = CheckoutLoginV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-product-card-v2.ts
init_define_process();
init_radio_v1();
init_checkbox_v1();
init_runtime();
var CheckoutProductCardV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    var _a, _b, _c, _d;
    this.can_purchase_again = !new URLSearchParams(window.location.search).get("manage_order_id");
    this.variantValues = (_b = Object.entries((_a = this.product.property_values_variant_mapping) != null ? _a : {}).reduce((acc, entries) => {
      const values = entries[0].split(",").map((value) => parseInt(value));
      acc[entries[1]] = values;
      return acc;
    }, {})) != null ? _b : {};
    this.valuesPositions = (_d = (_c = this.product.sorted_property_values) == null ? void 0 : _c.reduce((acc, property) => {
      property.value_ids.forEach((value, index) => {
        acc[value] = index;
      });
      return acc;
    }, {})) != null ? _d : {};
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L;
    const is_server = true;
    const layout = (_a = this.layout) != null ? _a : null;
    const featured = (_b = this.featured) != null ? _b : null;
    const highlight_text = (_c = this.highlight_text) != null ? _c : null;
    const selectType = (_d = this.selectType) != null ? _d : null;
    const showImage = (_e = this.showImage) != null ? _e : null;
    const showDescription = (_f = this.showDescription) != null ? _f : null;
    const showCompareAtPrice = (_g = this.showCompareAtPrice) != null ? _g : null;
    const isChecked = (_h = this.isChecked) != null ? _h : null;
    const product = (_i = this.product) != null ? _i : null;
    const variant = (_j = this.variant) != null ? _j : null;
    const selected_price = (_k = this.selected_price) != null ? _k : null;
    const quantity = (_l = this.quantity) != null ? _l : null;
    const can_purchase_again = (_m = this.can_purchase_again) != null ? _m : true;
    const renderType = (_n = this.renderType) != null ? _n : null;
    const selectedOrderIndex = (_o = this.selectedOrderIndex) != null ? _o : null;
    const selectedUpdatableCartItemIndex = (_p = this.selectedUpdatableCartItemIndex) != null ? _p : null;
    const updatableOrders = (_q = this.updatableOrders) != null ? _q : null;
    let html = "";
    {
      const is_not_server = false;
      let priceDisplayType = "multiple";
      let newOrder = selectedOrderIndex == -1;
      let showProductVariantSelection = true;
      let currentRenderType = renderType;
      const showUpgradeDowngrade = currentRenderType == "upgradeDowngrade";
      const showReactivate = currentRenderType == "reactivate";
      const showManageOrders = showUpgradeDowngrade || showReactivate;
      if (showManageOrders) {
        showProductVariantSelection = false;
        if (showUpgradeDowngrade) {
          priceDisplayType = "hide";
          if (newOrder && variant.prices.length == 1) {
            priceDisplayType = "single";
          }
        }
        if (showReactivate && variant.prices.length > 1) {
          priceDisplayType = "single";
        }
      }
      const customVariants = product.variants.filter((value) => value["default_variant"] == false);
      if (layout == "modern") {
        html += `<div class="elProductLayoutBackground"></div>`;
        html += `<div class="elProductModernItem"> `;
        if (selectType == "quantity") {
          html += `<div class="elProductInputWrapper elProductCardQuantityContainer"><div class="elProductInputControls"><button class="elProductCardInput">-</button><input class="elProductCardInput elProductCardShortInput" name="product" value="${quantity != null ? quantity : 0}" min="0" type="number"/><button class="elProductCardInput">+</button></div></div>`;
        } else if (selectType == "quantity-forced") {
          html += `<div class="elProductInputWrapper elSelectWrapper elForcedQuantityWrapper"><select name="product" class="elProductCardInput elProductInputControls">`;
          const step = (_r = product.step) != null ? _r : 2;
          const min = (_s = product.min) != null ? _s : 0;
          const max = (_t = product.max) != null ? _t : 5;
          const item_count_step_1 = max - min;
          const item_count_step_2 = item_count_step_1 / step;
          const item_count_step_3 = item_count_step_2 | 0;
          const range = Array.apply(0, Array(item_count_step_3)).map((element, index) => index + 0);
          ;
          const c0 = range;
          const fl1 = new CF2ForloopDrop(c0.length);
          for (const i of c0) {
            const forloop = fl1;
            const value = i * step + min;
            html += `<option value="${value}">${value}</option>`;
            forloop.next();
          }
          html += `</select><div class="elSelectArrow elForcedQuantitySelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
        }
        const isClassic = layout == "classic";
        const isQuantityType = selectType == "quantity";
        html += `<div class="elProductCardSelectInput`;
        if (isClassic == false || isQuantityType == true) {
          html += ` hide`;
        }
        html += `">`;
        if (selectType == "single") {
          if (isChecked) {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="true" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product" checked class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          } else {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product"  class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          }
        } else if (selectType == "multiple" || selectType == "quantity") {
          if (isChecked) {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked="true"><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product" checked data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          } else {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked=""><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product"  data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          }
        }
        html += `</div>`;
        if (showImage) {
          const imageUrl = (_u = variant.image) != null ? _u : product.image;
          if (imageUrl && imageUrl != "") {
            html += `<div class="elProductCardImage"><div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
            if (!imageUrl && true && true) {
              html += ` forceHide`;
            }
            html += `" data-liquid-replace="item">`;
            if (imageUrl || false) {
              html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
            } else if (false) {
              html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
            }
            html += `</div></div>`;
          }
        }
        html += `<div class="elProductCardNameContainer">`;
        if (featured && highlight_text) {
          html += `<div class="elProductCardHighlight">${highlight_text}</div>`;
        }
        if (customVariants.length > 1) {
          html += `<span class="elProductCardInfoName">${product.default_variant.name}</span>`;
        } else {
          html += `<span class="elProductCardInfoName">${variant.name}</span>`;
        }
        if (showDescription) {
          html += `<span class="elProductCardInfoDescription">${((_x = (_w = (_v = product.description_override) != null ? _v : variant.description) != null ? _w : product.default_variant.description) != null ? _x : "").replaceAll(`
`, "<br>")}</span>`;
        }
        html += `</div><div class="elProductCardPriceContainer">`;
        if (priceDisplayType == "multiple") {
          if (variant.prices.length == 1) {
            html += `<div class="elProductCardInfoPrice">`;
            if (showCompareAtPrice) {
              const compare_at_amount = selected_price.compare_at_amount;
              if (compare_at_amount) {
                html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
              }
            }
            html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
          } else {
            html += `<div class="elSelectWrapper"><select name="variant_price">`;
            const c2 = variant.prices;
            const fl3 = new CF2ForloopDrop(c2.length);
            for (const price of c2) {
              const forloop = fl3;
              html += `<option `;
              if (selected_price.id == price.id) {
                html += `selected`;
              }
              html += ` value="${price.id}">${price.name}</option>`;
              forloop.next();
            }
            html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
          }
        } else if (priceDisplayType == "single") {
          html += `<div class="elProductCardInfoPrice">`;
          if (showCompareAtPrice) {
            const compare_at_amount = selected_price.compare_at_amount;
            if (compare_at_amount) {
              html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
            }
          }
          html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
        }
        html += `</div>`;
        if (showProductVariantSelection) {
          if (customVariants.length > 1) {
            html += `<div class="elProductSelectSelectorsWrapper">`;
            const c4 = product.sorted_property_values;
            const fl5 = new CF2ForloopDrop(c4.length);
            for (const property_values of c4) {
              const forloop = fl5;
              const property_id = property_values.property_id;
              const select_index = forloop.index0;
              html += `    `;
              html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
              const c6 = property_values.value_ids;
              const fl7 = new CF2ForloopDrop(c6.length);
              for (const value_id of c6) {
                const forloop2 = fl7;
                html += `<option `;
                if (variant.property_value_ids[select_index] == value_id) {
                  html += `selected`;
                }
                html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                forloop2.next();
              }
              html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
              forloop.next();
            }
            html += `</div>`;
          }
        }
        if (showManageOrders) {
          let active_order = false;
          let canceled_order = false;
          const amount_of_orders = updatableOrders.length;
          const c8 = updatableOrders;
          const fl9 = new CF2ForloopDrop(c8.length);
          for (const order of c8) {
            const forloop = fl9;
            if (order.type == "reactivate") {
              canceled_order = true;
            } else {
              active_order = true;
            }
            forloop.next();
          }
          if (amount_of_orders && amount_of_orders > 0) {
            html += `<div class="elProductCardSubscriptionsBanner"><i class="fas fa-sync-alt"></i>`;
            if (active_order && canceled_order) {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Existing Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Existing Subscription</span>`;
              }
            } else if (canceled_order) {
              html += ` `;
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Canceled Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Canceled Subscription</span>`;
              }
            } else {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Active Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Active Subscription</span>`;
              }
            }
            html += `</div>`;
            html += `<div class="elProductCardManageOrders`;
            if (!isChecked) {
              html += ` elHide`;
            }
            html += `"><div class="elProductCardOrdersWrapper"><div class="elProductCardTitle"><span>Manage Subscriptions</span><div></div></div><div class="elProductCardOrders">`;
            const c10 = updatableOrders;
            const fl11 = new CF2ForloopDrop(c10.length);
            for (const order of c10) {
              const forloop = fl11;
              const orderIndex = forloop.index0;
              html += `<div class="elProductCardOrder`;
              if (selectedOrderIndex == orderIndex) {
                html += ` elProductCardOrderSelected`;
              }
              html += `" data-order-index="${orderIndex}"><div class="elProductCardOrderDetails"><div class="elProductCardOrderDetailsNumber"><i class="fas fa-receipt"></i><span>Order ${order.number}</span></div>`;
              if (order.type == "reactivate") {
                html += `<span class="elProductCardOrderDetailsReactivate">Reactivate</span>`;
              } else {
                html += `<span class="elProductCardOrderDetailsManage">Manage</span>`;
              }
              html += `</div>`;
              if (selectedOrderIndex == orderIndex) {
                html += `<div class="elProductCardOrderActions"><a data-page-element="LinkNode" class="elTypographyLink elProductCardShowOrderDetailsLink id-LinkNode" href="#show-selected-order-details" target="_self" data-selected="{% is_current_path '#show-selected-order-details' %}" data-liquid-replace="item"><span>View Order Details</span></a>`;
                if (order.type == "upgradeDowngrade") {
                  const updatableItem = order.updatableItems[selectedUpdatableCartItemIndex];
                  html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="${updatableItem.direction}">${updatableItem.direction} To </span> <span class="elCustomSelectPreviewInfo">${updatableItem.variantName} - ${updatableItem.priceName}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select name="upgradeDowngrade">`;
                  const c12 = order.updatableItems;
                  const fl13 = new CF2ForloopDrop(c12.length);
                  for (const updatableItem2 of c12) {
                    const forloop2 = fl13;
                    const index = forloop2.index0;
                    html += `<option `;
                    if (index == selectedUpdatableCartItemIndex) {
                      html += `selected`;
                    }
                    html += ` value="${index}">${updatableItem2.direction} To ${updatableItem2.variantName} - ${updatableItem2.priceName}</option>`;
                    forloop2.next();
                  }
                  html += `</select></div>`;
                } else {
                  if (customVariants.length > 1) {
                    html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="Reactivate">Reactivate</span> <span class="elCustomSelectPreviewInfo">${variant.name}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select class="elVariantSelector">`;
                    const c14 = product.variants;
                    const fl15 = new CF2ForloopDrop(c14.length);
                    for (const product_variant of c14) {
                      const forloop2 = fl15;
                      let combined_variant_name = "";
                      const c16 = product.sorted_property_values;
                      const fl17 = new CF2ForloopDrop(c16.length);
                      for (const property_values of c16) {
                        const forloop3 = fl17;
                        const index0 = forloop3.index0;
                        const property_id = property_values.property_id;
                        const property_value_id = product_variant.property_value_ids[index0];
                        if (combined_variant_name != "") {
                          combined_variant_name = combined_variant_name.toString().concat(", ");
                        }
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties[property_id]);
                        combined_variant_name = combined_variant_name.toString().concat(": ");
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties_values[property_value_id]);
                        forloop3.next();
                      }
                      html += `<option value="${product_variant.property_value_ids}" `;
                      if (product_variant.id == variant.id) {
                        html += `selected`;
                      }
                      html += `>${combined_variant_name}</option>`;
                      forloop2.next();
                    }
                    html += `</select></div>`;
                  }
                  if (priceDisplayType == "single" && variant.prices.length > 1) {
                    html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                    const c18 = variant.prices;
                    const fl19 = new CF2ForloopDrop(c18.length);
                    for (const price of c18) {
                      const forloop2 = fl19;
                      html += `<option `;
                      if (selected_price.id == price.id) {
                        html += `selected`;
                      }
                      html += ` value="${price.id}">${price.name}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                  }
                }
                html += `</div>`;
              }
              html += `</div>`;
              forloop.next();
            }
            html += `</div></div>`;
            if (can_purchase_again) {
              html += `<div class="elProductCardNewOrderWrapper"><div class="elProductCardTitle"><span>Or Purchase Again</span><div></div></div><div class="elProductCardNewOrder`;
              if (newOrder == true) {
                html += ` elProductCardOrderSelected`;
              }
              html += `"><div class="elProductCardNewOrderTitle"><i class="fas fa-plus-circle"></i><span>New Order</span></div>`;
              if (newOrder == true) {
                html += `<div class="elProductCardOrderActions">`;
                if (customVariants.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper">`;
                  const c20 = product.sorted_property_values;
                  const fl21 = new CF2ForloopDrop(c20.length);
                  for (const property_values of c20) {
                    const forloop = fl21;
                    const property_id = property_values.property_id;
                    const select_index = forloop.index0;
                    html += `    `;
                    html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
                    const c22 = property_values.value_ids;
                    const fl23 = new CF2ForloopDrop(c22.length);
                    for (const value_id of c22) {
                      const forloop2 = fl23;
                      html += `<option `;
                      if (variant.property_value_ids[select_index] == value_id) {
                        html += `selected`;
                      }
                      html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
                    forloop.next();
                  }
                  html += `</div>`;
                }
                if (priceDisplayType == "single" && variant.prices.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                  const c24 = variant.prices;
                  const fl25 = new CF2ForloopDrop(c24.length);
                  for (const price of c24) {
                    const forloop = fl25;
                    html += `<option `;
                    if (selected_price.id == price.id) {
                      html += `selected`;
                    }
                    html += ` value="${price.id}">${price.name}</option>`;
                    forloop.next();
                  }
                  html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                }
                html += `</div>`;
              }
              html += `</div></div>`;
            }
            html += `</div>`;
          }
        }
        html += `</div>`;
      } else if (layout == "grid") {
        html += `<div class="elProductLayoutBackground"></div>`;
        html += `<div class="elProductGridItem">`;
        if (selectType == "quantity") {
          html += `<div class="elProductInputWrapper elProductCardQuantityContainer"><div class="elProductInputControls"><button class="elProductCardInput">-</button><input class="elProductCardInput elProductCardShortInput" name="product" value="${quantity != null ? quantity : 0}" min="0" type="number"/><button class="elProductCardInput">+</button></div></div>`;
        } else if (selectType == "quantity-forced") {
          html += `<div class="elProductInputWrapper elSelectWrapper elForcedQuantityWrapper"><select name="product" class="elProductCardInput elProductInputControls">`;
          const step = (_y = product.step) != null ? _y : 2;
          const min = (_z = product.min) != null ? _z : 0;
          const max = (_A = product.max) != null ? _A : 5;
          const item_count_step_1 = max - min;
          const item_count_step_2 = item_count_step_1 / step;
          const item_count_step_3 = item_count_step_2 | 0;
          const range = Array.apply(0, Array(item_count_step_3)).map((element, index) => index + 0);
          ;
          const c26 = range;
          const fl27 = new CF2ForloopDrop(c26.length);
          for (const i of c26) {
            const forloop = fl27;
            const value = i * step + min;
            html += `<option value="${value}">${value}</option>`;
            forloop.next();
          }
          html += `</select><div class="elSelectArrow elForcedQuantitySelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
        }
        const isClassic = layout == "classic";
        const isQuantityType = selectType == "quantity";
        html += `<div class="elProductCardSelectInput`;
        if (isClassic == false || isQuantityType == true) {
          html += ` hide`;
        }
        html += `">`;
        if (selectType == "single") {
          if (isChecked) {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="true" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product" checked class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          } else {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product"  class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          }
        } else if (selectType == "multiple" || selectType == "quantity") {
          if (isChecked) {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked="true"><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product" checked data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          } else {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked=""><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product"  data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          }
        }
        html += `</div>`;
        if (showImage) {
          const imageUrl = (_B = variant.image) != null ? _B : product.image;
          if (imageUrl && imageUrl != "") {
            html += `<div class="elProductCardImage"><div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
            if (!imageUrl && true && true) {
              html += ` forceHide`;
            }
            html += `" data-liquid-replace="item">`;
            if (imageUrl || false) {
              html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
            } else if (false) {
              html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
            }
            html += `</div></div>`;
          }
        }
        html += `<div class="elProductCardNamePriceWrapper"><div class="elProductCardNameContainer">`;
        if (featured && highlight_text) {
          html += `<div class="elProductCardHighlight">${highlight_text}</div>`;
        }
        if (customVariants.length > 1) {
          html += `<span class="elProductCardInfoName">${product.default_variant.name}</span>`;
        } else {
          html += `<span class="elProductCardInfoName">${variant.name}</span>`;
        }
        if (showDescription) {
          html += `<span class="elProductCardInfoDescription">${((_E = (_D = (_C = product.description_override) != null ? _C : variant.description) != null ? _D : product.default_variant.description) != null ? _E : "").replaceAll(`
`, "<br>")}</span>`;
        }
        html += `</div><div class="elProductCardPriceContainer">`;
        if (priceDisplayType == "multiple") {
          if (variant.prices.length == 1) {
            html += `<div class="elProductCardInfoPrice">`;
            if (showCompareAtPrice) {
              const compare_at_amount = selected_price.compare_at_amount;
              if (compare_at_amount) {
                html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
              }
            }
            html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
          } else {
            html += `<div class="elSelectWrapper"><select name="variant_price">`;
            const c28 = variant.prices;
            const fl29 = new CF2ForloopDrop(c28.length);
            for (const price of c28) {
              const forloop = fl29;
              html += `<option `;
              if (selected_price.id == price.id) {
                html += `selected`;
              }
              html += ` value="${price.id}">${price.name}</option>`;
              forloop.next();
            }
            html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
          }
        } else if (priceDisplayType == "single") {
          html += `<div class="elProductCardInfoPrice">`;
          if (showCompareAtPrice) {
            const compare_at_amount = selected_price.compare_at_amount;
            if (compare_at_amount) {
              html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
            }
          }
          html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
        }
        html += `</div></div></div>`;
        if (showProductVariantSelection) {
          if (customVariants.length > 1) {
            html += `<div class="elProductSelectSelectorsWrapper">`;
            const c30 = product.sorted_property_values;
            const fl31 = new CF2ForloopDrop(c30.length);
            for (const property_values of c30) {
              const forloop = fl31;
              const property_id = property_values.property_id;
              const select_index = forloop.index0;
              html += `    `;
              html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
              const c32 = property_values.value_ids;
              const fl33 = new CF2ForloopDrop(c32.length);
              for (const value_id of c32) {
                const forloop2 = fl33;
                html += `<option `;
                if (variant.property_value_ids[select_index] == value_id) {
                  html += `selected`;
                }
                html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                forloop2.next();
              }
              html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
              forloop.next();
            }
            html += `</div>`;
          }
        }
        if (showManageOrders) {
          let active_order = false;
          let canceled_order = false;
          const amount_of_orders = updatableOrders.length;
          const c34 = updatableOrders;
          const fl35 = new CF2ForloopDrop(c34.length);
          for (const order of c34) {
            const forloop = fl35;
            if (order.type == "reactivate") {
              canceled_order = true;
            } else {
              active_order = true;
            }
            forloop.next();
          }
          if (amount_of_orders && amount_of_orders > 0) {
            html += `<div class="elProductCardSubscriptionsBanner"><i class="fas fa-sync-alt"></i>`;
            if (active_order && canceled_order) {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Existing Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Existing Subscription</span>`;
              }
            } else if (canceled_order) {
              html += ` `;
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Canceled Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Canceled Subscription</span>`;
              }
            } else {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Active Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Active Subscription</span>`;
              }
            }
            html += `</div>`;
            html += `<div class="elProductCardManageOrders`;
            if (!isChecked) {
              html += ` elHide`;
            }
            html += `"><div class="elProductCardOrdersWrapper"><div class="elProductCardTitle"><span>Manage Subscriptions</span><div></div></div><div class="elProductCardOrders">`;
            const c36 = updatableOrders;
            const fl37 = new CF2ForloopDrop(c36.length);
            for (const order of c36) {
              const forloop = fl37;
              const orderIndex = forloop.index0;
              html += `<div class="elProductCardOrder`;
              if (selectedOrderIndex == orderIndex) {
                html += ` elProductCardOrderSelected`;
              }
              html += `" data-order-index="${orderIndex}"><div class="elProductCardOrderDetails"><div class="elProductCardOrderDetailsNumber"><i class="fas fa-receipt"></i><span>Order ${order.number}</span></div>`;
              if (order.type == "reactivate") {
                html += `<span class="elProductCardOrderDetailsReactivate">Reactivate</span>`;
              } else {
                html += `<span class="elProductCardOrderDetailsManage">Manage</span>`;
              }
              html += `</div>`;
              if (selectedOrderIndex == orderIndex) {
                html += `<div class="elProductCardOrderActions"><a data-page-element="LinkNode" class="elTypographyLink elProductCardShowOrderDetailsLink id-LinkNode" href="#show-selected-order-details" target="_self" data-selected="{% is_current_path '#show-selected-order-details' %}" data-liquid-replace="item"><span>View Order Details</span></a>`;
                if (order.type == "upgradeDowngrade") {
                  const updatableItem = order.updatableItems[selectedUpdatableCartItemIndex];
                  html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="${updatableItem.direction}">${updatableItem.direction} To </span> <span class="elCustomSelectPreviewInfo">${updatableItem.variantName} - ${updatableItem.priceName}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select name="upgradeDowngrade">`;
                  const c38 = order.updatableItems;
                  const fl39 = new CF2ForloopDrop(c38.length);
                  for (const updatableItem2 of c38) {
                    const forloop2 = fl39;
                    const index = forloop2.index0;
                    html += `<option `;
                    if (index == selectedUpdatableCartItemIndex) {
                      html += `selected`;
                    }
                    html += ` value="${index}">${updatableItem2.direction} To ${updatableItem2.variantName} - ${updatableItem2.priceName}</option>`;
                    forloop2.next();
                  }
                  html += `</select></div>`;
                } else {
                  if (customVariants.length > 1) {
                    html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="Reactivate">Reactivate</span> <span class="elCustomSelectPreviewInfo">${variant.name}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select class="elVariantSelector">`;
                    const c40 = product.variants;
                    const fl41 = new CF2ForloopDrop(c40.length);
                    for (const product_variant of c40) {
                      const forloop2 = fl41;
                      let combined_variant_name = "";
                      const c42 = product.sorted_property_values;
                      const fl43 = new CF2ForloopDrop(c42.length);
                      for (const property_values of c42) {
                        const forloop3 = fl43;
                        const index0 = forloop3.index0;
                        const property_id = property_values.property_id;
                        const property_value_id = product_variant.property_value_ids[index0];
                        if (combined_variant_name != "") {
                          combined_variant_name = combined_variant_name.toString().concat(", ");
                        }
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties[property_id]);
                        combined_variant_name = combined_variant_name.toString().concat(": ");
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties_values[property_value_id]);
                        forloop3.next();
                      }
                      html += `<option value="${product_variant.property_value_ids}" `;
                      if (product_variant.id == variant.id) {
                        html += `selected`;
                      }
                      html += `>${combined_variant_name}</option>`;
                      forloop2.next();
                    }
                    html += `</select></div>`;
                  }
                  if (priceDisplayType == "single" && variant.prices.length > 1) {
                    html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                    const c44 = variant.prices;
                    const fl45 = new CF2ForloopDrop(c44.length);
                    for (const price of c44) {
                      const forloop2 = fl45;
                      html += `<option `;
                      if (selected_price.id == price.id) {
                        html += `selected`;
                      }
                      html += ` value="${price.id}">${price.name}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                  }
                }
                html += `</div>`;
              }
              html += `</div>`;
              forloop.next();
            }
            html += `</div></div>`;
            if (can_purchase_again) {
              html += `<div class="elProductCardNewOrderWrapper"><div class="elProductCardTitle"><span>Or Purchase Again</span><div></div></div><div class="elProductCardNewOrder`;
              if (newOrder == true) {
                html += ` elProductCardOrderSelected`;
              }
              html += `"><div class="elProductCardNewOrderTitle"><i class="fas fa-plus-circle"></i><span>New Order</span></div>`;
              if (newOrder == true) {
                html += `<div class="elProductCardOrderActions">`;
                if (customVariants.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper">`;
                  const c46 = product.sorted_property_values;
                  const fl47 = new CF2ForloopDrop(c46.length);
                  for (const property_values of c46) {
                    const forloop = fl47;
                    const property_id = property_values.property_id;
                    const select_index = forloop.index0;
                    html += `    `;
                    html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
                    const c48 = property_values.value_ids;
                    const fl49 = new CF2ForloopDrop(c48.length);
                    for (const value_id of c48) {
                      const forloop2 = fl49;
                      html += `<option `;
                      if (variant.property_value_ids[select_index] == value_id) {
                        html += `selected`;
                      }
                      html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
                    forloop.next();
                  }
                  html += `</div>`;
                }
                if (priceDisplayType == "single" && variant.prices.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                  const c50 = variant.prices;
                  const fl51 = new CF2ForloopDrop(c50.length);
                  for (const price of c50) {
                    const forloop = fl51;
                    html += `<option `;
                    if (selected_price.id == price.id) {
                      html += `selected`;
                    }
                    html += ` value="${price.id}">${price.name}</option>`;
                    forloop.next();
                  }
                  html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                }
                html += `</div>`;
              }
              html += `</div></div>`;
            }
            html += `</div>`;
          }
        }
      } else {
        html += `<div class="elProductLayoutBackground"></div>`;
        if (selectType == "quantity") {
          html += `<div class="elProductInputWrapper elProductCardQuantityContainer"><div class="elProductInputControls"><button class="elProductCardInput">-</button><input class="elProductCardInput elProductCardShortInput" name="product" value="${quantity != null ? quantity : 0}" min="0" type="number"/><button class="elProductCardInput">+</button></div></div>`;
        } else if (selectType == "quantity-forced") {
          html += `<div class="elProductInputWrapper elSelectWrapper elForcedQuantityWrapper"><select name="product" class="elProductCardInput elProductInputControls">`;
          const step = (_F = product.step) != null ? _F : 2;
          const min = (_G = product.min) != null ? _G : 0;
          const max = (_H = product.max) != null ? _H : 5;
          const item_count_step_1 = max - min;
          const item_count_step_2 = item_count_step_1 / step;
          const item_count_step_3 = item_count_step_2 | 0;
          const range = Array.apply(0, Array(item_count_step_3)).map((element, index) => index + 0);
          ;
          const c52 = range;
          const fl53 = new CF2ForloopDrop(c52.length);
          for (const i of c52) {
            const forloop = fl53;
            const value = i * step + min;
            html += `<option value="${value}">${value}</option>`;
            forloop.next();
          }
          html += `</select><div class="elSelectArrow elForcedQuantitySelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
        }
        const isClassic = layout == "classic";
        const isQuantityType = selectType == "quantity";
        html += `<div class="elProductCardSelectInput`;
        if (isClassic == false || isQuantityType == true) {
          html += ` hide`;
        }
        html += `">`;
        if (selectType == "single") {
          if (isChecked) {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="true" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product" checked class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          } else {
            html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="product"  class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
          }
        } else if (selectType == "multiple" || selectType == "quantity") {
          if (isChecked) {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked="true"><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product" checked data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          } else {
            html += `<div data-page-element="Checkbox/V1" type="" class="elCheckboxWrapper elFormItemWrapper de-input-block id-Checkbox/V1" data-liquid-replace="item" data-prevent-click-on-label="false" data-trigger-click-on-wrapper="false" data-checked=""><label class="elCheckboxLabel"><input type="checkbox" value="${product.id}" name="product"  data-prevent-garlic="false" class="elCheckboxInput inputHolder"/><div class="elCheckbox"><div class="elCheckboxIcon"><div class="elCheckboxIconSquare hide"></div><i class="elCheckboxIconCheck fas fa-check"></i></div></div><span class="elCheckboxText"></span></label><div data-input-status-type="true" data-error-container="true"></div></div>`;
          }
        }
        html += `</div>`;
        if (showImage) {
          const imageUrl = (_I = variant.image) != null ? _I : product.image;
          if (imageUrl && imageUrl != "") {
            html += `<div class="elProductCardImage"><div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
            if (!imageUrl && true && true) {
              html += ` forceHide`;
            }
            html += `" data-liquid-replace="item">`;
            if (imageUrl || false) {
              html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
            } else if (false) {
              html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
            }
            html += `</div></div>`;
          }
        }
        html += `<div class="elProductCardNameContainer">`;
        if (featured && highlight_text) {
          html += `<div class="elProductCardHighlight">${highlight_text}</div>`;
        }
        if (customVariants.length > 1) {
          html += `<span class="elProductCardInfoName">${product.default_variant.name}</span>`;
        } else {
          html += `<span class="elProductCardInfoName">${variant.name}</span>`;
        }
        if (showDescription) {
          html += `<span class="elProductCardInfoDescription">${((_L = (_K = (_J = product.description_override) != null ? _J : variant.description) != null ? _K : product.default_variant.description) != null ? _L : "").replaceAll(`
`, "<br>")}</span>`;
        }
        html += `</div>`;
        html += `<div class="elProductCardPriceContainer">`;
        if (priceDisplayType == "multiple") {
          if (variant.prices.length == 1) {
            html += `<div class="elProductCardInfoPrice">`;
            if (showCompareAtPrice) {
              const compare_at_amount = selected_price.compare_at_amount;
              if (compare_at_amount) {
                html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
              }
            }
            html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
          } else {
            html += `<div class="elSelectWrapper"><select name="variant_price">`;
            const c54 = variant.prices;
            const fl55 = new CF2ForloopDrop(c54.length);
            for (const price of c54) {
              const forloop = fl55;
              html += `<option `;
              if (selected_price.id == price.id) {
                html += `selected`;
              }
              html += ` value="${price.id}">${price.name}</option>`;
              forloop.next();
            }
            html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
          }
        } else if (priceDisplayType == "single") {
          html += `<div class="elProductCardInfoPrice">`;
          if (showCompareAtPrice) {
            const compare_at_amount = selected_price.compare_at_amount;
            if (compare_at_amount) {
              html += `<span class="elProductCardAnchorPrice">${compare_at_amount}</span>`;
            }
          }
          html += `<span class="elProductCardFinalPrice">${selected_price.name}</span></div>`;
        }
        html += `</div>`;
        if (showProductVariantSelection) {
          if (customVariants.length > 1) {
            html += `<div class="elProductSelectSelectorsWrapper">`;
            const c56 = product.sorted_property_values;
            const fl57 = new CF2ForloopDrop(c56.length);
            for (const property_values of c56) {
              const forloop = fl57;
              const property_id = property_values.property_id;
              const select_index = forloop.index0;
              html += `    `;
              html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
              const c58 = property_values.value_ids;
              const fl59 = new CF2ForloopDrop(c58.length);
              for (const value_id of c58) {
                const forloop2 = fl59;
                html += `<option `;
                if (variant.property_value_ids[select_index] == value_id) {
                  html += `selected`;
                }
                html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                forloop2.next();
              }
              html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
              forloop.next();
            }
            html += `</div>`;
          }
        }
        if (showManageOrders) {
          let active_order = false;
          let canceled_order = false;
          const amount_of_orders = updatableOrders.length;
          const c60 = updatableOrders;
          const fl61 = new CF2ForloopDrop(c60.length);
          for (const order of c60) {
            const forloop = fl61;
            if (order.type == "reactivate") {
              canceled_order = true;
            } else {
              active_order = true;
            }
            forloop.next();
          }
          if (amount_of_orders && amount_of_orders > 0) {
            html += `<div class="elProductCardSubscriptionsBanner"><i class="fas fa-sync-alt"></i>`;
            if (active_order && canceled_order) {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Existing Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Existing Subscription</span>`;
              }
            } else if (canceled_order) {
              html += ` `;
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Canceled Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Canceled Subscription</span>`;
              }
            } else {
              if (amount_of_orders > 1) {
                html += `<span>${amount_of_orders} Active Subscriptions</span>`;
              } else {
                html += `<span>${amount_of_orders} Active Subscription</span>`;
              }
            }
            html += `</div>`;
            html += `<div class="elProductCardManageOrders`;
            if (!isChecked) {
              html += ` elHide`;
            }
            html += `"><div class="elProductCardOrdersWrapper"><div class="elProductCardTitle"><span>Manage Subscriptions</span><div></div></div><div class="elProductCardOrders">`;
            const c62 = updatableOrders;
            const fl63 = new CF2ForloopDrop(c62.length);
            for (const order of c62) {
              const forloop = fl63;
              const orderIndex = forloop.index0;
              html += `<div class="elProductCardOrder`;
              if (selectedOrderIndex == orderIndex) {
                html += ` elProductCardOrderSelected`;
              }
              html += `" data-order-index="${orderIndex}"><div class="elProductCardOrderDetails"><div class="elProductCardOrderDetailsNumber"><i class="fas fa-receipt"></i><span>Order ${order.number}</span></div>`;
              if (order.type == "reactivate") {
                html += `<span class="elProductCardOrderDetailsReactivate">Reactivate</span>`;
              } else {
                html += `<span class="elProductCardOrderDetailsManage">Manage</span>`;
              }
              html += `</div>`;
              if (selectedOrderIndex == orderIndex) {
                html += `<div class="elProductCardOrderActions"><a data-page-element="LinkNode" class="elTypographyLink elProductCardShowOrderDetailsLink id-LinkNode" href="#show-selected-order-details" target="_self" data-selected="{% is_current_path '#show-selected-order-details' %}" data-liquid-replace="item"><span>View Order Details</span></a>`;
                if (order.type == "upgradeDowngrade") {
                  const updatableItem = order.updatableItems[selectedUpdatableCartItemIndex];
                  html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="${updatableItem.direction}">${updatableItem.direction} To </span> <span class="elCustomSelectPreviewInfo">${updatableItem.variantName} - ${updatableItem.priceName}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select name="upgradeDowngrade">`;
                  const c64 = order.updatableItems;
                  const fl65 = new CF2ForloopDrop(c64.length);
                  for (const updatableItem2 of c64) {
                    const forloop2 = fl65;
                    const index = forloop2.index0;
                    html += `<option `;
                    if (index == selectedUpdatableCartItemIndex) {
                      html += `selected`;
                    }
                    html += ` value="${index}">${updatableItem2.direction} To ${updatableItem2.variantName} - ${updatableItem2.priceName}</option>`;
                    forloop2.next();
                  }
                  html += `</select></div>`;
                } else {
                  if (customVariants.length > 1) {
                    html += `<div class="elCustomSelect"><div class="elCustomSelectPreview"><span class="elCustomSelectPreviewText"><span class="elCustomSelectPreviewDirection" data-direction="Reactivate">Reactivate</span> <span class="elCustomSelectPreviewInfo">${variant.name}</span></span><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div><select class="elVariantSelector">`;
                    const c66 = product.variants;
                    const fl67 = new CF2ForloopDrop(c66.length);
                    for (const product_variant of c66) {
                      const forloop2 = fl67;
                      let combined_variant_name = "";
                      const c68 = product.sorted_property_values;
                      const fl69 = new CF2ForloopDrop(c68.length);
                      for (const property_values of c68) {
                        const forloop3 = fl69;
                        const index0 = forloop3.index0;
                        const property_id = property_values.property_id;
                        const property_value_id = product_variant.property_value_ids[index0];
                        if (combined_variant_name != "") {
                          combined_variant_name = combined_variant_name.toString().concat(", ");
                        }
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties[property_id]);
                        combined_variant_name = combined_variant_name.toString().concat(": ");
                        combined_variant_name = combined_variant_name.toString().concat(product.all_properties_values[property_value_id]);
                        forloop3.next();
                      }
                      html += `<option value="${product_variant.property_value_ids}" `;
                      if (product_variant.id == variant.id) {
                        html += `selected`;
                      }
                      html += `>${combined_variant_name}</option>`;
                      forloop2.next();
                    }
                    html += `</select></div>`;
                  }
                  if (priceDisplayType == "single" && variant.prices.length > 1) {
                    html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                    const c70 = variant.prices;
                    const fl71 = new CF2ForloopDrop(c70.length);
                    for (const price of c70) {
                      const forloop2 = fl71;
                      html += `<option `;
                      if (selected_price.id == price.id) {
                        html += `selected`;
                      }
                      html += ` value="${price.id}">${price.name}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                  }
                }
                html += `</div>`;
              }
              html += `</div>`;
              forloop.next();
            }
            html += `</div></div>`;
            if (can_purchase_again) {
              html += `<div class="elProductCardNewOrderWrapper"><div class="elProductCardTitle"><span>Or Purchase Again</span><div></div></div><div class="elProductCardNewOrder`;
              if (newOrder == true) {
                html += ` elProductCardOrderSelected`;
              }
              html += `"><div class="elProductCardNewOrderTitle"><i class="fas fa-plus-circle"></i><span>New Order</span></div>`;
              if (newOrder == true) {
                html += `<div class="elProductCardOrderActions">`;
                if (customVariants.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper">`;
                  const c72 = product.sorted_property_values;
                  const fl73 = new CF2ForloopDrop(c72.length);
                  for (const property_values of c72) {
                    const forloop = fl73;
                    const property_id = property_values.property_id;
                    const select_index = forloop.index0;
                    html += `    `;
                    html += `<div class="elSelectWrapper"><select class="elVariantSelector" name="property_${property_id}">`;
                    const c74 = property_values.value_ids;
                    const fl75 = new CF2ForloopDrop(c74.length);
                    for (const value_id of c74) {
                      const forloop2 = fl75;
                      html += `<option `;
                      if (variant.property_value_ids[select_index] == value_id) {
                        html += `selected`;
                      }
                      html += ` value="${value_id}">${product.all_properties_values[value_id]}</option>`;
                      forloop2.next();
                    }
                    html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div>`;
                    forloop.next();
                  }
                  html += `</div>`;
                }
                if (priceDisplayType == "single" && variant.prices.length > 1) {
                  html += `<div class="elProductSelectSelectorsWrapper"><div class="elSelectWrapper"><select name="variant_price">`;
                  const c76 = variant.prices;
                  const fl77 = new CF2ForloopDrop(c76.length);
                  for (const price of c76) {
                    const forloop = fl77;
                    html += `<option `;
                    if (selected_price.id == price.id) {
                      html += `selected`;
                    }
                    html += ` value="${price.id}">${price.name}</option>`;
                    forloop.next();
                  }
                  html += `</select><div class="elSelectArrow"><i class="fas fa-chevron-down"></i></div></div></div>`;
                }
                html += `</div>`;
              }
              html += `</div></div>`;
            }
            html += `</div>`;
          }
        }
      }
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutProductCardV2"] = CheckoutProductCardV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-product-card-bump-v2.ts
init_define_process();
init_checkbox_v1();
init_runtime();
var CheckoutProductCardBumpV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "skipMountOnRender", true);
  }
  mount() {
  }
  render() {
    var _a;
    const selected_price = (_a = this.selected_price) != null ? _a : {};
    const showCompareAtPrice = this.element.getAttribute("data-param-showCompareAtPrice") === "true";
    const checkBox = this.getComponent("Checkbox/V1");
    checkBox.setChecked(this.isChecked);
    const arrow = this.element.querySelector(".elProductBumpHeadlineArrow");
    const modernButtonText = this.element.querySelector(".elProductCardModernButton > span");
    if (this.isChecked) {
      this.element.classList.add("elProductSelected");
      if (arrow) arrow.classList.add("elHide");
      if (modernButtonText) modernButtonText.innerText = "- Unselect";
    } else {
      this.element.classList.remove("elProductSelected");
      if (arrow) arrow.classList.remove("elHide");
      if (modernButtonText) modernButtonText.innerText = "+ Add";
    }
    const finalPriceEl = this.element.querySelector(".elProductCardFinalPrice");
    if (finalPriceEl) finalPriceEl.innerText = selected_price.name;
    if (showCompareAtPrice && selected_price.compare_at_amount) {
      const anchorPriceEl = this.element.querySelector(".elProductCardAnchorPrice");
      if (anchorPriceEl) anchorPriceEl.innerText = selected_price.compare_at_amount;
    }
    if (this.selectType === "quantity") {
      const quantityInput = this.element.querySelector(".elProductCardShortInput");
      if (quantityInput) quantityInput.value = this.quantity;
    }
  }
};
window["CheckoutProductCardBumpV2"] = CheckoutProductCardBumpV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-product-select-v2.ts
init_define_process();
init_runtime();
var CheckoutProductSelectV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    const productCardComponents = this.getComponents("CheckoutProductCard/V2");
    registerOneTimeCardElementListeners(productCardComponents, (pcc) => {
      registerProductEventListeners(pcc);
    });
    productCardComponents.forEach((pcc) => {
      registerEventListeners(pcc, (pcc2) => {
        registerProductEventListeners(pcc2);
      });
    });
  }
};
window["CheckoutProductSelectV2"] = CheckoutProductSelectV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-product-select-bump-v2.ts
init_define_process();
init_runtime();
var CheckoutProductSelectBumpV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    const productCardComponents = this.getComponents("CheckoutProductCardBump/V2");
    registerOneTimeCardElementListeners(productCardComponents);
    productCardComponents.forEach((pcc) => {
      registerEventListeners(pcc);
      this.registerBumpVariantEventListeners(pcc);
    });
  }
  registerBumpVariantEventListeners(pcc) {
    const element = pcc.element;
    const variantSelects = element.querySelectorAll(".elBumpVariantSelector");
    variantSelects.forEach((select, index) => {
      select.addEventListener("click", (evt) => {
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
      });
      select.addEventListener("change", (evt) => {
        evt.stopImmediatePropagation();
        evt.stopPropagation();
        evt.preventDefault();
        const newValues = [...variantSelects].map((e) => e.value);
        const selectedVariantId = pcc.product.property_values_variant_mapping[newValues];
        const oldCartItem = { product_id: pcc.product.id, variant_id: pcc.variant.id, price_id: pcc.selected_price.id };
        const newVariant = pcc.product.variants.find((v) => v.id == String(selectedVariantId));
        const newPrice = newVariant.prices[0];
        const newCartItem = { product_id: pcc.product.id, variant_id: newVariant.id, price_id: newPrice.id };
        updateCardByProductIdState(pcc.product.id, { variantId: newVariant.id, priceId: newPrice.id });
        pcc.render();
      });
    });
  }
};
window["CheckoutProductSelectBumpV2"] = CheckoutProductSelectBumpV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-shipping-profile-select-v1.ts
init_define_process();
init_nanostores();
init_radio_v1();
init_runtime();
var CheckoutShippingProfileSelectV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.$loading = computed(Checkout.store.loadingShipping, (loadingShipping) => loadingShipping);
    this.$summaryHasError = computed(Checkout.store.summary, (summary) => summary.state === "error");
    const renderDeps = computed([
      Checkout.store.shippingOptions,
      Checkout.computed.hasValidShippingAddress,
      this.$loading,
      this.$summaryHasError
    ], (...args) => args);
    renderDeps.listen(([shippingOptions, hasValidShippingAddress, loadingShipping, summaryHasError]) => {
      this.summaryHasError = summaryHasError;
      this.hasValidShippingAddress = hasValidShippingAddress;
      this.loadingShipping = loadingShipping;
      this.shippingOption = Checkout.store.shippingOption.get();
      this.shippingOptions = hasValidShippingAddress && !loadingShipping && shippingOptions && shippingOptions.map((option) => {
        const { description, amount: { amount, currency }, amount_formatted } = option;
        return {
          key: JSON.stringify(option),
          value: option,
          description,
          priceLabel: amount_formatted
        };
      });
      this.update();
    });
    Checkout.store.shippingOption.listen((shippingOption) => {
      this.setRadio(shippingOption);
    });
    this.update();
    Checkout.computed.isNewDigitalWalletPayment.subscribe((isNewDigitalWalletPayment) => {
      if (isNewDigitalWalletPayment) {
        this.hide();
      } else {
        this.show();
      }
    });
  }
  show() {
    this.element.classList.remove("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
  update() {
    this.render();
    this.bindElements();
  }
  bindElements() {
    const shippingProfileCards = this.element.querySelectorAll(".elShippingProfile");
    this.setRadio(Checkout.store.shippingOption.get());
    shippingProfileCards.forEach((card) => {
      const key = card.getAttribute("data-shipping-option");
      if (key) {
        card.addEventListener("click", (ev) => {
          ev.preventDefault();
          const option = this.shippingOptions.find(({ description }) => description === key);
          Checkout.store.shippingOption.set(option.value);
        });
      }
    });
    const emptyCardIcons = this.element.querySelectorAll(".elShippingProfilesEmpty .fa");
    emptyCardIcons.forEach((el) => {
      const iconClass = el.className.split(" ")[1];
      this.$loading.subscribe((loading) => {
        el.className = loading ? "fa fa-spinner fa-spin" : `fa ${iconClass}`;
      });
    });
  }
  setRadio(shippingOption) {
    const radio = shippingOption && this.element.querySelector(`[data-shipping-option="${shippingOption.description}"] .elRadioInput`);
    if (radio) {
      radio.checked = true;
    }
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a, _b, _c, _d, _e, _f, _g;
    const is_server = true;
    const title = (_a = this.title) != null ? _a : null;
    const titleEnabled = (_b = this.titleEnabled) != null ? _b : null;
    const shippingOptions = (_c = this.shippingOptions) != null ? _c : [];
    const shippingOption = (_d = this.shippingOption) != null ? _d : void 0;
    const hasValidShippingAddress = (_e = this.hasValidShippingAddress) != null ? _e : false;
    const loadingShipping = (_f = this.loadingShipping) != null ? _f : false;
    const summaryHasError = (_g = this.summaryHasError) != null ? _g : false;
    let html = "";
    {
      if (titleEnabled) {
        html += `<div class="elCheckoutFormLabelContainer"><div class="elCheckoutFormLabel">${title}</div> <hr class="elCheckoutFormLabelDivider"/></div>`;
      }
      html += `<div class="elShippingProfileList">`;
      if (summaryHasError) {
        html += `<div class="elShippingProfileCardWrapper elShippingProfilesEmpty">      <div class="elShippingProfile elShippingProfileLayout"><div class="elShippingProfileLayoutBackground"></div><div><p>Something Unexpected Happened!</p></div></div></div>`;
      } else if (hasValidShippingAddress || false) {
        if (loadingShipping) {
          html += `<div class="elShippingProfileCardWrapper elShippingProfilesEmpty">      <div class="elShippingProfile elShippingProfileLayout"><div class="elShippingProfileLayoutBackground"></div><div><div><i class="fa fa-truck"></i></div></div></div></div>`;
        } else if (shippingOptions && shippingOptions.length > 0) {
          const c0 = shippingOptions;
          const fl1 = new CF2ForloopDrop(c0.length);
          for (const shippingProfile of c0) {
            const forloop = fl1;
            const currentIndex = forloop.index0;
            const isDefaultValue = currentIndex == 0;
            const hasValue = shippingOption;
            const isSelected = shippingOption == shippingProfile.key;
            html += `      `;
            const isChecked = hasValue && isSelected || isDefaultValue;
            html += `      `;
            html += `<div class="elShippingProfileCardWrapper"><div class="elShippingProfile elShippingProfileLayout`;
            if (isChecked) {
              html += ` elShippingProfileSelected`;
            }
            html += ` elShippingProfileClickable" data-shipping-option="${shippingProfile.description}"><div class="elShippingProfileLayoutBackground"></div><div class="elShippingProfileSelectInput">`;
            if (isChecked) {
              html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="true" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="shipping_profile" checked class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
            } else {
              html += `<div data-page-element="Radio/V1" class="elRadioWrapper id-Radio/V1" data-liquid-replace="item" data-checked="" data-trigger-click-on-wrapper="false"><label class="elRadioLabel"><input type="radio" value="" name="shipping_profile"  class="elRadioInput"/><div class="elRadio"><div class="elRadioIcon"></div></div><span class="elRadioText"></span></label></div>`;
            }
            html += `</div>  <div class="elShippingProfileCardNameContainer"><div class="elShippingProfileCardInfoName">${shippingProfile.description}</div></div>    <div class="elShippingProfileCardPriceContainer"><span class="elShippingProfileInfoPrice elShippingProfileFinalPrice">${shippingProfile.priceLabel}</span></div></div></div>`;
            forloop.next();
          }
        } else if (shippingOptions && shippingOptions.length == 0) {
          html += `<div class="elShippingProfileCardWrapper elShippingProfilesEmpty">      <div class="elShippingProfile elShippingProfileLayout"><div class="elShippingProfileLayoutBackground"></div><div><div><i class="fa fa-truck"></i></div><p>Shipping is not available for this location.</p></div></div></div>`;
        }
      } else {
        html += `<div class="elShippingProfileCardWrapper elShippingProfilesEmpty">      <div class="elShippingProfile elShippingProfileLayout"><div class="elShippingProfileLayoutBackground"></div><div><div><i class="fa fa-truck"></i></div><p>Delivery options will be shown here when you enter your address.</p></div></div></div>`;
      }
      html += `</div>`;
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutShippingProfileSelectV1"] = CheckoutShippingProfileSelectV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-apple-pay-button-v1.ts
init_define_process();
init_runtime();
var CheckoutApplePayButtonV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.applePayMounted = nanostores.atom(false);
    const checkoutElement = this.element.closest(".elCheckout");
    if (!!this.getApplePayPreview()) {
      this.getApplePayPreview().addEventListener("click", (evt) => {
        evt.preventDefault();
        CheckoutSubmit.checkSubmitShowErrors({ onlyFields: /* @__PURE__ */ new Set(["products"]) });
        CheckoutSubmit.checkSubmit(checkoutElement);
      });
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const addedNode of mutation.addedNodes) {
            if (addedNode.id == "rebilly-apple-pay-button") {
              this.applePayMounted.set(true);
            }
          }
          for (const removedNode of mutation.removedNodes) {
            if (removedNode.id == "rebilly-apple-pay-button") {
              this.applePayMounted.set(false);
            }
          }
        }
      }).observe(this.element.querySelector(".apple-pay-button"), {
        subtree: true,
        childList: true
      });
      const computedState = nanostores.computed([
        Checkout.computed.isDigitalWalletReadyToStart,
        this.applePayMounted,
        Checkout.store.isUpdatingRebilly
      ], (isDigitalWalletReadyToStart, isMounted, isUpdatingRebilly) => {
        if (isUpdatingRebilly) {
          return "loading";
        } else if (!isMounted || !isDigitalWalletReadyToStart) {
          return "preview";
        } else {
          return "ready";
        }
      });
      computedState.subscribe((state) => {
        this.getApplePayWrapper() && (this.getApplePayWrapper().dataset.state = state);
      });
      const computedShowApplePay = nanostores.computed([
        Checkout.store.payment.id,
        Checkout.store.payment.type
      ], (paymentId, paymentType) => {
        return !paymentId && paymentType == "apple-pay" && this.mode != "upgradeDowngrade";
      });
      computedShowApplePay.subscribe((showApplePay) => {
        var _a;
        (_a = this.element.closest(".submit-button-wrapper")) == null ? void 0 : _a.setAttribute("data-show-apple-pay", showApplePay);
      });
    }
  }
  getApplePayWrapper() {
    return this.element.querySelector(".apple-pay-button-wrapper");
  }
  getApplePayPreview() {
    return this.element.querySelector(".apple-pay-button-preview");
  }
};
window["CheckoutApplePayButtonV1"] = CheckoutApplePayButtonV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-multiple-payments-v2.ts
init_define_process();
init_runtime();
var CheckoutMultiplePaymentsV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "devices", {
      "payment-card": void 0,
      paypal: void 0,
      "apple-pay": void 0
    });
    __publicField(this, "CARD_FIELDS", ["number", "cvv", "date"]);
  }
  mount() {
    this.cleanupApplePayOption();
    const form = document.querySelector("#cfAR");
    form.querySelectorAll("input[data-rebilly]").forEach((cfARInput) => {
      const dataRebillyAttribute = cfARInput.getAttribute("data-rebilly");
      const dataCfFormField = cfARInput.getAttribute("data-cf-form-field");
      const pageInputField = document.querySelector('input[name="' + dataCfFormField + '"]');
      if (!pageInputField) {
        cfARInput == null ? void 0 : cfARInput.removeAttribute("data-rebilly");
      } else {
        pageInputField == null ? void 0 : pageInputField.setAttribute("data-rebilly", dataRebillyAttribute);
      }
    });
    Checkout.computed.modeLeaveEnterEvent.subscribe((ev) => {
      const { leave, next, enter, previous } = ev;
      const paymentState = Checkout.store.payment.state.get();
      if (paymentState == Checkout.PaymentStates.INITIALIZED) {
        if (leave && leave === this.mode) {
          this.unmountAllPaymentMethods();
        }
        if (enter === this.mode && previous) {
          this.mountRebillyElement();
        }
      }
    });
    Checkout.store.payment.state.listen((state) => {
      const checkoutMode = Checkout.store.checkout.mode.get();
      switch (state) {
        case Checkout.PaymentStates.LOADING: {
          if (this.mode == "guest") this.showLoader();
          break;
        }
        case Checkout.PaymentStates.INITIALIZED: {
          if (this.mode == "guest") this.hideLoader();
          this.element.setAttribute("data-initialized", "true");
          this.unmountAllPaymentMethods();
          if (this.mode == Checkout.store.checkout.mode.get()) this.mountRebillyElement();
          break;
        }
      }
    });
    Checkout.computed.paymentErrors.subscribe((errors) => {
      const errorWrapper = this.element.querySelector(".elCheckoutFormErrors");
      errorWrapper.classList.add("elHide");
      this.element.classList.remove("hasPaymentError");
      if (Checkout.utils.hasErrors(errors)) {
        const isFocused = this.element.querySelector(".payment-card-fields-container-focus");
        const isMobile = this.element.clientWidth <= 770;
        if (!isFocused || isMobile) {
          this.element.classList.add("hasPaymentError");
        }
        const fieldsErrors = errors.fields;
        if (fieldsErrors) {
          const errors2 = [];
          Object.entries(fieldsErrors).forEach(([field, error]) => {
            const { message } = error;
            errors2.push(message);
          });
          if (errors2.length) {
            const listErrors = `<ul>${errors2.map((err) => `<li>${err}</li>`).join("")}</ul>`;
            errorWrapper.innerHTML = listErrors;
            errorWrapper.classList.remove("elHide");
          } else {
            errorWrapper.classList.add("elHide");
          }
        }
      }
    });
    Checkout.store.payment.type.listen((type) => {
      const paymentState = Checkout.store.payment.state.get();
      this.showPaymentType(type);
      this.unmountAllPaymentMethods();
      if (type == "paypal" && Checkout.store.payment.paypal.state.get().state == Checkout.PaypalStates.PAYMENT_METHOD_APPROVED) return;
      if (this.mode == Checkout.store.checkout.mode.get()) {
        if (paymentState === Checkout.PaymentStates.INITIALIZED) {
          this.mountRebillyElement();
        }
      }
    });
    Checkout.store.submitting.listen((value) => {
      const paymentType = Checkout.store.payment.type.get();
      const failedSubmit = value.state == Checkout.SubmittingStates.ERROR;
      if (failedSubmit && paymentType == "apple-pay" && this.mode == Checkout.store.checkout.mode.get()) {
        this.unmountAllPaymentMethods();
        this.mountRebillyElement();
      }
    });
    if (this.enabledPayments.includes("paypal")) {
      this.addPaypalEventListeners();
    }
    this.addPaymentEventListeners();
  }
  cleanupApplePayOption() {
    var _a;
    const applePayIndex = this.enabledPayments.findIndex((v) => v == "apple-pay");
    if (!window.ApplePaySession && applePayIndex >= 0) {
      this.enabledPayments.splice(applePayIndex, 1);
    }
    const applePayElement = this.element.querySelector('[data-payment-type="apple-pay"]');
    if (!applePayElement) return;
    if (!window.ApplePaySession || !this.enabledPayments.includes("apple-pay")) {
      const isApplePayActive = applePayElement.getAttribute("data-active") == "true";
      if (isApplePayActive && this.enabledPayments[0]) {
        this.showPaymentType(this.enabledPayments[0]);
      }
      applePayElement.remove();
      if (this.enabledPayments.length <= 1) {
        (_a = this.element.querySelector(".pai-payment-methods")) == null ? void 0 : _a.remove();
      }
    } else {
      applePayElement.classList.remove("elHide");
    }
  }
  showLoader() {
    this.element.querySelector(".elPAILoader").dataset.loader = true;
  }
  hideLoader() {
    this.element.querySelector(".elPAILoader").dataset.loader = false;
  }
  addPaypalEventListeners() {
    Checkout.store.payment.paypal.state.listen((paypalState) => {
      switch (paypalState.state) {
        case Checkout.PaypalStates.IDLE: {
          this.paypalPreventClick();
          this.paypalInitializeContent();
          break;
        }
        case Checkout.PaypalStates.INITIALIZED: {
          this.paypalAllowClick();
          this.paypalInitializeContent();
          break;
        }
        case Checkout.PaypalStates.ERROR: {
          this.paypalPreventClick();
          switch (paypalState.code) {
            case Checkout.ErrorTypes.PAYPAL_DECLINED_ERROR: {
              const paypalStatus = this.getPaypalContent().querySelector(".paypal-status");
              paypalStatus.setAttribute("data-type", "error");
              paypalStatus.innerText = "Paypal declined";
              break;
            }
            case Checkout.ErrorTypes.PAYPAL_CUSTOM_ERROR: {
              const paypalStatus = this.getPaypalContent().querySelector(".paypal-status");
              paypalStatus.setAttribute("data-type", "error");
              paypalStatus.innerText = paypalState.message;
              break;
            }
          }
          break;
        }
        case Checkout.PaypalStates.PAYMENT_METHOD_APPROVED: {
          this.getPaypalContent().querySelector(".paypal-content-button-container").classList.add("elHide");
          const paypalStatus = this.getPaypalContent().querySelector(".paypal-status");
          paypalStatus.setAttribute("data-type", "success");
          paypalStatus.innerHTML = '<i class="fas fa-check"></i> Your payment is configured';
          break;
        }
      }
    });
  }
  getPaypalContent() {
    return this.element.querySelector(".paypal-content");
  }
  paypalInitializeContent() {
    this.getPaypalContent().querySelector(".paypal-status").innerHTML = "";
    this.getPaypalContent().querySelector(".paypal-content-button-container").classList.remove("elHide");
  }
  paypalPreventClick() {
    this.getPaypalContent().querySelector(".elSpinnerWrapper").dataset.loader = true;
  }
  paypalAllowClick() {
    this.getPaypalContent().querySelector(".elSpinnerWrapper").dataset.loader = false;
  }
  showPaymentType(type) {
    const paymentFields = this.element.querySelectorAll(".pai-payment-field");
    paymentFields.forEach((element) => {
      element.dataset.active = element.dataset.paymentType == type;
    });
    const paymentContents = this.element.querySelectorAll(".pai-payment-content");
    paymentContents.forEach((element) => {
      element.dataset.active = element.dataset.paymentType == type;
    });
  }
  addPaymentEventListeners() {
    const paymentFields = this.element.querySelectorAll(".pai-payment-field");
    paymentFields.forEach((element) => {
      element.addEventListener("click", (evt) => {
        var _a;
        evt.preventDefault();
        const paymentType = element.dataset.paymentType;
        if (Checkout.store.payment.type.get() == paymentType) return;
        if (Checkout.store.payment.type.get() == "payment-card" && !Object.values((_a = this.devices["payment-card"]) != null ? _a : {}).every((v) => {
          var _a2;
          return (_a2 = v == null ? void 0 : v.element) == null ? void 0 : _a2.mounted;
        })) return;
        if (this.enabledPayments.includes("paypal") && Checkout.store.payment.paypal.state.get().state != Checkout.PaypalStates.PAYMENT_METHOD_APPROVED) {
          Checkout.store.payment.paypal.state.set({ state: Checkout.PaypalStates.IDLE });
        }
        Checkout.store.payment["payment-card"].events.set({});
        Checkout.store.payment.type.set(paymentType);
      });
    });
  }
  unmountPaymentMethod(type) {
    switch (type) {
      case "apple-pay": {
        if (!this.devices["apple-pay"]) break;
        this.devices["apple-pay"].unmount();
        this.devices["apple-pay"] = void 0;
        break;
      }
      case "paypal": {
        if (!this.devices.paypal) break;
        this.devices.paypal.unmount();
        this.devices.paypal = void 0;
        break;
      }
      case "payment-card": {
        if (!this.devices["payment-card"]) break;
        ["number", "cvv", "date"].forEach((key) => {
          this.devices["payment-card"][key].element.mounted && this.devices["payment-card"][key].destroy();
        });
        this.devices["payment-card"] = void 0;
        break;
      }
    }
  }
  unmountPaymentMethods(types) {
    types.forEach((type) => {
      this.unmountPaymentMethod(type);
    });
  }
  unmountAllPaymentMethods() {
    this.unmountPaymentMethods(this.enabledPayments);
  }
  mountRebillyElement() {
    var _a;
    const Rebilly = globalThis.Rebilly;
    const paymentType = Checkout.store.payment.type.get();
    if (paymentType == "apple-pay" && !this.devices["apple-pay"]) {
      this.devices["apple-pay"] = Rebilly.applePay.mount(`[data-wrapper-checkout-state="${this.mode}"] .apple-pay-button`);
    }
    if (paymentType == "payment-card" && !((_a = this.devices["payment-card"]) == null ? void 0 : _a.number)) {
      const paymentCardWrapper = this.element.querySelector(".payment-card-fields-container");
      this.devices["payment-card"] = {};
      let lastEvent;
      const mountNameMapper = {
        number: "cardNumber",
        cvv: "cardCvv",
        date: "cardExpiration"
      };
      this.CARD_FIELDS.forEach((key) => {
        const rebillyField = Rebilly.card.mount(
          `[data-wrapper-checkout-state="${this.mode}"] .payment-card-${key}-mount`,
          mountNameMapper[key]
        );
        const fieldElement = rebillyField.element.element.querySelector(".rebilly-framepay");
        rebillyField.on("focus", (ev) => {
          this.element.classList.remove("hasPaymentError");
          fieldElement.classList.add(`payment-card-field-focus`);
          paymentCardWrapper.classList.add("payment-card-fields-container-focus");
          Checkout.store.payment["payment-card"].events.setKey(key, void 0);
          lastEvent = null;
        });
        rebillyField.on("change", (ev) => {
          lastEvent = ev;
        });
        rebillyField.on("blur", (ev) => {
          fieldElement.classList.remove(`payment-card-field-focus`);
          paymentCardWrapper.classList.remove("payment-card-fields-container-focus");
          Checkout.store.payment["payment-card"].events.setKey(key, lastEvent);
        });
        this.devices["payment-card"][key] = rebillyField;
      });
    } else if (paymentType == "paypal") {
      this.devices.paypal = Rebilly.paypal.mount(`[data-wrapper-checkout-state="${this.mode}"] .paypal-mount`, { extraData: Checkout.PaypalCallbacks });
    }
  }
};
window["CheckoutMultiplePaymentsV2"] = CheckoutMultiplePaymentsV2;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-express-payments-v1.ts
init_define_process();
init_runtime();
var CheckoutExpressPaymentsV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "devices", {
      "apple-pay": void 0
    });
  }
  mount() {
    var _a;
    this.enabledPayments = (_a = this.enabledPayments) != null ? _a : [];
    this.cleanupApplePayOption();
    const form = document.querySelector("#cfAR");
    form.querySelectorAll("input[data-rebilly]").forEach((cfARInput) => {
      const dataRebillyAttribute = cfARInput.getAttribute("data-rebilly");
      const dataCfFormField = cfARInput.getAttribute("data-cf-form-field");
      const pageInputField = document.querySelector('input[name="' + dataCfFormField + '"]');
      if (!pageInputField) {
        cfARInput == null ? void 0 : cfARInput.removeAttribute("data-rebilly");
      } else {
        pageInputField == null ? void 0 : pageInputField.setAttribute("data-rebilly", dataRebillyAttribute);
      }
    });
    Checkout.computed.modeLeaveEnterEvent.subscribe((ev) => {
      const { leave, next, enter, previous } = ev;
      const paymentState = Checkout.store.payment.state.get();
      if (paymentState == Checkout.PaymentStates.INITIALIZED) {
        if (leave && leave === this.mode) {
          this.unmountAllPaymentMethods();
        }
        if (enter === this.mode && previous) {
          this.mountExpressRebillyElements();
        }
      }
    });
    Checkout.store.payment.state.listen((state) => {
      const checkoutMode = Checkout.store.checkout.mode.get();
      switch (state) {
        case Checkout.PaymentStates.LOADING: {
          if (this.mode == "guest") this.showLoader();
          break;
        }
        case Checkout.PaymentStates.INITIALIZED: {
          if (this.mode == "guest") this.hideLoader();
          this.element.setAttribute("data-initialized", "true");
          this.unmountAllPaymentMethods();
          if (this.mode == Checkout.store.checkout.mode.get()) this.mountExpressRebillyElements();
          break;
        }
      }
    });
  }
  cleanupApplePayOption() {
    var _a, _b;
    const applePayIndex = this.enabledPayments.findIndex((v) => v == "apple-pay");
    if (!window.ApplePaySession && applePayIndex >= 0) {
      this.enabledPayments.splice(applePayIndex, 1);
    }
    const applePayElement = this.element.querySelector(".apple-pay-button-wrapper");
    if (!applePayElement) return;
    if (!window.ApplePaySession || !this.enabledPayments.includes("apple-pay")) {
      const isApplePayActive = applePayElement.getAttribute("data-active") == "true";
      applePayElement.remove();
      if (this.enabledPayments.length <= 1) {
        (_a = this.element.querySelector(".pai-express-payment-methods")) == null ? void 0 : _a.remove();
        (_b = this.element.querySelector(".elCheckoutExpressPaymentSeperator")) == null ? void 0 : _b.remove();
      }
    }
  }
  showLoader() {
    this.element.querySelector(".elPAILoader").dataset.loader = true;
  }
  hideLoader() {
    this.element.querySelector(".elPAILoader").dataset.loader = false;
  }
  unmountPaymentMethod(type) {
    switch (type) {
      case "apple-pay": {
        if (!this.devices["apple-pay"]) break;
        this.devices["apple-pay"].unmount();
        this.devices["apple-pay"] = void 0;
        break;
      }
    }
  }
  unmountPaymentMethods(types) {
    types.forEach((type) => {
      this.unmountPaymentMethod(type);
    });
  }
  unmountAllPaymentMethods() {
    this.unmountPaymentMethods(this.enabledPayments);
  }
  mountExpressRebillyElements() {
    const Rebilly = globalThis.Rebilly;
    Object.values(this.enabledPayments).forEach((paymentType) => {
      if (paymentType == "apple-pay" && !this.devices["apple-pay"]) {
        this.devices["apple-pay"] = Rebilly.applePay.mount(`[data-wrapper-checkout-state="${this.mode}"] .elExpressPaymentMethods .apple-pay-button`);
      }
    });
  }
};
window["CheckoutExpressPaymentsV1"] = CheckoutExpressPaymentsV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-contact-form-v1.ts
init_define_process();
init_input_v1();
init_runtime();
var CheckoutContactFormV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    Checkout.store.contact.listen((contactData) => {
      this.fields.forEach((prop) => {
        const input = this.getInputFromName(prop);
        const inputValue = input.value;
        const newValue = contactData[prop];
        if (newValue) {
          if (prop === "phone_number") {
            input.iti.setNumber(newValue);
          } else {
            input.value = newValue;
          }
          $(input).parents(".elFormItemWrapper").addClass("hasValue");
        } else {
          input.value = "";
          $(input).parents(".elFormItemWrapper").removeClass("hasValue");
        }
      });
    });
    this.fields.forEach((prop) => {
      const input = this.getInputFromName(prop);
      input.addEventListener("blur", () => {
        let value;
        if (prop === "phone_number") {
          value = input.iti.getNumber();
        } else {
          value = input.value;
        }
        Checkout.store.contact.setKey(prop, value);
        window.cfGarlicUtils.store(prop, value);
        if (!this.disableInputValidationOnBlur) {
          this.checkForm(Checkout.computed.contactErrors.get());
        } else {
          if (Checkout.store.showAllErrors.contact.get()) this.checkForm(Checkout.computed.contactErrors.get());
        }
      });
    });
    Checkout.computed.contactErrors.subscribe((contactErrors) => {
      if (!this.disableInputValidationOnBlur) {
        this.checkForm(contactErrors);
      } else {
        if (Checkout.store.showAllErrors.contact.get()) this.checkForm(contactErrors);
      }
    });
    Checkout.store.phoneNumberInitialized.listen((phoneNumberInitialized) => {
      if (phoneNumberInitialized) {
        this.initializePhoneNumber();
      }
    });
    Checkout.computed.hideContactInformationForm.subscribe((hideContactInformationForm) => {
      if (hideContactInformationForm) {
        this.element.classList.add("elHide");
      } else {
        this.element.classList.remove("elHide");
      }
    });
  }
  checkForm(contactErrors) {
    const errorWrapper = this.element.querySelector(".elCheckoutFormErrors");
    errorWrapper.classList.add("elHide");
    this.fields.forEach((prop) => {
      const input = this.getInputFromName(prop);
      resetInputErrors(input);
    });
    if (Checkout.utils.hasErrors(contactErrors)) {
      const fieldErrors = contactErrors.fields;
      if (fieldErrors) {
        const errors = [];
        Object.entries(fieldErrors).forEach(([field, error]) => {
          const { message } = error;
          errors.push(message);
          const input = this.getInputFromName(field);
          addError(input);
        });
        if (errors.length) {
          const listErrors = `<ul>${errors.map((err) => `<li>${err}</li>`).join("")}</ul>`;
          errorWrapper.innerHTML = listErrors;
          errorWrapper.classList.remove("elHide");
        } else {
          errorWrapper.classList.add("elHide");
        }
      }
    }
  }
  getInputFromName(name) {
    return this.element.querySelector(`[name='${name}']`);
  }
  // TODO: The intlTelInput setup should be handled by the Input/V1 blueprint
  initializePhoneNumber() {
    const phoneInput = this.getInputFromName("phone_number");
    if (!phoneInput) return;
    const initialCountry = Checkout.store.shipping.get().country;
    const iti = window.intlTelInput(phoneInput, {
      autoPlaceholder: "aggressive",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.16/build/js/utils.js",
      preferredCountries: ["us", "ca", "gb", "ie", "ai", "nz"],
      initialCountry: initialCountry.toLowerCase()
    });
    phoneInput.iti = iti;
    phoneInput.addEventListener("countrychange", () => {
      Checkout.store.contact.setKey("phone_number", phoneInput.iti.getNumber());
    });
  }
};
window["CheckoutContactFormV1"] = CheckoutContactFormV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-saved-address-form-v1.ts
init_define_process();
init_radio_v1();
init_runtime();
var CheckoutSavedAddressFormV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.bindNewAddressClick();
    this.bindAddressClick();
    Checkout.store[`${this.type}_addresses`].listen((addresses) => {
      this.addresses = addresses;
      if (addresses && addresses.length > 0) {
        this.addresses = addresses;
        this.renderAddresses(addresses);
        this.getAddNewAddressButton().classList.remove("elHide");
        this.getAddNewAddressElement().classList.remove("elCheckoutStandaloneSavedAddNewAddress");
        this.getAddNewAddressElement().classList.add("elHide");
      } else {
        this.getAddressInputByValue("new-address").checked = true;
        this.showAddNewAddressForm();
      }
    });
  }
  bindNewAddressClick() {
    this.getAddNewAddressButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.getAddressInputByValue("new-address").checked = true;
      this.showAddNewAddressForm();
    });
  }
  getAddressFormValues() {
    return this.getComponent("CheckoutAddressForm/V1").store.get();
  }
  validateNewAddressForm() {
    return this.getComponent("CheckoutAddressForm/V1").validateFormFields();
  }
  showAddNewAddressForm() {
    this.getAddNewAddressButton().classList.add("elHide");
    this.getAddNewAddressElement().classList.remove("elHide");
  }
  getAddNewAddressElement() {
    return this.element.querySelector(".elCheckoutSavedAddNewAddress");
  }
  getAddNewAddressButton() {
    return this.element.querySelector(".elCheckoutSavedAddNewAddressContainer");
  }
  getAddressInputByValue(value) {
    return this.element.querySelector(`input[value="${value}"]`);
  }
  getSavedAddressById(id) {
    return this.addresses.find((addr) => addr.id == id);
  }
  getSelectedAddressId() {
    return this.element.querySelector(`input[name="selected-${this.type}-address"]:checked`).value;
  }
  isNewAddress() {
    return this.getSelectedAddressId() === "new-address";
  }
  bindAddressClick() {
    Array.from(
      this.element.querySelector(".elCheckoutAddressList").querySelectorAll(".elCheckoutSavedAddressContainer")
    ).forEach((addressContainer) => {
      const elRadio = addressContainer.parentElement.querySelector('[type="radio"]');
      addressContainer.addEventListener("click", (ev) => {
        ev.preventDefault();
        elRadio.checked = true;
      });
    });
  }
  renderAddresses(addresses = []) {
    if (addresses.length === 0) return;
    const el = this.element.querySelector(".elCheckoutAddressList");
    $(el).html(`
      ${addresses.map((address, index) => {
      const { id, city, state, zip, country } = address;
      const { type } = this;
      const checked = index === 0;
      return `
          <div class="elCheckoutSavedAddressContainer">

            <div data-page-element="Radio/V1" class="elRadioWrapper">
              <label class="elRadioLabel">
                <input type="radio" value="${address.id}" name="selected-${type}-address" ${checked ? "checked" : ""} class="elRadioInput">
                <div class="elRadio">
                  <div class="elRadioIcon">
                  </div>
                </div>
                <span class="elRadioText"></span>
              </label>
            </div>
            <div class="elCheckoutSavedAddress"> 
              ${!address.address ? "" : `
                <span class="elCheckoutSavedAddressInfo">
                  ${[address.address, address.address2].filter((x) => x).join(", ")}
                </span>
              `}
              <span class="elCheckoutSavedAddressDetails">
                ${[city, state, zip, country].filter((x) => x).join(", ")}
              </span>
            </div>
          </div>        
        `;
    }).join("\n")}
    `);
    this.bindAddressClick();
  }
};
window["CheckoutSavedAddressFormV1"] = CheckoutSavedAddressFormV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-saved-billing-address-v1.ts
init_define_process();
init_nanostores();
init_modal_v1();
init_checkbox_v1();
init_runtime();
var CheckoutSavedBillingAddressV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.currentBillingSameAsShipping = atom(Checkout.store.billingSameAsShipping.get());
    this.modalShow = atom(false);
    this.getOpenModalButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.modalShow.set(true);
    });
    this.getCloseButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.modalShow.set(false);
    });
    this.getModal().onClose = () => {
      this.modalShow.set(false);
    };
    this.getCheckbox().addEventListener("change", (evt) => {
      evt.stopPropagation();
      this.currentBillingSameAsShipping.set(!!evt.target.checked);
    });
    this.getUpdateButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.updateAddress();
    });
    this.modalShow.listen((value) => {
      var _a;
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
        const storeBillingSameAsShipping = Checkout.store.billingSameAsShipping.get();
        if (!storeBillingSameAsShipping) {
          const currentAddress = Checkout.store.billing.get();
          const id = (_a = currentAddress == null ? void 0 : currentAddress.id) != null ? _a : "new-address";
          this.getSavedAddressForm().getAddressInputByValue(id).checked = true;
        }
      }
    });
    Checkout.store.billingSameAsShipping.listen((value) => {
      this.currentBillingSameAsShipping.set(value);
    });
    this.currentBillingSameAsShipping.listen((value) => {
      this.getCheckbox().checked = value;
      if (value) {
        this.hideSelectAddressForm();
      } else {
        this.showSelectAddressForm();
      }
    });
    const computedSavedBillingAddress = computed([
      Checkout.store.billing,
      Checkout.store.shipping,
      Checkout.store.billingSameAsShipping
    ], (billing, shipping, billingSameAsShipping) => {
      return billingSameAsShipping ? shipping : billing;
    });
    computedSavedBillingAddress.listen((savedAddress) => {
      this.refreshDetailsElement(savedAddress);
    });
    Checkout.computed.hasPhysicalProducts.subscribe((hasPhysicalProducts) => {
      if (hasPhysicalProducts) {
        this.showBillingSameAsShipping();
        if (Checkout.store.billingSameAsShipping.get()) {
          this.hideSelectAddressForm();
        } else {
          this.showSelectAddressForm();
        }
      } else {
        this.hideBillingSameAsShipping();
        this.showSelectAddressForm();
      }
    });
    this.listenToBillingApiErrors();
    Checkout.computed.isNewDigitalWalletPayment.subscribe((isNewDigitalWalletPayment) => {
      if (isNewDigitalWalletPayment) {
        this.hide();
      } else {
        this.show();
      }
    });
  }
  updateAddress() {
    const savedAddrComp = this.getSavedAddressForm();
    if (Checkout.utils.hasPhysicalProducts() && this.currentBillingSameAsShipping.get()) {
      Checkout.store.billingSameAsShipping.set(true);
      const shippingData = Checkout.store.shipping.get();
      Checkout.store.billing.set(shippingData);
      this.modalShow.set(false);
    } else {
      if (savedAddrComp.isNewAddress()) {
        if (savedAddrComp.validateNewAddressForm()) {
          Checkout.store.billingSameAsShipping.set(false);
          const newAddress = savedAddrComp.getAddressFormValues();
          Checkout.store.billing.set(newAddress);
          this.modalShow.set(false);
        }
      } else {
        Checkout.store.billingSameAsShipping.set(false);
        const selectedAddressId = savedAddrComp.getSelectedAddressId();
        const newAddress = savedAddrComp.getSavedAddressById(selectedAddressId);
        if (newAddress) {
          Checkout.store.billing.set(newAddress);
        }
        this.modalShow.set(false);
      }
    }
  }
  refreshDetailsElement(address) {
    const detailsTextElement = this.element.querySelector(".elSavedDetailsText");
    const detailsIconElement = this.element.querySelector(".elSavedDetailsIcon");
    if (address && Object.keys(address).length) {
      const billingSameAsShipping = Checkout.store.billingSameAsShipping.get();
      const addressByFields = billingSameAsShipping ? address : parseAddressByFields(address, this.fields, false);
      const formattedText = addressToString(address);
      detailsTextElement.innerHTML = formattedText;
      detailsTextElement.classList.remove("elError");
      detailsIconElement.classList.remove("elError");
    } else {
      detailsTextElement.innerHTML = "Requires address configuration";
      detailsTextElement.classList.add("elError");
      detailsIconElement.classList.add("elError");
    }
  }
  getModal() {
    return this.getComponent("Modal/V1");
  }
  getOpenModalButton() {
    return this.element.querySelector(".elSavedDetailsEdit");
  }
  showModal() {
    this.getModal().element.style.display = "flex";
  }
  hideModal() {
    this.getModal().element.style.display = "none";
  }
  hideSelectAddressForm() {
    this.getSelectAddressForm().classList.add("elHide");
  }
  showSelectAddressForm() {
    this.getSelectAddressForm().classList.remove("elHide");
  }
  getSelectAddressForm() {
    return this.getModal().element.querySelector(".elCheckoutSelectAddressWrapper");
  }
  getUpdateButton() {
    return this.getModal().element.querySelector(".elButton");
  }
  getCheckbox() {
    return this.getBillingSameAsShippingCheckbox().querySelector("input");
  }
  getCloseButton() {
    return this.getModal().element.querySelector(".elCheckoutModalFormClose");
  }
  getSavedAddressForm() {
    return this.getComponent("CheckoutSavedAddressForm/V1");
  }
  getBillingSameAsShippingCheckbox() {
    return this.element.querySelector(".elShippingSameAsBillingContainer");
  }
  showBillingSameAsShipping() {
    return this.getBillingSameAsShippingCheckbox().classList.remove("elHide");
  }
  hideBillingSameAsShipping() {
    return this.getBillingSameAsShippingCheckbox().classList.add("elHide");
  }
  listenToBillingApiErrors() {
    Checkout.store.billingApiErrorsByField.listen((apiErrors) => {
      const errorWrapper = this.element.querySelector(".elCheckoutFormErrors");
      const savedDetailsContainer = this.element.querySelector(".elSavedDetailsContainer");
      errorWrapper.classList.add("elHide");
      savedDetailsContainer.classList.remove("errorBillingAddress");
      if (apiErrors) {
        const errors = [];
        Object.entries(apiErrors).forEach(([field, error]) => {
          const { message } = error;
          errors.push(message);
        });
        if (errors.length) {
          const listErrors = `<ul>${errors.map((err) => `<li>${err}</li>`).join("")}</ul>`;
          errorWrapper.innerHTML = listErrors;
          errorWrapper.classList.remove("elHide");
          savedDetailsContainer.classList.add("errorBillingAddress");
        }
      }
    });
  }
  show() {
    this.element.classList.remove("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
};
window["CheckoutSavedBillingAddressV1"] = CheckoutSavedBillingAddressV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-saved-contact-details-v1.ts
init_define_process();
init_nanostores();
init_modal_v1();
init_radio_v1();
init_runtime();
var CheckoutSavedContactDetailsV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.modalShow = atom(false);
    this.getOpenModalButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.modalShow.set(true);
    });
    this.getCloseButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.modalShow.set(false);
    });
    this.getModal().onClose = () => {
      this.modalShow.set(false);
    };
    this.getButtonElement().addEventListener("click", (evt) => {
      evt.preventDefault();
      this.updateAddress();
    });
    this.modalShow.listen((value) => {
      var _a;
      if (value) {
        this.showModal();
      } else {
        this.hideModal();
        const currentAddress = Checkout.store.shipping.get();
        const id = (_a = currentAddress == null ? void 0 : currentAddress.id) != null ? _a : "new-address";
        this.getSavedAddressForm().getAddressInputByValue(id).checked = true;
      }
    });
    Checkout.store.shipping.listen((shipping) => {
      const shippingAddressLength = this.getSavedContainerWrapper().getAttribute("data-contact-shipping-addresses-length");
      if (!shipping.id == null && (!shippingAddressLength || shippingAddressLength == "0")) {
        this.getSavedContainerWrapper().setAttribute("data-contact-shipping-addresses-length", "1");
      }
      this.refreshAddress(shipping);
    });
    Checkout.store.contact_pending_auth.listen((contact_pending_auth) => {
      const authenticated = contact_pending_auth.authenticated;
      this.setShowContactDetails(!authenticated);
    });
    Checkout.store.contact.listen((contact) => {
      const { email, first_name, last_name, phone_number } = contact;
      this.element.querySelector(".contact_email").innerHTML = email || "";
      this.element.querySelector(".contact_first_name").innerHTML = first_name || "";
      this.element.querySelector(".contact_last_name").innerHTML = last_name || "";
      this.element.querySelector(".elSavedPhone").innerHTML = phone_number ? `
        <i class="fas fa-phone"></i>
        <span class="contact_phone_number"> ${contact.phone_number} </span>      
      ` : ``;
    });
    Checkout.store.checkout.mode.subscribe((mode) => {
      this.getSavedContainerWrapper().dataset.mode = mode;
    });
    Checkout.computed.hasPhysicalProducts.subscribe((hasPhysicalProducts) => {
      const defaultLabel = "Shipping Information";
      const formDetailsLabel = this.element.querySelector(".elCheckoutFormLabel");
      if (!formDetailsLabel) return;
      this.getSavedContainerWrapper().dataset["selectedProductType"] = hasPhysicalProducts ? "physical" : "digital";
      if (hasPhysicalProducts) {
        formDetailsLabel.innerHTML = this.shippingHeadline || "Shipping Information";
      } else {
        formDetailsLabel.innerHTML = this.shippingHeadline == "Shipping Information" && this.showContactDetails() ? "Contact Information" : this.shippingHeadline;
      }
    });
    Checkout.computed.isNewDigitalWalletPayment.subscribe((isNewDigitalWalletPayment) => {
      if (isNewDigitalWalletPayment) {
        this.hide();
      } else {
        this.show();
      }
    });
    Checkout.store.shipping_addresses.listen((shippingAddresses) => {
      this.getSavedContainerWrapper().setAttribute("data-contact-shipping-addresses-length", shippingAddresses.length);
    });
  }
  hide() {
    this.element.classList.add("elHide");
  }
  show() {
    this.element.classList.remove("elHide");
  }
  updateAddress() {
    const savedAddrComp = this.getSavedAddressForm();
    if (savedAddrComp.isNewAddress()) {
      if (savedAddrComp.validateNewAddressForm()) {
        const newAddress = savedAddrComp.getAddressFormValues();
        Checkout.store.shipping.set(newAddress);
        this.modalShow.set(false);
      }
    } else {
      const selectedAddressId = savedAddrComp.getSelectedAddressId();
      const newAddress = savedAddrComp.getSavedAddressById(selectedAddressId);
      if (newAddress) {
        Checkout.store.shipping.set(newAddress);
      }
      this.modalShow.set(false);
    }
  }
  refreshAddress(address) {
    const detailsTextElement = this.element.querySelector(".elSavedDetailsText");
    const detailsIconElement = this.element.querySelector(".elSavedDetailsIcon");
    if (address && address.address) {
      const formattedText = addressToString(address);
      detailsTextElement.innerHTML = formattedText;
      detailsTextElement.classList.remove("elError");
      detailsIconElement.classList.remove("elError");
    }
  }
  getModal() {
    return this.getComponent("Modal/V1");
  }
  getOpenModalButton() {
    return this.element.querySelector(".elSavedDetailsEdit");
  }
  showModal() {
    this.getModal().element.style.display = "flex";
  }
  hideModal() {
    this.getModal().element.style.display = "none";
  }
  getSavedAddressForm() {
    return this.getComponent("CheckoutSavedAddressForm/V1");
  }
  getButtonElement() {
    return this.getModal().element.querySelector(".elButton");
  }
  getCloseButton() {
    return this.getModal().element.querySelector(".elCheckoutModalFormClose");
  }
  getSavedContainerWrapper() {
    return this.element.querySelector(".elCheckoutSavedContactDetailsWrapper");
  }
  showContactDetails() {
    return this.getSavedContainerWrapper().getAttribute("data-show-contact-details");
  }
  setShowContactDetails(value) {
    this.getSavedContainerWrapper().setAttribute("data-show-contact-details", value);
  }
};
window["CheckoutSavedContactDetailsV1"] = CheckoutSavedContactDetailsV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-saved-multiple-payments-v1.ts
init_define_process();
init_modal_v1();
init_runtime();
var CheckoutSavedMultiplePaymentsV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.paymentSelect = this.element.querySelector('[name="payment_method"]');
    this.paymentSelect.addEventListener("change", (evt) => {
      evt.preventDefault();
      const paymentId = evt.target.value == "new-payment" ? null : evt.target.value;
      Checkout.store.payment.id.set(paymentId);
    });
    if (this.paymentSelect.value == "new-payment") {
      const multiplePaymentsWrapper = this.element.querySelector(".elCheckoutMultiplePaymentsWrapper");
      multiplePaymentsWrapper.classList.remove("elHide");
    }
    Checkout.computed.paymentMethod.listen((paymentMethod) => {
      const multiplePaymentsWrapper = this.element.querySelector(".elCheckoutMultiplePaymentsWrapper");
      this.paymentMethod = paymentMethod;
      if (paymentMethod) {
        multiplePaymentsWrapper.classList.add("elHide");
      } else {
        multiplePaymentsWrapper.classList.remove("elHide");
      }
    });
    Checkout.store.paymentMethods.listen((payment_methods) => {
      this.contact = {
        payment_methods
      };
      this.rerenderSelect();
    });
    Checkout.store.payment.state.listen((state) => {
      if (state == Checkout.PaymentStates.LOADING) {
        this.showLoader();
      } else if (state == Checkout.PaymentStates.INITIALIZED) {
        this.hideLoader();
      }
    });
  }
  showLoader() {
    this.element.querySelector(".elPAISavedLoader").dataset.loader = true;
  }
  hideLoader() {
    this.element.querySelector(".elPAISavedLoader").dataset.loader = false;
  }
  rerenderSelect() {
    const selectedId = Checkout.store.payment.id.get();
    this.paymentSelect.innerHTML = `
      ${this.contact.payment_methods.map((payment_method) => {
      const checked = payment_method.id === selectedId;
      const label = payment_method.type === "payment-card" ? payment_method.details : payment_method.type === "paypal" ? `Paypal - ${payment_method.details}` : ``;
      return `<option value="${payment_method.id}" ${checked ? "checked" : ""}> ${label} </option>`;
    })}
      <option value="new-payment">Add new payment method</option>
    `;
  }
};
window["CheckoutSavedMultiplePaymentsV1"] = CheckoutSavedMultiplePaymentsV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-loading-v1.ts
init_define_process();
init_runtime();
var CheckoutLoadingV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    Checkout.store.submitting.listen((submitting) => {
      const state = submitting.state;
      switch (state) {
        case Checkout.SubmittingStates.IDLE: {
          this.hide();
          break;
        }
        case Checkout.SubmittingStates.START: {
          this.show();
          break;
        }
        case Checkout.SubmittingStates.WAITING_ON_QUEUE: {
          this.show();
          this.showWaitingOnQueueText(`Waiting on queue (Retrying in ${submitting.remainingSeconds}s)`);
          break;
        }
        case Checkout.SubmittingStates.ERROR: {
          this.hide();
          break;
        }
      }
    });
  }
  show() {
    this.element.classList.remove("elHide");
  }
  showWaitingOnQueueText(text) {
    this.element.querySelector(".elCheckoutLoadingWaitingOnQueue").classList.remove("elHide");
    this.element.querySelector(".elCheckoutLoadingWaitingOnQueue").innerHTML = text;
  }
  hideWaitingOnQueueText() {
    this.element.querySelector(".elCheckoutLoadingWaitingOnQueue").classList.add("elHide");
  }
  hide() {
    this.element.classList.add("elHide");
  }
};
window["CheckoutLoadingV1"] = CheckoutLoadingV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-order-details-content-v1.ts
init_define_process();
init_runtime();
var CheckoutOrderDetailsContentV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
    __publicField(this, "undefined");
  }
  remove() {
    this.element.innerHTML = "";
  }
  render(initializeChildrenInstances = false) {
    var _a;
    const is_server = true;
    const order_details = (_a = this.order_details) != null ? _a : { "order_number": "#12345", "total_amount": "$197.00", "tax_amount": "$0.00", "shipping_address": { "street_one": "Robert Robertson, 1234 NW Bobcat Lane", "city": "St. Robert", "zip": "65584-5678", "state": "MO", "country": "United States" }, "billing_address": { "street_one": "Robert Robertson, 1234 NW Bobcat Lane", "city": "St. Robert", "zip": "65584-5678", "state": "MO", "country": "United States" }, "billing_payment_method": { "id": 1, "pretty_type": "Credit Card", "details": "XXXX-XXXX-XXXX-1111", "type": "payment-card", "icon": "visa" }, "created_at": "June 14 at 1:45", "line_items": [{ "variant_id": 25, "product_id": 6508, "quantity": 1, "amount": "$197.00", "display_price": "Free for 14 days then $197/month", "variant_name": "ClickFunnels 2.0 (pro)", "image": "/editor/editor-demo-image-placeholder.svg" }] };
    let html = "";
    {
      html += `<div class="elCheckoutOrderDetailsInfoWrapper"><div class="elCheckoutOrderDetailsInfo"><h2>Order ${order_details.order_number}</h2><div class="elCheckoutOrderDetailsStatus" data-order-status="${order_details.service_status}">${order_details.service_status.charAt(0).toUpperCase() + order_details.service_status.slice(1)}</div></div>`;
      if (order_details.name) {
        html += `<span class="elCheckoutOrderDetailsName">${order_details.name}</span>`;
      }
      html += `<span class="elCheckoutOrderDetailsDate">${order_details.created_at}</span></div><div class="elCheckoutOrderDetailsItemsWrapper elCheckoutOrderDetailsWrapper"><h3>Items</h3><div class="elCheckoutOrderDetailsItems elCheckoutOrderDetailsContainer">`;
      const c0 = order_details.line_items;
      const fl1 = new CF2ForloopDrop(c0.length);
      for (const line_item of c0) {
        const forloop = fl1;
        html += `<div class="elCheckoutOrderDetailsItem">`;
        const imageUrl = line_item.image;
        if (imageUrl) {
          html += `<div class="elCheckoutOrderDetailsItemImage"><div data-page-element="Image/V2" class="elImageWrapper de-image-block id-Image/V2`;
          if (!imageUrl && true && true) {
            html += ` forceHide`;
          }
          html += `" data-liquid-replace="item">`;
          if (imageUrl || false) {
            html += `<img class="elImage" src="${imageUrl != null ? imageUrl : null}"/>`;
          } else if (false) {
            html += `<div class="image-placeholder" title="This element will render with content once configured."><span class="image-placeholder-header">[Replaced by Content]</span></div>`;
          }
          html += `</div><div class="elCheckoutOrderDetailsItemQty">${line_item.quantity}</div></div>`;
        }
        html += `<div class="elCheckoutOrderDetailsItemInfo"><span class="elCheckoutOrderDetailsItemName">${line_item.product_name}</span>`;
        if (line_item.display_price) {
          html += `<span class="elCheckoutOrderDetailsItemPrice">${line_item.display_price}</span>`;
        }
        if (line_item.variant_properties_values.length > 0) {
          html += `<div class="elCheckoutOrderDetailsVariants">`;
          const c2 = line_item.variant_properties_values;
          const fl3 = new CF2ForloopDrop(c2.length);
          for (const variant_item of c2) {
            const forloop2 = fl3;
            html += `<span>${variant_item.value}</span>`;
            forloop2.next();
          }
          html += `</div>`;
        }
        html += `</div><div class="elCheckoutOrderDetailsItemAmount"><span>${line_item.amount}</span></div></div>`;
        forloop.next();
      }
      html += `</div></div>`;
      if (order_details.shipping_address) {
        html += `<div class="elCheckoutOrderDetailsShipping elCheckoutOrderDetailsWrapper"><h3>Shipping Address</h3><div class="elCheckoutOrderDetailsContainer"><i class="fas fa-map-marker-alt"></i><span>${order_details.shipping_address}</span></div></div>`;
      }
      if (order_details.billing_address) {
        html += `<div class="elCheckoutOrderDetailsBilling elCheckoutOrderDetailsWrapper"><h3>Billing Address</h3><div class="elCheckoutOrderDetailsContainer"><i class="far fa-credit-card"></i><span>${order_details.billing_address}</span></div></div>`;
      }
      html += `<div class="elCheckoutOrderDetailsPayment elCheckoutOrderDetailsWrapper"><h3>Payment Method</h3>`;
      if (order_details.billing_payment_method.type == "payment-card") {
        html += `<div class="elCheckoutOrderDetailsPaymentType"><div class="elCheckoutOrderDetailsContainer"><i class="fab fa-cc-${order_details.billing_payment_method.icon}"></i><span>${order_details.billing_payment_method.details}</span></div></div>`;
      } else if (order_details.billing_payment_method.type == "paypal") {
        html += `<div class="elCheckoutOrderDetailsPaymentType"><div class="elCheckoutOrderDetailsContainer"><i class="fab fa-paypal"></i><span>${order_details.billing_payment_method.details}</span></div></div>`;
      }
      html += `</div><div class="elCheckoutOrderDetailsSummaryWrapper elCheckoutOrderDetailsWrapper"><h3>Summary</h3><div class="elCheckoutOrderDetailsSummary elCheckoutOrderDetailsContainer">`;
      if (order_details.tax_amount) {
        html += `<div class="elCheckoutOrderDetailsSummaryTax"><span>Tax</span><span>${order_details.tax_amount}</span></div>`;
      }
      if (order_details.shipping_amount) {
        html += `<div class="elCheckoutOrderDetailsSummaryShipping"><span>Shipping</span><span>${order_details.shipping_amount}</span></div>`;
      }
      html += `<div class="elCheckoutOrderDetailsSummaryTotal"><span>Total</span><span>${order_details.total_amount}</span></div></div></div>`;
    }
    this.element.innerHTML = html;
    if (initializeChildrenInstances) {
      CF2Component.hydrateTree(this.element);
    }
  }
};
window["CheckoutOrderDetailsContentV1"] = CheckoutOrderDetailsContentV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-order-details-v1.ts
init_define_process();
init_modal_v1();
init_runtime();
var CheckoutOrderDetailsV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.getCloseButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      Checkout.store.selectedOrderDetailId.set(null);
    });
    this.getModal().onClose = () => {
      Checkout.store.selectedOrderDetailId.set(null);
    };
    Checkout.store.selectedOrderDetailId.listen((selectedOrderDetailId) => {
      if (selectedOrderDetailId) {
        this.showModal();
        this.getContent().order_details = CheckoutExistingOrders.orderDetailsByOrderId[selectedOrderDetailId];
        const orderDetails = this.getContent().order_details;
        this.formatOrderDetails(orderDetails);
        this.getContent().render();
      } else {
        this.hideModal();
      }
    });
  }
  formatOrderDetails(orderDetails) {
    orderDetails.created_at = new Date(orderDetails.created_at_epoch * 1e3).toLocaleString(navigator.language);
    if (orderDetails.shipping_address) {
      orderDetails.shipping_address = addressToString(orderDetails.shipping_address);
    }
    if (orderDetails.billing_address) {
      orderDetails.billing_address = addressToString(orderDetails.billing_address);
    }
    if (orderDetails.line_items.length) {
      this.findAndAddProductsImage(orderDetails.line_items);
    }
  }
  getContent() {
    return this.getComponent("CheckoutOrderDetailsContent/V1");
  }
  getModal() {
    return this.getComponent("Modal/V1");
  }
  getCloseButton() {
    return this.getModal().element.querySelector(".elCheckoutModalFormClose");
  }
  showModal() {
    this.getModal().element.style.display = "flex";
  }
  hideModal() {
    this.getModal().element.style.display = "none";
  }
  findAndAddProductsImage(lineItems) {
    lineItems.forEach((lineItem) => {
      var _a;
      lineItem.image = (_a = Checkout.variantsById[lineItem.variant_id].image) != null ? _a : Checkout.productsById[lineItem.product_id].image;
    });
  }
};
window["CheckoutOrderDetailsV1"] = CheckoutOrderDetailsV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-submit-button-v1.ts
init_define_process();
init_runtime();
var CheckoutSubmitButtonV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount() {
    this.storeButtonInitialHTML();
    this.getSubmitButton().addEventListener("click", (evt) => {
      evt.preventDefault();
      CheckoutSubmit.submitFromButtonClick(this.element);
    });
    const checkoutElement = this.element.closest(".elCheckout");
    Checkout.store.submitting.listen((submitting) => {
      const state = submitting.state;
      switch (state) {
        case Checkout.SubmittingStates.ERROR: {
          this.setButtonInitialHTML();
          break;
        }
        case Checkout.SubmittingStates.IDLE: {
          this.setButtonInitialHTML();
          break;
        }
        case Checkout.SubmittingStates.START: {
          this.setSubmittingText();
          break;
        }
      }
    });
  }
  getSubmitButton() {
    return this.element.querySelector('[href="#submit-checkout-form"]');
  }
  storeButtonInitialHTML() {
    const buttonMainText = this.element.querySelector(".elButtonMain .elButtonMainText");
    const buttonSubText = this.element.querySelector(".elButtonSub");
    this.buttonMainTextInitialHTML = buttonMainText.innerHTML;
    this.buttonSubTextInitialHTML = buttonSubText.innerHTML;
  }
  setButtonInitialHTML() {
    const buttonMain = this.element.querySelector(".elButtonMain");
    const buttonSub = this.element.querySelector(".elButtonSub");
    buttonMain.querySelector(".elButtonSpinner").style.removeProperty("display");
    const buttonMainText = buttonMain.querySelector(".elButtonMainText");
    buttonMainText.innerHTML = this.buttonMainTextInitialHTML;
    buttonSub.innerHTML = this.buttonSubTextInitialHTML;
  }
  setSubmittingText() {
    const buttonMain = this.element.querySelector(".elButtonMain");
    const buttonSub = this.element.querySelector(".elButtonSub");
    buttonMain.querySelector(".elButtonSpinner").style.display = "inline-block";
    const buttonMainText = buttonMain.querySelector(".elButtonMainText");
    buttonMainText.innerHTML = this.submittingText;
    buttonSub.innerHTML = "";
  }
};
window["CheckoutSubmitButtonV1"] = CheckoutSubmitButtonV1;

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-v2.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Services/checkout-store.ts
init_define_process();
init_nanostores();
var getInitialCriticalErrors = (enabledPayments, enabledExpressPayments) => {
  var _a;
  const initialCriticalErrors = [];
  if ((enabledPayments != null ? enabledPayments : []).length == 0 && (enabledExpressPayments != null ? enabledExpressPayments : []).length == 0) {
    initialCriticalErrors.push({ code: ERROR_CODES.EMPTY_PAYMENT_METHODS_ERROR });
  }
  if (!((_a = globalThis.globalResourceData.productVariantWithNoBump) == null ? void 0 : _a.id)) {
    initialCriticalErrors.push({ code: ERROR_CODES.EMPTY_PRODUCTS_ERROR });
  }
  return initialCriticalErrors;
};
var getProductCardByProductId = () => {
  var _a, _b, _c, _d, _e;
  const productCardByProductId = (_a = globalThis.globalResourceData.products) == null ? void 0 : _a.reduce((acc, product) => {
    const variant = product.variants[0];
    const price = variant.prices[0];
    acc[product.id] = {
      variantId: variant.id,
      priceId: price.id,
      quantity: 0
    };
    return acc;
  }, {});
  const productVariantWithNoBump = globalThis.globalResourceData.productVariantWithNoBump;
  let selectedVariantId, selectedPriceId, selectedProductId;
  if (productVariantWithNoBump) {
    selectedProductId = productVariantWithNoBump.product_id;
    selectedVariantId = productVariantWithNoBump.id;
    selectedPriceId = (_b = productVariantWithNoBump.prices) == null ? void 0 : _b[0].id;
  }
  const productCardItem = productCardByProductId[selectedProductId];
  if (productCardItem) {
    const product = (_c = globalThis.globalResourceData.products) == null ? void 0 : _c.find((p) => p.id === selectedProductId);
    const variant = (_d = product == null ? void 0 : product.variants) == null ? void 0 : _d.find((variant2) => variant2.id === selectedVariantId);
    if (variant) {
      const price = (_e = variant == null ? void 0 : variant.prices) == null ? void 0 : _e.find((price2) => price2.id === selectedPriceId);
      if (price) {
        productCardByProductId[selectedProductId] = {
          variantId: variant.id,
          priceId: price.id,
          quantity: 1
        };
      }
    }
  }
  return productCardByProductId;
};
var create = (billingFields, shippingFields, enabledPayments, enabledExpressPayments) => {
  var _a, _b;
  const paymentMethods = typeof globalThis.Checkout.savedPaymentMethods === "string" ? JSON.parse(globalThis.Checkout.savedPaymentMethods) : globalThis.Checkout.savedPaymentMethods;
  const paymentDataId = (_b = (_a = paymentMethods == null ? void 0 : paymentMethods[0]) == null ? void 0 : _a.id) != null ? _b : null;
  const {
    mode,
    contact,
    shipping,
    billing,
    billingSameAsShipping,
    billing_addresses,
    shipping_addresses
  } = globalThis.Checkout.ssrDynamicData;
  return {
    state: atom(globalThis.Checkout.StoreStates.START),
    checkout: {
      mode: atom(mode),
      lastModeIndependentOfCartItems: atom(mode),
      step: atom(0)
    },
    contact: map(contact),
    contact_pending_auth: map({ authenticated: false }),
    shipping: map(shipping),
    shipping_addresses: atom(shipping_addresses != null ? shipping_addresses : []),
    loadingShipping: atom(false),
    shippingOptions: atom([]),
    isUpdatingRebilly: atom(true),
    shippingOption: atom(),
    billingFields: atom(billingFields),
    shippingFields: atom(shippingFields),
    payment: {
      state: atom(globalThis.Checkout.PaymentStates.START),
      id: atom(paymentDataId),
      type: atom(enabledPayments[0]),
      "payment-card": {
        events: map({}),
        token: atom(null)
      },
      paypal: {
        state: atom({ state: globalThis.Checkout.PaypalStates.IDLE }),
        token: atom(null)
      },
      "apple-pay": {
        token: atom(null)
      }
    },
    paymentMethods: atom(paymentMethods != null ? paymentMethods : []),
    billing: map(billing),
    billingApiErrorsByField: atom(null),
    billing_addresses: atom(billing_addresses != null ? billing_addresses : []),
    billingSameAsShipping: atom(billingSameAsShipping),
    coupons: {
      appliedCode: atom(""),
      currentCode: atom(""),
      errorMessage: atom(""),
      state: atom(globalThis.Checkout.CouponStates.READY)
    },
    summary: atom({
      state: globalThis.Checkout.SummaryStates.WAITING,
      data: {}
    }),
    tos: {
      accepted: atom(false),
      present: atom(false)
    },
    criticalErrors: atom(getInitialCriticalErrors(enabledPayments, enabledExpressPayments)),
    showAllErrors: {
      contact: atom(false),
      shipping: atom(false),
      billing: atom(false),
      shippingOption: atom(false),
      payment: atom(false),
      products: atom(false),
      tos: atom(false)
    },
    submitting: atom({
      state: globalThis.Checkout.SubmittingStates.IDLE
    }),
    incrScrollToFirstVisibleError: atom(0),
    productCardByProductId: map(getProductCardByProductId()),
    threeds: map({
      show: false,
      approvalUrl: null
    }),
    featureFlags: {
      isShippingEnabled: atom(false),
      isCouponEnabled: atom(false)
    },
    selectedOrderDetailId: atom(null),
    phoneNumberInitialized: atom(false)
  };
};
var buildComputed = (store, contactFields, shippingFields, totalSteps) => {
  const computedModeLeaveEnterEvent = atom({});
  onMount(computedModeLeaveEnterEvent, () => {
    let previousMode;
    return store.checkout.mode.subscribe((mode) => {
      if (previousMode) {
        computedModeLeaveEnterEvent.set({
          leave: previousMode,
          next: mode
        });
      }
      computedModeLeaveEnterEvent.set({
        enter: mode,
        previous: previousMode
      });
      previousMode = mode;
    });
  });
  const computedContactErrors = computed(
    [store.checkout.mode, store.contact, store.showAllErrors.contact],
    (mode, contact, showAllErrors) => {
      const errors = {
        globalErrors: [],
        fields: {}
      };
      if (mode != globalThis.Checkout.CheckoutStates.GUEST) return null;
      contactFields.forEach((field) => {
        const value = contact[field];
        if (value == void 0 && !showAllErrors) return;
        const { valid, message } = validateValue(field, value);
        if (!valid) {
          errors.fields[field] = { message };
        }
      });
      return globalThis.Checkout.utils.cleanupEmptyErrors(errors);
    }
  );
  let oldCheckoutCart;
  const sameItem = (v1, v2) => v1.type == v2.type && v1.line_item_id == v2.line_item_id && v1.product_id == v2.product_id && v1.variant_id == v2.variant_id && v1.price_id == v2.price_id && v1.quantity == v2.quantity;
  const computedCheckoutCart = computed(
    store.productCardByProductId,
    (productCardByProductId) => {
      if (globalThis.globalResourceData.cart) return globalThis.globalResourceData.cart;
      let order_id;
      const items = Object.entries(productCardByProductId).filter(([, v]) => v.quantity > 0).map(([productId, v]) => {
        order_id = order_id != null ? order_id : v.cartItemOrderId;
        return {
          type: v.cartItemRenderType,
          line_item_id: v.cartItemLineItemId,
          product_id: productId,
          variant_id: v.variantId,
          price_id: v.priceId,
          quantity: v.quantity
        };
      });
      const newCheckoutCart = {
        order_id,
        items
      };
      const isEqual = oldCheckoutCart && oldCheckoutCart.order_id == newCheckoutCart.order_id && oldCheckoutCart.items.length == newCheckoutCart.items.length && oldCheckoutCart.items.every((oldItem, idx) => sameItem(oldItem, newCheckoutCart.items[idx]));
      oldCheckoutCart = newCheckoutCart;
      return isEqual ? oldCheckoutCart : newCheckoutCart;
    }
  );
  const computedBillingErrors = computed(
    [
      store.billing,
      store.billingSameAsShipping,
      store.showAllErrors.billing,
      computedCheckoutCart,
      store.checkout.mode,
      store.payment.type,
      store.billingApiErrorsByField,
      store.billingFields
    ],
    (billing, billingSameAsShipping, showAllErrors, cart, mode, paymentType, billingApiErrorsByField, billingFields) => {
      return globalThis.Checkout.utils.billingErrors(
        billing,
        billingSameAsShipping,
        showAllErrors,
        cart,
        mode,
        billingFields,
        billingApiErrorsByField,
        paymentType
      );
    }
  );
  const computedShippingErrors = computed(
    [store.shipping, store.showAllErrors.shipping, computedCheckoutCart, store.checkout.mode, store.payment.type],
    (shipping, showAllErrors, cart, mode, paymentType) => {
      return globalThis.Checkout.utils.shippingErrors(shipping, showAllErrors, cart, mode, shippingFields, paymentType);
    }
  );
  const computedHasValidShippingAddress = computed(
    [computedCheckoutCart, store.shipping, store.checkout.mode],
    (cart, shipping, mode) => {
      return !globalThis.Checkout.utils.shippingErrors(shipping, true, cart, mode, shippingFields);
    }
  );
  const computedProductErrors = computed(
    [computedCheckoutCart, store.showAllErrors.products],
    (cart, showAllErrors) => {
      return globalThis.Checkout.utils.productErrors(cart, showAllErrors);
    }
  );
  const computedShippingOptionErrors = computed(
    [
      store.loadingShipping,
      computedCheckoutCart,
      store.shippingOptions,
      store.shippingOption,
      store.showAllErrors.shippingOption,
      store.payment.type
    ],
    (loadingShipping, cart, shippingOptions, shippingOption, showAllErrors, paymentType) => {
      const errors = {
        globalErrors: [],
        fields: {}
      };
      if (!showAllErrors || loadingShipping || !globalThis.Checkout.utils.hasPhysicalProductsWithParams(cart) || paymentType == "apple-pay") {
        return null;
      }
      const shippingOptionIsValid = shippingOption && (shippingOptions == null ? void 0 : shippingOptions.length) > 0;
      if (!shippingOptionIsValid) {
        const error = { message: "Shipping is not available for this location" };
        errors.fields.shippingOption = error;
        errors.globalErrors.push(error);
      }
      return globalThis.Checkout.utils.cleanupEmptyErrors(errors);
    }
  );
  const computedPaymentErrors = computed(
    [
      store.payment.id,
      store.payment.type,
      store.payment["payment-card"].events,
      store.payment.paypal.state,
      store.payment.paypal.token,
      store.showAllErrors.payment,
      store.checkout.mode
    ],
    (id, type, cardEvents, paypalState, paypalToken, showAllErrors, mode) => {
      const errors = {
        globalErrors: [],
        fields: {}
      };
      if (!id && mode != globalThis.Checkout.CheckoutStates.UPGRADE_DOWNGRADE) {
        if (type == "payment-card") {
          let hasEvent = !!Object.keys(cardEvents).length;
          if (hasEvent) {
            Object.entries(cardEvents).forEach(([field, event2]) => {
              if (!event2) {
                event2 = { source: field };
              } else {
                hasEvent = true;
              }
              const { valid, message } = validateValue("card", event2);
              if (!valid) {
                errors.fields[field] = { message };
              }
            });
          } else if (showAllErrors) {
            errors.globalErrors.push({ message: "Missing payment information" });
          }
        } else if (type == "paypal") {
          if (showAllErrors && !(paypalState.state == globalThis.Checkout.PaypalStates.PAYMENT_METHOD_APPROVED && paypalToken)) {
            errors.globalErrors.push({ message: "Missing payment information" });
          }
        } else {
          if (showAllErrors) errors.globalErrors.push({ message: "Missing payment information" });
        }
      }
      return globalThis.Checkout.utils.cleanupEmptyErrors(errors);
    }
  );
  const computedTosErrors = computed(
    [store.tos.accepted, store.tos.present, store.showAllErrors.tos],
    (accepted, present, showTosErrors) => {
      if (present && showTosErrors && !accepted) {
        return { globalErrors: [{ message: "You must accept the terms of service" }] };
      } else {
        return [];
      }
    }
  );
  const computedErrorsByName = {
    contact: computedContactErrors,
    billing: computedBillingErrors,
    shipping: computedShippingErrors,
    shippingOption: computedShippingOptionErrors,
    products: computedProductErrors,
    payment: computedPaymentErrors,
    tos: computedTosErrors
  };
  const computedHasPhysicalProducts = computed(computedCheckoutCart, (cart) => {
    return globalThis.Checkout.utils.hasPhysicalProductsWithParams(cart);
  });
  const computedPossibleOtoWithFreeShipping = computed(
    [computedCheckoutCart, store.checkout.mode, store.shippingOptions, store.loadingShipping],
    (cart, mode, shippingOptions, loadingShipping) => {
      return mode === "oto" && globalThis.Checkout.utils.hasPhysicalProductsWithParams(cart) && // shipping options unknown / not loaded
      (!shippingOptions || // pending with no current shipping options
      loadingShipping && shippingOptions.length === 0 || // Exactly one shipping option with amount zero
      (shippingOptions == null ? void 0 : shippingOptions.length) === 1 && parseInt(shippingOptions[0].amount.amount) === 0);
    }
  );
  const computedHasShippingEnabled = computed(
    [computedCheckoutCart, store.featureFlags.isShippingEnabled],
    (cart, isShippingEnabled) => {
      return globalThis.Checkout.utils.hasPhysicalProductsWithParams(cart) && isShippingEnabled;
    }
  );
  const computedHideShipping = computed(
    [computedHasShippingEnabled, computedPossibleOtoWithFreeShipping],
    (isShippingEnabled, possibleOtoWithFreeShipping) => {
      return !isShippingEnabled || possibleOtoWithFreeShipping;
    }
  );
  const computedAnyUpdatableOrders = computed([store.productCardByProductId], (productCardByProductId) => {
    return Object.values(productCardByProductId).some((v) => v.updatableOrders);
  });
  const computedCurrentPaymentMethod = computed([store.payment.id], (currentPaymentId) => {
    return store.paymentMethods.get().find((pm) => pm.id == currentPaymentId);
  });
  const computedIsCouponReady = computed(
    [
      store.checkout.mode,
      store.state,
      store.summary,
      computedCheckoutCart,
      store.billing,
      store.shipping,
      store.billingSameAsShipping,
      store.payment.type,
      store.billingFields,
      store.billingApiErrorsByField
    ],
    (mode, state, summary, cart, billing, shipping, billingSameAsShipping, paymentType, billingFields, billingApiErrorsByField) => {
      const showAllBillingErrors = true;
      const showAllShippingErrors = true;
      const showAllProductErrors = true;
      const pErrors = globalThis.Checkout.utils.productErrors(cart, showAllProductErrors);
      const bErrors = globalThis.Checkout.utils.billingErrors(
        billing,
        billingSameAsShipping,
        showAllBillingErrors,
        cart,
        mode,
        billingFields,
        billingApiErrorsByField,
        paymentType
      );
      const sErrors = globalThis.Checkout.utils.shippingErrors(
        shipping,
        showAllShippingErrors,
        cart,
        mode,
        shippingFields,
        paymentType
      );
      return state == globalThis.Checkout.StoreStates.FILLING_FORM && summary.state == globalThis.Checkout.SummaryStates.OK && !globalThis.Checkout.utils.hasErrors(pErrors) && !globalThis.Checkout.utils.hasErrors(bErrors) && !globalThis.Checkout.utils.hasErrors(sErrors);
    }
  );
  const computedIsDigitalWalletReadyToStart = computed(
    [store.checkout.mode, store.state, store.summary, computedCheckoutCart],
    (mode, state, summary, cart) => {
      const showAllProductErrors = true;
      const pErrors = globalThis.Checkout.utils.productErrors(cart, showAllProductErrors);
      return state == globalThis.Checkout.StoreStates.FILLING_FORM && !globalThis.Checkout.utils.hasErrors(pErrors);
    }
  );
  const computedHideContactInformationForm = computed(
    [store.checkout.mode, store.payment.type],
    (mode, paymentType) => {
      return paymentType == "apple-pay" && mode == "guest" && totalSteps == 1;
    }
  );
  const computedUseDigitalWalletForUpdatingContactStore = computed([store.checkout.mode], (mode) => mode == "guest");
  return {
    errorsByName: computedErrorsByName,
    modeLeaveEnterEvent: computedModeLeaveEnterEvent,
    hasPhysicalProducts: computedHasPhysicalProducts,
    hasShippingEnabled: computedHasShippingEnabled,
    hideShipping: computedHideShipping,
    hasValidShippingAddress: computedHasValidShippingAddress,
    isDigitalWalletReadyToStart: computedIsDigitalWalletReadyToStart,
    isCouponReady: computedIsCouponReady,
    contactErrors: computedContactErrors,
    productErrors: computedProductErrors,
    billingErrors: computedBillingErrors,
    shippingErrors: computedShippingErrors,
    shippingOptionErrors: computedShippingOptionErrors,
    paymentMethod: computedCurrentPaymentMethod,
    paymentErrors: computedPaymentErrors,
    tosErrors: computedTosErrors,
    anyUpdatableOrders: computedAnyUpdatableOrders,
    hideContactInformationForm: computedHideContactInformationForm,
    useDigitalWalletForUpdatingContactStore: computedUseDigitalWalletForUpdatingContactStore,
    isNewDigitalWalletPayment: computed(
      [store.payment.id, store.payment.type],
      (id, paymentType) => !id && paymentType == "apple-pay"
    ),
    checkoutCart: computedCheckoutCart
  };
};
var initializeUtilities = (store, computed2) => {
  initializeStoreUtilities(store, computed2);
  setupCFEnableDevTools();
};
var initializeStoreUtilities = (store, computed2) => {
  const proxyCache = /* @__PURE__ */ new WeakMap();
  const storeValueCache = /* @__PURE__ */ new WeakMap();
  const DEBOUNCE_INTERVAL = 50;
  const stores = {
    store,
    computed: computed2
  };
  function createDeepNanostoreProxy(target, onChange) {
    return new Proxy(target, {
      get(target2, property) {
        const item = target2[property];
        if (property === "__store") {
          return item;
        }
        if (item && typeof item === "object") {
          if (proxyCache.has(item)) return proxyCache.get(item);
          if (isStore(item)) {
            const __store = item;
            const storeValue = {
              __store,
              __value: peek(__store)
            };
            storeValueCache.set(item, storeValue);
            __store.listen((value) => {
              storeValue.__value = value;
              onChange();
            });
            return storeValue;
          } else {
            const proxy2 = createDeepNanostoreProxy(item, onChange);
            proxyCache.set(item, proxy2);
            return proxy2;
          }
        }
        return item;
      }
    });
  }
  function peek(store2) {
    return store2.value;
  }
  function isStore(value) {
    return value && value.subscribe;
  }
  let debounceTimeout;
  const proxy = createDeepNanostoreProxy(stores, function onChange() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("checkout:store:change"));
    }, DEBOUNCE_INTERVAL);
  });
  globalThis.Checkout.utils.getStoreJson = (tab = 0) => {
    return JSON.stringify(
      proxy,
      function replacer(key, value) {
        if (["__store"].includes(key)) return;
        if (value && Object.prototype.hasOwnProperty.call(value, "__value")) {
          return value.__value;
        }
        return value;
      },
      tab
    );
  };
};
var setupCFEnableDevTools = () => {
  if (localStorage.getItem("cf2:devtools:enabled")) {
    trackUpdatesCheckoutUpdates();
  }
  globalThis.CFEnableDevTools = () => {
    localStorage.setItem("cf2:devtools:enabled", "true");
    trackUpdatesCheckoutUpdates();
  };
  function trackUpdatesCheckoutUpdates() {
    document.querySelectorAll('[data-page-element="Checkout/V2"]').forEach((el) => {
      el.insertAdjacentHTML("afterend", '<div class="checkout-store-log"><pre></pre></div>');
      document.querySelector(".checkout-store-log").style.cssText = `
          z-index: 10;
          top: 0;
          background: rgba(100,100,1005,0.1);
          height: 100;
          display: flex;
          flex-direction: column;
          justify-content: center;`;
      document.querySelector(".checkout-store-log pre").style.cssText = `
          font-size: 12px;
          font-weight: bold;
          width: fit-content;`;
    });
    const checkoutStoreLog = document.querySelector(".checkout-store-log");
    const renderDevToolsState = initReduxDevTools().render;
    render();
    window.addEventListener("checkout:store:change", () => {
      render();
      if (renderDevToolsState) {
        renderDevToolsState();
      }
    });
    function initReduxDevTools() {
      let store;
      const reduxUrl = "https://cdnjs.cloudflare.com/ajax/libs/redux/4.2.1/redux.min.js";
      const scriptEle = document.createElement("script");
      scriptEle.setAttribute("src", reduxUrl);
      document.body.appendChild(scriptEle);
      scriptEle.addEventListener("load", () => {
        store = globalThis.Redux.createStore(
          (state, action) => action.state || state,
          JSON.parse(globalThis.Checkout.utils.getStoreJson()),
          globalThis.__REDUX_DEVTOOLS_EXTENSION__ && globalThis.__REDUX_DEVTOOLS_EXTENSION__()
        );
      });
      return {
        render() {
          if (store) {
            store.dispatch({
              type: "state",
              state: JSON.parse(globalThis.Checkout.utils.getStoreJson())
            });
          }
        }
      };
    }
    function render() {
      let json;
      let error;
      try {
        const data = JSON.parse(globalThis.Checkout.utils.getStoreJson(4));
        delete data.store.productCardByProductId;
        json = JSON.stringify(data, null, 2);
      } catch (err) {
        error = err;
        console.log(error);
      }
      checkoutStoreLog.querySelector("pre").innerHTML = error ? error.message : ["--- State ---", json].join("\n");
    }
  }
};

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/checkout-v2.ts
init_runtime();
var CheckoutV2 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  initialize() {
    var _a;
    Checkout.isCheckoutResource = globalThis.globalResourceData.resourceName == "checkout";
    const billingFields = this.billingEnabled ? this.billingFields : [];
    const enabledPayments = !window.ApplePaySession ? globalResourceData.enabledPayments.filter((v) => v != "apple-pay") : globalResourceData.enabledPayments;
    const enabledExpressPayments = !window.ApplePaySession ? globalResourceData.expressEnabledPayments.filter((v) => v != "apple-pay") : globalResourceData.expressEnabledPayments;
    if (!enabledExpressPayments.includes("apple-pay")) {
      ((_a = this.element.querySelectorAll(".elExpressCheckoutForCart")) != null ? _a : []).forEach((item) => item.remove());
    }
    Checkout.store = create(billingFields, this.shippingFields, enabledPayments, enabledExpressPayments);
    Checkout.computed = buildComputed(Checkout.store, this.contactFields, this.shippingFields, this.totalSteps);
    initializeUtilities(Checkout.store, Checkout.computed);
    initializeMachine({
      hasPhoneNumber: this.contactFields.includes("phone_number"),
      billingFields,
      shippingFields: this.shippingFields
    });
  }
  backfillContactDataFromGarlic_Mutable(contactData) {
    Object.keys(contactData).reduce((acc, field) => {
      if (!contactData[field]) {
        const val = window.cfGarlicUtils.retrieve(field);
        if (field == null ? void 0 : field.length) acc[field] = val;
      }
      return acc;
    }, contactData);
  }
  initializeStoreDependentElements(store, computed2) {
    const checkoutElements = this.getAllComponents();
    const linkedElements = [...document.querySelectorAll(`[data-linked-checkout-id=${this.id}]`)].map((el) => el.cf2_instance);
    const allElements = checkoutElements.concat(linkedElements);
    allElements.forEach((el) => {
      (el == null ? void 0 : el.initializeWithStore) && el.initializeWithStore(store, computed2);
    });
  }
  mount() {
    const contactData = this.contactFields.reduce((acc, field) => {
      acc[field] = Checkout.initialContactData[field];
      return acc;
    }, {});
    this.backfillContactDataFromGarlic_Mutable(contactData);
    const initialMode = Checkout.store.checkout.mode.get();
    if (initialMode == "guest" && this.totalSteps == 1 || initialMode == "saved") {
      this.listenAndUpdateCheckoutErrors(initialMode);
    }
    if (!this.disableOTP) {
      Checkout.auth.computed.requireLogin.listen((requireLogin) => {
        if (requireLogin) {
          this.element.querySelector(`[data-wrapper-checkout-state="${Checkout.store.checkout.mode.get()}"]`).classList.add("elHide");
        } else {
          this.updateCheckoutMode(Checkout.store.checkout.mode.get());
        }
      });
    }
    Checkout.store.checkout.mode.listen((mode) => {
      this.updateCheckoutMode(mode);
    });
    this.listenAndUpdateCheckoutErrors();
    Checkout.store.tos.present.set(this.showTos);
    Checkout.store.state.listen((state) => {
      if ([Checkout.StoreStates.START, Checkout.StoreStates.INITIALIZING, Checkout.StoreStates.INITIALIZED].includes(state)) {
        this.element.querySelector(".elSpinnerWrapper").dataset.loader = true;
        if (state === Checkout.StoreStates.INITIALIZED) {
          Checkout.store.contact.set(contactData);
        }
      } else {
        if (this.element.querySelector('[data-page-element="CheckoutConfigurationError/V1"]').querySelector(".elHide")) {
          delete this.element.querySelector(".elSpinnerWrapper").dataset.loader;
        }
      }
    });
    this.element.querySelectorAll('[href="#!checkout-as-guest"]').forEach((el) => {
      el.addEventListener("click", (evt) => {
        evt.preventDefault();
        Checkout.store.checkout.mode.set("guest");
      });
    });
    [Checkout.computed.checkoutCart, Checkout.store.billing, Checkout.store.shipping, Checkout.store.shippingOption].forEach((store) => {
      store.listen(() => {
        CheckoutSummary.sendOrderPreview();
      });
    });
    Checkout.store.incrScrollToFirstVisibleError.listen(() => {
      const $errorWrapper = $('[data-error-container="active"]:visible:first').closest("[data-error-wrapper]");
      const $checkoutFormError = $(".elCheckoutFormErrors:visible:first");
      if ($errorWrapper.length > 0) {
        $("html, body").stop(true, true).animate({
          scrollTop: $errorWrapper.offset().top - 100
        }, 500);
      } else if ($checkoutFormError.length > 0) {
        $("html, body").stop(true, true).animate({
          scrollTop: $checkoutFormError.offset().top - 100
        }, 500);
      }
    });
    Checkout.computed.hasShippingEnabled.subscribe((hasShippingEnabled) => {
      if (!hasShippingEnabled && Checkout.store.shippingOption.value) {
        Checkout.store.shippingOption.set(null);
      }
    });
    Checkout.computed.hideShipping.subscribe((hideShipping) => {
      this.element.querySelector(".elCheckoutWrapper").setAttribute("data-shipping-enabled", hideShipping ? "false" : "true");
    });
    Checkout.store.state.set(Checkout.StoreStates.INITIALIZING);
    const checkoutOrderSummaries = this.element.querySelectorAll('[data-page-element="CheckoutOrderSummary/V1"]');
    const pageOrderSummaries = document.querySelector('[data-page-element="CheckoutOrderSummary/V1"].elCheckout');
    if (pageOrderSummaries) {
      checkoutOrderSummaries.forEach((el) => {
        el.style.display = "none";
      });
    }
    this.element.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("focus", () => {
        Checkout.store.submitting.set({ state: Checkout.SubmittingStates.IDLE });
      });
    });
    const trackableStores = [
      Checkout.store.contact,
      Checkout.store.shipping,
      Checkout.store.billing,
      Checkout.store.billingSameAsShipping,
      Checkout.store.tos.accepted,
      Checkout.store.shippingOption,
      Checkout.store.payment.state,
      Checkout.store.payment.id,
      Checkout.store.payment.type,
      Checkout.store.payment["payment-card"].events,
      Checkout.store.payment["payment-card"].token,
      Checkout.store.payment.paypal.state,
      Checkout.store.payment.paypal.token,
      Checkout.computed.checkoutCart
    ];
    trackableStores.forEach((store) => {
      store.listen((v) => {
        Checkout.store.submitting.set({ state: Checkout.SubmittingStates.IDLE });
      });
    });
  }
  afterMount() {
    this.initializeStoreDependentElements(Checkout.store, Checkout.computed);
    const productVariantWithNoBump = globalThis.globalResourceData.productVariantWithNoBump;
    if (productVariantWithNoBump) {
      const variantId = productVariantWithNoBump.id;
      const productId = productVariantWithNoBump.product_id;
      updateCardByProductIdState(productId, { variantId });
    }
  }
  updateCheckoutMode(mode) {
    const containerMapping = Object.values(Checkout.CheckoutStates).reduce((acc, item) => {
      acc[item] = this.element.querySelector(`[data-wrapper-checkout-state="${item}"]`);
      return acc;
    }, {});
    const currentContainer = containerMapping[mode];
    for (let container of Object.values(containerMapping)) {
      if (container == currentContainer) {
        currentContainer.classList.remove("elHide");
      } else {
        container.classList.add("elHide");
      }
    }
  }
  listenAndUpdateCheckoutErrors() {
    Object.entries(Checkout.computed.errorsByName).forEach(([name, computed2]) => {
      computed2.subscribe((error) => {
        Object.values(Checkout.CheckoutStates).forEach((mode) => {
          var _a, _b, _c;
          if (mode == "guest" && this.totalSteps != 1) return;
          const currentErrorElement = this.element.querySelector(`[data-wrapper-checkout-state="${mode}"]`).querySelector(".checkout-general-errors-wrapper");
          const generalErrorsStructure = ["shippingOption", "products", "tos", "payment", "billing"];
          const errors = generalErrorsStructure.reduce((acc, formName) => {
            const error2 = Checkout.computed.errorsByName[formName].get();
            if (Checkout.utils.hasErrors(error2)) {
              acc.push({ name: formName, errors: error2 });
            }
            return acc;
          }, []);
          if (!errors || (errors == null ? void 0 : errors.length) == 0) {
            currentErrorElement.classList.add("elHide");
          } else {
            const error2 = errors[0];
            if ((_c = (_b = (_a = error2.errors) == null ? void 0 : _a.globalErrors) == null ? void 0 : _b[0]) == null ? void 0 : _c.message) {
              const errorMessage = error2.errors.globalErrors[0].message;
              currentErrorElement.querySelector("span").innerHTML = errorMessage;
              currentErrorElement.classList.remove("elHide");
            } else {
              currentErrorElement.classList.add("elHide");
            }
          }
        });
      });
    });
  }
};
window["CheckoutV2"] = CheckoutV2;
//# sourceMappingURL=checkout-v2-FTMXP3HX.js.map
