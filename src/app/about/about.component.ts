import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { gsap, CSSPlugin } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
// import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

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
    this.showTimeLine();
  }

  showTimeLine(): void{
    const sections = gsap.utils.toArray('.line');
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.1,
        autoAlpha: 1,
        scale: 1.1,
        transformOrigin: 'center',
        ease: 'elastic(10, 5)',
        // start: 'center 45%',
        // end: 'bottom bottom'
      }
    }).to('.ball02, .text01, .de01, .dc01', { duration: 0.5 }, 0.15)
    .to('.ball03, .text02, .de02, .dc02', {}, 0.3)
    .to('.ball04, .text03, .de03, .dc03', {}, 0.4)
    .to('.ball05, .text04, .de04, .dc04', {}, 0.5)
    .to('.ball06, .text05', {}, 0.61)
    .to('.ball07, .text06, .de06, .dc06', {}, 0.84)
    .to('.ball08, .text07', {}, 0.95);

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
    .to('.ball01', {duration: 0.01, autoAlpha: 1})
    .from('.theLine', {}, 0)
    .to('.ball01', {
      motionPath: {
        path: '.theLine',
        alignOrigin: [0.5, 0.5],
        align: '.theLine'
      }
    }, 0)
    .add(timeline, 0);
  }
}
