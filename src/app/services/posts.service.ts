import { environment } from '@/environments/environment';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '@/store/posts/posts.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private http   = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/posts`;

  getPost(slug: string) {
    return this.http.get<{ data: Post }>(`${this.apiUrl}/${slug}`);
  }

  getPosts() {
    return this.http.get<{ data: Post[] }>(this.apiUrl);
  }
}
