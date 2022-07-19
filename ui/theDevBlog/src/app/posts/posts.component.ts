import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = []
  post: Post | undefined = undefined
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(res => {
      this.posts = res
      this.post = this.posts[0]
    })

  }

}
