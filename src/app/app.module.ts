import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';

import { BarComponent } from './components/bar/bar.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { WaiterComponent } from './components/waiter/waiter/waiter.component';
import { AUTH_API_URL, APP_API_URL, PLATFORM_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth/auth.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/client/order/order.component';
import { PaymentComponent } from './components/waiter/payment/payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/helpers/modal/modal.component';
import { OrderStatusComponent } from './components/client/order-status/order-status.component';
import { TableInfoComponent } from './components/admin/table-info/table-info.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { ShowTableComponent } from './components/admin/admin-panel/tabel/show-table/show-table.component';
import { EditTableComponent } from './components/admin/admin-panel/tabel/edit-table/edit-table.component';
import { AddTableComponent } from './components/admin/admin-panel/tabel/add-table/add-table.component';
import { ShowDishComponent } from './components/admin/admin-panel/dish/show-dish/show-dish.component';
import { EditDishComponent } from './components/admin/admin-panel/dish/edit-dish/edit-dish.component';
import { AddDishComponent } from './components/admin/admin-panel/dish/add-dish/add-dish.component';
import { EditMenuCategoryComponent } from './components/admin/admin-panel/menu-category/edit-menu-category/edit-menu-category.component';
import { ShowMenuCategoryComponent } from './components/admin/admin-panel/menu-category/show-menu-category/show-menu-category.component';
import { AddMenuCategoryComponent } from './components/admin/admin-panel/menu-category/add-menu-category/add-menu-category.component';
import { EditButtonComponent } from './components/helpers/buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from './components/helpers/buttons/delete-button/delete-button.component';
import { AddButtonComponent } from './components/helpers/buttons/add-button/add-button.component';
import { ShowRestaurantMenuComponent } from './components/admin/admin-panel/restaurant-menu/show-restaurant-menu/show-restaurant-menu.component';
import { DishComponent } from './components/admin/admin-panel/dish/dish.component';
import { ChoiceMenuCategoryComponent } from './components/admin/admin-panel/restaurant-menu/choice-menu-category/choice-menu-category.component';
import { EmployeeComponent } from './components/admin/admin-panel/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TableComponent } from './components/admin/admin-panel/tabel/table.component';
import { MenuCategoryComponent } from './components/admin/admin-panel/menu-category/menu-category.component';
import { NameMenuComponent } from './components/admin/admin-panel/name-menu/name-menu.component';
import { RestaurantMenuComponent } from './components/admin/admin-panel/restaurant-menu/restaurant-menu.component';
import { AddNameMenuComponent } from './components/admin/admin-panel/name-menu/add-name-menu/add-name-menu.component';
import { ShowNameMenuComponent } from './components/admin/admin-panel/name-menu/show-name-menu/show-name-menu.component';
import { EditNameMenuComponent } from './components/admin/admin-panel/name-menu/edit-name-menu/edit-name-menu.component';
import { CreateMenuComponent } from './components/admin/admin-panel/restaurant-menu/create-menu/create-menu.component';
import { ChoiceDishComponent } from './components/admin/admin-panel/restaurant-menu/choice-dish/choice-dish.component';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    KitchenComponent,
    WaiterComponent,
    AdminPanelComponent,
    MenuComponent,
    OrderComponent,
    OrderStatusComponent,
    PaymentComponent,
    ShowTableComponent,
    EditTableComponent,
    AddTableComponent,
    ShowDishComponent,
    EditDishComponent,
    AddDishComponent,
    ModalComponent,
    TableInfoComponent,
    AddMenuCategoryComponent,
    EditMenuCategoryComponent,
    ShowMenuCategoryComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    AddButtonComponent,
    ShowRestaurantMenuComponent,
    DishComponent,
    ChoiceMenuCategoryComponent,
    ChoiceDishComponent,
    EmployeeComponent,
    LoginComponent,
    TableComponent,
    MenuCategoryComponent,
    NameMenuComponent,
    RestaurantMenuComponent,
    AddNameMenuComponent,
    EditNameMenuComponent,
    ShowNameMenuComponent,
    CreateMenuComponent
  ],
  imports: [
    MatProgressBarModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSnackBarModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.allowedDomains
      }
    })
  ],
  providers: [
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, 
    useValue: {duration: 2500}
  },
  {
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
  {
    provide: APP_API_URL,
    useValue: environment.appApi
  },
  {
    provide: PLATFORM_URL,
    useValue: environment.platform
  }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
