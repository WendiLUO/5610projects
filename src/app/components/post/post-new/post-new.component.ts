import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../../../services/post.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
