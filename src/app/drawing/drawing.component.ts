import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import * as $ from 'jquery';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {Image} from 'angular2_photoswipe';
const mobileSize = 768;
const pics: {width: number; height: number}[] = [
  {width: 1511, height: 2016},
  {width: 1500, height: 2011},
  {width: 1500, height: 2001},
  {width: 486, height: 635},
  {width: 1500, height: 2001},
  {width: 1500, height: 2123},
  {width: 403, height: 581},
  {width: 450, height: 600},
  {width: 1541, height: 2443},
  {width: 480, height: 600},
  {width: 486, height: 486},
  {width: 1280, height: 1831}
];

@Component({
  selector: 'app-draw',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {
  title = 'angular2-photoswipe-demo';
  imgs: Image[] = new Array <Image> ();
  galleryId!: 'g1';
  iw = 480;
  ih = 600;

  bgs = [
    {layer: 'bglayer-0', url: 'assets/images/train0.png', depth: '0', scale: '0.95'},
    {layer: 'bglayer-1', url: 'assets/images/train1.png', depth: '5rem', scale: '1.11'},
    {layer: 'bglayer-2', url: 'assets/images/train2.png', depth: '10rem', scale: '0.95'},
    {layer: 'bglayer-3', url: 'assets/images/train3.png', depth: '15rem', scale: '0.95'}
  ];
  layers = 5;
  counter = (i: number) => {
    return new Array(i);
  }
  constructor() { }
  ngOnInit(): void {
    gsap.defaults({ease: 'none'});
    for (let i = 0; i <= this.layers; i++) {
      const range = 1 / this.layers;
      const depth = range * i;
      $('.layer-' + i).attr('data-type', 'parallax');
      $('.layer-' + i).attr('data-depth', depth);
    }
    gsap.registerPlugin(ScrollTrigger);
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero1',
        start: 'top top',
        end: 'bottom top',
        pin: true,
        scrub: true,
        // markers: true
      }
    });
    if ( screen.width <= mobileSize ) {
      for (let i = 0; i < $('.ani-1 .scene1').length; i++){
        const layer = $('.ani-1 .layer-' + i).get(0);
        const depth = layer.dataset.depth;
        const xMove = -(layer.offsetWidth * Number(depth));
        // console.log('layer' + i + xMove);
        switch (i) {
          case 0:
            tl1.from($('.ani-1 .layer-' + i), { backgroundPosition: 'bottom left'}, 2);
            tl1.to($('.ani-1 .layer-' + i), { duration: 5, ease: 'expo.easeIn', backgroundPosition: '-8rem'}, 2);
            break;
          case 2:
            tl1.from($('.ani-1 .layer-' + i), { backgroundPosition: 'bottom left'}, 2);
            tl1.to($('.ani-1 .layer-' + i), { duration: 5, ease: 'expo.easeIn', backgroundPosition: '-5rem'}, 2);
            break;
          case 3:
            tl1.from($('.ani-1 .layer-' + i), { backgroundPosition: 'bottom left'}, 2);
            tl1.to($('.ani-1 .layer-' + i), { duration: 18, ease: 'expo.inOut', backgroundPosition: '-55rem'}, 2);
            break;
          case 4:
            tl1.to($('.ani-1 .layer-' + i), { x: -xMove / 3, duration: 5, ease: 'expo.inOut'}, 2);
            break;
          case 6:
            tl1.to($('.ani-1 .layer-' + i), { x: -xMove / 5, duration: 5, ease: 'expo.easeIn'}, 2);
            break;
          default: break;
        }
      }
    } else {
      for (let i = 0; i < $('.ani-1 .scene1').length; i++){
        const layer = $('.ani-1 .layer-' + i).get(0);
        const depth = layer.dataset.depth;
        const xMove = -(layer.offsetWidth * Number(depth));
        // console.log('layer' + i + xMove);
        switch (i) {
          case 0:
            tl1.to($('.ani-1 .layer-' + i), { scaleX: 1.1, duration: 5, ease: 'expo.easeIn'}, 2);
            break;
          case 1:
            tl1.to($('.ani-1 .layer-' + i), { x: xMove / 8, duration: 5}, 2);
            break;
          case 2:
            tl1.to($('.ani-1 .layer-' + i), { x: xMove / 10, duration: 5, ease: 'expo.easeIn'}, 2);
            break;
          case 3:
          tl1.to($('.ani-1 .layer-' + i), { x: xMove / 2, duration: 20, ease: 'expo.easeOut'}, 2);
          break;
          case 4:
            tl1.to($('.ani-1 .layer-' + i), { x: -xMove / 12, duration: 5, ease: 'expo.easeIn'}, 2);
            break;
          case 5:
            tl1.from($('.ani-1 .layer-' + i), { x: 5, scaleX: 0.8}, 2);
            tl1.to($('.ani-1 .layer-' + i), { x: 0, scaleX: 1.2 , duration: 12, ease: 'expo.easeOut'}, 2);
            break;
          case 6:
            tl1.to($('.ani-1 .layer-' + i), { x: -xMove / 5, duration: 5, ease: 'expo.easeIn'}, 2);
            break;
          default: break;
        }
      }
    }
    const tl2 = gsap.timeline({
      trigger: '#hero1',
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: true
    });
    // const splitText = new SplitText('.imgTitle', { type: 'words,chars'});
    if ( screen.width <= mobileSize ) {
      /*$(splitText.chars).each((index, el) => {
        tl2.fromTo($(el), {duration: 0.1, autoAlpha: 0, padding: '0 0.1rem'},
        { repeat: -1, yoyo: true, repeatDelay: 3, duration: 0.1, ease: 'circ.easeIn', autoAlpha: 0.5, padding: '0 0.8rem'},
        index * 0.1);
      });*/
      tl2.fromTo($('.imgTitle'), {duration: 0.1, autoAlpha: 0, filter: 'blur(25px)', letterSpacing: '1px'},
      { repeat: -1, yoyo: true, repeatDelay: 3, duration: 1.5, ease: 'circ.easeIn', autoAlpha: 0.5, filter: 'blur(0px)', letterSpacing: '6px'});
    } else {
      /*$(splitText.chars).each((index, el) => {
        tl2.fromTo($(el), {duration: 0.5, opacity: 0, padding: '0 1rem', filter: 'blur(50px)'},
        { repeat: -1, yoyo: true, repeatDelay: 3, duration: 1.5, opacity: 0.5, ease: 'circ.easeIn', padding: '0 3rem', filter: 'blur(0px)'},
        index * 0.1);
      });*/
      tl2.fromTo($('.imgTitle'), {duration: 0.5, opacity: 0, filter: 'blur(50px)', letterSpacing: '0.1em'},
      { repeat: -1, yoyo: true, repeatDelay: 3, duration: 1.5, opacity: 0.5, ease: 'circ.easeIn', filter: 'blur(0px)', letterSpacing: '0.3em'});
    }
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: '.bgs',
        start: 'top center',
        end: 'bottom center',
        toggleActions: 'restart complete reverse reverse',
        // markers: true,
      }
    });
    if ( screen.width <= mobileSize ) {
      for (let i = 0; i < this.bgs.length; i++){
        const depth = this.bgs[i].depth;
        const scale = this.bgs[i].scale;
        switch (i) {
          case 0:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeIn', x: depth}, 1);
            break;
          case 1:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeIn', x: '1rem', scale}, 1);
            break;
          case 2:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeOut', x: depth, scale}, 1);
            break;
          case 3:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeOut', x: -depth, scale}, 1);
            break;
          default: break;
        }
      }
    } else {
      for (let i = 0; i < this.bgs.length; i++){
        const depth = this.bgs[i].depth;
        const scale = this.bgs[i].scale;
        switch (i) {
          case 0:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeIn', x: depth, scale}, 1);
            break;
          case 1:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeIn', x: depth, scale}, 1);
            break;
          case 2:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeOut', x: depth, scale}, 1);
            break;
          case 3:
            tl3.to($('#bglayer-' + i), { duration: 3, ease: 'expo.easeOut', x: -depth, scale}, 1);
            break;
          default: break;
        }
      }
    }
    pics.forEach((value, index) => {
      const img: Image = new Image();
      img.largeUrl = 'assets/images/draw/draw' + index + '.jpg';
      img.id = index;
      img.width = value.width;
      img.height = value.height;
      img.size = `${img.width}x${img.height}`;
      img.thumbUrl = 'assets/images/draw/draw' + index + '_small.jpg';
      this.imgs.push(img);
    });
    const tl4 = gsap.timeline({
      scrollTrigger: {
      trigger: '.wrapper',
      start: 'top center',
      end: 'bottom center',
      toggleActions: 'play none none reset',
      // markers: true,
    }});
    if ( screen.width <= mobileSize ) {
      const yTop = (Number($('.wrapper').height) - Number($('.wrapper .text').height)) / 2;
      tl4.fromTo($('.wrapper .pic img'), {filter: 'brightness(1) blur(0)'}
      , {duration: 1, ease: 'circ.easeIn', filter: 'brightness(0.5) blur(3px)'}, 1);
      tl4.fromTo($('.wrapper .text'), {autoAlpha: 0, y: '40%'}
      , {duration: 1, ease: 'circ.easeIn', autoAlpha: 1, y: yTop}, 2);
    }
  }
}
