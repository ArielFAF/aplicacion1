import { Component, OnInit } from '@angular/core';
import { ArticleList } from 'src/app/models/article-list';
import { ListService } from 'src/app/services/list.service';
import { ArticleService } from 'src/app/services/article.service';
import { NgForm } from '@angular/forms';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {

  articleList: Article[];

  constructor(public listService: ListService,
    private articleService: ArticleService
    // private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.listService.getArticlesList();

    this.resetForm();

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

  onSubmit(artListForm: NgForm) {
    if (artListForm.value.$key == null) {
      this.listService.insertArticleList(artListForm.value);
    }
    else {
      this.listService.updateArticleList(artListForm.value);
    }
    this.resetForm(artListForm);
    // this.toastr.success('Confirmacion','Grabacion correcta');
  }

  resetForm(artListForm?: NgForm) {
    if (artListForm != null) {
      artListForm.reset();
      this.listService.selectedArticleList = new ArticleList();
    }
  }

}
