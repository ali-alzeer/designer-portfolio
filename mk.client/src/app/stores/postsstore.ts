import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals'
import { Post, PostsState } from '../models/posts.interface'
import { computed, inject } from '@angular/core'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, switchMap, tap } from 'rxjs'
import { PostsService } from '../services/posts.service'


export const PostsStore = signalStore(
    
    withState<PostsState>({
        posts:[],
        error:null,
        isLoading: false
    }),
    withComputed(store => ({
        postsCount: computed(() => store.posts().length),
    })),
    withMethods(( store, postService = inject(PostsService) ) => ({
        addPost(title:string){
            const newPost : Post = {
                id: crypto.randomUUID(),
                title,
            }
            const updatedPosts = [...store.posts(), newPost];
            patchState(store, {posts:updatedPosts});
        },
        remove(id : string){
            const updatedPosts = store.posts().filter((post) => post.id !== id);
            patchState(store, {posts : updatedPosts});
        },
        loadPosts: rxMethod<void>(
            pipe(
                switchMap(()=>{
                    return postService.getPosts().pipe(tap((posts)=>{
                        patchState(store, { posts });
                    }))
                })
            )
        )
    })),
    withHooks({
        onInit(store){
            
            store.loadPosts();
        }
    })
)