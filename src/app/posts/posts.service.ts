import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs/internal/Subject';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient, private router: Router) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    this.http.get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
    .pipe(map((response)=>{
      return response.posts.map((post: any)=>{
        return{
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe((transformedResponse)=> {
      console.log(transformedResponse);
      this.posts = transformedResponse;
      this.postsUpdated.next([...this.posts]);
    });
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id:string){
    return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/posts/" + id);
  }

  addPost(title: string, content: string) {
    const post: Post = {id:'', title: title, content: content};
    this.http.post<{message: string, postId: string}>("http://localhost:3000/api/posts",post)
    .subscribe((response)=>{
      console.log(response.message);
      post.id = response.postId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(id:string, title: string, content: string) {
  const post: Post = {id: id, title: title, content: content};
  this.http.put("http://localhost:3000/api/posts/" + id, post)
  .subscribe(()=>{
  console.log("Updated!")
  const updatedposts = this.posts;
  const oldPostIndex = updatedposts.findIndex(post => post.id === post.id);
  updatedposts[oldPostIndex] = post;
  this.posts = updatedposts;
  this.postsUpdated.next([...this.posts]);
  this.router.navigate(['/']);
  });
  }

  deletePost(postId:string) {
  this.http.delete("http://localhost:3000/api/posts/" + postId)
  .subscribe(()=>{
  console.log("deleted!");
  const updatedposts = this.posts.filter((post)=>post.id !== postId);
  this.posts = updatedposts;
  this.postsUpdated.next([...this.posts]);
  });
}
}
