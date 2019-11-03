import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryList: AngularFireList<any>;

  selectedCategory: Category = new Category();

  constructor(private firebase: AngularFireDatabase) { }

  getCategories() {
    return this.categoryList = this.firebase.list('categories',ref => ref.orderByChild('order'));
  }

  insertCategory(category: Category) {
    this.categoryList.push({
      name: category.name,
      order: category.order
    });
  }

  updateCategory(category: Category) {
    this.categoryList.update(category.$key, {
      name: category.name,
      order: category.order
    });
  }

  deleteCategory($key: string) {
    this.categoryList.remove($key);
  }
}
