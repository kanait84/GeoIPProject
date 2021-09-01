import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiServiceService} from "../api-service.service";

@Component({
  selector: 'app-geoip',
  templateUrl: './geoip.component.html',
  styleUrls: ['./geoip.component.css']
})
export class GeoipComponent implements OnInit {
  myForm: FormGroup; CurrentIp; loader = false; message = '';
  currentCountry; currentCity; currentTimeZone; localTime;
  informedCountry; informedCity; informedTimeZone; informedlocalTime;
  informedExactlocalTime; today; endDate; localtimeConv1; localtimeConv2;
  informtimeConv1; informtimeConv2; hourDiff = 0;
  constructor(public route: Router, public api: ApiServiceService) {
    this.myForm = new FormGroup({
      ipaddress: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.loader = false;
    this.message = '';
    this.getCurrentIp();
    console.log(this.CurrentIp);
  }

  getCurrentIp() {
    this.api.getCurrentIp().subscribe( res => {
      this.loader = true;
      // @ts-ignore
      this.getCurrentIPdetails(res.ip);
    }, (err) => {
      this.message = err.error.mesaage;
      this.loader = false;
    }, () => {
      this.loader = false;
    });
  }


  getCurrentIPdetails(ip) {
    this.api.getIPdetails(ip).subscribe( res => {
      this.loader = true;
      console.log('res', res);
      // @ts-ignore
      this.currentCountry = res.country_name;
      // @ts-ignore
      this.currentCity = res.city;
      // @ts-ignore
      this.currentTimeZone = res.time_zone.name;
      // @ts-ignore
      this.localTime = res.time_zone.current_time;
    }, (err) => {
      this.message = err.error.mesaage;
      this.loader = false;
    }, () => {
      this.loader = false;
    });
  }



  getIPdetails(ip) {
    this.api.getIPdetails(ip).subscribe( res => {
      this.loader = true;
      console.log('res', res);
      // @ts-ignore
      this.informedCountry = res.country_name;
      // @ts-ignore
      this.informedCity = res.city;
      // @ts-ignore
      this.informedTimeZone = res.time_zone.name;
      // @ts-ignore
      this.informedExactlocalTime = res.time_zone.current_time;
      // @ts-ignore
      var diff = this.getDataDiff(this.localTime, res.time_zone.current_time);
      console.log(diff);

      this.hourDiff = diff.hour;

      // @ts-ignore
      this.informedlocalTime = res.time_zone.current_time.split(' ');
      // @ts-ignore
      let hour = (this.informedlocalTime[1].split(':'))[0];
      // @ts-ignore
      let min = (this.informedlocalTime[1].split(':'))[1];
      let part = hour > 12 ? 'pm' : 'am';
      min = (min+'').length == 1 ? `0${min}` : min;
      hour = hour > 12 ? hour - 12 : hour;
      hour = (hour+'').length == 1 ? `0${hour}` : hour;
      this.informedlocalTime = hour + ':' + min + ' '+ part;
      // @ts-ignore
      console.log('res.time_zone.current_time', this.informedlocalTime);
    }, (err) => {
      this.message = err.error.mesaage;
      this.loader = false;
    }, () => {
      this.loader = false;
    });
  }

  getDataDiff(startDate, endDate) {
    this.localtimeConv1 = startDate.split(' ');
    this.localtimeConv2 = this.localtimeConv1[1].split(':');
    console.log(this.localtimeConv1[0] + this.localtimeConv2[0] + ':' + this.localtimeConv2[1]);
    this.localtimeConv1 = this.localtimeConv1[0] + ' '+ this.localtimeConv2[0] + ':' + this.localtimeConv2[1];
    console.log(this.localtimeConv1);

    this.informtimeConv1 = endDate.split(' ');
    this.informtimeConv2 = this.informtimeConv1[1].split(':');
    this.informtimeConv1 = this.informtimeConv1[0] + ' '+ this.informtimeConv2[0] + ':' + this.informtimeConv2[1];
    console.log(this.informtimeConv1);

    this.today = new Date(this.localtimeConv1);
    this.endDate = new Date(this.informtimeConv1);
    let days = (this.endDate - this.today) / (1000 * 60 * 60 * 24);
    let hours = (Math.abs(this.endDate - this.today) / (1000 * 60 * 60) % 24);
    let minutes = (Math.abs(this.endDate.getTime() - this.today.getTime()) / (1000 * 60) % 60);
    let seconds = (Math.abs(this.endDate.getTime() - this.today.getTime()) / (1000) % 60);

    /*console.log('days', days);
    console.log('hours', hours);
    console.log('minutes', minutes);
    console.log('seconds', seconds);*/
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }




}
