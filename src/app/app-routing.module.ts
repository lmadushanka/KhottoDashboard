import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './Components/modules/home/home.component';
import { LoginComponent } from './Components/modules/login/login.component';
import { ForgotPasswordComponent } from './Components/modules/forgot-password/forgot-password.component';
import { ProviderComponent } from './Components/modules/provider/provider.component';
import { ResetPasswordComponent } from './Components/modules/reset-password/reset-password.component';
import { AddProviderComponent } from './Components/modules/add-provider/add-provider.component';
import { ItemsComponent } from './Components/modules/items/items.component';
import { AddItemComponent } from './Components/modules/add-item/add-item.component';
import { ErrorsComponent } from './Components/modules/errors/errors.component';
import { CategoryComponent } from './Components/modules/category/category.component';
import { AddCategoryComponent } from './Components/modules/add-category/add-category.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: DefaultComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: '', component: HomeComponent },
      { path: 'provider', component: ProviderComponent },
      { path: 'add-provider', component: AddProviderComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'add-item', component: AddItemComponent },
      { path: 'errors', component: ErrorsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
