"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var core_1 = require("@angular/core");
var $ = require("jquery");
function lowerCase(str) {
    return str.toLowerCase();
}
function upperCase(str) {
    return str.toUpperCase();
}
function camelCase(str) {
    str = str
        .replace(/\-/g, '" "') // convert all hyphens to spaces
        .replace(/\s[a-z]/g, upperCase) // convert first char of each word to UPPERCASE
        .replace(/\s+/g, '') // remove spaces
        .replace(/^[A-Z]/g, lowerCase); // convert first char to lowercase
    return str;
}
function addHyphen(str) {
    str = str
        .replace(/\s+/g, '-') // remove spaces
        .replace(/^[A-Z]/g, lowerCase); // convert first char to lowercase
    return str;
}
var addPageLink = function (egN, chN, hasChildPage, url) {
    // newPage can't const outside it will be covered.
    var newPage = { egName: '', chName: '', hasChildPage: false, url: '' };
    newPage.egName = (egN) ? egN : '';
    newPage.chName = (chN) ? chN : '';
    newPage.hasChildPage = (hasChildPage) ? hasChildPage : false;
    var urlName = addHyphen(newPage.egName);
    // newPage.url = (url) ? url : '/src/app/' + urlName + '\/' + urlName + '.component.html';
    newPage.url = (url) ? url : '/' + urlName;
    return newPage;
};
var mobileSize = 768;
var photography = addPageLink('photography', '攝影');
var drawing = addPageLink('drawing', '繪畫');
var mockup = addPageLink('mockup', '商品設計');
var rwd = addPageLink('rwd website', '網頁');
var typesetting = addPageLink('layout', '排版');
var ps = addPageLink('ps photo', '修圖');
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.navLinks = [addPageLink('about', '關於我', false, ''), addPageLink('portfolio', '作品集', true, '') /*, addPageLink('contact', '聯絡我')*/];
        this.portfolio = [photography, drawing, mockup, rwd, ps];
        this.dropdown = false;
    }
    NavComponent.prototype.ngOnInit = function () {
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            console.log(screen.width);
            if (screen.width >= mobileSize) {
                var currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos || ($(document).height() === $(window).height())) {
                    $('.header').css({ top: '0' });
                }
                else {
                    $('.header').css({ top: '-10rem' });
                }
                prevScrollpos = currentScrollPos;
            }
        };
    };
    NavComponent.prototype.toggle = function () {
        $('.menu-btn').toggleClass('open');
        $('.menu-items').toggleClass('open');
    };
    NavComponent.prototype.dropdownToggle = function (dt) {
        /*true=open; false=close*/
        return dt = (dt) ? false : true;
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.scss']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
