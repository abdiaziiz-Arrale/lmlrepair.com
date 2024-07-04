"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import PostTable from "@/components/PostTable";
import Header from "@/components/website/header";

interface PostProps {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    email: string;
    name: string;
  };
  createAt: Date;
  published: boolean;
}

export default function Component() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const { posts } = await res.json();
        setPosts(posts);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    }
    loadPosts();
  }, []);

  const handlePostClick = (post: PostProps) => {
    setSelectedPost(post);
  };

  const handleClosePostDetails = () => {
    setSelectedPost(null);
  };

  const handleNewPost = () => {
    setShowNewPostDialog(true);
  };

  const handleCloseNewPostDialog = () => {
    setShowNewPostDialog(false);
  };

  const handleSaveNewPost = (newPost: PostProps) => {
    // Implement save logic here
    setShowNewPostDialog(false);
  };

  const handleEditPost = (postId: number) => {
    // Implement edit logic here
  };

  const handleDeletePost = (postId: number) => {
    // Implement delete logic here
  };

  return (
    <div className="flex h-screen w-full">
      <Header />
      <PostTable Posts={posts} />
    </div>
  );
}
