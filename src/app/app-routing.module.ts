import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { AdminhomepageComponent } from './admin/adminhomepage/adminhomepage.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ChangepasswordComponent } from './admin/changepassword/changepassword.component';
import { DepositMoneyComponent } from './admin/deposit.money/deposit.money.component';
import { CollaboratorsComponent } from './admin/collaborators/collaborators.component';
import { ShoppingCartComponent } from './admin/shopping-cart/shopping-cart.component';
import { ProductSpComponent } from './admin/product-sp/product-sp.component';
import { UpliketiktokComponent } from './admin/tiktok/upliketiktok/upliketiktok.component';
import { RecoverpasswordComponent } from './home/recoverpassword/recoverpassword.component';
import { UpviewFbComponent } from './admin/face/upview-fb/upview-fb.component';
import { UplikeFb123Component } from './admin/face/uplike-fb123/uplike-fb123.component';
import { PageNotFoundComponentComponent } from './admin/page-not-found-component/page-not-found-component.component';
import { AlwaysAuthGuardGuard } from './shared/always-auth-guard.guard';
import { TermsServicesComponent } from './admin/terms-services/terms-services.component';
import { TemplateComponent } from './admin/template/template.component';
import { UpFollowComponent } from './admin/face/up-follow/up-follow.component';

const routes: Routes = [
  {path: '', redirectTo: 'service-getbyplatfrom', pathMatch: 'full'}, 
  {path: '', component: AdminhomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'recover-password', component: RecoverpasswordComponent},
  {path: 'register', component: RegisterComponent},



  
  {path: '',  component: AdminhomepageComponent,
  children: [
    {path: '', redirectTo: 'service-getbyplatfrom', pathMatch: 'full'}, 
    { path: 'profile', component: ProfileComponent },
    { path: 'changepassword', component: ChangepasswordComponent },
    { path: 'deposit-money', component: DepositMoneyComponent },
    { path: 'Facebook-view', component: UpviewFbComponent },
    { path: 'Facebook-like', component: UplikeFb123Component },
    { path: 'Facebook-follow', component: UpFollowComponent },
    { path: 'user-collaborators', component: CollaboratorsComponent },
    { path: 'shopping', component: ShoppingCartComponent },
    { path: 'service-getbyplatfrom', component: ProductSpComponent },
    { path: 'like-tt', component: UpliketiktokComponent },
    { path: 'terms-services', component: TermsServicesComponent },
    { path: 'home', component: TemplateComponent },
    { path: '**', component: PageNotFoundComponentComponent },
  ],
 },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
