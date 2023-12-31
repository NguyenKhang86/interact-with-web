import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule  } from 'ngx-pagination';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminhomepageComponent } from './admin/adminhomepage/adminhomepage.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import { DepositMoneyComponent } from './admin/deposit.money/deposit.money.component';
import { CollaboratorsComponent } from './admin/collaborators/collaborators.component';
import { ShoppingCartComponent } from './admin/shopping-cart/shopping-cart.component';
import { ProductSpComponent } from './admin/product-sp/product-sp.component';
import { RecoverpasswordComponent } from './home/recoverpassword/recoverpassword.component';
import { UpviewFbComponent } from './admin/face/upview-fb/upview-fb.component';
import { UplikeFb123Component } from './admin/face/uplike-fb123/uplike-fb123.component';
import { AlwaysAuthGuardGuard } from './shared/always-auth-guard.guard';
import { TermsServicesComponent } from './admin/terms-services/terms-services.component';
import { TemplateComponent } from './admin/template/template.component';
import { UpFollowComponent } from './admin/face/up-follow/up-follow.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminhomepageComponent,
    ProfileComponent,
    ChangepasswordComponent,
    DepositMoneyComponent,
    CollaboratorsComponent,
    ShoppingCartComponent,
    ProductSpComponent,
    RecoverpasswordComponent,
    UpviewFbComponent,
    UplikeFb123Component,
    TermsServicesComponent,
    TemplateComponent,
    UpFollowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,  
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ })
  ],
  providers: [
    CookieService,
    AlwaysAuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
