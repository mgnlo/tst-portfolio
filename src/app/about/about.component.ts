import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { gsap, CSSPlugin } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
// import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
const mobileSize = 768;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void{
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, CSSPlugin);
    gsap.defaults({ease: 'none'});
    gsap.set('.ball', {xPercent: -100, yPercent: -100});
    const fromComp = ( screen.width >= mobileSize ) ? true : false;
    this.showTimeLine(fromComp);
  }

  showTimeLine(fromComp: boolean): void{
    let timeline: gsap.core.TimelineChild;
    const actBall = ( fromComp === true ) ? $('.showOnComp .ball1') : $('.showOnPhone .ball1');
    const theLine = ( fromComp === true ) ? '.showOnComp .theLine' : '.showOnPhone .theLine';
    const device = ( fromComp === true ) ? ' .showOnComp ' : ' .showOnPhone ';
    if ( fromComp === true ) {
      const sections = gsap.utils.toArray('.showOnComp .line');
      timeline = gsap.timeline({
        defaults: {
          duration: 0.1,
          autoAlpha: 1,
          scale: 1.1,
          transformOrigin: 'center',
          ease: 'elastic(10, 5)',
          // start: 'center 45%',
          // end: 'bottom bottom'
        }
      })
      .to(device + '.ball2,' + device + '.text1,' + device + '.de1,' + device + '.dc1', { duration: 0.5 }, 0.15)
      .to(device + '.ball3,' + device + '.text2,' + device + '.de2,' + device + '.dc2', {}, 0.3)
      .to(device + '.ball4,' + device + '.text3,' + device + '.de3,' + device + '.dc3', {}, 0.4)
      .to(device + '.ball5,' + device + '.text4,' + device + '.de4,' + device + '.dc4', {}, 0.5)
      .to(device + '.ball6,' + device + '.text5', {}, 0.61)
      .to(device + '.ball7,' + device + '.text6,' + device + '.de6,' + device + '.dc6', {}, 0.84)
      .to(device + '.ball8,' + device + '.text7', {}, 0.95);
    } else {
      const sections = gsap.utils.toArray('.showOnPhone .line');
      timeline = gsap.timeline({
        defaults: {
          duration: 0.1,
          autoAlpha: 1,
          scale: 1.1,
          transformOrigin: 'center',
          ease: 'elastic(10, 5)',
          // start: 'center 45%',
          // end: 'bottom bottom'
        }
      })
      .to(device + '.ball2,' + device + '.text1,' + device + '.de1,' + device + '.dc1', { duration: 0.5 }, 0.13)
      .to(device + '.ball3,' + device + '.text2,' + device + '.de2,' + device + '.dc2', {}, 0.33)
      .to(device + '.ball4,' + device + '.text3,' + device + '.de3,' + device + '.dc3', {}, 0.46)
      .to(device + '.ball5,' + device + '.text4,' + device + '.de4,' + device + '.dc4', {}, 0.6)
      .to(device + '.ball6,' + device + '.text5,' + device + '.de5,' + device + '.dc5', {}, 0.86)
      .to(device + '.ball7,' + device + '.text6,' + device + '.de6,' + device + '.dc6', {}, 0.95);
    }

    const action = gsap.timeline({
      defaults: {
        duration: 1
      },
      scrollTrigger: {
        trigger: '#svg',
        scrub: true,
        start: '0 center',
        end: 'bottom bottom'
    }})
    .to(actBall, {duration: 0.01, autoAlpha: 1})
    .from(theLine, {}, 0)
    .to(actBall, {
      motionPath: {
        path: theLine,
        alignOrigin: [0.5, 0.5],
        align: theLine
      }
    }, 0)
    .add(timeline, 0);
  }
}
