import {Component, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../../services/post.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../../../services/comment.service.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @ViewChild('f') commentForm: NgForm;
  userId: string;
  posts: any;
  postId: string;
  comments: any;
  errorFlag: boolean;
  new_comment_content_map: any;
  content: string;
  comment_showflag_map: any;
  constructor(private postService: PostService, private commentService: CommentService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }
  ngOnInit() {
    this.new_comment_content_map = {};
    this.comment_showflag_map = {};
    this.comments = new Map();
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );

    this.postService.findPostsByUserId(this.userId).subscribe((data: any) => {
      // console.log('posts' + JSON.stringify(data));
      this.posts = data;
      let comment_list = [];
      this.posts.forEach((post) => {
        this.new_comment_content_map[post._id] = '';
        this.comment_showflag_map[post._id] = false;
        this.commentService.findCommentsByPostId(post._id).subscribe(
          (comment_data: any) => {
            comment_list = comment_data;
            this.postId = post._id;
            this.comments.set(post._id, comment_list);
          }
        );
      });
    });
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId)
      .subscribe((posts) => {
        this.ngOnInit();
        // this.router.navigate(['/user/' + this.userId + '/post']);
      });

  }
  createComment_forOnePost(postId: string) {
    const newComment = {
      content: this.new_comment_content_map[postId],
    }
    this.new_comment_content_map[postId] = newComment;
    if (newComment.content == null) {
      this.errorFlag = true;
      return;
    }
    // this.postService.findPostsByUserId(this.userId).subscribe((data: any) => {
    //   this.posts = data;
    // })
    // this.posts.forEach( (post) => {
      this.commentService.createComment(postId, newComment)
        .subscribe((comment: any) => {
            this.errorFlag = false;
            this.comments.get(postId).push(comment);
            this.ngOnInit();
          },
          (error: any) => {
            this.errorFlag = true;
            console.log(error);
          });
    //});
  }
  show(postId: string) {
    this.comment_showflag_map[postId] = !this.comment_showflag_map[postId];
  }
  }

