import {Component, Inject, OnInit} from '@angular/core';
import {Leader} from "../shared/leader";
import {LeaderService} from "../service/leader.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders: Leader[] | undefined;
  errMess: string | undefined;

  constructor(private leaderService: LeaderService,
              @Inject('BaseURL') public baseURL: any) {
  }

  ngOnInit(): void {
    this.leaderService.getLeaders()
      .subscribe(value => this.leaders = value,
        errmess => this.errMess = <any>errmess);
  }

}
