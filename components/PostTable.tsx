import { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import NewPostDialog from "./NewPostDialog";
import logo from '../public/newlogo.png';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert";
import { DelateSinglePost, UpdatePostsData } from "@/lib/_action";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Label } from "@radix-ui/react-label";

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

interface PostTableProps {
  Posts: PostProps[];
}

const PostTable: React.FC<PostTableProps> = ({ Posts }) => {
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [editPostData, setEditPostData] = useState<PostProps | null>(null);

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

  const handleEditPost = (post: PostProps) => {
    setSelectedPost(post);
    setEditPostData(post);
    console.log("Edit",post);
    setShowEditPostDialog(true);
  };

  const handleCloseEditPostDialog = () => {
    setShowEditPostDialog(false);
    setSelectedPost(null);
    setEditPostData(null);
  };

  const handleUpdatePost = async () => {
    if (!editPostData) return;

    setLoading(true);
    setError(null);

    try {
      await UpdatePostsData({
        id: editPostData.id,
        title: editPostData.title,
        content: editPostData.content,
        published: editPostData.published,
      });

      // Update the local state or refetch posts
      // Example: refetch posts or update locally
      console.log("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.message);
    } finally {
      setLoading(false);
      handleCloseEditPostDialog();
    }
  };

  const handleDeletePost = (postId: number) => {
    setPostToDelete(postId);
  };

  const confirmDeletePost = async () => {
    if (postToDelete === null) return;

    setLoading(true);
    setError(null);

    try {
      await DelateSinglePost(postToDelete);
      setPostToDelete(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
  };

  return (
    <div className="flex-1 p-6 mt-40">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Button onClick={handleNewPost}>New Post</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <img src={logo.src} alt={post.title} width={64} height={64} className="rounded-md" />
              </TableCell>
              <TableCell>{post.title}</TableCell>
<TableCell>{post.content.length > 30 ? `${post.content.slice(0, 30)}...` : post.content}</TableCell>
              <TableCell>{post.author.name}</TableCell>
              <TableCell>{new Date(post.createAt).toDateString()}</TableCell> {/* Fixed field name typo */}
              <TableCell>
                <Badge variant={post.published ? "primary" : "secondary"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleEditPost(post)}>
                    <FilePenIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeletePost(post.id)}>
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showNewPostDialog && (
        <NewPostDialog
          onClose={handleCloseNewPostDialog}
          onSave={handleSaveNewPost}
          postCount={Posts.length}
        />
      )}
      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && handleCancelDelete()}>
        <AlertDialogContent >
          <AlertDialogHeader >
            <AlertDialogTitle >
              Are you sure you want to delete this?
            </AlertDialogTitle>
            <AlertDialogDescription >
              This action cannot be undone. This will permanently delete the selected item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className={`px-4 py-2 rounded-md text-white font-semibold ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={confirmDeletePost}
              disabled={loading}
            >
              {loading ? "Processing..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {selectedPost && (
        <AlertDialog open={showEditPostDialog} onOpenChange={(open) => !open && handleCloseEditPostDialog()}>
          <AlertDialogContent >
            <AlertDialogHeader>
              <AlertDialogTitle>
                Edit Post
              </AlertDialogTitle>
            </AlertDialogHeader>
            <div className="p-4">
              <Label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </Label>
              <Input
                id="edit-title"
                type="text"
                className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                value={editPostData?.title || ""}
                onChange={(e) =>
                  setEditPostData((prev) => ({
                    ...prev!,
                    title: e.target.value,
                  }))
                }
              />
              <Label htmlFor="edit-content" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                Content
              </Label>
              <Textarea
                id="edit-content"
                className="w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500 px-3 py-2 h-32"
                value={editPostData?.content || ""}
                onChange={(e) =>
                  setEditPostData((prev) => ({
                    ...prev!,
                    content: e.target.value,
                  }))
                }
              />
              <div>
<Label htmlFor="status" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
  Status
</Label> 
<Select
  id="status"
  value={editPostData?.published ? "true" : "false"}
  onValueChange={(value) =>
    setEditPostData((prev) => ({
      ...prev!,
      published: value === "true",
    }))
  }
>
  <SelectTrigger>
    <SelectValue>{editPostData?.published ? "Published" : "Draft"}</SelectValue>
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="false">Draft</SelectItem>
      <SelectItem value="true">Published</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>


              </div>
            </div>
            <AlertDialogFooter >
              <AlertDialogCancel
                onClick={handleCloseEditPostDialog}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleUpdatePost}
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

function FilePenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default PostTable;
