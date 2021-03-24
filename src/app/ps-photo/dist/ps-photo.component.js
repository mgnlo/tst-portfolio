"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PsPhotoComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var gsap_1 = require("gsap");
var Draggable_1 = require("gsap/Draggable");
var comparisonSliderWidth = 500;
var comparisonSliderHeight = comparisonSliderWidth;
var mobileSize = 768;
var startPosition = (comparisonSliderWidth / 100) * 50;
var psArr = [];
function showLeftCaption() {
    gsap_1.TweenMax.to($('.slider-caption-left'), 0.3, { autoAlpha: 1, yPercent: 0 });
    gsap_1.TweenMax.to($('.slider-caption-right'), 0.3, { autoAlpha: 0, yPercent: -100 });
}
function showRightCaption() {
    gsap_1.TweenMax.to($('.slider-caption-left'), 0.3, { autoAlpha: 0, yPercent: -100 });
    gsap_1.TweenMax.to($('.slider-caption-right'), 0.3, { autoAlpha: 1, yPercent: 0 });
}
function showBothCaptions() {
    gsap_1.TweenMax.to($('.slider-caption-left'), 0.3, { autoAlpha: 1, yPercent: 0 });
    gsap_1.TweenMax.to($('.slider-caption-right'), 0.3, { autoAlpha: 1, yPercent: 0 });
}
function addToPsArr(total) {
    for (var i = 1; i <= total; i++) {
        var tmp = { id: i, before: '../../assets/images/ps/ps_' + i + '.jpg', after: '../../assets/images/ps/ps_' + i + '_1.jpg' };
        psArr.push(tmp);
    }
    return psArr;
}
var PsPhotoComponent = /** @class */ (function () {
    function PsPhotoComponent() {
        this.ids = [1];
        this.psArr = addToPsArr(10);
        this.nowPicId = 0;
        this.maxId = this.psArr.length - 1;
    }
    PsPhotoComponent.prototype.ngOnInit = function () {
        gsap_1.gsap.registerPlugin(Draggable_1["default"]);
        var comparisonSliderWidthMobile = Number($(window).width());
        var comparisonSliderHeightMobile = comparisonSliderWidth;
        var tl = new gsap_1.TimelineMax({ delay: 1 });
        // set initial positioning
        tl.set($('.slider-caption'), { autoAlpha: 0, yPercent: -100 }, 0);
        tl.to($('.comparison-slider-container > .slider-left'), 0.7, { width: startPosition, ease: 'Back.easeOut.config(1.7)' }, 0);
        tl.to($('.comparison-slider-container > .handle'), 0.7, { x: startPosition, ease: 'Back.easeOut.config(1.7)' }, 0);
        tl.staggerTo($('.slider-caption'), 0.7, { autoAlpha: 1, yPercent: 0, ease: 'Back.easeInOut.config(3)' }, -0.3);
        // draggable
        if (screen.width <= mobileSize) {
            Draggable_1["default"].create($('.comparison-slider-container > .handle'), {
                bounds: {
                    minX: 0,
                    minY: 0,
                    maxX: comparisonSliderWidthMobile,
                    maxY: comparisonSliderHeightMobile
                },
                type: 'x',
                edgeResistance: 1,
                throwProps: true,
                onDrag: this.onHandleDrag
            });
        }
        else {
            Draggable_1["default"].create($('.comparison-slider-container > .handle'), {
                bounds: {
                    minX: 0,
                    minY: 0,
                    maxX: comparisonSliderWidth,
                    maxY: comparisonSliderHeight
                },
                type: 'x',
                edgeResistance: 1,
                throwProps: true,
                onDrag: this.onHandleDrag
            });
        }
    };
    PsPhotoComponent.prototype.onHandleDrag = function () {
        if (screen.width <= mobileSize) {
            gsap_1.TweenMax.set($('.slider-left'), { width: this.endX });
            // show/hide caption if you drag past the center of the container, towards left/right direction.
            if (this.endX >= (this.maxX / 2) && this.getDirection($('#compare')) === 'right') {
                showLeftCaption();
            }
            if (this.endX <= (this.maxX / 2) && this.getDirection($('#compare')) === 'left') {
                showRightCaption();
            }
        }
        else {
            gsap_1.TweenMax.set($('.slider-left'), { width: this.endX });
            // show/hide caption if you drag past the center of the container, towards left/right direction.
            if (this.endX >= (this.maxX / 2) && this.getDirection($('#compare')) === 'right') {
                showLeftCaption();
            }
            if (this.endX <= (this.maxX / 2) && this.getDirection($('#compare')) === 'left') {
                showRightCaption();
            }
        }
    };
    PsPhotoComponent.prototype.prev = function (i) {
        if ((i - 1) < 0) {
            // last pic
            $('.slider-bg-left').css('background-image', 'url(' + psArr[this.maxId].before + ')');
            $('.slider-bg-right').css('background-image', 'url(' + psArr[this.maxId].after + ')');
            this.nowPicId = this.maxId;
        }
        else {
            $('.slider-bg-left').css('background-image', 'url(' + psArr[i - 1].before + ')');
            $('.slider-bg-right').css('background-image', 'url(' + psArr[i - 1].after + ')');
            this.nowPicId = i - 1;
        }
    };
    PsPhotoComponent.prototype.next = function (i) {
        if ((i + 1) > this.maxId) {
            // first pic
            $('.slider-bg-left').css('background-image', 'url(' + psArr[0].before + ')');
            $('.slider-bg-right').css('background-image', 'url(' + psArr[0].after + ')');
            this.nowPicId = 0;
        }
        else {
            $('.slider-bg-left').css('background-image', 'url(' + psArr[i + 1].before + ')');
            $('.slider-bg-right').css('background-image', 'url(' + psArr[i + 1].after + ')');
            this.nowPicId = i + 1;
        }
    };
    PsPhotoComponent = __decorate([
        core_1.Component({
            selector: 'app-ps-photo',
            templateUrl: './ps-photo.component.html',
            styleUrls: ['./ps-photo.component.scss']
        })
    ], PsPhotoComponent);
    return PsPhotoComponent;
}());
exports.PsPhotoComponent = PsPhotoComponent;
