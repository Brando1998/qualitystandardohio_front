import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestServiceComponent } from './request-service/request-service.component';
import { SuccessComponent } from './success/success.component';
import { CanceledComponent } from './canceled/canceled.component';

const routes: Routes = [
  {path:"", component:RequestServiceComponent},
  {path:"success", component:SuccessComponent},
  {path:"canceled", component:CanceledComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
