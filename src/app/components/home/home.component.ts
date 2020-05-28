import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private title = "MS Onboarding Portal - Home";

  constructor(private titleService: Title) { }

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.setTitle();
  }

}
