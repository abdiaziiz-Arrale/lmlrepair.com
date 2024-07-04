"use client"
import React, { useState, useRef, useCallback } from "react";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { CreatePostsData } from "@/lib/_action";
import { Post } from "@/lib/type";
import CustomEditorPost from "./CustomEditor"; 
import { Input } from "../components/ui/input";
import { BlockToolData } from "@editorjs/editorjs";

interface NewPostDialogProps {
  onClose: () => void;
  onSave: (newPost: Post) => void;
}

const NewPostDialog: React.FC<NewPostDialogProps> = ({ onClose, onSave }) => {
  const [newPost, setNewPost] = useState<Post>({
    id: 0,
    title: "",
    content: "",
    imageUrls: [],
    author: { id: 1, email: "", name: "" },
    createdAt: new Date(),
    published: false,
  });

  const [titleError, setTitleError] = useState<string>('');
  const [authorError, setAuthorError] = useState<string>('');
  const [contentError, setContentError] = useState<string>('');

  const editorRef = useRef<EditorJS | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (editorRef.current) {
      const savedData = await editorRef.current.save();
      const blocks: BlockToolData[] = savedData.blocks;

      // Extract text from the blocks array
      const texts: string[] = blocks.map(block => {
        if (block.type === 'paragraph' && block.data.text) {
          return block.data.text;
        }
        return '';
      }).filter(text => text !== '');

      // Join the texts into a single string (if needed)
      const combinedText = texts.join('\n');
  
      const postToSave: Post = { ...newPost, content: combinedText };

      try {
        const savedPost = await CreatePostsData(postToSave);
        onSave(savedPost);
      } catch (error) {
        console.error("Error saving post:", error);
      }
    }
  };

  const handleInstance = useCallback((instance: EditorJS) => {
    editorRef.current = instance;
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!newPost.title.trim()) {
      setTitleError('Please enter a title');
      isValid = false;
    } else {
      setTitleError('');
    }



  

    return isValid;
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">New Blog Post</h1>
          <div className="mt-3 text-lg text-muted-foreground">Create a new blog post for your website.</div>
        </div>
        <div className="space-y-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter the blog post title"
                className="mt-2"
                onChange={handleChange}
              />
              {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                type="text"
                placeholder="Enter the author's name"
                className="mt-2"
                onChange={handleChange}
              />
              {authorError && <p className="text-red-500 text-sm mt-1">{authorError}</p>}
            </div>
            <div className="sm:col-span-6">
              <Label htmlFor="category">Category</Label>
              <Select name="category" onChange={handleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="sm:col-span-6">
          <Label htmlFor="content">Content</Label>
          <div className="mt-2">
            <CustomEditorPost post={null} handleInstance={handleInstance} />
            {contentError && <p className="text-red-500 text-sm mt-1">{contentError}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default NewPostDialog;
