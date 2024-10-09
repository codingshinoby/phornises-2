import {
  CF2Component,
  init_runtime
} from "./chunk-2I7C3SSB.js";
import {
  init_define_process
} from "./chunk-ICTFBFTW.js";

// projects/lib/packages/yggdrasil-blueprints/__generated__/packs/countdown-v1.ts
init_define_process();

// projects/lib/packages/yggdrasil-blueprints/__generated__/blueprints/countdown-v1.ts
init_define_process();
init_runtime();
var CountdownV1 = class extends CF2Component {
  constructor(el, runtimeSel) {
    super(el, runtimeSel);
  }
  fixedDigits(num, digits = 2) {
    var _a;
    const numStr = (_a = num == null ? void 0 : num.toString()) != null ? _a : "";
    if (numStr.length < digits) {
      return `${"0".repeat(digits - numStr.length)}${numStr}`;
    } else {
      return numStr;
    }
  }
  mount() {
    const countdown_opts = this.countdown_opts;
    let countdownSpans = 0;
    if (countdown_opts.show_years) countdownSpans |= countdown.YEARS;
    if (countdown_opts.show_months) countdownSpans |= countdown.MONTHS;
    if (countdown_opts.show_weeks) countdownSpans |= countdown.WEEKS;
    if (countdown_opts.show_days) countdownSpans |= countdown.DAYS;
    if (countdown_opts.show_hours) countdownSpans |= countdown.HOURS;
    if (countdown_opts.show_minutes) countdownSpans |= countdown.MINUTES;
    if (countdown_opts.show_seconds) countdownSpans |= countdown.SECONDS;
    const now = /* @__PURE__ */ new Date();
    let countToDate = now;
    try {
      countToDate = new Date(this.end_date_time);
      if (isNaN(countToDate)) {
        countToDate = now;
      }
      if (countToDate < now) {
        countToDate = now;
      }
    } catch (e) {
      console.warn(`liiquid filter 'countdown': Invalid date '${this.end_date_time}'`);
    }
    var timerId = countdown(
      countToDate,
      (ts) => {
        if (ts.value < 0) {
          $('[data-time-type="Years"', this.element).find("span").text(ts.years);
          $('[data-time-type="Months"', this.element).find("span").text(ts.months);
          $('[data-time-type="Weeks"', this.element).find("span").text(ts.weeks);
          $('[data-time-type="Days"', this.element).find("span").text(ts.days);
          $('[data-time-type="Hours"', this.element).find("span").text(this.fixedDigits(ts.hours, 2));
          $('[data-time-type="Minutes"', this.element).find("span").text(this.fixedDigits(ts.minutes, 2));
          $('[data-time-type="Seconds"', this.element).find("span").text(this.fixedDigits(ts.seconds, 2));
        } else {
          $('[data-time-type="Years"', this.element).find("span").text("0");
          $('[data-time-type="Months"', this.element).find("span").text("0");
          $('[data-time-type="Weeks"', this.element).find("span").text("0");
          $('[data-time-type="Days"', this.element).find("span").text("0");
          $('[data-time-type="Hours"', this.element).find("span").text("00");
          $('[data-time-type="Minutes"', this.element).find("span").text("00");
          $('[data-time-type="Seconds"', this.element).find("span").text("00");
          clearInterval(timerId);
          if (this.timer_action === "showhide") {
            $(this.hide_ids.map((id) => `.${id}`).join(",")).hide();
            $(this.show_ids.map((id) => `.${id}`).join(",")).show();
          } else if (this.timer_action === "redirect_to") {
            if (this.redirect_to) {
              window.location.href = this.redirect_to;
            }
          }
        }
      },
      countdownSpans
    );
  }
};
window["CountdownV1"] = CountdownV1;
//# sourceMappingURL=countdown-v1-QHHRHZUM.js.map
