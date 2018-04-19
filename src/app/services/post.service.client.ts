import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class PostService {
  constructor(private _http: HttpClient) {
  }
  posts = [
    {_id: '123', content: 'post1', authorId: '123', pic: 'http://lorempixel.com/400/200/'},
    {_id: '456', content: 'post2', authorId: '123', pic: 'http://lorempixel.com/400/200/'}
  ];
  api = {
    'createPost': this.createPost,
    'findPostByUser': this.findPostByUser
  };
  createPost(userId, post) {
    post.authorId = userId;
    this.posts.push(post);
    return post;
  }
  findPostByUser(userId: string) {
    const posts_user = [];
    for (let x = 0; x < this.posts.length; x++) {
      if (this.posts[x].authorId === userId) {
        posts_user.push(this.posts[x]);
      }
    }
    return posts_user;
  }
}
