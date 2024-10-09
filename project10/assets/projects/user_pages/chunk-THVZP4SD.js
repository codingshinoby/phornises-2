import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  __esm,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/select-box-v2.ts
var SelectBoxV2;
var init_select_box_v2 = __esm({
  "projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/select-box-v2.ts"() {
    init_define_process();
    init_runtime();
    SelectBoxV2 = class extends CF2Component {
      constructor(el, runtimeSel) {
        super(el, runtimeSel);
      }
      mount() {
        this.select = this.element.querySelector(".elSelect");
        this.addSelectEventHandlers(this.select);
        this.update();
      }
      update() {
        if (this.select.value) {
          this.element.classList.add("hasValue");
        } else {
          this.element.classList.remove("hasValue");
        }
      }
      addSelectEventHandlers(select) {
        select.addEventListener("focus", () => {
          this.element.querySelector("[data-input-status-type]").innerHTML = "";
          this.element.classList.remove("elInputValid");
          this.element.classList.remove("elInputError");
          this.element.classList.remove("elInputWarning");
          this.element.classList.add("elInputFocused");
          this.update();
        });
        select.addEventListener("blur", () => {
          this.element.classList.remove("elInputFocused");
          this.update();
        });
        select.addEventListener("change", () => {
          this.update();
        });
      }
    };
    window["SelectBoxV2"] = SelectBoxV2;
  }
});

export {
  init_select_box_v2
};
//# sourceMappingURL=chunk-THVZP4SD.js.map
