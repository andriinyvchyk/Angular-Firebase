import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminCommodityComponent } from './admin/admin-commodity/admin-commodity.component';
import { AdminBlogsComponent } from './admin/admin-blogs/admin-blogs.component';
import { AdminSubscribeComponent } from './admin/admin-subscribe/admin-subscribe.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminPostsComponent } from './admin/admin-posts/admin-posts.component';
import { CommodityDetailsComponent } from './pages/commodity-details/commodity-details.component';
import { MycardComponent } from './pages/mycard/mycard.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { PostDetailsComponent } from './pages/post-details/post-details.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InfoUserComponent } from './pages/profile/info-user/info-user.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:category', component: ShopComponent },
  { path: 'shop/:category/:id', component: CommodityDetailsComponent },
  { path: 'mycard', component: MycardComponent },
  { path: 'blog', component: BlogComponent},
  { path: 'blog/:category', component: BlogComponent},
  { path: 'blog/:category/:id', component: PostDetailsComponent},
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent , children: [
    { path: '', redirectTo: 'myinfo', pathMatch: 'full' },
    { path: 'myinfo', component: InfoUserComponent },
  ]},
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'commodity', component: AdminCommodityComponent },
      { path: 'blogs', component: AdminBlogsComponent },
      { path: 'posts', component: AdminPostsComponent },
      { path: 'subscribe', component: AdminSubscribeComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'users', component: AdminUsersComponent },
    ]
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
