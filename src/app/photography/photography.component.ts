import {Component, OnInit} from '@angular/core';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as $ from 'jquery';

const mobileSize = 768;
const getPosition = (elem: Element, target: Element) => {
  const targetRect = target.getBoundingClientRect();
  const elemRect = elem.getBoundingClientRect();
  gsap.set(elem, {
    x: 0,
    y: 0,
    width: targetRect.width,
    height: targetRect.height
  });
  const newRect = elem.getBoundingClientRect();
  gsap.set(elem, { width: elemRect.width, height: elemRect.height });
  return {
    left: targetRect.left - newRect.left,
    top: targetRect.top - newRect.top,
    width: newRect.width,
    height: newRect.height
  };
};
const getSpot = (spotName: string, spotToGet: string, num: number) => {
  const imgs = new Array <string> ();
  for (let i = 0; i < num; i++) {
    imgs.push('../../assets/images/photos/' + spotToGet + '_' + i + '.jpg');
  }
  const aSpot = { spot: spotName, cover: '../../assets/images/photos/' + spotToGet + '_0.jpg', img: imgs};
  return aSpot;
};
const zoomOut = (fromComp: boolean) => {
  const height = (fromComp) ? innerHeight / 4 : innerHeight * 3;
  const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.grid-container',
        start: 'top top',
        end: height, // adjust space height
        pin: '.gridLayer',
        scrub: true
        // anticipatePin: 0.2,
      }
    })
    .set('.gridBlock', { autoAlpha: 0 })
    .to('.gridBlock', { duration: 0.05, autoAlpha: 1});
  if (fromComp) {
    timeline.from('.gridLayer', { duration: 4, scale: 4, ease: 'none'}).to('.gridLayer', {
      onComplete: () => {
        if (timeline.scrollTrigger){
          timeline.scrollTrigger.kill(true);
          timeline.progress(1);
          $('.introSec').remove();
        }
      }});
  } else {
    timeline.from('.gridLayer', { scale: 3.3333, ease: 'none', top: '327px'}).to('.gridLayer', {top: '-80px' });
  }
};

const cursorSpot = () => {
  $('.gridBlock').on('mouseleave', (e) => {
    const cursor = $(e.target).children('.nav-head');
    gsap.to(cursor, { duration: 0.2  , autoAlpha: 0 });
    $('.nav-head').css( 'display' , 'none' );
  });
  $('.gridBlock').on('mouseover' && 'mousemove', (e) => {
    const cursor = $(e.target).children('.nav-head');
    gsap.to(cursor, { duration: 0.5, autoAlpha: 1 });
    $(e.target).children('.nav-head').css( 'display' , 'block' );
    const x = e.clientX;
    const y = e.clientY;
    const elCoords = e.target.getBoundingClientRect();
    const xOffset = x - elCoords.left + 20;
    const yOffset = y - elCoords.top - 10;
    $(e.target).children('.nav-head').css('transform', 'translate(' + xOffset + 'px,' + yOffset + 'px)');
    // $(`#spot${[i]}`).css({ top: y, left: x });
    // console.log(xOffset, yOffset);
  });
};

// Images to make it look better, not related to the effect
// gsap.set('.gridBlock', {backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})`});
const hehuan = getSpot('Hehuan Mountain', 'hehuan', 4);
const qingjing = getSpot('Qingjing Farm', 'qingjing', 3);
const macao = getSpot('Macao', 'macao', 3);
const taipei = getSpot('Taipei', 'taipei', 7);
const korean = getSpot('Korean', 'korean', 2);
const kaosiung = getSpot('Kaosiung', 'kaosiung', 4);
const taichung = getSpot('Taichung', 'taichung', 5);
const taoyuan = getSpot('Taoyuan', 'taoyuan', 1);
const newTaipei = getSpot('New Taipei City', 'newTaipei', 5);
// tslint:disable-next-line: prefer-const
let photos: Array<{spot: string; cover: string; img: string[]}> = [];
photos.push(hehuan);
photos.push(qingjing);
photos.push(macao);
photos.push(taipei);
photos.push(korean);
photos.push(kaosiung);
photos.push(taichung);
photos.push(taoyuan);
photos.push(newTaipei);



@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})

export class PhotographyComponent implements OnInit {

  constructor() { }
  allPhoto = photos;
  covers = photos.map(a => a.cover);
  spots = photos.map(a => a.spot);

  ngOnInit(): void {
    $('html').css('overflow-x', 'hidden');
    const fromComp = ( screen.width >= mobileSize ) ? true : false;
    gsap.registerPlugin(ScrollTrigger);
    gsap.set('.nav-head', {autoAlpha: 0});
    gsap.set('.gridBlock', { backgroundImage: i => `url(${this.covers[i]})`});
    $(window).on('load', () => {
      gsap.to('.arrow', {
        y: 10,
        yoyo: true,
        ease: 'power2',
        repeat: -1
      });
      gsap.to($('.gridLayer .centerPiece'), {
        duration: 0.5,
        autoAlpha: 1
      });
    });
    zoomOut(fromComp);
    cursorSpot();
    /*$('.gridBlock').on('click', (e) => {
       const int = Number(e.target.id);
       this.openModal(int);
    });*/
    const gallarySet = new Set();
    const keys = Object.keys(photos[0]);
    const vals = keys.map(key => photos[0]);
    for ( let i = 0; i < keys.length; i++ ) {
      if ( keys[i].includes('img') ){
        gallarySet.add({ small: vals[i], medium: vals[i], big: vals[i]});
      }
    }
  }

  openModal(id: number): void{
    const mH = Number($('#modal_' + id).height());
    const wH = Number($(window).height());
    const tl2 = gsap.timeline({});
    $('#modal_' + id).addClass('active');
    tl2.to($('.modal-overlay'), {autoAlpha: 1, duration: 0.1});
    // tslint:disable-next-line: max-line-length
    tl2.to($('#modal_' + id), { y: -(wH) + mH, duration: 0.6, delay: 0.2, ease: 'Elastic.easeOut.config(1.1, 0.7)'});
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
    $('html').css('overflow', 'hidden');
  }
  closeModal(i?: number): void {
    if (i === undefined) {$('.modal').removeClass('active'); }
    const mH = Number($('.modal').height());
    const wH = Number($(window).height());
    const tl2 = gsap.timeline({});
    $('#modal_' + i).removeClass('active');
    tl2.to($('.modal-overlay'), {delay: 0.55, autoAlpha: 0, duration: 0.1});
    tl2.to($('.modal'), { y: wH + mH, ease: 'Back.easeIn', force3D: true, duration: 0.1});
    $('html').css('overflow-y', 'scroll');
  }
  thumbOnClick(i: number, iii: number): void {
    $('#thumb_' + i + '_' + iii).addClass('active').siblings('.thumbnail').removeClass('active');
    $('#img_' + i + '_' + iii).addClass('active').siblings('.img').removeClass('active');
  }
  prev(i: number): void{
    $('#modal_' + i).removeClass('active');
    const lastPhotoId = this.allPhoto.length - 1;
    if ((i - 1) === -1) {
      $('#modal_' + (lastPhotoId)).addClass('active');
    } else {
      $('#modal_' + (i - 1)).addClass('active');
    }
  }
  next(i: number): void{
    $('#modal_' + i).removeClass('active');
    const lastPhotoId = this.allPhoto.length - 1;
    if ((i + 1) === lastPhotoId + 1){
      $('#modal_0').addClass('active');
    } else {
      $('#modal_' + (i + 1)).addClass('active');
    }
  }
}
