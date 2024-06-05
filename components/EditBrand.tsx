"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import type { PutBlobResult } from "@vercel/blob";
import { updateBrand } from "@/lib/db/brandCrud";
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
import { Pencil } from "lucide-react";

const schema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  brandDescription: z.string().min(1, "Brand description is required"),
  brandImage: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        (files.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type)),
      "Only jpg, jpeg, and png files are allowed"
    ),
});

type FormData = z.infer<typeof schema>;

const EditBrand = ({
  brandId,
  brandName,
  brandDescription,
}: {
  brandId: number;
  brandName: string;
  brandDescription: string;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      brandName: brandName,
      brandDescription: brandDescription,
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
      let imageUrl: string | null = null;
      const file = formData.brandImage?.[0];

      if (!file) {
        await updateBrand(brandId, {
          brand_name: formData.brandName,
          brand_desc: formData.brandDescription,
        });
        setLoading(false);
        window.location.reload();
        return;
      }

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file.");
      }

      const newBlob = (await response.json()) as PutBlobResult;
      imageUrl = newBlob.url;

      await updateBrand(brandId, {
        brand_name: formData.brandName,
        brand_desc: formData.brandDescription,
        brand_image: imageUrl,
      });

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {brandName}</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand Name" {...field} />
                  </FormControl>
                  {errors.brandName && <p>{errors.brandName.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="brandDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand Description" {...field} />
                  </FormControl>
                  {errors.brandDescription && (
                    <p>{errors.brandDescription.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="brandImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="brandImage" className="text-right mb-2">
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={inputFileRef}
                      id="brandImage"
                      className="col-span-3"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
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

export default EditBrand;
