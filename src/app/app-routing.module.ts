import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ForgotComponent } from './forgot/forgot.component';

import { RouterModule, Routes } from '@angular/router';
import { AreaComponent } from './area/area.component';
import { NgModule } from '@angular/core';
import { RecoverComponent } from './recover/recover.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'login', component: LoginComponent },
  { path: 'area', component: AreaComponent },
  
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
