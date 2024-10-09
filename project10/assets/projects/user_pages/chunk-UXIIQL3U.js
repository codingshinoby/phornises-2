import {
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Checkout/V2/Utils/checkout-input-validator.ts
init_define_process();
var VALIDATION_BY_FIELD_TYPE = {
  email: {
    inputType: "input",
    validations: {
      required: true,
      // eslint-disable-next-line max-len
      pattern: /^(([^<>()[\]\.,;:#%\s@"]+(\.[^<>()[\]\.,;:#%\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  phone_number: {
    inputType: "input",
    validations: {
      callback: (value) => {
        var _a;
        if (!globalThis.intlTelInputUtils) return { valid: true };
        const PHONE_ERROR_MAP = [
          "Phone Number is invalid",
          "Phone Number has an invalid country code",
          "Phone Number is too short",
          "Phone Number too long",
          "Phone Number is invalid"
        ];
        if (value) {
          const isValid = globalThis.intlTelInputUtils.isValidNumber(value);
          if (isValid) {
            return { valid: true };
          } else {
            const errorCode = globalThis.intlTelInputUtils.getValidationError(value);
            return { valid: false, message: (_a = PHONE_ERROR_MAP[errorCode]) != null ? _a : "Phone Number has an unexpected format" };
          }
        } else {
          return { valid: false, message: "Phone number is required" };
        }
      }
    }
  },
  first_name: {
    inputType: "input",
    validations: {
      required: true,
      pattern: /^[\w\s\-\p{L},.']+$/u,
      maxlength: 45
    }
  },
  last_name: {
    inputType: "input",
    validations: {
      required: true,
      pattern: /^[\w\s\-\p{L},.']+$/u,
      maxlength: 45
    }
  },
  address: {
    inputType: "input",
    validations: {
      required: true,
      pattern: /^[\w\s\-\/\p{L},.#;:()'&]+$/u,
      maxlength: 60
    }
  },
  address_2: {
    inputType: "input",
    validations: {
      pattern: /^[\w\s\-\/\p{L},.#;:()'&]+$/u,
      maxlength: 60
    }
  },
  country: {
    inputType: "select",
    validations: {
      required: true,
      pattern: /^[A-Z]{2}$/u,
      maxlength: 2
    }
  },
  city: {
    inputType: "input",
    validations: {
      required: true,
      pattern: /^[\w\s\-\p{L},.']+$/u,
      maxlength: 45
    }
  },
  state: {
    inputType: "select"
    // Some countries don't have states
  },
  zip: {
    inputType: "input",
    validations: {
      required: true,
      pattern: /^[\w\s\-]+$/,
      maxlength: 10
    }
  },
  card: {
    validations: {
      callback: (event) => {
        if (event && event.valid && event.completed) {
          return { valid: true };
        } else if (event && event.error) {
          return { valid: false, message: event.error.message };
        } else {
          const nameMapper = {
            number: "Card number",
            cvv: "Card cvv",
            date: "Card expiration"
          };
          const sourceName = nameMapper[event.source];
          return { valid: false, message: `${sourceName} required` };
        }
      }
    }
  }
};
var defaultValidateValue = (value, validations, fieldName) => {
  var _a;
  const name = fieldName.split("_").map((name2) => {
    return name2.charAt(0).toUpperCase() + name2.slice(1);
  }).join(" ");
  const { maxlength, required, pattern } = validations;
  if (required && !(value == null ? void 0 : value.length)) {
    return { valid: false, message: `${name} is required` };
  }
  if (maxlength && ((_a = value == null ? void 0 : value.length) != null ? _a : 0) > maxlength) {
    return { valid: false, message: `${name} exceeded max length of ${maxlength} characters` };
  }
  if ((value == null ? void 0 : value.length) && pattern && !pattern.test(value)) {
    return { valid: false, message: `${name} has an unexpected format` };
  }
  return { valid: true };
};
var validateValue = (fieldName, value) => {
  const field = VALIDATION_BY_FIELD_TYPE[fieldName];
  if (!field) {
    console.warn(`No field found for ${fieldName}`);
    return { valid: true };
  }
  const validations = field.validations;
  if (!validations) {
    return { valid: true };
  }
  if (validations.callback) {
    return validations.callback(value);
  }
  return defaultValidateValue(value, validations, fieldName);
};
var resetInputErrors = (input) => {
  const wrapper = $(input).closest(".elFormItemWrapper")[0];
  const errorContainer = wrapper.querySelector("[data-error-container]");
  errorContainer.setAttribute("data-error-container", "");
  wrapper.classList.remove("elInputError");
  errorContainer.innerHTML = "";
};
var addError = (input, errorMessage) => {
  const wrapper = $(input).closest(".elFormItemWrapper")[0];
  wrapper.classList.remove("elInputValid");
  wrapper.classList.add("elInputError");
  if (errorMessage) {
    const errorContainer = wrapper.querySelector("[data-error-container]");
    errorContainer.setAttribute("data-error-container", "active");
    errorContainer.innerHTML += errorMessage;
  }
};

export {
  validateValue,
  resetInputErrors,
  addError
};
//# sourceMappingURL=chunk-UXIIQL3U.js.map
