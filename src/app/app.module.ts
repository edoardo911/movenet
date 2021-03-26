import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RecoverComponent } from './recover/recover.component'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { CookieService } from 'ngx-cookie-service'
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

const firebaseConfig = {
  apiKey: "AIzaSyAjm6qmaK1umpDRZjQ5QdZfJS6sRgTrenU",
  authDomain: "movenet-d8bb4.firebaseapp.com",
  databaseURL: "https://movenet-d8bb4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "movenet-d8bb4",
  storageBucket: "movenet-d8bb4.appspot.com",
  messagingSenderId: "644066927812",
  appId: "1:644066927812:web:8717c2867890bed314d591",
  measurementId: "G-YQG1SX0X7L"
};

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
