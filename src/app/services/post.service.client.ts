import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/Rx';
// injecting service into module
@Injectable()

export class PostService {
    constructor(private _http: HttpClient) {}
  baseUrl = environment.baseUrl;

api = {
        'createPost' : this.createPost,
        'findPostsByUserId' : this.findPostsByUserId,
        'findPostById' : this.findPostById,
        'deletePost' : this.deletePost,
        'findPostsByBreed_Gender' : this.findPostsByBreed_Gender
    };

    createPost(userId: string, post) {
      console.log('post ts');
       const url = this.baseUrl + '/api/post/' + userId;
       return this._http.post(url, JSON.stringify(post), {headers: new HttpHeaders().set('content-Type', 'application/json')});
    }
    findPostsByUserId(userId: string) {
        return this._http.get( this.baseUrl + '/api/user/' + userId + '/post').map(
          (res: Response) => {
           return res;
          }
        );
    }
    findPostById(postId: string) {
        return this._http.get('/api/post/' + postId);
    }
    deletePost(postId: string) {
        return this._http.delete(this.baseUrl + '/api/post/' + postId)
          .map((res: Response) => {
            return res;
          });
    }
    findAllPost(userId: string) {
      console.log('findallposts ts');
        return this._http.get(this.baseUrl + '/api/post');
    }
    findPostsByBreed_Gender(breed: string, gender: string) {
      console.log('search');
        return this._http.get(this.baseUrl + '/api/breed/' + breed + '/gender/' + gender);
    }
    updatePostInThumbUp(postId: String) {
      console.log('updatethumbup ts');
        return this._http.put(this.baseUrl + '/api/post/thumbup/' + postId, {}).map(response => response);
    }
}

