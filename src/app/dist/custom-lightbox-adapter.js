"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CustomLightboxAdapter = void 0;
var core_1 = require("@angular/core");
var angular2_photoswipe_1 = require("angular2_photoswipe");
var CustomLightboxAdapter = /** @class */ (function (_super) {
    __extends(CustomLightboxAdapter, _super);
    function CustomLightboxAdapter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.allowPanToNext = true;
        _this.spacing = 0.12;
        _this.bgOpacity = 0.8;
        _this.mouseUsed = false;
        _this.loop = true;
        _this.pinchToClose = true;
        _this.closeOnScroll = true;
        _this.closeOnVerticalDrag = true;
        _this.hideAnimationDuration = 333;
        _this.showAnimationDuration = 333;
        _this.showHideOpacity = false;
        _this.escKey = true;
        _this.arrowKeys = true;
        _this.shareEl = true;
        return _this;
        // getPageURLForShare = (shareButtonData) => {
        //     return window.location.href;
        // };
    }
    CustomLightboxAdapter = __decorate([
        core_1.Injectable()
    ], CustomLightboxAdapter);
    return CustomLightboxAdapter;
}(angular2_photoswipe_1.LightboxAdapter));
exports.CustomLightboxAdapter = CustomLightboxAdapter;
