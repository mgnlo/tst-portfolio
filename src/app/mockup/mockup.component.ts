import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
function getHexItems(infos: {eng: string; ch: string; num: number; }[]): Array<{eng: string; ch: string; cover: string; img: string[]}> {
  let hexArr: Array<{eng: string; ch: string; cover: string; img: string[]}> = [];
  infos.forEach((value, index) => {
    let imgs: string[] = new Array <string> ();
    for (let imgI = 0; imgI < value.num; imgI++) {
      imgs.push('assets/images/mockup/' + index + '_' + imgI + '.jpg');
    }
    const aHex = { eng: value.eng, ch: value.ch, cover: 'assets/images/mockup/' + index + '_0.jpg', img: imgs};
    hexArr.push(aHex);
  });
  return hexArr;
}
function orderHex(): void {
  const hexs = Number($('.comb').length);
  const divWidth = Number($('.honeycombs-inner-wrapper').width());
  const hexWidth = Number($('.comb').width());
  const fstRow = Math.floor(divWidth / hexWidth); // how many hex can put in one row
  for ( let i = 1; i <= hexs; i++){// if it's odd hex number
    if ( i % 5 === 3){
      const rowfstHex = i - 2;
      const rowLastHex = i - 1;
      // console.log(rowfstHex, rowLastHex);
      $('.comb:nth-child(' + rowfstHex + ')').css('margin-left', hexWidth / 2 + 'px');
      $('.comb:nth-child(' + rowLastHex + ')').css('margin-right', hexWidth / 2 + 'px');
    }
    if ( i === hexs && i % 5 === 1){
      $('.comb:nth-child(' + i + ')').css('margin-left', hexWidth + 'px');
    }
  }
}
const hexInfo: Array<{eng: string; ch: string; num: number}> = [
  {eng: 'concert', ch: '音樂會', num: 4},
  {eng: 'road running', ch: '路跑', num: 9},
  {eng: 'movie', ch: '電影', num: 3},
  {eng: 'insect repellent', ch: '防蚊液', num: 4},
  {eng: 'supplement', ch: '保健食品', num: 1},
  {eng: 'food', ch: '食物', num: 4}
];

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.scss']
})

export class MockupComponent implements AfterViewInit, OnInit {
  constructor() { }
  hexs = getHexItems(hexInfo);
  ngAfterViewInit(): void {
    orderHex(); // to orderHex() in route at first time
  }
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    const tl1 = gsap.timeline({});
    tl1.set($('.honeycombs-inner-wrapper'), { transformPerspective: 300, transformStyle: 'preserve-3d', y: '-1rem'});
    tl1.to($('.honeycombs-inner-wrapper'), {rotationZ: -15}).add('z', '+=0.2'); // add label "z" for placement of next group of tweens
    tl1.set($('.wrap .title'), { transformPerspective: 300, transformStyle: 'preserve-3d', y: '-1rem'});
    tl1.to($('.wrap .title'), {rotationZ: -15}).add('z', '+=0.2'); // add label "z" for placement of next group of tweens
  }
  openModal(id: number): void{
    const mH = Number($('.modal:nth-child(' + id + 1 + ')').height());
    const wH = Number($(window).height());
    const tl2 = gsap.timeline({});
    $('.modal:nth-child(' + id + ')').addClass('active');
    tl2.to($('.modal-overlay'), {autoAlpha: 1, duration: 0.1});
    // tslint:disable-next-line: max-line-length
    tl2.to($('.modal:nth-child(' + id + ')'), { y: -(wH) + mH, duration: 0.6, delay: 0.2, ease: 'Elastic.easeOut.config(1.1, 0.7)'});
  }
  closeModal(i?: number): void {
    if (i === undefined) {$('.modal').removeClass('active'); }
    const mH = Number($('.modal').height());
    const wH = Number($(window).height());
    const tl2 = gsap.timeline({});
    $('#modal_' + i).removeClass('active');
    tl2.to($('.modal-overlay'), {delay: 0.55, autoAlpha: 0, duration: 0.1});
    tl2.to($('.modal'), { y: wH + mH, ease: 'Back.easeIn', force3D: true, duration: 0.1});
  }
  thumbOnClick(i: number, iii: number): void {
    $('#thumb_' + i + '_' + iii).addClass('active').siblings('.thumbnail').removeClass('active');
    $('#img_' + i + '_' + iii).addClass('active').siblings('.img').removeClass('active');
  }
  prev(i: number): void{
    $('#modal_' + i).removeClass('active');
    const lastHexId = hexInfo.length - 1;
    if ((i - 1) === -1) {
      $('#modal_' + (lastHexId)).addClass('active');
    } else {
      $('#modal_' + (i - 1)).addClass('active');
    }
  }
  next(i: number): void{
    $('#modal_' + i).removeClass('active');
    const lastHexId = hexInfo.length - 1;
    if ((i + 1) === lastHexId + 1){
      $('#modal_0').addClass('active');
    } else {
      $('#modal_' + (i + 1)).addClass('active');
    }
  }
}
