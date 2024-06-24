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

import { createProductSubCatgeory } from "@/lib/db/productSubCategoryCrud";

const schema = z.object({
  productSubCategoryName: z.string().min(1, "category name is required"),
  productSubCategoryDescription: z
    .string()
    .min(1, "category description is required"),
  productSubCategoryImage: z
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

const AddProductSubCategory = ({
  productCategoryId,
}: {
  productCategoryId: number;
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
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
      const file = formData.productSubCategoryImage?.[0];

      if (!file) {
        await createProductSubCatgeory({
          product_sub_category_name: formData.productSubCategoryName,
          product_sub_category_desc: formData.productSubCategoryDescription,
          product_sub_category_image: "/lml_logo.png",
          product_category_id: productCategoryId,
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

      await createProductSubCatgeory({
        product_sub_category_name: formData.productSubCategoryName,
        product_sub_category_desc: formData.productSubCategoryDescription,
        product_sub_category_image: imageUrl,
        product_category_id: productCategoryId,
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
        <Button variant="default">Add new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add sub category</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="productSubCategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="category Name" {...field} />
                  </FormControl>
                  {errors.productSubCategoryName && (
                    <p>{errors.productSubCategoryName.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="productSubCategoryDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="productSubCategory Description"
                      {...field}
                    />
                  </FormControl>
                  {errors.productSubCategoryDescription && (
                    <p>{errors.productSubCategoryDescription.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="productSubCategoryImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="productSubCategoryImage"
                    className="text-right mb-2"
                  >
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={inputFileRef}
                      id="productSubCategoryImage"
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

export default AddProductSubCategory;
