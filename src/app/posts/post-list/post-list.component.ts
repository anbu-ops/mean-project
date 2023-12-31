import { Component, Input, OnInit, OnDestroy  } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy{
  // @Input() posts: Post[]=[];
  posts: Post[]=[];
  isLoading = false
  private postsSub!: Subscription;
  constructor(public postsService:PostsService){}

  ngOnInit() {
    this.isLoading = true;
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts();    
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId:any){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
