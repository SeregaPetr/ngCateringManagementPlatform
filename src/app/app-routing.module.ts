import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { BarComponent } from './components/bar/bar.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrderComponent } from './components/client/order/order.component';
import { PaymentComponent } from './components/waiter/payment/payment.component';
import { WaiterComponent } from './components/waiter/waiter/waiter.component';
import { OrderStatusComponent } from './components/client/order-status/order-status.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { TableInfoComponent } from './components/admin/table-info/table-info.component';
import { DishComponent } from './components/admin/admin-panel/dish/dish.component';
import { EmployeeComponent } from './components/admin/admin-panel/employee/employee.component';
import { TableComponent } from './components/admin/admin-panel/tabel/table.component';
import { MenuCategoryComponent } from './components/admin/admin-panel/menu-category/menu-category.component';
import { RestaurantMenuComponent } from './components/admin/admin-panel/restaurant-menu/restaurant-menu.component';
import { NameMenuComponent } from './components/admin/admin-panel/name-menu/name-menu.component';
import { CreateMenuComponent } from './components/admin/admin-panel/restaurant-menu/create-menu/create-menu.component';

const adminChildrenRoutes: Routes = [
  { path: 'table', component: TableComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'restaurant-menu', component: RestaurantMenuComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'create-menu/:id', component: CreateMenuComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'name-menu', component: NameMenuComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'menu-category', component: MenuCategoryComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'dish', component: DishComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'tables-info', component: TableInfoComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'employee', component: EmployeeComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
];

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'bar', component: BarComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin', 'Barman']
      }
    }
  },
  { path: 'kitchen', component: KitchenComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin', 'Chef']
      }
    }
  },
  { path: 'waiter', component: WaiterComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin', 'Waiter']
      }
    }
  },
  { path: 'order', component: OrderComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['User']
      }
    }
  },
  { path: 'order-status', component: OrderStatusComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['User']
      }
    }
  },
  { path: 'payment', component: PaymentComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin', 'Waiter']
      }
    }
  },
  { path: 'tables-info', component: TableInfoComponent, canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['Admin']
      }
    }
  },
  { path: 'admin', component: AdminPanelComponent, canActivate: [NgxPermissionsGuard], 
    data: {
      permissions: {
        only: ['Admin']
      }
    }, 
    children: adminChildrenRoutes, canActivateChild: [NgxPermissionsGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
