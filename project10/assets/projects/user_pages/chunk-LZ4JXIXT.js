import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  __esm,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/input-v1.ts
var InputV1;
var init_input_v1 = __esm({
  "projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/input-v1.ts"() {
    init_define_process();
    init_runtime();
    InputV1 = class extends CF2Component {
      constructor(el, runtimeSel) {
        super(el, runtimeSel);
      }
      mount() {
        this.input = this.element.querySelector(".elInput");
        this.re = /^(([^<>()[\]\.,;:#%\s@"]+(\.[^<>()[\]\.,;:#%\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (this.input.getAttribute("name") === "shipping_zip") {
          this.input.setAttribute("maxlength", "10");
        }
        this.addInputListeners();
        if (this.isStandalonePhoneNumberInput()) {
          this.setupPhoneNumberInput();
        }
      }
      update() {
        if (this.input.value) {
          this.element.classList.add("hasValue");
        } else {
          this.element.classList.remove("hasValue");
        }
      }
      isStandalonePhoneNumberInput() {
        return this.input.getAttribute("name") === "phone_number" && !$(this.input).closest('[data-page-element="Checkout/V1"]').length && !$(this.input).closest('[data-page-element="Checkout/V2"]').length && !$(this.input).closest('[data-page-element="Survey/V1').length;
      }
      addInputListeners() {
        this.input.addEventListener("focus", () => {
          this.element.querySelector("[data-input-status-type]").innerHTML = "";
          this.element.classList.remove("elInputValid");
          this.element.classList.remove("elInputError");
          this.element.classList.remove("elInputWarning");
          this.element.classList.add("elInputFocused");
        });
        this.input.addEventListener("blur", () => {
          this.element.classList.remove("elInputFocused");
          this.update();
          if (this.input.getAttribute("name") === "phone_number" && this.input.iti) {
            this.input.iti.setNumber(this.input.value);
          }
          if (this.input.classList.contains("required1") && this.element.matches(".elInputError")) {
            if (this.input.value === "") {
              return;
            } else {
              if (this.input.getAttribute("name") === "email") {
                const parsedEmail = $.trim(input.value);
                if (this.re.test(parsedEmail)) {
                  this.element.classList.add("elInputValid");
                  this.element.classList.remove("elInputError");
                }
              } else if (this.isStandalonePhoneNumberInput() && !window.intlTelInputUtils.isValidNumber(this.input.value)) {
                this.element.classList.remove("elInputValid");
                this.element.classList.add("elInputError");
              } else {
                this.element.classList.remove("elInputError");
                this.element.classList.add("elInputValid");
              }
            }
          }
        });
      }
      setupPhoneNumberInput() {
        window.intlTelInputGlobals.loadUtils("https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.16/build/js/utils.js").then(() => {
          var _a, _b;
          const iti = window.intlTelInput(this.input, {
            autoPlaceholder: "aggressive",
            // NOTE: If we use utilsScript the library interally wait for the load event to load the utils
            // utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.16/build/js/utils.js',
            preferredCountries: ["us", "ca", "gb", "ie", "ai", "nz"],
            initialCountry: (_b = (_a = window.cfVisitorData) == null ? void 0 : _a.country) != null ? _b : "us"
          });
          this.input.iti = iti;
        });
      }
    };
    window["InputV1"] = InputV1;
  }
});

export {
  init_input_v1
};
//# sourceMappingURL=chunk-LZ4JXIXT.js.map
