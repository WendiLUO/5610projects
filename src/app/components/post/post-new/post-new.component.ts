import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service.client';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Http, RequestOptions, Response} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../services/user.service.client'

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  @ViewChild('f') postForm: NgForm;
  userId: string;
  content: string;
  errorFlag: boolean;
  postId: string;
  posts: any[];
  pic: any;
  fileList: FileList;
  file: File;
  filename: string;
  gender: string;
  baseUrl = environment.baseUrl;
  n = 0;
  formData: any;
  user: any;
  breed: string;
  constructor(private _http: HttpClient, private postService: PostService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private userService: UserService) { }
  fileChange(event) {
    this.formData = new FormData();
    this.fileList = event.target.files;
    if (this.fileList.length > 0) {
      this.file = this.fileList[0];
      console.log('new-post line 37: ' + this.file);
      this.filename = this.file.name;
      this.formData.append('uploadFile', this.file, this.file.name);
      // const headers = new Headers();
      // headers.append('Content-Type', 'multipart/form-data');
      // headers.append('Accept', 'application/json');
      // const options = new RequestOptions({headers: headers});
      console.log('formdata' + this.formData.getAll('uploadFile'));
    }
  }
  createPost(content: string, userId: string) {
    console.log('creatPost');
    console.log('filename' + this.filename);
    console.log('user' + this.user);
    this._http.post(this.baseUrl + '/upload', this.formData).subscribe((res: Response) => {
     this.pic = res;
     console.log('abc');
     console.log('pic' + this.pic);
    });
    const newPost = {
      content: this.postForm.value.content,
      pic: this.filename,
      gender: this.user.gender,
      breed: this.user.breed
    }
    if (newPost.content == null) {
      this.errorFlag = true;
      return;
    }
    this.postService.createPost(this.userId, newPost)
      .subscribe( (post: any) => {
        this.errorFlag = false;
        this.router.navigate(['/user/' + this.userId + '/post']); },
        (error: any) => {
        this.errorFlag = true;
        console.log(error);
        });
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.userService.findUserById(this.userId).subscribe(
        (data: any) => {
          this.user = data;
          console.log(this.user);
        }
      );
    });
  }

}
