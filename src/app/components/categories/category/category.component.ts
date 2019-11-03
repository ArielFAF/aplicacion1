import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Service
import { CategoryService } from "../../../services/category.service";
// import { ToastrService } from "ngx-toastr";

// Category Class
import { Category } from "../../../models/category";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(public categoryService: CategoryService
    // private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.categoryService.getCategories();
    this.resetForm();
  }

  onSubmit(categoryForm: NgForm) {
    if(categoryForm.value.$key == null) {
      this.categoryService.insertCategory(categoryForm.value);
    }
    else {
      this.categoryService.updateCategory(categoryForm.value); 
    }
    this.resetForm(categoryForm);
    // this.toastr.success('Confirmacion','Grabacion correcta');
  }

  resetForm(categoryForm?: NgForm) {
    if(categoryForm != null) {
      categoryForm.reset();
      this.categoryService.selectedCategory = new Category();
    }
  }

}
