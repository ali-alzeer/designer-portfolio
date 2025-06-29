export interface PostsState {
    posts:Post[],
    error: string | null,
    isLoading: boolean
}

export interface Post{
    id:string,
    title:string,

}