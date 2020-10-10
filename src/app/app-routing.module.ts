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
import { DiscountComponent } from './Components/modules/discount/discount.component';
import { AddDiscountComponent } from './Components/modules/add-discount/add-discount.component';
import { ViewProviderComponent } from 'src/app/Components/modules/view-provider/view-provider.component';
import { OrderComponent } from 'src/app/Components/modules/order/order.component';
import { ViewOrderComponent } from 'src/app/Components/modules/view-order/view-order.component';
import { FacilityComponent } from './Components/modules/facility/facility.component';
import { AddFacilityComponent } from './Components/modules/add-facility/add-facility.component';
import { ViewItemComponent } from './Components/modules/view-item/view-item.component';
import { EditProviderComponent } from './Components/modules/edit-provider/edit-provider.component';
import { ResourceComponent } from './Components/modules/resource/resource.component';
import { AddResourceComponent } from './Components/modules/add-resource/add-resource.component';
import { AddPermissionComponent } from './Components/modules/add-permission/add-permission.component';
import { PermissionComponent } from './Components/modules/permission/permission.component';
import { EditItemComponent } from './Components/modules/edit-item/edit-item.component';
import { PromotionComponent } from './Components/modules/promotion/promotion.component';
import { AddPromotionComponent } from './Components/modules/add-promotion/add-promotion.component';
import { LocationComponent } from './Components/modules/location/location.component';
import { AddLocationComponent } from './Components/modules/add-location/add-location.component';
import { SmsComponent } from './Components/modules/sms/sms.component';
import { EmailComponent } from './Components/modules/email/email.component';
import { ReviewComponent } from './Components/modules/review/review.component';
import { NotPermissionComponent } from './Components/modules/not-permission/not-permission.component';
import { ViewCategoryComponent } from './Components/modules/view-category/view-category.component';
import { EditCategoryComponent } from './Components/modules/edit-category/edit-category.component';
import { ViewBannerComponent } from './Components/modules/view-banner/view-banner.component';
import { EditBannerComponent } from './Components/modules/edit-banner/edit-banner.component';
import { SmsReportComponent } from './Components/modules/sms-report/sms-report.component';
import { EditDiscountComponent } from './Components/modules/edit-discount/edit-discount.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: '',
    component: DefaultComponent,
    children: [
      { path: 'khottodashboard', component: HomeComponent },
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
      { path: 'discount', component: DiscountComponent },
      { path: 'add-discount', component: AddDiscountComponent },
      { path: 'view-provider', component: ViewProviderComponent },
      { path: 'order', component: OrderComponent },
      { path: 'view-order', component: ViewOrderComponent },
      { path: 'facility', component: FacilityComponent },
      { path: 'add-facility', component: AddFacilityComponent },
      { path: 'view-item', component: ViewItemComponent },
      { path: 'edit-provider', component: EditProviderComponent },
      { path: 'resource', component: ResourceComponent},
      { path: 'add-resource', component: AddResourceComponent},
      { path: 'add-permission', component: AddPermissionComponent},
      { path: 'permission', component: PermissionComponent},
      { path: 'edit-item', component: EditItemComponent},
      { path: 'promotion', component: PromotionComponent},
      { path: 'add-promotion', component: AddPromotionComponent},
      { path: 'location', component: LocationComponent},
      { path: 'add-location', component: AddLocationComponent},
      { path: 'sms', component: SmsComponent},
      { path: 'email', component: EmailComponent},
      { path: 'review', component: ReviewComponent},
      { path: 'not-permission', component: NotPermissionComponent},
      { path: 'view-category', component: ViewCategoryComponent},
      { path: 'edit-category', component: EditCategoryComponent},
      { path: 'view-banner', component: ViewBannerComponent},
      { path: 'edit-banner', component: EditBannerComponent},
      { path: 'sms-report', component: SmsReportComponent},
      { path: 'edit-discount', component: EditDiscountComponent},
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
