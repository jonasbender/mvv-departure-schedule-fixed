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
}
