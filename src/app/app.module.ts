import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RouterModule, Routes } from '@angular/router';

//firebase 
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//componets
import { ProductsComponent } from './components/products/products.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { RadiosComponent } from './components/radios/radios.component';
import { RecetarioComponent } from './components/recetario/recetario.component';
import { RecetaComponent } from './components/recetario/receta/receta.component';

//services
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { ArticleService } from './services/article.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'radios', component: RadiosComponent },
  {
    path: 'recetario',
    children: [
      { path: '', component: RecetarioComponent },
      {
        path: 'receta',
        component: RecetaComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent,
    ProductComponent,
    CategoriesComponent,
    CategoryComponent,
    CategoryListComponent,
    RadiosComponent,
    RecetarioComponent,
    RecetaComponent,
    ArticlesComponent,
    ArticleListComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [
    ProductService,
    CategoryService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
