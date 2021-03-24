import {Component, OnInit} from '@angular/core';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as $ from 'jquery';

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
  const imgs: string[] = new Array <string> ();
  for (let i = 0; i < num; i++) {
    imgs.push('../../assets/images/photos/' + spotToGet + '_' + num + '.jpg');
  }
  const aSpot = { spot: spotName, cover: '../../assets/images/photos/' + spotToGet + '_0.jpg', img: imgs};
  return aSpot;
};
const zoomOut = () => {
  gsap.timeline({
      scrollTrigger: {
        trigger: '.grid-container',
        start: 'top top',
        end: () => innerHeight * 4,
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
      ease: 'none',
    });
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
let photos: Array<{spot: any; cover: any; img: any}> = [];
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

  covers = photos.map(a => a.cover);
  spots = photos.map(a => a.spot);

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set($('.nav-head'), {autoAlpha: 0});
    gsap.set($('.gridBlock'), { backgroundImage: i => `url(${this.covers[i]})`});
    $(window).on('load', () => {
      gsap.to($('.arrow'), {
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
    zoomOut();
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
}
