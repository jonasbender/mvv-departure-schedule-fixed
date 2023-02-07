import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  return: any;
  globalId = "de:09162:1180";
  offsetInMinutes = 2;
  limit = 10;
  transportTypes = "UBAHN"
  stationName = "Candidplatz"

  constructor(
    private http: HttpClient
  ) { }

  getStationId(stationName: string) {
    return this.http.get('https://www.mvg.de/api/fahrinfo/location/query?q=' + stationName);
  }

  

  getCurrentSchedule() {
    return this.http.get('https://www.mvg.de/api/fib/v2/departure?globalId='+ this.globalId +'&limit=' + this.limit + '&offsetInMinutes=' + this.offsetInMinutes + '&transportTypes=' + this.transportTypes)
  }

}
