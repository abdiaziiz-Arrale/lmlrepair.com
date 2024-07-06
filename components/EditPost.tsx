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
import { Input } from "./ui/input";
import { updatePost } from "@/lib/db/postCrud";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useToast } from "./ui/use-toast";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.number().min(1, "Author ID is required"),
  blogCategoryId: z.number().min(1, "Blog Category ID is required"),
  tag: z.string().optional(),
  published: z.boolean().default(false), // Added the published field to the schema
});

type FormData = z.infer<typeof schema>;

interface EditPostProps {
  postId: number;
  title: string;
  content: string;
  authorId: number;
  blogCategoryId: number;
  tag?: string;
  published: boolean; 
}

const EditPost = ({
  postId,
  title,
  content,
  authorId,
  blogCategoryId,
  tag,
  published, // Added published to the props
}: EditPostProps) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title,
      content,
      authorId,
      blogCategoryId,
      tag,
      published, // Passed published to defaultValues
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);

      await updatePost(postId, {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        blogCategoryId: formData.blogCategoryId,
        tag: formData.tag || '',
        metaDescription: '',
        metaTitle: '',
        createdAt: new Date(),
        published: formData.published, // Passed the published field to updatePost
        publishedAt: new Date(),
        updatedAt: new Date(),
      });

      setLoading(false);
      setDialogOpen(false);
      
      toast({
        title: "Post Updated",
        description: "Your post has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating post:', error);
      toast({
        title: "Failed to update post",
        description: "An error occurred while updating the post. Please try again.",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          {" "}
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post: {title}</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {errors.title && <p>{errors.title.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {errors.content && <p>{errors.content.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.authorId && <p>{errors.authorId.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="blogCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Category ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  {errors.blogCategoryId && <p>{errors.blogCategoryId.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  {errors.tag && <p>{errors.tag.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <input type="checkbox" {...field}
                      defaultChecked={published}
                      className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded" />
                    
                  </FormControl>
                  <FormLabel>
                    Publish
                  </FormLabel>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={loading} variant="default">
                {loading ? "Loading" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
