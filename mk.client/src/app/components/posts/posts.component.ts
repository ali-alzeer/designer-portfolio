import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostsStore } from '../../stores/postsstore';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  providers:[PostsStore],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

  store = inject(PostsStore);
  fb = inject(FormBuilder);
  postService = inject(PostsService);
  addForm = this.fb.nonNullable.group({
    title:"",
  })
  onAdd(){
    this.store.addPost(this.addForm.getRawValue().title);
    this.addForm.reset();
  }
}
