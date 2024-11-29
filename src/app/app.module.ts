import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {UserComponent} from "./components/user/user.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RestaurantComponent} from "./components/restaurant/restaurant.component";
import {RestaurantCategoryComponent} from "./components/restaurant-category/restaurant-category.component";
import {MenuComponent} from "./components/menu/menu.component";
import {MenuCategoryComponent} from "./components/menu-category/menu-category.component";



const routes: Routes = [

  // Main layout routes
  { path: '', component: HomepageComponent },
  { path: 'user', component: UserComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'restaurant-category', component: RestaurantCategoryComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-category', component: MenuCategoryComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: true}), // Only for debugging purposes
    HttpClientModule,
    FormsModule
  ],
  exports: [RouterModule],

  declarations: [
    AppComponent,
    UserComponent,
    HomepageComponent,
    RestaurantComponent,
    RestaurantCategoryComponent,
    MenuComponent,
    MenuCategoryComponent
  ],
  providers: [
    provideAnimationsAsync(),
    ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


