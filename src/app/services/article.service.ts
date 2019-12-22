import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articleList: AngularFireList<any>;

  selectedArticle: Article = new Article();

  constructor(private firebase: AngularFireDatabase) { }

  getArticles() {
    // return this.articleList = this.firebase.list('articles',ref => ref.orderByChild('order'));
    return this.articleList = this.firebase.list('articles',ref => ref.orderByChild('name'));
  }

  insertArticle(article: Article) {
    this.articleList.push({
      name: article.name.charAt(0).toUpperCase() + article.name.slice(1),
      category_key: article.category_key
    });
  }

  updateArticle(article: Article) {
    this.articleList.update(article.$key, {
      name: article.name.charAt(0).toUpperCase() + article.name.slice(1),
      category_key: article.category_key
    });
  }

  deleteArticle($key: string) {
    this.articleList.remove($key);
  }

}
