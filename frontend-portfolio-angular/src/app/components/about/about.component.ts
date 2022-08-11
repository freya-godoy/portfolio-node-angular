import { Component, OnInit } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
public title: string;
public subtitle: string;
public email: string;


  constructor() {
    this.title = "Freya Godoy";
    this.subtitle = "Desarrolladora Web";
    this.email = "Gatito@Espacial.com";
   }

  ngOnInit(): void {
  }

}
