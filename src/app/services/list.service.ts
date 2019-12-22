import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { ArticleList } from '../models/article-list';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  articleList: AngularFireList<any>;

  selectedArticleList: ArticleList = new ArticleList();

  constructor(private firebase: AngularFireDatabase) { }

  getArticlesList() {
    // return this.articleList = this.firebase.list('articles-list',ref => ref.orderByChild('name'));
    return this.articleList = this.firebase.list('articles-list');
  }

  insertArticleList(articleList: ArticleList) {
    this.articleList.push({
      article_key: articleList.article_key,
      comment: (articleList.comment) ? articleList.comment : ''
    });
  }

  updateArticleList(articleList: ArticleList) {
    this.articleList.update(articleList.$key, {
      article_key: articleList.article_key,
      comment: articleList.comment
    });
  }

  deleteArticleList($key: string) {
    this.articleList.remove($key);
  }
}
