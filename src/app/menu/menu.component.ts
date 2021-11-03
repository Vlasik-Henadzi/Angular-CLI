import {Component, Inject, OnInit} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from "../service/dish.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[] | undefined;

  selectedDish: Dish | undefined;
  errMess: string | undefined;
  constructor(private dishService: DishService,
              @Inject('BaseURL') public baseURL: any) {
  }

  ngOnInit(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
