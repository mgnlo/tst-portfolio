import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

function lowerCase(str: string): string {
  return str.toLowerCase();
}

function upperCase(str: string): string{
  return str.toUpperCase();
}

function camelCase(str: string): string {
  str = str
    .replace(/\-/g, '" "') // convert all hyphens to spaces
    .replace(/\s[a-z]/g, upperCase) // convert first char of each word to UPPERCASE
    .replace(/\s+/g, '') // remove spaces
    .replace(/^[A-Z]/g, lowerCase); // convert first char to lowercase
  return str;
}

function addHyphen(str: string): string {
  str = str
    .replace(/\s+/g, '-') // remove spaces
    .replace(/^[A-Z]/g, lowerCase); // convert first char to lowercase
  return str;
}

const addPageLink = (egN: string, chN: string, hasChildPage?: boolean, url?: string) => {
  // newPage can't const outside it will be covered.
  const newPage = { egName: '', chName: '', hasChildPage: false, url: '' };
  newPage.egName = (egN) ? egN : '';
  newPage.chName = (chN) ? chN : '';
  newPage.hasChildPage = (hasChildPage) ? hasChildPage : false;
  const urlName = addHyphen(newPage.egName);
  // newPage.url = (url) ? url : '/src/app/' + urlName + '\/' + urlName + '.component.html';
  newPage.url = (url) ? url : '/' + urlName;
  return newPage;
};

const mobileSize = 768;

const photography = addPageLink('photography', '攝影');
const drawing = addPageLink('drawing', '繪畫');
const mockup = addPageLink('mockup', '商品設計');
const rwd = addPageLink('rwd website', '網頁');
const typesetting = addPageLink('layout', '排版');
const ps = addPageLink('ps photo', '修圖');

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

  navLinks = [addPageLink('about', '關於我', false, ''), addPageLink('portfolio', '作品集', true, '')/*, addPageLink('contact', '聯絡我')*/];
  portfolio = [photography, drawing, mockup, rwd, ps];
  dropdown = false;
  constructor() { }

  ngOnInit(): void {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = () => {
      console.log(screen.width);
      if ( screen.width >= mobileSize ) {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos || ($(document).height() === $(window).height())) {
            $('.header').css({ top: '0'});
        } else {
            $('.header').css({ top: '-10rem'});
        }
        prevScrollpos = currentScrollPos;
      }
    };
  }

  toggle(): void {
    $('.menu-btn').toggleClass('open');
    $('.menu-items').toggleClass('open');
  }

  dropdownToggle(dt: boolean): boolean {
    /*true=open; false=close*/
    return dt = (dt) ? false : true;
  }
}
