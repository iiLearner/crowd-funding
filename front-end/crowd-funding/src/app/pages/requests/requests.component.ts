import { Component, OnInit } from '@angular/core';
import {DataService} from './../../_services/data-service'

export interface Statistics{
  requests: Number,
  funds: Number,
  updated_at: Number
}

export interface RequestList{
  message: string
  requests: {id: Number, author: string, title: string, description: string, imageurl: string, requiredFund: string, currentFund: string , created_at: string }
}


@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  statistics: Statistics
  requestList: RequestList
  isLoaded = false

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.get_userstatistics()
    .subscribe(data =>{
      this.statistics = data;
    })

    this.dataService.get_userrequests()
    .subscribe(data=>{
      this.requestList = data;
      this.isLoaded = true;
    })


  }

}
