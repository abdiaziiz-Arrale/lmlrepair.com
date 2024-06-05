"use client";
import React, { useEffect, useRef, useState } from "react";
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
import type { PutBlobResult } from "@vercel/blob";
import { updateModel } from "@/lib/db/modelCrud";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSeries } from "@/lib/db/seriesCrud";
import { Series } from "@prisma/client";
import { Pencil } from "lucide-react";

interface EditModelProps {
  brandId: number;
  seriesId: number;
  modelId: number;
  modelName: string;
}

const EditModel = ({
  brandId,
  seriesId,
  modelId,
  modelName,
}: EditModelProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const [seriess, setseriess] = useState<Series[]>([]);
  const [seriessLoading, setseriessLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchseriess = async () => {
      setseriessLoading(true);
      setError(null);
      try {
        const data = await getSeries(brandId);
        setseriess(data);
      } catch (err) {
        setError("Failed to fetch series");
      } finally {
        setseriessLoading(false);
      }
    };

    fetchseriess();
  }, []);

  const schema = z.object({
    modelName: z.string().min(1, "model name is required"),
    modelDescription: z.string().min(1, "model description is required"),
    modelseries: z.string().min(1, "model series is required"),
    modelImage: z
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

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      modelName: modelName,
      modelseries: seriesId.toString(),
    },
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
      const file = formData.modelImage?.[0];

      if (!file) {
        await updateModel(modelId, {
          series_id: parseInt(formData.seriesId),
          model_name: formData.modelName,
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

      await updateModel(modelId, {
        series_id: parseInt(formData.seriesId),
        model_name: formData.modelName,
        model_image: imageUrl,
      });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
      alert("something went wrong with the server");
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {modelName}</DialogTitle>
        </DialogHeader>

        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <FormField
              control={control}
              name="modelName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>model Name</FormLabel>
                  <FormControl>
                    <Input placeholder="model Name" {...field} />
                  </FormControl>
                  {errors.modelName && <p>{errors.modelName.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="modelDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>model Description</FormLabel>
                  <FormControl>
                    <Input placeholder="model Description" {...field} />
                  </FormControl>
                  {errors.modelDescription && (
                    <p>{errors.modelDescription.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="modelseries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change series</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-max">
                        <SelectValue placeholder="Select series" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Change series:</SelectLabel>
                          {seriessLoading ? (
                            <div>Loading...</div>
                          ) : error ? (
                            <div>Error: {error}</div>
                          ) : (
                            seriess.map((series) => (
                              <SelectItem
                                key={series.series_id}
                                value={series.series_id.toString()}
                              >
                                {series.series_name}
                              </SelectItem>
                            ))
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.modelseries && <p>{errors.modelseries.message}</p>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="modelImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="modelImage" className="text-right mb-2">
                    Image
                  </FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={inputFileRef}
                    id="modelImage"
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

export default EditModel;
