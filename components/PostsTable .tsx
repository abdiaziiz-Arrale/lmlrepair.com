'use client';
import { Search } from "lucide-react";
import Image from "next/image";
import CustomContainer from "./CustomContainer";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { Post } from "@prisma/client"; 
import EditPost from "./EditPost";
import AddPost from "./AddPost"; 
import DeletePost from "./DeletePost"; 
interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface PostWithDetails extends Post {
  author: Author;
  category: Category;
}

interface PostsTableProps {
  posts: PostWithDetails[];
}


function PostsTable({ posts }: PostsTableProps) {
  const [search, setSearch] = useState("");
console.log(posts                                                           );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const filteredPosts = posts.filter((post) => {
    return (
      search.toLowerCase() === "" ||
      post.title.toLowerCase().includes(search)
    );
  });

  return (
    <CustomContainer>
      <h1 className="text-3xl px-2 mb-4">Posts</h1>
      <Card className="mb-4">
        <div className="flex justify-between items-center gap-5 px-3 py-6">
          <div className="flex items-center border border-primary-foreground px-3 rounded-md ">
            <Search />
            <Input
              placeholder="Search posts"
              className="lg:w-96 border-none focus-visible:outline-none"
              onChange={handleInputChange}
            />
          </div>
          <AddPost />
          {/* Replace with appropriate component for uploading posts */}
          <div className="flex items-center">
            {/* <UploadPosts /> */}
          </div>
        </div>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-72">Title</TableHead>
            {/* Adjust column headers based on your Post schema */}
            <TableHead className="w-80">Content</TableHead>
            <TableHead className="w-80">Author</TableHead>
            <TableHead className="w-80">Author</TableHead>
            <TableHead className="w-80">Published</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>   
              <TableCell>{post.content}</TableCell>   
              {/* Display other relevant post fields */}
              <TableCell>{post.authorId}</TableCell>
              <TableCell>{post.blogCategoryId}</TableCell>
              <TableCell>{post.published ? "Published" : "Unpublished"}</TableCell>
              <TableCell>
                <EditPost
                  postId={post.id}
                  title={post.title}
                  content={post.content}
                  authorId={post.authorId}
                  blogCategoryId={post.blogCategoryId}
                  tag={post.tag}
                  published={post.published}
                  
                />
              </TableCell>
              <TableCell>
                <DeletePost postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomContainer>
  );
}

export default PostsTable;
