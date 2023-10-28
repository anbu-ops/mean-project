import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  enteredTitle = '';
  enteredContent = '';
  postId!: string | null;
  mode: string = 'create';
  post: Post = {
    title: '',
    content: ''
  };
  isLoading = false;
  
  constructor(public postsService:PostsService, public route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if(params.has('postId')){
        this.mode= 'edit'
        this.postId = params.get('postId');
        if(this.postId){
          this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((response) => {
          this.isLoading = false;
          this.post = {
            title: response.title,
            content: response.content,
            id: response._id
          }
        });
      }} else{
        this.mode= 'create';
        this.postId = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.postsService.addPost(form.value.title, form.value.content);
    } else if(this.postId && this.mode === "edit") {
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
