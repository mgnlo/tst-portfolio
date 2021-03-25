import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {gsap, TimelineMax, TweenMax} from 'gsap';
import Draggable from 'gsap/Draggable';

const mobileSize = 768;
let psArr: Array<{id: number;  before: string; after: string; }> = [];

function showLeftCaption(): void {
  TweenMax.to($('.slider-caption-left'), 0.3, {autoAlpha: 1, yPercent: 0});
  TweenMax.to($('.slider-caption-right'), 0.3, {autoAlpha: 0, yPercent: -100});
}
function showRightCaption(): void {
  TweenMax.to($('.slider-caption-left'), 0.3, {autoAlpha: 0, yPercent: -100});
  TweenMax.to($('.slider-caption-right'), 0.3, {autoAlpha: 1, yPercent: 0});
}
function showBothCaptions(): void {
  TweenMax.to($('.slider-caption-left'), 0.3, {autoAlpha: 1, yPercent: 0});
  TweenMax.to($('.slider-caption-right'), 0.3, {autoAlpha: 1, yPercent: 0});
}

function addToPsArr(total: number): {id: number; before: string; after: string}[] {
  for (let i = 1; i <= total; i++){
    const tmp = {id: i, before: '/assets/images/ps/ps_' + i + '.jpg', after: '/assets/images/ps/ps_' + i + '_1.jpg'};
    psArr.push(tmp);
  }
  return psArr;
}

function getTransform3dValue(el: JQuery<HTMLElement>): number[]{
  const results = el.css('-webkit-transform').match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
  if (!results) { return [0, 0, 0]; }
  if (results[1] === '3d') { return results.slice(2, 5).map(Number); }

  results.push('0');
  return results.slice(5, 8).map(Number);
}

@Component({
  selector: 'app-ps-photo',
  templateUrl: './ps-photo.component.html',
  styleUrls: ['./ps-photo.component.scss']
})
export class PsPhotoComponent implements OnInit {
  ids = [1];
  psArr = addToPsArr(10);
  nowPicId = 0;
  maxId = this.psArr.length - 1;

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(Draggable);
    const browserSize = ( Number($(window).width()) > 600) ? 600 : Number($(window).width());
    const sliderWidth = ( screen.width <= mobileSize ) ? Number(screen.width) : browserSize;
    const sliderHeight = ( screen.width <= mobileSize ) ? Number(screen.height) : browserSize;
    const startPosition = sliderWidth / 2;
    const tl = new TimelineMax({delay: 1});
    // set initial positioning
    tl.set($('.slider-caption'), {autoAlpha: 0, yPercent: -100}, 0);
    tl.to($('.slider-left'), 0.7, {width: startPosition, ease: 'Back.easeOut.config(1.7)'}, 0);
    tl.to($('.handle'), 0.7, {x: startPosition, ease: 'Back.easeOut.config(1.7)'}, 0);
    tl.staggerTo($('.slider-caption'), 0.7, {autoAlpha: 1, yPercent: 0, ease: 'Back.easeInOut.config(3)'}, -0.3);
    // draggable
    Draggable.create($('.handle'), {
      bounds: {
        minX: 0,
        minY: 0,
        maxX: sliderWidth,
        maxY: sliderHeight,
      },
      type: 'x',
      edgeResistance: 1,
      throwProps: true,
      onDrag: this.onHandleDrag
    });
    $('.slider-bg, .right, .left').on('click', () => { // backToCneter
      gsap.to($('.slider-left'), {width: startPosition, ease: 'Power2.easeOut', duration: 0.7});
      gsap.to($('.handle'), {x: startPosition, ease: 'Power2.easeOut', duration: 0.7});
      gsap.to($('.slider-caption'), {autoAlpha: 1, yPercent: 0, ease: 'Back.easeInOut.config(3)', duration: 0.7});
    });
    /*if (!$('.slider-caption-right').is(':hidden')){
      $('.slider-bg-left').on('click', () => {
        gsap.to($('.slider-left'), {width: sliderWidth, ease: 'Power2.easeOut', duration: 0.7});
        gsap.to($('.handle'), {x: sliderWidth, ease: 'Power2.easeOut', duration: 0.7});
        showLeftCaption();
      });
    }
    if (!$('.slider-caption-left').is(':hidden')){
      $('.slider-bg-right').on('click', () => {
        gsap.to($('.slider-left'), {width: 0, ease: 'Power2.easeOut', duration: 0.7});
        gsap.to($('.handle'), {x: 0, ease: 'Power2.easeOut', duration: 0.7});
        showRightCaption();
      });
    }*/
  }
  onHandleDrag(this: Draggable): void {
    if ( screen.width <= mobileSize ) {
      gsap.set($('.slider-left'), {width: this.endX});
      // show/hide caption if you drag past the center of the container, towards left/right direction.
      if (this.endX >= (this.maxX / 2) && this.getDirection($('#compare')) === 'right') {
        showLeftCaption();
      }
      if (this.endX <= (this.maxX / 2) && this.getDirection($('#compare')) === 'left') {
        showRightCaption();
      }
    } else {
      gsap.set($('.slider-left'), {width: this.endX});
      // show/hide caption if you drag past the center of the container, towards left/right direction.
      if (this.endX >= (this.maxX / 2) && this.getDirection($('#compare')) === 'right') {
        showLeftCaption();
      }
      if (this.endX <= (this.maxX / 2) && this.getDirection($('#compare')) === 'left') {
        showRightCaption();
      }
    }
  }
  prev(i: number): void{
    if ((i - 1) < 0) {
      // last pic
      $('.slider-bg-left').css('background-image', 'url(' + psArr[this.maxId].before + ')');
      $('.slider-bg-right').css('background-image', 'url(' + psArr[this.maxId].after + ')');
      this.nowPicId = this.maxId;
    } else {
      $('.slider-bg-left').css('background-image', 'url(' + psArr[i - 1].before + ')');
      $('.slider-bg-right').css('background-image', 'url(' + psArr[i - 1].after + ')');
      this.nowPicId = i - 1;
    }
  }
  next(i: number): void{
    if ((i + 1) > this.maxId) {
      // first pic
      $('.slider-bg-left').css('background-image', 'url(' + psArr[0].before + ')');
      $('.slider-bg-right').css('background-image', 'url(' + psArr[0].after + ')');
      this.nowPicId = 0;
    } else {
      $('.slider-bg-left').css('background-image', 'url(' + psArr[i + 1].before + ')');
      $('.slider-bg-right').css('background-image', 'url(' + psArr[i + 1].after + ')');
      this.nowPicId = i + 1;
    }
  }
}
