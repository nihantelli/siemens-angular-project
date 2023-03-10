import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  detailPost?: Post;
  loading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    //getting id from route and accessing to methods in services
    this.loading = true;
    const detailId = this.activatedRoute.snapshot.params['id'];
    this.postService.getPostsById(detailId).subscribe((detail) => {
      this.detailPost = detail;
    });
    this.activatedRoute.params.subscribe((param: any) => {
      this.postService.getPostsById(param.id).subscribe((x) => {
        this.detailPost = x;
        this.loading = false;
      });
    });
  }
}
