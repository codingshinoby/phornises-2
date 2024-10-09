import {
  init_modal_v1
} from "./chunk-LWEF4ZVP.js";
import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/packs/navigation-v1.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/navigation-v1.ts
init_define_process();
init_modal_v1();
init_runtime();
var NavigationV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  mount(el) {
    const modal = this.getComponent("Modal/V1");
    const navigationItems = document.querySelectorAll(".elNavigation-menu-dropdown");
    const navigationSubItems = document.querySelectorAll(".elNavigation-menu-dropdown-item");
    this.handleDropdownDirection(navigationItems);
    this.handleDropdownDirection(navigationSubItems);
    this.setupModalOpen(this.element, modal.element);
  }
  handleDropdownDirection(items) {
    items.forEach((navItem) => {
      navItem.addEventListener(
        "mouseenter",
        (e) => this.determineDirection(e.target.querySelectorAll(".elNavigation-menu-dropdown-holder")[0])
      );
      navItem.addEventListener(
        "mouseleave",
        (e) => this.removeDirectionClasses(e.target.querySelectorAll(".elNavigation-menu-dropdown-holder")[0])
      );
    });
  }
  setupModalOpen(nav, modal) {
    const [mobileMenu] = nav.getElementsByClassName("elNavigatorButton");
    mobileMenu.addEventListener("click", function() {
      $("body").addClass("hide-page-scroll");
      modal.style.display = "flex";
    });
  }
  determineDirection(element) {
    let elementRect = element.getBoundingClientRect();
    if (elementRect.left + elementRect.width > window.innerWidth) {
      element.parentElement.parentElement.classList.add("dropdown-open-left");
    }
    if (elementRect.top + elementRect.height > window.innerHeight) {
      element.parentElement.parentElement.classList.add("dropdown-open-top");
    }
  }
  removeDirectionClasses(element) {
    element.parentElement.parentElement.classList.remove("dropdown-open-left", "dropdown-open-top");
  }
};
window["NavigationV1"] = NavigationV1;
//# sourceMappingURL=navigation-v1-FREO2CWN.js.map
