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
import { createProduct } from "@/lib/db/productCrud";

const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productDescription: z.string().min(1, "Product description is required"),
  productImage: z
    .any()
    .optional()
    .refine(
      (files) =>
        !files ||
        (files.length > 0 &&
          ["image/jpeg", "image/png", "image/jpg"].includes(files[0]?.type)),
      "Only jpg, jpeg, and png files are allowed"
    ),
  raw: z.string().min(1, "Raw is required"),
  shipping: z.string().min(1, "Shipping is required"),
  tax: z.string().min(1, "Tax is required"),
  markup: z.string().min(1, "Markup is required"),
});

type FormData = z.infer<typeof schema>;

const AddProduct = ({ productCategoryId }: { productCategoryId: number }) => {
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
      const file = formData.productImage?.[0];

      if (!file) {
        await createProduct({
          product_name: formData.productName,
          product_desc: formData.productDescription,
          product_image: "/lml_logo.png",
          product_category_id: productCategoryId,
          raw: parseInt(formData.raw),
          markup: parseFloat(formData.markup),
          tax: parseFloat(formData.tax),
          shipping: parseInt(formData.shipping),
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

      await createProduct({
        product_name: formData.productName,
        product_desc: formData.productDescription,
        product_image: imageUrl,
        product_category_id: productCategoryId,
        raw: parseInt(formData.raw),
        markup: parseFloat(formData.markup),
        tax: parseFloat(formData.tax),
        shipping: parseInt(formData.shipping),
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
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  {errors.productName && <p>{errors.productName.message}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  {errors.productDescription && (
                    <p>{errors.productDescription.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="productImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      ref={inputFileRef}
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="raw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Raw</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Raw" {...field} />
                  </FormControl>
                  {errors.raw && <p>{errors.raw.message}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="shipping"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Shipping" {...field} />
                  </FormControl>
                  {errors.shipping && <p>{errors.shipping.message}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="tax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax %</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Tax" {...field} />
                  </FormControl>
                  {errors.tax && <p>{errors.tax.message}</p>}
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="markup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Markup %</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Markup" {...field} />
                  </FormControl>
                  {errors.markup && <p>{errors.markup.message}</p>}
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

export default AddProduct;
