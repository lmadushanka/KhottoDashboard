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
import { LoginDto } from './entity/loginDto';
import { LoginService } from './services/login.service';
import { Globals } from './entity/globals';
import { ItemsComponent } from './Components/modules/items/items.component';
import { AddItemComponent } from './Components/modules/add-item/add-item.component';
import { Provider } from './entity/provider';
import { Facility } from './entity/facility';
import { Policy } from './entity/policy';
import { OpenDays } from './entity/open-days';
import { Otp } from './entity/otp';
import { PasswordRestDto } from './entity/passwordRestDto';
import { Item } from './entity/item';
import { Term } from './entity/term';
import { ErrorsComponent } from './Components/modules/errors/errors.component';
import { CategoryComponent } from './Components/modules/category/category.component';
import { AddCategoryComponent } from './Components/modules/add-category/add-category.component';
import { Category } from './entity/category';
import { AddProviderDto } from './entity/addProviderDto';
import { ProviderInfo } from './entity/providerInfo';
import { ProviderValues } from './entity/providerValues';
import { FileObject } from './entity/fileObject';
import { ItemValues } from './entity/itemValues';
import { AddItemDto } from './entity/addItemDto';
import { ItemDto } from './entity/itemDto';
import { AddCategoryDto } from './entity/addCategoryDto';
import { CategoryDto } from './entity/categoryDto';
import { ItemOption } from './entity/itemOption';
import { AddUserComponent } from './Components/modules/add-user/add-user.component';
import { UsersComponent } from './Components/modules/users/users.component';
import { BannerComponent } from './Components/modules/banner/banner.component';
import { AddBannerComponent } from './Components/modules/add-banner/add-banner.component';

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
