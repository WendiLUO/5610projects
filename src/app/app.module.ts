import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { Routing } from './app.routing';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {UserService} from './services/user.service.client';
import {PostService} from './services/post.service.client';
import {HttpModule} from '@angular/http';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostNewComponent } from './components/post/post-new/post-new.component';
import {Router} from '@angular/router';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { CommentNewComponent } from './components/comment/comment-new/comment-new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PostListComponent,
    PostNewComponent,
    CommentListComponent,
    CommentNewComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    RouterModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
