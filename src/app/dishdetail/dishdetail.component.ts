import {Component, OnInit} from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from '../service/dish.service';

import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish | undefined;
  dishIds: string[] | any;
  prev: string | undefined;
  next: string | undefined;

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(value => this.dishIds = value);

    this.route.params
      .pipe(switchMap((params: Params) => this.dishservice.getDish(params["id"])))
      .subscribe(dish => {
        this.dish = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string | any) {
    const index = this.dishIds?.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds?.length + index - 1) % this.dishIds?.length];
    this.next = this.dishIds[(this.dishIds?.length + index + 1) % this.dishIds?.length];
  }

  goBack(): void {
    this.location.back();
  }
}
