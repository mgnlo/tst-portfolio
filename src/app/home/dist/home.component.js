"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var gsap_1 = require("gsap");
var Draggable_1 = require("gsap/Draggable");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var mobileSize = 768;
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.raderChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                labels: {
                    fontSize: 16,
                    fontFamily: 'Karla',
                    fontColor: '#7e5f4e'
                }
            },
            scale: {
                ticks: {
                    display: true,
                    fontSize: 10,
                    max: 100
                },
                pointLabels: {
                    fontSize: 14,
                    fontFamily: 'Karla',
                    lineHeight: 1.5
                },
                animate: true
            },
            layout: {
                padding: {
                    top: 10,
                    bottom: 10,
                    right: -100
                }
            },
            animation: {
                duration: 500,
                easing: 'easeInOutQuad',
                animateScale: true
            }
        };
        this.raderChartLabels = [
            'E外向型(Extraversion)', 'N直覺(iNtuition)', 'T邏輯型(Thinking)', 'J計畫型(Judging)', 'A堅定型(Assertive)',
            'I內向(Interoverted)', 'S現實型(Observant)', 'F感受型(Feeling)', 'P展望型(Prospecting)', 'T謹慎型(Turbulent)'
        ];
        this.raderChartData = [
            { data: [31, 70, 24, 29, 43, 69, 30, 76, 71, 57],
                label: 'MBTI職業性格測試結果 INFP-T調停者',
                pointRadius: 4,
                hitRadius: 3,
                pointBackgroundColor: '#a38e84',
                borderColor: '#a38e84',
                backgroundColor: '#d6beb3bb' }
        ];
        this.radarChartType = 'radar';
    }
    HomeComponent.prototype.ngOnInit = function () {
        gsap_1.gsap.registerPlugin(ScrollTrigger_1["default"], Draggable_1["default"]);
        this.initScrollTriggers();
    };
    HomeComponent.prototype.initScrollTriggers = function () {
        document.querySelectorAll('.chart').forEach(function (chart) {
            var scrollShow = gsap_1.gsap.timeline({
                scrollTrigger: {
                    trigger: chart,
                    pin: true,
                    // scrub: true,
                    start: 'top center',
                    end: 'bottom bottom',
                    // markers: true,
                    toggleActions: 'play none none reverse'
                }
            });
            scrollShow.from(chart, { y: 30, opacity: 0 });
        });
    };
    HomeComponent.prototype.chartHovered = function (_a) {
        var event = _a.event, active = _a.active;
        console.log(event, active);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
