import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { UpdatePostRequest } from 'src/app/model/update-post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-view-post',
  templateUrl: './admin-view-post.component.html',
  styleUrls: ['./admin-view-post.component.css']
})
export class AdminViewPostComponent implements OnInit {

  post: Post | undefined
  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        if (id) {
          this.postService.getPostById(id)
          .subscribe(res => this.post = res)
        }
      }
    )
  }

  onSubmit(): void{
    const updatePostRequest: UpdatePostRequest = {
      author: this.post?.author,
      content: this.post?.content,
      featuredImageUrl: this.post?.featuredImageUrl,
      publishedDate: this.post?.publishedDate,
      updatedDate: this.post?.updatedDate,
      visible: this.post?.visible,
      title: this.post?.title,
      urlHandle: this.post?.urlHandle,
      summary: this.post?.summary,

    }
    this.postService.updatePost(this.post?.id, updatePostRequest).subscribe(res => this.post  = res)
  }

  removePost():void {
    this.postService.deletePost(this.post?.id).subscribe(res => {
      this.router.navigate(['/admin/posts'])
    })
  }

}
