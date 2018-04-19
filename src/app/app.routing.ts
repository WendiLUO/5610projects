import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {LoginComponent} from './components/user/login/login.component';
import {ProfileComponent} from './components/user/profile/profile.component';
import {RegisterComponent} from './components/user/register/register.component';
import {PostListComponent} from './components/post/post-list/post-list.component';
import {PostNewComponent} from './components/post/post-new/post-new.component';

// Import all other components here
const APP_ROUTES: Routes = [
  { path : 'login' , component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path : 'user/:uid', component: ProfileComponent},
  { path : 'user/:uid/post', component: PostListComponent},
  { path : 'user/:uid/new', component: PostNewComponent}
// so on
];
// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
