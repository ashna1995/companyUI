import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockmarketComponent } from './stockmarket/stockmarket.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
const routes: Routes = [
  {path:'login',component:UsermanagementComponent},
{path:'stockmarket',component:StockmarketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
