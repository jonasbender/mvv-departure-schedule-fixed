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

  

  getCurrentSchedule(transportTypes: string) {
    console.log(this.transportTypes);
    return this.http.get('https://www.mvg.de/api/bgw-pt/v3/departures?globalId='+ this.globalId +'&limit=' + this.limit + '&offsetInMinutes=' + this.offsetInMinutes + '&transportTypes=' + transportTypes)
  }

}
