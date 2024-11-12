import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/service/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  departures: any;
  interval: any;
  transportTypes!: string[];
  currentTime: Date = new Date();

  constructor(
    private scheduleService: ScheduleService,

  ) { }

  ngOnInit(): void {
    this.transportTypes = this.scheduleService.transportTypes.split(',');

    this.getData();
    this.interval = setInterval(()=>{
      this.getData();
    },30000);

    setInterval(() =>{
      this.currentTime = new Date();
    }, 1000);
    

  }

  getData() {
    console.log(this.transportTypes);
    this.scheduleService.getCurrentSchedule(this.transportTypes.join(',')).subscribe(
      data => {
        this.departures = data;
        console.log(this.departures);
      }
    )
  }

  timeTillDeparture(realtimeDepartureTime: number) {
    var currentTime = new Date().getTime();
    var timeDifference = realtimeDepartureTime - currentTime;
    timeDifference = Math.floor(timeDifference / 1000 / 60);

    console.log ("time till departure: " + timeDifference );
    return timeDifference;
  }

  updateTransportTypes(transportType: string) {
    if (this.transportTypes.includes(transportType)) {
      this.transportTypes = this.transportTypes.filter(type => type !== transportType);
    } else {
      this.transportTypes.push(transportType);
    }
    console.log("Tranport Types: "+this.transportTypes);
    this.getData();
  }

  getTransportIcon(type: string): string {
    return type === 'UBAHN' 
        ? 'https://www.mvg.de/.resources/mvgde-icons/color/transport-ubahn.svg' 
        : 'https://www.mvg.de/.resources/mvgde-icons/color/transport-bus.svg';
  }

  getOccupancyPathData(level: string): string {
    // SVG path data for different occupancy levels
    switch (level) {
      case 'LOW':
      // SVG path data for one filled person out of three
      return '<path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M18.5995 9.78186C19.7833 8.21519 21.648 7.2 23.7486 7.2C25.8493 7.2 27.714 8.21519 28.8977 9.78186C28.9031 9.78894 28.9085 9.79605 28.9139 9.80318C29.0157 9.93778 29.1248 10.0821 29.2028 10.2213C29.2972 10.3899 29.3671 10.5848 29.3628 10.8219C29.3593 11.0125 29.3016 11.1909 29.2315 11.3318C29.1613 11.4727 29.0538 11.6263 28.9038 11.744C28.7038 11.901 28.4861 11.9565 28.2927 11.9797C28.1229 12.0001 27.9218 12 27.7196 12C27.7105 12 27.7014 12 27.6923 12H19.805C19.7959 12 19.7868 12 19.7776 12C19.5754 12 19.3743 12.0001 19.2046 11.9797C19.0112 11.9565 18.7934 11.901 18.5935 11.744C18.4435 11.6263 18.336 11.4727 18.2658 11.3318C18.1957 11.1909 18.138 11.0125 18.1345 10.8219C18.1301 10.5848 18.2001 10.3899 18.2945 10.2213C18.3725 10.0821 18.4816 9.93778 18.5834 9.80318C18.5888 9.79605 18.5942 9.78894 18.5995 9.78186Z" fill="#BCBFC8"></path><path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M20.4486 3.3C20.4486 1.47746 21.9261 0 23.7486 0C25.5712 0 27.0486 1.47746 27.0486 3.3C27.0486 5.12254 25.5712 6.6 23.7486 6.6C21.9261 6.6 20.4486 5.12254 20.4486 3.3Z" fill="#BCBFC8"></path><path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M9.79203 9.78186C10.9758 8.21519 12.8405 7.2 14.9411 7.2C17.0418 7.2 18.9065 8.21519 20.0903 9.78186C20.0956 9.78894 20.101 9.79605 20.1064 9.80318C20.2082 9.93778 20.3173 10.0821 20.3953 10.2213C20.4897 10.3899 20.5596 10.5848 20.5553 10.8219C20.5518 11.0125 20.4941 11.1909 20.424 11.3318C20.3538 11.4727 20.2463 11.6263 20.0963 11.744C19.8963 11.901 19.6786 11.9565 19.4852 11.9797C19.3154 12.0001 19.1143 12 18.9121 12C18.903 12 18.8939 12 18.8848 12H10.9975C10.9884 12 10.9793 12 10.9701 12C10.7679 12 10.5668 12.0001 10.3971 11.9797C10.2037 11.9565 9.98595 11.901 9.78596 11.744C9.63599 11.6263 9.52846 11.4727 9.45833 11.3318C9.38821 11.1909 9.33046 11.0125 9.32697 10.8219C9.32264 10.5848 9.3926 10.3899 9.487 10.2213C9.56499 10.0821 9.67413 9.93778 9.77591 9.80318C9.78131 9.79605 9.78668 9.78894 9.79203 9.78186Z" fill="#BCBFC8"></path><path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M11.6411 3.3C11.6411 1.47746 13.1186 0 14.9411 0C16.7637 0 18.2411 1.47746 18.2411 3.3C18.2411 5.12254 16.7637 6.6 14.9411 6.6C13.1186 6.6 11.6411 5.12254 11.6411 3.3Z" fill="#BCBFC8"></path><path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M0.984538 9.78186C2.16832 8.21519 4.03298 7.2 6.13365 7.2C8.23432 7.2 10.099 8.21519 11.2828 9.78186C11.2881 9.78894 11.2935 9.79605 11.2989 9.80318C11.4007 9.93778 11.5098 10.0821 11.5878 10.2213C11.6822 10.3899 11.7522 10.5848 11.7478 10.8219C11.7443 11.0125 11.6866 11.1909 11.6165 11.3318C11.5463 11.4727 11.4388 11.6263 11.2888 11.744C11.0888 11.901 10.8711 11.9565 10.6777 11.9797C10.508 12.0001 10.3068 12 10.1046 12C10.0955 12 10.0864 12 10.0773 12H2.18999C2.18088 12 2.17176 12 2.16265 12C1.96045 12 1.75934 12.0001 1.58964 11.9797C1.3962 11.9565 1.17846 11.901 0.978465 11.744C0.828498 11.6263 0.720962 11.4727 0.650836 11.3318C0.580711 11.1909 0.522964 11.0125 0.519478 10.8219C0.515142 10.5848 0.585107 10.3899 0.679508 10.2213C0.7575 10.0821 0.866636 9.93778 0.968418 9.80318C0.973814 9.79605 0.979189 9.78894 0.984538 9.78186Z" fill="#4C556C"></path><path _ngcontent-cot-c6="" fill-rule="evenodd" clip-rule="evenodd" d="M2.83365 3.3C2.83365 1.47746 4.31111 0 6.13365 0C7.95619 0 9.43365 1.47746 9.43365 3.3C9.43365 5.12254 7.95619 6.6 6.13365 6.6C4.31111 6.6 2.83365 5.12254 2.83365 3.3Z" fill="#4C556C"></path>'; // Replace with actual path data if needed
    case 'MEDIUM':
      // SVG path data for two filled people out of three
      return 'M2,12 A1.5,1.5 0 1,1 2,15 A1.5,1.5 0 1,1 2,12 M6,12 A1.5,1.5 0 1,1 6,15 A1.5,1.5 0 1,1 6,12 M10,12 A1.5,1.5 0 1,1 10,15 A1.5,1.5 0 1,1 10,12 M2,9 L2,8 A1,1 0 0,1 3,7 L3,8 Z M6,9 L6,8 A1,1 0 0,1 7,7 L7,8 Z'; // Replace with actual path data if needed
    case 'HIGH':
      // SVG path data for all three people filled
      return 'M2,12 A1.5,1.5 0 1,1 2,15 A1.5,1.5 0 1,1 2,12 M6,12 A1.5,1.5 0 1,1 6,15 A1.5,1.5 0 1,1 6,12 M10,12 A1.5,1.5 0 1,1 10,15 A1.5,1.5 0 1,1 10,12 M2,9 L2,8 A1,1 0 0,1 3,7 L3,8 Z M6,9 L6,8 A1,1 0 0,1 7,7 L7,8 Z M10,9 L10,8 A1,1 0 0,1 11,7 L11,8 Z'; // Replace with actual path data if needed
      default:
        return '';
    }
  }

  
}
