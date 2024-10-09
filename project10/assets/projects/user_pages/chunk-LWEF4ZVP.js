import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  __esm,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/modal-v1.ts
var ModalV1;
var init_modal_v1 = __esm({
  "projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/modal-v1.ts"() {
    init_define_process();
    init_runtime();
    ModalV1 = class extends CF2Component {
      constructor(el, runtimeSel) {
        super(el, runtimeSel);
      }
      mount(el) {
        var _a, _b;
        const node = this;
        this.onClose = (_a = this.onClose) != null ? _a : function() {
        };
        this.close = (_b = this.close) != null ? _b : function() {
          if (node.element) {
            node.element.style.display = "none";
            node.onClose();
          }
          ;
        };
        this.setupModalClose = function() {
          $(node.element).on("click", function(e) {
            if (e.target !== e.currentTarget) return;
            if (window.getSelection().type === "Range") return;
            $("body").removeClass("hide-page-scroll");
            node.close();
          });
          $(node.element).on("click", ".elModalClose", function() {
            $("body").removeClass("hide-page-scroll");
            node.close();
          });
        };
        this.setupModalClose();
      }
    };
    window["ModalV1"] = ModalV1;
  }
});

export {
  init_modal_v1
};
//# sourceMappingURL=chunk-LWEF4ZVP.js.map
