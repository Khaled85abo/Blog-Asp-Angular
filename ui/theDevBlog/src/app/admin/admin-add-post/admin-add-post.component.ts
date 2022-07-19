import { Component, OnInit } from '@angular/core';
import { AddPostRequest } from 'src/app/model/add-post.model';
import { Post } from 'src/app/model/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-add-post',
  templateUrl: './admin-add-post.component.html',
  styleUrls: ['./admin-add-post.component.css'],
})
export class AdminAddPostComponent implements OnInit {
  post: AddPostRequest = {
    author: 'Khaled',
    summary: 'Summary, have no time to write',
    content: 'content, have no time to write',
    visible: true,
    publishedDate: '2022-07-20',
    updatedDate: '2022-07-20',
    urlHandle: '',
    title: 'Added post from frontend',
    featuredImageUrl: '',
  };
  constructor(private postService: PostService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.postService.addPost(this.post).subscribe((res) => console.log(res));
  }
}
