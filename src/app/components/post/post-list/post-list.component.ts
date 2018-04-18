import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  userId: string;
  posts: any[];

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.posts = this.postService.findPostByUser(this.userId);

  }
}
