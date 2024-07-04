import prisma from '../prisma';
import { User, Post } from '../type';
import cloudinary from 'cloudinary';

export async function createPost(newPost: Post) {
    try {
    
        const createdPost = await prisma.post.create({
           data:{ 
            title: newPost.title,
                content: newPost.content,
            
            published: newPost.published,
                createAt: newPost.createAt,

                authorId:1
            
            }
        });
console.log("create",createdPost);

        return { posts: {createdPost} }; 
    } catch (error) {
        return { error: (error as Error).message };
    }
}

export async function getPosts(){
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true, 
            },
        });
        const mappedPosts: Post[] = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,

            createAt:post.createAt,
            author: {
                id: post.author.id,
                email: post.author.email,
                name: post.author.name,
                posts: [], 
            },
            authorId: post.authorId,
        }));

        return { posts: mappedPosts };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

export async function getPostById(id: number): Promise<{ post?: Post; error?: string }> {
    try {
        const post = await prisma.post.findUnique({
            where: {
                id: id,
            },
            include: {
                author: true, 
            },
        });

        if (!post) {
            return { error: 'Post not found' };
        }
console.log(post);
        const mappedPost: Post = {
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            createAt:post.createAt,
            author: {
                id: post.author.id,
                email: post.author.email,
                name: post.author.name,
                posts: [], 
            },
            authorId: post.authorId,
        };

        return { post: mappedPost };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

interface UpdatePostParams {
    id: number;
    title?: string;
    content?: string | null;
    published?: boolean;
}

export async function updatePost(params: UpdatePostParams): Promise<{ updatedPost?: Post; error?: string }> {
    const { id, ...data } = params;
    console.log(params,"pr");
    console.log(id,"id");
    console.log(data,"data");
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data,
            include: {
                author: true, 
            },
        });

        if (!updatedPost) {
            return { error: 'Post not found' };
        }

        const mappedUpdatedPost: Post = {
            id: updatedPost.id,
            title: updatedPost.title,
            content: updatedPost.content,
            published: updatedPost.published,
                        createAt:updatedPost.createAt,

            author: {
                id: updatedPost.author.id,
                email: updatedPost.author.email,
                name: updatedPost.author.name,
                posts: [], 
            },
            authorId: updatedPost.authorId,
        };

        return { updatedPost: mappedUpdatedPost };
    } catch (error) {
        return { error: (error as Error).message };
    }
}

export async function deletePost(id: number): Promise<{ message?: string; error?: string }> {
    try {
        await prisma.post.delete({
            where: {
                id: id,
            },
        });
        return { message: 'Post deleted successfully' };
    } catch (error) {
        return { error: (error as Error).message };
    }
}



export async function getPublishedPost(){
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true, 
            },
            where: {
                published:true
            }
        });
        const mappedPosts: Post[] = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            createAt:post.createAt,
            author: {
                id: post.author.id,
                email: post.author.email,
                name: post.author.name,
                posts: [], 
            },
            authorId: post.authorId,
        }));

        return { posts: mappedPosts };
    } catch (error) {
        return { error: (error as Error).message };
    }
}


export async function getRelatedPosts(postId: number): Promise<{ relatedPosts: Post[] | null; error?: string }> {
    try {
        // Fetch the current post
        const currentPost = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: true, // Include author details
            },
        });

        if (!currentPost) {
            return { relatedPosts: null, error: 'Post not found' };
        }

        // Fetch all published posts except the current one
        const allPosts = await prisma.post.findMany({
            where: {
                published: true,
                id: {
                    not: postId,
                },
            },
            include: {
                author: true, // Include author details
            },
        });

        const postsWithScores = allPosts.map((post) => ({
            ...post,
            similarityScore: calculateTFIDFSimilarity(currentPost.content, post.content),
        }));

        postsWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

        const relatedPosts = postsWithScores.slice(0, 3).map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            createAt: post.createAt,
            author: {
                id: post.author.id,
                email: post.author.email,
                name: post.author.name,
                posts: [],
            },
            authorId: post.authorId,
        }));

        return { relatedPosts };
    } catch (error) {
        return { relatedPosts: null, error: (error as Error).message };
    }
}

// Function to calculate TF-IDF similarity between two texts (simplified example)
function calculateTFIDFSimilarity(content1: string, content2: string): number {
    
    const words1 = content1.split(" ");
    const words2 = content2.split(" ");
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length; 
}

export async function getLatestPosts(){
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true, 
            },
            orderBy: {
                createAt:"desc"
            }
            ,
             take: 5,
            
        });
        const mappedPosts: Post[] = posts.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
            createAt:post.createAt,
            author: {
                id: post.author.id,
                email: post.author.email,
                name: post.author.name,
                posts: [], 
            },
            authorId: post.authorId,
        }));

        return { posts: mappedPosts };
    } catch (error) {
        return { error: (error as Error).message };
    }
}
