"use client";
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
import { updateAnnouncement } from "@/lib/db/announcementCrud";
import { useForm, Controller } from "react-hook-form";
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
  content: z.string().min(1, "Content is required"),
  tag: z.string().min(1, "Tag is required"),
  active: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface EditAnnouncementProps {
  announcementId: number;
  content: string;
  tag: string;
  active: boolean;
}

const EditAnnouncement = ({
  announcementId,
  content,
  tag,
  active,
}: EditAnnouncementProps) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const router = useRouter();
  const tagOptions = ["services", "productcategories"];

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      content,
      tag,
      active,
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

      await updateAnnouncement(announcementId, {
        content: formData.content,
        tag: formData.tag,
        Active: formData.active||false,
        createdAt: new Date(), 
      });

      setLoading(false);
      setDialogOpen(false);

      router.refresh();
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again.",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Announcement</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >

                      {tagOptions.map((tag, index) => (

                        <option key={index} value={tag} >
                          {tag}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  {errors.tag && <p>{errors.tag.message}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Controller
                      name="active"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </FormControl>
                  {errors.active && <p>{errors.active.message}</p>}
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

export default EditAnnouncement;
