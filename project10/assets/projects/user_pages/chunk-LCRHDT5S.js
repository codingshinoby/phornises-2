import {
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/src/Elements/Utils/inputValidator.ts
init_define_process();
var phoneErrorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
var checkInputPatternValid = (input) => {
  const validityState = input.validity;
  const $inputParent = $(input).closest(".elFormItemWrapper");
  if (validityState.patternMismatch) {
    input.setCustomValidity("Contains invalid characters");
    input.reportValidity();
    $inputParent.removeClass("elInputValid");
    $inputParent.addClass("elInputError");
    return false;
  } else {
    $inputParent.removeClass("elInputError");
    $inputParent.addClass("elInputValid");
    return true;
  }
};
var checkEmailInputValid = (input) => {
  const re = /^(([^<>()[\]\.,;:#%\s@"]+(\.[^<>()[\]\.,;:#%\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const value = $(input).val();
  const parsedEmail = $.trim(value);
  const $inputParent = $(input).closest(".elFormItemWrapper");
  if (re.test(parsedEmail)) {
    $inputParent.removeClass("elInputError");
    $inputParent.addClass("elInputValid");
    return true;
  } else {
    $inputParent.removeClass("elInputValid");
    $inputParent.addClass("elInputError");
    return false;
  }
};
var resetInputErrors = (input) => {
  const $inputParent = $(input).closest(".elFormItemWrapper");
  const $status = $inputParent.find("[data-input-status-type]");
  $inputParent.removeClass("elInputError");
  $inputParent.css("border-color", "");
  $inputParent.css("border-width", "");
  $status.attr("data-input-status-type", "");
  $status.text("");
};
var resetErrorsAndCheckPhoneNumber = (input) => {
  resetInputErrors(input);
  const value = input.value.trim();
  if (value) {
    const $inputParent = $(input).closest(".elFormItemWrapper");
    const $status = $inputParent.find("[data-input-status-type]");
    if (input.iti && !input.iti.isValidNumber()) {
      const errorCode = input.iti.getValidationError();
      $inputParent.addClass("elInputError");
      $inputParent.removeClass("elInputValid");
      $status.attr("data-input-status-type", "error");
      $status.text(phoneErrorMap[errorCode]);
      return false;
    } else {
      resetInputErrors(input);
    }
  }
  return true;
};
var validateInput = (input, options = {}) => {
  const $input = $(input);
  const $inputParent = $input.closest(".elFormItemWrapper");
  const inputValue = $input.is("select") ? $input.find(":selected").attr("value") : $input.val();
  const inputName = $input.attr("name");
  const inputType = $input.attr("type");
  const inputPattern = $input.attr("pattern");
  if ($input.hasClass("required1") && inputType == "checkbox") {
    if ($input.is(":checked")) {
      $inputParent.removeClass("elInputError");
      $inputParent.addClass("elInputValid");
      return true;
    } else {
      $inputParent.removeClass("elInputValid");
      $inputParent.addClass("elInputError");
      return false;
    }
  } else if ($input.hasClass("required1") && inputValue == "" || inputValue == null || typeof inputValue == "undefined") {
    $inputParent.removeClass("elInputValid");
    $inputParent.addClass("elInputError");
    return false;
  } else {
    if (inputName == "email" || options.validateAsEmail) {
      return checkEmailInputValid(input);
    } else if (inputName == "phone_number") {
      if (resetErrorsAndCheckPhoneNumber(input)) {
        $inputParent.removeClass("elInputError");
        $inputParent.addClass("elInputValid");
        return true;
      } else {
        $inputParent.addClass("elInputError");
        $inputParent.removeClass("elInputValid");
        return false;
      }
    } else {
      if (inputPattern) {
        return checkInputPatternValid(input);
      } else {
        $inputParent.removeClass("elInputError");
        $inputParent.addClass("elInputValid");
        return true;
      }
    }
  }
};

export {
  resetInputErrors,
  resetErrorsAndCheckPhoneNumber,
  validateInput
};
//# sourceMappingURL=chunk-LCRHDT5S.js.map
