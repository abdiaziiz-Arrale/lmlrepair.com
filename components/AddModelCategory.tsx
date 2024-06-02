"use client";
import React, { useState } from "react";
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
import { createModelCategory } from "@/lib/db/modelCategoryCrud";

interface AddModelCategoryProps {
  modelId: number;
}

const AddModelCategory = ({
  modelId,
}: AddModelCategoryProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    typeOfRepair: "",
    raw: "0",
    tax: "0",
    shipping: "0",
    labour: "0",
    timeFrame: "0",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function onSubmit() {
    if (
      !formData.typeOfRepair ||
      !formData.timeFrame ||
      !formData.labour ||
      !formData.tax ||
      !formData.shipping
    ) {
      alert("missing info");
      return 0;
    }
    try {
      setLoading(true);

      await createModelCategory({
        model_id: modelId,
        type_of_repair: formData.typeOfRepair,
        raw: parseInt(formData.raw),
        tax: parseInt(formData.tax),
        shipping: parseInt(formData.shipping),
        labour: parseInt(formData.labour),
        timeFrame: formData.timeFrame,
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
        <Button>Add new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="typeOfRepair" className="text-right">
              Type of repair
            </Label>
            <Input
              name="typeOfRepair"
              value={formData.typeOfRepair}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="raw" className="text-right">
              Raw
            </Label>
            <Input
              name="raw"
              value={formData.raw}
              onChange={handleInputChange}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tax" className="text-right">
              Tax %
            </Label>
            <Input
              name="tax"
              value={formData.tax}
              onChange={handleInputChange}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shipping" className="text-right">
              Shipping
            </Label>
            <Input
              name="shipping"
              value={formData.shipping}
              onChange={handleInputChange}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="labour" className="text-right">
              Labour
            </Label>
            <Input
              name="labour"
              value={formData.labour}
              onChange={handleInputChange}
              className="col-span-3"
              type="number"
            />
          </div>
        </div>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="timeFrame" className="text-right">
              Time frame
            </Label>
            <Input
              name="timeFrame"
              value={formData.timeFrame}
              onChange={handleInputChange}
              className="col-span-3"
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

export default AddModelCategory;
