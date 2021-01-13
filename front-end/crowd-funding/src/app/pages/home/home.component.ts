import { Component, OnInit } from '@angular/core';
import {DataService} from './../../_services/data-service'


export interface RequestList{
  message: string
  requests: {id: Number, author: string, title: string, description: string, imageurl: string, requiredFund: string, currentFund: string , created_at: string }
}

export interface Statistics{
  requests: Number,
  funds: Number,
  users: Number
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  requestList: RequestList
  statistics: Statistics
  isLoaded = false

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getrequests()
    .subscribe(
      data =>{
        this.requestList = data;
      }
    )
    
    this.dataService.getstatistics()
    .subscribe(data =>{
      this.statistics = data;
      this.isLoaded = true;
    })
  
  
  }

    
}
