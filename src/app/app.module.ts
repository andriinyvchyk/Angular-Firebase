import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminCommodityComponent } from './admin/admin-commodity/admin-commodity.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AdminSubscribeComponent } from './admin/admin-subscribe/admin-subscribe.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CommodityDetailsComponent } from './pages/commodity-details/commodity-details.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { MycardComponent } from './pages/mycard/mycard.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { FilterByProdPipe } from './shared/pipes/filter-by-prod.pipe';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InfoUserComponent } from './pages/profile/info-user/info-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    BlogComponent,
    AboutComponent,
    AdminCategoryComponent,
    AdminCommodityComponent,
    AdminBlogsComponent,
    AdminSubscribeComponent,
    AdminDashboardComponent,
    CommodityDetailsComponent,
    AdminPostsComponent,
    MycardComponent,
    CheckoutComponent,
    AdminOrdersComponent,
    FilterByProdPipe,
    PostDetailsComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    InfoUserComponent,
    AdminUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'internetshop'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features,
    Ng5SliderModule,
    NgbModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
