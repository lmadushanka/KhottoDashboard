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
import { AddUserComponent } from './Components/modules/add-user/add-user.component';
import { UsersComponent } from './Components/modules/users/users.component';
import { BannerComponent } from './Components/modules/banner/banner.component';
import { AddBannerComponent } from './Components/modules/add-banner/add-banner.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: '',
    component: DefaultComponent,
    children: [
      { path: 'dashboard', component: HomeComponent },
      { path: 'provider', component: ProviderComponent },
      { path: 'add-provider', component: AddProviderComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'add-item', component: AddItemComponent },
      { path: 'errors', component: ErrorsComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'add-category', component: AddCategoryComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'users', component: UsersComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'add-banner', component: AddBannerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
