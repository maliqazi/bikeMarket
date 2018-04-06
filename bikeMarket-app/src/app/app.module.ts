import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginRegistrationComponent } from './login-registration/login-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowseComponent } from './dashboard/browse/browse.component';
import { CreateEditComponent } from './dashboard/create-edit/create-edit.component';
import { CreateComponent } from './dashboard/create-edit/create/create.component';
import { EditDeleteComponent } from './dashboard/create-edit/edit-delete/edit-delete.component';
import { DailyBikeComponent } from './daily-bike/daily-bike.component';
import { SearchPipe } from './search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginRegistrationComponent,
    DashboardComponent,
    BrowseComponent,
    CreateEditComponent,
    CreateComponent,
    EditDeleteComponent,
    DailyBikeComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // HttpModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
