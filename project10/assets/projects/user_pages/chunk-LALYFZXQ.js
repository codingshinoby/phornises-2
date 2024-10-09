import {
  addPageScroll,
  closeOnClickOutside,
  init_cf_utils,
  removePageScroll
} from "./chunk-PBLRGFSG.js";
import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  __esm,
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/modal-sidebar-v1.ts
var ModalSidebarV1;
var init_modal_sidebar_v1 = __esm({
  "projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/modal-sidebar-v1.ts"() {
    init_define_process();
    init_cf_utils();
    init_runtime();
    ModalSidebarV1 = class extends CF2Component {
      constructor(el, runtimeSel) {
        super(el, runtimeSel);
      }
      mount() {
        closeOnClickOutside(this.element.querySelector(".elModalSidebar"), () => this.hide());
      }
      show() {
        removePageScroll();
        this.element.classList.remove("forceHide");
        const wrapper = this.element.querySelector(".elModalSidebar");
        setTimeout(() => {
          wrapper.classList.add("elModalSidebarSlideAnimation");
        });
      }
      hide() {
        addPageScroll();
        this.element.classList.add("forceHide");
        const wrapper = this.element.querySelector(".elModalSidebar");
        wrapper.classList.remove("elModalSidebarSlideAnimation");
      }
    };
    window["ModalSidebarV1"] = ModalSidebarV1;
  }
});

export {
  init_modal_sidebar_v1
};
//# sourceMappingURL=chunk-LALYFZXQ.js.map
