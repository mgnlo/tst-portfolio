"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhotographyComponent = void 0;
var core_1 = require("@angular/core");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
var $ = require("jquery");
var getPosition = function (elem, target) {
    var targetRect = target.getBoundingClientRect();
    var elemRect = elem.getBoundingClientRect();
    gsap_1.gsap.set(elem, {
        x: 0,
        y: 0,
        width: targetRect.width,
        height: targetRect.height
    });
    var newRect = elem.getBoundingClientRect();
    gsap_1.gsap.set(elem, { width: elemRect.width, height: elemRect.height });
    return {
        left: targetRect.left - newRect.left,
        top: targetRect.top - newRect.top,
        width: newRect.width,
        height: newRect.height
    };
};
var getSpot = function (spotName, spotToGet, num) {
    var imgs = new Array();
    for (var i = 0; i < num; i++) {
        imgs.push('../../assets/images/photos/' + spotToGet + '_' + num + '.jpg');
    }
    var aSpot = { spot: spotName, cover: '../../assets/images/photos/' + spotToGet + '_0.jpg', img: imgs };
    return aSpot;
};
var zoomOut = function () {
    gsap_1.gsap.timeline({
        scrollTrigger: {
            trigger: '.grid-container',
            start: 'top top',
            end: function () { return innerHeight * 4; },
            scrub: true,
            pin: '.grid',
            anticipatePin: 1
        }
    })
        .set('.gridBlock', { autoAlpha: 0 })
        .to('.gridBlock', {
        duration: 0.1,
        autoAlpha: 1
    }, 0.001)
        .from('.gridLayer', {
        scale: 3.3333,
        ease: 'none'
    });
};
var cursorSpot = function () {
    $('.gridBlock').on('mouseleave', function (e) {
        var cursor = $(e.target).children('.nav-head');
        gsap_1.gsap.to(cursor, { duration: 0.2, autoAlpha: 0 });
        $('.nav-head').css('display', 'none');
    });
    $('.gridBlock').on('mouseover' && 'mousemove', function (e) {
        var cursor = $(e.target).children('.nav-head');
        gsap_1.gsap.to(cursor, { duration: 0.5, autoAlpha: 1 });
        $(e.target).children('.nav-head').css('display', 'block');
        var x = e.clientX;
        var y = e.clientY;
        var elCoords = e.target.getBoundingClientRect();
        var xOffset = x - elCoords.left + 20;
        var yOffset = y - elCoords.top - 10;
        $(e.target).children('.nav-head').css('transform', 'translate(' + xOffset + 'px,' + yOffset + 'px)');
        // $(`#spot${[i]}`).css({ top: y, left: x });
        // console.log(xOffset, yOffset);
    });
};
// Images to make it look better, not related to the effect
// gsap.set('.gridBlock', {backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})`});
var hehuan = getSpot('Hehuan Mountain', 'hehuan', 4);
var qingjing = getSpot('Qingjing Farm', 'qingjing', 3);
var macao = getSpot('Macao', 'macao', 3);
var taipei = getSpot('Taipei', 'taipei', 7);
var korean = getSpot('Korean', 'korean', 2);
var kaosiung = getSpot('Kaosiung', 'kaosiung', 4);
var taichung = getSpot('Taichung', 'taichung', 5);
var taoyuan = getSpot('Taoyuan', 'taoyuan', 1);
var newTaipei = getSpot('New Taipei City', 'newTaipei', 5);
// tslint:disable-next-line: prefer-const
var photos = [];
photos.push(hehuan);
photos.push(qingjing);
photos.push(macao);
photos.push(taipei);
photos.push(korean);
photos.push(kaosiung);
photos.push(taichung);
photos.push(taoyuan);
photos.push(newTaipei);
var PhotographyComponent = /** @class */ (function () {
    function PhotographyComponent() {
        this.covers = photos.map(function (a) { return a.cover; });
        this.spots = photos.map(function (a) { return a.spot; });
    }
    PhotographyComponent.prototype.ngOnInit = function () {
        var _this = this;
        gsap_1.gsap.registerPlugin(ScrollTrigger_1["default"]);
        gsap_1.gsap.set($('.nav-head'), { autoAlpha: 0 });
        gsap_1.gsap.set($('.gridBlock'), { backgroundImage: function (i) { return "url(" + _this.covers[i] + ")"; } });
        $(window).on('load', function () {
            gsap_1.gsap.to($('.arrow'), {
                y: 10,
                yoyo: true,
                ease: 'power2',
                repeat: -1
            });
            gsap_1.gsap.to($('.gridLayer .centerPiece'), {
                duration: 0.5,
                autoAlpha: 1
            });
        });
        zoomOut();
        cursorSpot();
        /*$('.gridBlock').on('click', (e) => {
           const int = Number(e.target.id);
           this.openModal(int);
        });*/
        var gallarySet = new Set();
        var keys = Object.keys(photos[0]);
        var vals = keys.map(function (key) { return photos[0]; });
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].includes('img')) {
                gallarySet.add({ small: vals[i], medium: vals[i], big: vals[i] });
            }
        }
    };
    PhotographyComponent = __decorate([
        core_1.Component({
            selector: 'app-photography',
            templateUrl: './photography.component.html',
            styleUrls: ['./photography.component.scss']
        })
    ], PhotographyComponent);
    return PhotographyComponent;
}());
exports.PhotographyComponent = PhotographyComponent;
