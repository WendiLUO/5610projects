import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()

export class CommentService {
    constructor(private _http: HttpClient) {}
    baseUrl = environment.baseUrl;
    api = {
      'createComment': this.createComment,
      'findCommentByPostId': this.findCommentsByPostId
    };
    createComment(postId: string, comment) {
      const url = this.baseUrl + '/api/post/' + postId + '/comment';
      return this._http.post(url, JSON.stringify(comment), {headers: new HttpHeaders().set('content-Type', 'application/json')})
    }
    findCommentsByPostId(postId: string) {
      return this._http.get( this.baseUrl + '/api/post/' + postId + '/comment').map(
        (res: Response) => {
          return res;
        }
      );
    }
}
