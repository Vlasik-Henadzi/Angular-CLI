import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Dish} from "../shared/dish";
import {DishService} from '../service/dish.service';

import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {switchMap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Comment} from "../shared/comment";
import {MatSliderChange} from "@angular/material/slider";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {

  dish: Dish | undefined;
  dishcopy: Dish | undefined;
  errMess: string | undefined;
  dishIds: string[] | any;
  prev: string | undefined;
  next: string | undefined;
  visibility = 'shown';

  rating: any = 5;
  commentForm: FormGroup;
  comment: Comment | undefined;
  @ViewChild('fform')
  commentFormDirective: any;

  formErrors: any = {
    "rating": "",
    "comment": "",
    "author": ""
  };

  validationMessages: any = {
    "comment": {
      'required': 'Comment is required.',
    },
    "author": {
      'required': 'Author is required.',
      'minlength': 'Author must be at least 2 characters long.'
    }
  }

  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') public baseURL: any) {
    this.commentForm = this.fb.group({
      rating: [5,],
      comment: ['', Validators.required],
      author: ['', [Validators.required, Validators.minLength(2)]]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();//reset form validation messages

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    if (this.comment != undefined) {
      const d = new Date();
      this.comment.date = d.toISOString();
      //this.dish?.comments?.push(this.comment);
      this.dishcopy?.comments?.push(this.comment);
      this.dishservice.putDish(this.dishcopy)
        .subscribe(dish => {
            this.dish = dish;
            this.dishcopy = dish;
          },
          errmess => {
            this.dish = undefined;
            this.dishcopy = undefined;
            this.errMess = <any>errmess;
          });
    }
    this.commentFormDirective.resetForm();
    this.rating = 5;
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: ''
    });
  }

  updateSliderValue(event: MatSliderChange) {
    this.commentForm.value["rating"] = event.value;
  }

  ngOnInit() {
    this.dishservice.getDishIds()
      .subscribe(value => this.dishIds = value);

    this.route.params.pipe(switchMap((params: Params) => {
      this.visibility = 'hidden';
      return this.dishservice.getDish(+params['id']);
    }))
      .subscribe(dish => {
          this.dish = dish;
          this.dishcopy = dish;
          this.setPrevNext(dish.id);
          this.visibility = 'shown';
        },
        errmess => this.errMess = <any>errmess);
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
