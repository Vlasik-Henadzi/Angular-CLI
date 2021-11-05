import {Component, Inject, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from "../service/dish.service";
import {Promotion} from "../shared/promotion";
import {PromotionService} from "../service/promotion.service";
import {Leader} from "../shared/leader";
import {LeaderService} from "../service/leader.service";
import {expand, flyInOut} from "../animations/app.animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish | undefined;
  promotion: Promotion | undefined;
  leader: Leader | undefined;
  errDishMess: string | undefined;
  errPromotionMess: string | undefined;
  errLeaderMess: string | undefined;

  constructor(private dishService: DishService, private promotionService: PromotionService,
              private leaderService: LeaderService,
              @Inject('BaseURL') public baseURL: any) {
  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe(value => this.dish = value,
        errmess => this.errDishMess = <any>errmess);
    this.promotionService.getFeaturedPromotions()
      .subscribe(value => this.promotion = value,
        errmess => this.errPromotionMess = <any>errmess);
    this.leaderService.getFeaturedLeaders()
      .subscribe(value => this.leader = value,
        errmess => this.errLeaderMess = <any>errmess);
  }

}
