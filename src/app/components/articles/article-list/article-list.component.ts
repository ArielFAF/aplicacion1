import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articleList: Article[];

  constructor(private articleService: ArticleService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.articleService.getArticles()
      .snapshotChanges()
      .subscribe(item => {
        this.articleList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x['$key'] = element.key;
          this.articleList.push(x as Article);
        });
      });
  }

  onEdit(article: Article) {
    this.articleService.selectedArticle = Object.assign({}, article);
  }

  onDelete($key: string) {
    // if(confirm('Esta seguro de eliminar?')){
    this.articleService.deleteArticle($key);
    // this.toastr.success('Eliminacion','Se elimino correctamente');
    // }
  }

}
