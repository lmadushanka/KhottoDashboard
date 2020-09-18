import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/modules/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ForgotPasswordComponent } from './Components/modules/forgot-password/forgot-password.component';
import { ProviderComponent } from './Components/modules/provider/provider.component';
import { ResetPasswordComponent } from './Components/modules/reset-password/reset-password.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { AddProviderComponent } from './Components/modules/add-provider/add-provider.component';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginDto } from 'src/app/Entity/loginDto';
import { LoginService } from 'src/app/Services/login.service';
import { Globals } from 'src/app/Entity/globals';
import { ItemsComponent } from './Components/modules/items/items.component';
import { AddItemComponent } from './Components/modules/add-item/add-item.component';
import { Provider } from 'src/app/Entity/provider';
import { Facility } from 'src/app/Entity/facility';
import { Policy } from 'src/app/Entity/policy';
import { OpenDays } from 'src/app/Entity/open-days';
import { Otp } from 'src/app/Entity/otp';
import { PasswordRestDto } from 'src/app/Entity/passwordRestDto';
import { Item } from 'src/app/Entity/item';
import { Term } from 'src/app/Entity/term';
import { ErrorsComponent } from './Components/modules/errors/errors.component';
import { CategoryComponent } from './Components/modules/category/category.component';
import { AddCategoryComponent } from './Components/modules/add-category/add-category.component';
import { Category } from 'src/app/Entity/category';
import { AddProviderDto } from 'src/app/Entity/addProviderDto';
import { ProviderInfo } from 'src/app/Entity/providerInfo';
import { ProviderValues } from 'src/app/Entity/providerValues';
import { FileObject } from 'src/app/Entity/fileObject';
import { ItemValues } from 'src/app/Entity/itemValues';
import { AddItemDto } from 'src/app/Entity/addItemDto';
import { ItemDto } from 'src/app/Entity/itemDto';
import { AddCategoryDto } from 'src/app/Entity/addCategoryDto';
import { CategoryDto } from 'src/app/Entity/categoryDto';
import { ItemOption } from 'src/app/Entity/itemOption';
import { AddUserComponent } from './Components/modules/add-user/add-user.component';
import { UsersComponent } from './Components/modules/users/users.component';
import { BannerComponent } from './Components/modules/banner/banner.component';
import { AddBannerComponent } from './Components/modules/add-banner/add-banner.component';
import { NgSwitcheryModule } from 'angular-switchery-ios';
import { DiscountComponent } from './Components/modules/discount/discount.component';
import { AddDiscountComponent } from './Components/modules/add-discount/add-discount.component';
import { ViewProviderComponent } from './Components/modules/view-provider/view-provider.component';
import { OrderComponent } from './Components/modules/order/order.component';
import { ViewOrderComponent } from './Components/modules/view-order/view-order.component';
import { FacilityComponent } from './Components/modules/facility/facility.component';
import { AddFacilityComponent } from './Components/modules/add-facility/add-facility.component';
import { ViewItemComponent } from './Components/modules/view-item/view-item.component';
import { EditProviderComponent } from './Components/modules/edit-provider/edit-provider.component';
import { ResourceComponent } from './Components/modules/resource/resource.component';
import { AddResourceComponent } from './Components/modules/add-resource/add-resource.component';
import { PermissionComponent } from './Components/modules/permission/permission.component';
import { AddPermissionComponent } from './Components/modules/add-permission/add-permission.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProviderComponent,
    ResetPasswordComponent,
    AddProviderComponent,
    ItemsComponent,
    AddItemComponent,
    ErrorsComponent,
    CategoryComponent,
    AddCategoryComponent,
    AddUserComponent,
    UsersComponent,
    BannerComponent,
    AddBannerComponent,
    DiscountComponent,
    AddDiscountComponent,
    ViewProviderComponent,
    OrderComponent,
    ViewOrderComponent,
    FacilityComponent,
    AddFacilityComponent,
    ViewItemComponent,
    EditProviderComponent,
    ResourceComponent,
    AddResourceComponent,
    PermissionComponent,
    AddPermissionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgSwitcheryModule,
  ],
  providers: [
    LoginDto,
    LoginService,
    Globals,
    Provider,
    Facility,
    Policy,
    OpenDays,
    Otp,
    PasswordRestDto,
    Item,
    Term,
    Category,
    AddProviderDto,
    ProviderInfo,
    ProviderValues,
    FileObject,
    AddItemDto,
    ItemValues,
    ItemDto,
    AddCategoryDto,
    CategoryDto,
    ItemOption,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
