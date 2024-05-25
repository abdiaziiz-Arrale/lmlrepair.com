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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createService } from "@/lib/db/serviceCrud";
import moment from "moment";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { PutBlobResult } from "@vercel/blob";

const AddService = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceDescription: "",
    serviceImage: "",
  });
  const [type, setType] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit() {
    if (
      !formData.serviceName ||
      !formData.serviceImage ||
      !type ||
      !formData.serviceDescription
    ) {
      alert("missing info");
      return 0;
    }
    try {
      setLoading(true);
      let imageUrl: string | null = null;
      if (inputFileRef.current?.files) {
        const file = inputFileRef.current.files[0];

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
        throw new Error("Please provide an image for the department.");
      }

      if (!imageUrl) {
        throw new Error("Image upload failed. Please try again.");
      }

      await createService({
        service_id: undefined,
        service_name: formData.serviceName,
        service_desc: formData.serviceDescription,
        service_type: type,
        service_image: imageUrl,
      });

      setLoading(false);
      window.location.href = "/dashboard/services";
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
          <DialogTitle>Add Service</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceName" className="text-right">
              service name
            </Label>
            <Input
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Service Name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceDescription" className="text-right">
              Description
            </Label>
            <Input
              name="serviceDescription"
              value={formData.serviceDescription}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Service Description"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceImage" className="text-right">
              Image
            </Label>
            <Input
              name="serviceImage"
              value={formData.serviceImage}
              onChange={handleInputChange}
              className="col-span-3"
              type="file"
              accept="image/*"
              ref={inputFileRef}
            />
          </div>

          <div className=" ml-12 flex items-center gap-4">
            <Label htmlFor="serviceType" className="text-right">
              Type
            </Label>
            <Select required onValueChange={(value: any) => setType(value)}>
              <SelectTrigger className="w-max">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type:</SelectLabel>
                  <SelectItem value="repair_service">Repair service</SelectItem>
                  <SelectItem value="general_service">
                    General services
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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

export default AddService;
