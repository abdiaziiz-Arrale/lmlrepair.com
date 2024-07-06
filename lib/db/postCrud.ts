"use server";

import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import { PartialBy } from "../type";

export const getPosts = async (): Promise<Post[]> => {
  try {
    return await prisma.post.findMany({
 
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching Post:", error);
    throw new Error("Failed to fetch Post");
  }
};
 export const getSinglePost = async (postId: number): Promise<Post | null> => {
  try {
    return await prisma.post.findUnique({
      where: { id: postId },
     
    });
  } catch (error) {
    console.error("Error fetching Post:", error);
    throw new Error("Failed to fetch Post");
  }
};
 export const getRelatedPosts = async (postId: number): Promise<{relatedPosts: Post[] } | null> => {
  try {
    const currentPost= await prisma.post.findUnique({
      where: { id: postId },
     
    });
       if (!currentPost) {
    throw new Error("Failed to fetch Post");
        }

        const allPosts = await prisma.post.findMany({
            where: {
                published: true,
                id: {
                    not: postId,
                },
            },
           
        });

        const postsWithScores = allPosts.map((post) => ({
            ...post,
            similarityScore: calculateTFIDFSimilarity(currentPost.content, post.content),
        }));

    postsWithScores.sort((a, b) => b.similarityScore - a.similarityScore);
        const relatedPosts: Post[] = postsWithScores.slice(0, 3).map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      blogCategoryId: post.blogCategoryId, 
      tag: post.tag,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      publishedAt: post.publishedAt,
    }));

        return { relatedPosts };
  } catch (error) {
    console.error("Error fetching Post:", error);
    throw new Error("Failed to fetch Post");
  }
};

export const getPublishedPosts = async (): Promise<Post[]> => {
  try {
    return await prisma.post.findMany({
  where: {
                published:true
            },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching Post:", error);
    throw new Error("Failed to fetch Post");
  }
};
export const getLatestPosts = async (): Promise<Post[]> => {
  try {
    return await prisma.post.findMany({
  where: {
                published:true
      },
       orderBy: {
                createdAt:"desc"
            }
            ,
             take: 5,
    });
  } catch (error) {
    console.error("Error fetching Post:", error);
    throw new Error("Failed to fetch Post");
  }
};
export const createPost = async (
  PostData: PartialBy<Post, "id">
) => {
  try {
    return await prisma.post.create({
      data: PostData,
    });
  } catch (error) {
    console.error("Error creating Post:", error);
    throw new Error("Failed to create Post");
  }
};

export const updatePost = async (
  postId: number,
  updatedData: PartialBy<Post, "id" >
) => {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating Post:", error);
    throw new Error("Failed to update Post");
  }
};

export const deletePost = async (postId: number) => {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

function calculateTFIDFSimilarity(content1: string, content2: string): number {
    
    const words1 = content1.split(" ");
    const words2 = content2.split(" ");
    const commonWords = words1.filter((word) => words2.includes(word));
    return commonWords.length; 
}