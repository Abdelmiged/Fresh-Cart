import './polyfills.server.mjs';
import {
  ɵɵdefinePipe
} from "./chunk-VDCW7R4D.mjs";
import "./chunk-24VIC3GD.mjs";

// src/app/Pipes/Search/search.pipe.ts
var _SearchPipe = class _SearchPipe {
  transform(productsList, searchWord) {
    return productsList.filter((item) => item.title.split(" ").slice(0, 2).join(" ").toLowerCase().includes(searchWord.toLowerCase()));
  }
};
_SearchPipe.\u0275fac = function SearchPipe_Factory(t) {
  return new (t || _SearchPipe)();
};
_SearchPipe.\u0275pipe = /* @__PURE__ */ \u0275\u0275definePipe({ name: "search", type: _SearchPipe, pure: true, standalone: true });
var SearchPipe = _SearchPipe;
export {
  SearchPipe
};
//# sourceMappingURL=chunk-EHYZ4WRX.mjs.map
