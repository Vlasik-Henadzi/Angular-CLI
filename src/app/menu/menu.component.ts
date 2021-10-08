import {Component, OnInit} from '@angular/core';
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

  constructor(private dishService: DishService) {
  }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes()
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}