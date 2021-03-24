import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ChartDataSets, ChartType, RadialChartOptions} from 'chart.js';
import { Label } from 'ng2-charts';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import ScrollTrigger from 'gsap/ScrollTrigger';
const mobileSize = 768;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  raderChartOptions: RadialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 16,
        fontFamily: 'Karla',
        fontColor: '#7e5f4e'
      }
    },
    scale: {
      ticks: {
        display: true,
        fontSize: 10,
        max: 100,
      },
      pointLabels: {
        fontSize: 14,
        fontFamily: 'Karla',
        lineHeight: 1.5
      },
      animate: true
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        right: -100
      }
    },
    animation: {
      duration: 500,
      easing: 'easeInOutQuad',
      animateScale: true
    }
  };

  raderChartLabels: Label[] = [
    'E外向型(Extraversion)', 'N直覺(iNtuition)', 'T邏輯型(Thinking)', 'J計畫型(Judging)', 'A堅定型(Assertive)',
    'I內向(Interoverted)', 'S現實型(Observant)', 'F感受型(Feeling)', 'P展望型(Prospecting)', 'T謹慎型(Turbulent)'
  ];

  raderChartData: ChartDataSets[] = [
    { data: [31, 70, 24, 29, 43, 69,  30, 76, 71, 57],
      label: 'MBTI職業性格測試結果 INFP-T調停者',
      pointRadius: 4,
      hitRadius: 3,
      pointBackgroundColor: '#a38e84',
      borderColor: '#a38e84',
      backgroundColor: '#d6beb3bb'}
  ];
  radarChartType: ChartType = 'radar';
  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger, Draggable);
    this.initScrollTriggers();
  }

  initScrollTriggers(): void{
    document.querySelectorAll('.chart').forEach(chart => {
      const scrollShow =  gsap.timeline({
        scrollTrigger: {
          trigger: chart,
          pin: true,
          // scrub: true,
          start: 'top center',
          end: 'bottom bottom',
          // markers: true,
          toggleActions: 'play none none reverse'
        }
      });
      scrollShow.from(chart, { y: 30, opacity: 0 });
    });
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
