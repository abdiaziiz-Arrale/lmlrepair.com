'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/TopDialog";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/lib/db/postCrud";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { Trash } from "lucide-react";

const DeletePost = ({ postId }: { postId: number }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit() {
    try {
      setLoading(true);

      await deletePost(postId);

      setLoading(false);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to delete post",
        description: "An error occurred while deleting the post. Please try again.",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={loading} variant="destructive">
            {loading ? "Loading" : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
