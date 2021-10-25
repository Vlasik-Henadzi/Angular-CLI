import {Component, OnInit} from '@angular/core';
import {Leader} from "../shared/leader";
import {LeaderService} from "../service/leader.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[] | undefined;

  constructor(private leaderService: LeaderService) {
  }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe(value => this.leaders = value);
  }

}
