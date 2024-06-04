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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PutBlobResult } from "@vercel/blob";
import { createSeries } from "@/lib/db/seriesCrud";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

interface AddSeriesProps {
  brandId: number;
}

const AddSeries = ({ brandId }: AddSeriesProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    seriesName: z.string().min(1, "Series name is required"),
    seriesDescription: z.string().min(1, "Series description is required"),
    seriesImage: z
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

  const methods = useForm({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = async (formData: FieldValues) => {
    try {
      setLoading(true);
      let imageUrl: string | null = null;
      const file = formData.seriesImage?.[0];

      if (!file) {
        await createSeries({
          brand_id: brandId,
          series_name: formData.seriesName,
          series_desc: formData.seriesDescription,
          series_image: "/lml_logo.png",
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

      await createSeries({
        brand_id: brandId,
        series_name: formData.seriesName,
        series_desc: formData.seriesDescription,
        series_image: imageUrl,
      });

      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add series</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add series</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="seriesName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Series Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="seriesDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Series Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Series Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="seriesImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="seriesImage" className="text-right mb-2">
                    Image
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={inputFileRef}
                    id="seriesImage"
                    className="col-span-3"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
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

export default AddSeries;
