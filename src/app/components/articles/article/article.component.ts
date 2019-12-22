import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  categoryList: Category[];

  constructor(public articleService: ArticleService,
    private categoryService: CategoryService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.articleService.getArticles();

    this.resetForm();

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

  onSubmit(articleForm: NgForm) {
    if (articleForm.value.$key == null) {
      this.articleService.insertArticle(articleForm.value);
    }
    else {
      this.articleService.updateArticle(articleForm.value);
    }
    this.resetForm(articleForm);
    // this.toastr.success('Confirmacion','Grabacion correcta');
  }

  resetForm(articleForm?: NgForm) {
    if (articleForm != null) {
      articleForm.reset();
      this.articleService.selectedArticle = new Article();
      // this.articleService.selectedArticle.category_key = null;
    }
  }

}
