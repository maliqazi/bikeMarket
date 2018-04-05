import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { BrowseComponent } from './dashboard/browse/browse.component';
import { CreateEditComponent } from './dashboard/create-edit/create-edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', pathMatch: 'full', component: LoginRegistrationComponent},
  { path: 'dashboard/:_id/:first_name/:last_name',
    component: DashboardComponent,
    children: [
      { path: 'browse/:_id', component: BrowseComponent },
      { path: 'listings/:_id', component: CreateEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
