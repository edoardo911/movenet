import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RecoverComponent } from './recover/recover.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { CookieService } from 'ngx-cookie-service'
import { AgmCoreModule } from '@agm/core'
import { firebaseConfig, maps_token } from '../assets/private.js'

import { NgModule } from '@angular/core'

import { NotFoundComponent } from './not-found/not-found.component'
import { RegisterComponent } from './register/register.component'
import { ConfirmComponent } from './confirm/confirm.component'
import { ForgotComponent } from './forgot/forgot.component'
import { LoginComponent } from './login/login.component'
import { AreaComponent } from './area/area.component'
import { AppComponent } from './app.component'

import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire'

@NgModule({
  declarations: [
    NotFoundComponent,
    RegisterComponent,
    ConfirmComponent,
    RecoverComponent,
    ForgotComponent,
    LoginComponent,
    AreaComponent,
    AppComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({ apiKey: maps_token }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
