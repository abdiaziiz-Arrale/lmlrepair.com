'use server'

import { revalidatePath } from 'next/cache';
import { createPost, deletePost, getLatestPosts, getPostById, getPosts, getPublishedPost, getRelatedPosts, updatePost } from '../lib/db/Postcrud'
import { Post } from './type';
interface UpdatePostParams {
    id: number;
    title?: string;
    content?: string | null;
    published?: boolean;
}
export async function getAllPosts() {
    const post = await getPosts()
    console.log("getall",post);
      return { post, error: null };
    
}
export async function getAlllatestPosts() {
    const post = await getLatestPosts()
      return { post, error: null };
    
}
export async function getAllPublishedPost() {
    const post = await getPublishedPost()
    console.log("getall",post);
      return { post, error: null };
    
}
export async function GetSinglePost(id: number) {
    console.log(id);
    const post = await getPostById(id)
    return {post}
}
export async function GetRelatedSinglePost(id: number) {
    console.log(id);
    const post = await getRelatedPosts(id)
    return {post}
}
export async function UpdatePostsData(data:UpdatePostParams) {
    await updatePost(data)
        revalidatePath('/')

}
export async function CreatePostsData(data:Post) {
    await createPost(data)
    revalidatePath('/')
}
export async function DelateSinglePost(id:number) {
    await deletePost(id)
        revalidatePath('/')

}