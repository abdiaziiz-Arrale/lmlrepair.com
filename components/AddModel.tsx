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
import { Label } from "./ui/label";
import type { PutBlobResult } from "@vercel/blob";
import { createModel } from "@/lib/db/modelCrud";

interface AddModelProps {
  seriesId: number;
  brandId: number;
}

const AddModel = ({ seriesId, brandId }: AddModelProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    modelName: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit() {
    if (!formData.modelName) {
      alert("missing info");
      return 0;
    }
    try {
      setLoading(true);
      let imageUrl: string | null = null;
      if (inputFileRef.current?.files) {
        const file = inputFileRef.current.files[0];
        if (!file) {
          await createModel({
            series_id: seriesId,
            model_name: formData.modelName,
            model_image: "/lml_logo.png",
          });
          setLoading(false);
          window.location.href = `/dashboard/brands/${brandId}/series/${seriesId}/model`;
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
      } else {
        throw new Error("Please provide an image for the series.");
      }

      if (!imageUrl) {
        throw new Error("Image upload failed. Please try again.");
      }

      await createModel({
        series_id: seriesId,
        model_name: formData.modelName,
        model_image: imageUrl,
      });

      setLoading(false);
      window.location.href = `/dashboard/brands/${brandId}/series/${seriesId}/model`;
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add model</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add model</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelName" className="text-right">
              model name
            </Label>
            <Input
              name="modelName"
              value={formData.modelName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="model Name"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="modelImage" className="text-right">
              Image
            </Label>
            <Input
              name="modelImage"
              className="col-span-3"
              type="file"
              accept="image/*"
              ref={inputFileRef}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading}
            variant="default"
          >
            {loading ? "Loading" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddModel;
