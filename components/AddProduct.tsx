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
import { createProduct } from "@/lib/db/productCrud";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddProduct = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    markup: '0',
    shipping: '0',
    raw: '0',
    tax: '0',
  });
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit() {


  
    if (
      !formData.productName ||
      !selectedCategory||
      !formData.productDescription ||
      !formData.markup ||
      !formData.shipping ||
      !formData.raw ||
      !formData.tax
    ) {
      alert("missing info");
      return 0;
    }
    try {
      setLoading(true);
      let imageUrl: string | null = null;
      if (inputFileRef.current?.files) {
        const file = inputFileRef.current.files[0];

        if (!file) {
          await createProduct({
            product_name: formData.productName,
            product_desc: formData.productDescription,
            product_image: "/lml_logo.png",
            product_category:selectedCategory,
            raw: parseInt(formData.raw),
            markup: parseInt(formData.markup),
            tax: parseInt(formData.tax),
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
      } else {
        throw new Error("Please provide an image for the brand.");
      }

      if (!imageUrl) {
        throw new Error("Image upload failed. Please try again.");
      }

      await createProduct({
        product_name: formData.productName,
        product_desc: formData.productDescription,
        product_image: imageUrl,
        product_category:selectedCategory,
        raw: parseInt(formData.raw),
        markup: parseInt(formData.markup),
        tax: parseInt(formData.tax),
        shipping: parseInt(formData.shipping),
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
        <Button variant="default">Add new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              product name
            </Label>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="product Name"
            />
          </div>

          <Select required onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories:</SelectLabel>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="devices">Devices</SelectItem>
              <SelectItem value="dyi">Dyi</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productDescription" className="text-right">
              Description
            </Label>
            <Input
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="productDescription"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serviceImage" className="text-right">
              Image
            </Label>
            <Input
              name="serviceImage"
              className="col-span-3"
              type="file"
              accept="image/*"
              ref={inputFileRef}
            />
          </div>
        </div>


        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="raw" className="text-right">
            Raw
          </Label>
          <Input
            name="raw"
            value={formData.raw}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="raw"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="shipping" className="text-right">
            shipping
          </Label>
          <Input
            name="shipping"
            value={formData.shipping}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="shipping"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tax" className="text-right">
            tax %
          </Label>
          <Input
            name="tax"
            value={formData.tax}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="tax"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="markup" className="text-right">
            Markup %
          </Label>
          <Input
            name="markup"
            value={formData.markup}
            onChange={handleInputChange}
            className="col-span-3"
            placeholder="markup"
          />
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

export default AddProduct;
