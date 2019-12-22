import { Component, OnInit } from '@angular/core';
import { ArticleList } from 'src/app/models/article-list';
import { ListService } from 'src/app/services/list.service';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import * as _ from 'lodash';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articleList: ArticleList[];
  tmpList: ArticleList[];

  articles: Article[];

  categories: Category[];

  constructor(private listService: ListService,
    public articleService: ArticleService,
    public categoryService: CategoryService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
      .snapshotChanges()
      .subscribe(item => {
        this.articles = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.articles.push(x as Article);
        });
      });

    this.categoryService.getCategories()
      .snapshotChanges()
      .subscribe(item => {
        this.categories = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.categories.push(x as Category);
        });
      });

    this.listService.getArticlesList()
      .snapshotChanges()
      .subscribe(item => {
        this.articleList = [];
        this.tmpList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;

          let a = _.find(this.articles, ['$key', x['article_key']]);

          let c = _.find(this.categories, ['$key',a['category_key']]);

          x['name'] = a['name'];
          x['order'] = c['order'];
          this.tmpList.push(x as ArticleList);
        });
        this.articleList = _.sortBy(this.tmpList, ['order','name']);
      });
  }

  onEdit(articleList: ArticleList) {
    this.listService.selectedArticleList = Object.assign({}, articleList);
  }

  onDelete($key: string) {
    // if(confirm('Esta seguro de eliminar?')){
    this.listService.deleteArticleList($key);
    // this.toastr.success('Eliminacion','Se elimino correctamente');
    // }
  }

}
