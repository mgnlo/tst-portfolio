"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AboutComponent = void 0;
var core_1 = require("@angular/core");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var MotionPathPlugin_1 = require("gsap/MotionPathPlugin");
var DrawSVGPlugin_1 = require("gsap/DrawSVGPlugin");
var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1["default"], MotionPathPlugin_1["default"], DrawSVGPlugin_1["default"], gsap_1.CSSPlugin);
        gsap_1.gsap.defaults({ ease: 'none' });
        gsap_1.gsap.set('.ball', { xPercent: -100, yPercent: -100 });
        this.showTimeLine();
    };
    AboutComponent.prototype.showTimeLine = function () {
        var sections = gsap_1.gsap.utils.toArray('.line');
        var timeline = gsap_1.gsap.timeline({
            defaults: {
                duration: 0.1,
                autoAlpha: 1,
                scale: 1.1,
                transformOrigin: 'center',
                ease: 'elastic(10, 5)'
            }
        }).to('.ball02, .text01, .de01, .dc01', { duration: 0.5 }, 0.15)
            .to('.ball03, .text02, .de02, .dc02', {}, 0.3)
            .to('.ball04, .text03, .de03, .dc03', {}, 0.4)
            .to('.ball05, .text04, .de04, .dc04', {}, 0.5)
            .to('.ball06, .text05', {}, 0.61)
            .to('.ball07, .text06, .de06, .dc06', {}, 0.84)
            .to('.ball08, .text07', {}, 0.95);
        var action = gsap_1.gsap.timeline({
            defaults: {
                duration: 1
            },
            scrollTrigger: {
                trigger: '#svg',
                scrub: true,
                start: '0 center',
                end: 'bottom bottom'
            }
        })
            .to('.ball01', { duration: 0.01, autoAlpha: 1 })
            .from('.theLine', { drawSVG: '0' }, 0)
            .to('.ball01', {
            motionPath: {
                path: '.theLine',
                alignOrigin: [0.5, 0.5],
                align: '.theLine'
            }
        }, 0)
            .add(timeline, 0);
    };
    AboutComponent = __decorate([
        core_1.Component({
            selector: 'app-about',
            templateUrl: './about.component.html',
            styleUrls: ['./about.component.scss']
        })
    ], AboutComponent);
    return AboutComponent;
}());
exports.AboutComponent = AboutComponent;
