import {Component, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from "../service/dish.service";
import {Promotion} from "../shared/promotion";
import {PromotionService} from "../service/promotion.service";
import {Leader} from "../shared/leader";
import {LeaderService} from "../service/leader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish | undefined;
  promotion: Promotion | undefined;
  leader: Leader | undefined;

  constructor(private dishService: DishService, private promotionService: PromotionService,
              private leaderService: LeaderService) {
  }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .then(value => this.dish = value);
    this.promotion = this.promotionService.getFeaturedPromotions();
    this.leader = this.leaderService.getFeaturedLeaders();
  }

}
