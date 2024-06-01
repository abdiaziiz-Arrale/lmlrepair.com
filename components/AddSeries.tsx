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
import { createSeries } from "@/lib/db/seriesCrud";

interface AddSeriesProps {
  brandId: number;
}

const AddSeries = ({ brandId }: AddSeriesProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    seriesName: "",
    seriesDescription: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit() {
    if (!formData.seriesName || !formData.seriesDescription) {
      alert("missing info");
      return 0;
    }
    try {
      setLoading(true);
      let imageUrl: string | null = null;
      if (inputFileRef.current?.files) {
        const file = inputFileRef.current.files[0];
        if (!file) {
          await createSeries({
            brand_id: brandId,
            series_name: formData.seriesName,
            series_desc: formData.seriesDescription,
            series_image: "/lml_logo.png",
          });
          setLoading(false);
          window.location.reload()
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

      await createSeries({
        brand_id: brandId,
        series_name: formData.seriesName,
        series_desc: formData.seriesDescription,
        series_image: imageUrl,
      });

      setLoading(false);
      window.location.reload()
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add series</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add series</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seriesName" className="text-right">
              series name
            </Label>
            <Input
              name="seriesName"
              value={formData.seriesName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="series Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seriesDescription" className="text-right">
              Description
            </Label>
            <Input
              name="seriesDescription"
              value={formData.seriesDescription}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Service Description"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="seriesImage" className="text-right">
              Image
            </Label>
            <Input
              name="seriesImage"
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

export default AddSeries;
