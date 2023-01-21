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

  constructor(
    private scheduleService: ScheduleService,

  ) { }

  ngOnInit(): void {
    this.getData();
    this.interval = setInterval(()=>{
      this.getData();
    },30000);
    

  }

  getData() {
    this.scheduleService.getCurrentSchedule().subscribe(
      data => {
        this.departures = data;
        console.log(this.departures);
      }
    )
  }

}
