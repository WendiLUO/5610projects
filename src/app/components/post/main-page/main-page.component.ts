import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../../services/post.service.client';
import { CommentService} from '../../../services/comment.service.client';
import { Router } from '@angular/router';
// import { UserService } from '../../../services/user.service.client'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  @ViewChild('f') searchPostForm: NgForm;

  breed: string;
  gender: string;
  userId: string;
  posts: any;
  commentNum = 0;
  post: any;
  postId: string;
  comments: any;
  errorFlag: boolean;
  showFlag: boolean;
  new_comment_content_map: any;
  content: string;
  comment_showflag_map: any;
  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
              private router: Router, private commentService: CommentService) {
  }

  ngOnInit() {
    // this.posts = [{content: "post1", pic: "../../../../assets/images/maxresdefault.jpg"},{
    // content: "post2", pic: "../../../../assets/images/small-dog-breeds.jpg"}];

    this.new_comment_content_map = {};
    this.comment_showflag_map = {};
    this.comments = new Map();
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.activatedRoute.params
        .subscribe(
        (params: any) => {
            this.userId = params['uid'];
            console.log('this.userId' + this.userId);
    });
    this.postService.findAllPost(this.userId).subscribe((data: any) => {
      console.log('this.posts' + JSON.stringify(data[0]));
      let comment_list = [];
      this.posts = data;
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
    // this.commentNum = this.posts.comments.length;
  }

  searchPost() {
    this.breed = this.searchPostForm.value.breed;
    this.gender = this.gender;
    console.log(this.gender);
    console.log(this.breed);
    this.postService.findPostsByBreed_Gender(this.breed, this.gender).subscribe((data: any) => {
        this.posts = data;
    });
  }
   thumbUp(postId) {
    console.log('thumbUp');
    console.log(postId);
    this.postService.updatePostInThumbUp(postId).subscribe(
    (data: any) => {
      location.reload();
     });
  }

  createComment_forOnePost(postId) {
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
    // });

  }

  show(postId: string) {
    this.comment_showflag_map[postId] = !this.comment_showflag_map[postId];
  }


}
