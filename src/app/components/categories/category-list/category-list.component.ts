import { Component, OnInit } from '@angular/core';

// Services
import { CategoryService } from "../../../services/category.service";
// import { ToastrService } from "ngx-toastr";

// Class Category
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList: Category[];

  constructor(private categoryService: CategoryService
    // private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.categoryService.getCategories()
    .snapshotChanges()
    .subscribe(item => {
      this.categoryList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x['$key'] = element.key;
        this.categoryList.push(x as Category);
      });
    });
  }

  onEdit(category: Category) {
    this.categoryService.selectedCategory = Object.assign({},category);
  }

  onDelete($key: string) {
    // if(confirm('Esta seguro de eliminar?')){
      this.categoryService.deleteCategory($key);
      // this.toastr.success('Eliminacion','Se elimino correctamente');
    // }
  }

}
