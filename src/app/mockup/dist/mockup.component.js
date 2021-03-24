"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MockupComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
var gsap_1 = require("gsap");
var ScrollTrigger_1 = require("gsap/ScrollTrigger");
function getHexItems(infos) {
    var hexArr = [];
    infos.forEach(function (value, index) {
        var imgs = new Array();
        for (var imgI = 0; imgI < value.num; imgI++) {
            imgs.push('../../assets/images/mockup/' + index + '_' + imgI + '.jpg');
        }
        var aHex = { eng: value.eng, ch: value.ch, cover: '../../assets/images/mockup/' + index + '_0.jpg', img: imgs };
        hexArr.push(aHex);
    });
    return hexArr;
}
function orderHex() {
    var hexs = Number($('.comb').length);
    var divWidth = Number($('.honeycombs-inner-wrapper').width());
    var hexWidth = Number($('.comb').width());
    var fstRow = Math.floor(divWidth / hexWidth); // how many hex can put in one row
    for (var i = 1; i <= hexs; i++) { // if it's odd hex number
        if (i % 5 === 3) {
            var rowfstHex = i - 2;
            var rowLastHex = i - 1;
            // console.log(rowfstHex, rowLastHex);
            $('.comb:nth-child(' + rowfstHex + ')').css('margin-left', hexWidth / 2 + 'px');
            $('.comb:nth-child(' + rowLastHex + ')').css('margin-right', hexWidth / 2 + 'px');
        }
        if (i === hexs && i % 5 === 1) {
            $('.comb:nth-child(' + i + ')').css('margin-left', hexWidth + 'px');
        }
    }
}
var hexInfo = [
    { eng: 'concert', ch: '音樂會', num: 4 },
    { eng: 'road running', ch: '路跑', num: 9 },
    { eng: 'movie', ch: '電影', num: 3 },
    { eng: 'insect repellent', ch: '防蚊液', num: 4 },
    { eng: 'supplement', ch: '保健食品', num: 1 },
    { eng: 'food', ch: '食物', num: 4 }
];
var MockupComponent = /** @class */ (function () {
    function MockupComponent() {
        this.hexs = getHexItems(hexInfo);
        this.winLoad = function () {
            $(window).on('load', function () {
                orderHex();
            });
        };
    }
    MockupComponent.prototype.ngOnInit = function () {
        this.winLoad();
        gsap_1.gsap.registerPlugin(ScrollTrigger_1["default"]);
        var tl1 = gsap_1.gsap.timeline({});
        tl1.set($('.honeycombs-inner-wrapper'), { transformPerspective: 300, transformStyle: 'preserve-3d', y: '-1rem' });
        tl1.to($('.honeycombs-inner-wrapper'), { rotationZ: -15 }).add('z', '+=0.2'); // add label "z" for placement of next group of tweens
        tl1.set($('.wrap .title'), { transformPerspective: 300, transformStyle: 'preserve-3d', y: '-1rem' });
        tl1.to($('.wrap .title'), { rotationZ: -15 }).add('z', '+=0.2'); // add label "z" for placement of next group of tweens
    };
    MockupComponent.prototype.openModal = function (id) {
        var mH = Number($('.modal:nth-child(' + id + 1 + ')').height());
        var wH = Number($(window).height());
        var tl2 = gsap_1.gsap.timeline({});
        $('.modal:nth-child(' + id + ')').addClass('active');
        tl2.to($('.modal-overlay'), { autoAlpha: 1, duration: 0.1 });
        // tslint:disable-next-line: max-line-length
        tl2.to($('.modal:nth-child(' + id + ')'), { y: -(wH) + mH, duration: 0.6, delay: 0.2, ease: 'Elastic.easeOut.config(1.1, 0.7)' });
    };
    MockupComponent.prototype.closeModal = function (i) {
        if (i === undefined) {
            $('.modal').removeClass('active');
        }
        var mH = Number($('.modal').height());
        var wH = Number($(window).height());
        var tl2 = gsap_1.gsap.timeline({});
        $('#modal_' + i).removeClass('active');
        tl2.to($('.modal-overlay'), { delay: 0.55, autoAlpha: 0, duration: 0.1 });
        tl2.to($('.modal'), { y: wH + mH, ease: 'Back.easeIn', force3D: true, duration: 0.1 });
    };
    MockupComponent.prototype.thumbOnClick = function (i, iii) {
        $('#thumb_' + i + '_' + iii).addClass('active').siblings('.thumbnail').removeClass('active');
        $('#img_' + i + '_' + iii).addClass('active').siblings('.img').removeClass('active');
    };
    MockupComponent.prototype.prev = function (i) {
        $('#modal_' + i).removeClass('active');
        var lastHexId = hexInfo.length - 1;
        if ((i - 1) === -1) {
            $('#modal_' + (lastHexId)).addClass('active');
        }
        else {
            $('#modal_' + (i - 1)).addClass('active');
        }
    };
    MockupComponent.prototype.next = function (i) {
        $('#modal_' + i).removeClass('active');
        var lastHexId = hexInfo.length - 1;
        if ((i + 1) === lastHexId + 1) {
            $('#modal_0').addClass('active');
        }
        else {
            $('#modal_' + (i + 1)).addClass('active');
        }
    };
    MockupComponent = __decorate([
        core_1.Component({
            selector: 'app-mockup',
            templateUrl: './mockup.component.html',
            styleUrls: ['./mockup.component.scss']
        })
    ], MockupComponent);
    return MockupComponent;
}());
exports.MockupComponent = MockupComponent;
