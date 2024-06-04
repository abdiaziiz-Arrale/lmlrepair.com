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
import { updateModelCategory } from "@/lib/db/modelCategoryCrud";
import { Pencil } from "lucide-react";

interface EditModelCategoryProps {
  modelCategory_id: number;
  modelId: number;
  typeOfRepair: string;
  raw: string;
  tax: string;
  shipping: string;
  labour: string;
  timeFrame: string;
}

const EditModelCategory = ({
  modelCategory_id,
  modelId,
  typeOfRepair,
  raw,
  tax,
  shipping,
  labour,
  timeFrame,
}: EditModelCategoryProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    typeOfRepair: typeOfRepair,
    raw: raw,
    tax: tax,
    shipping: shipping,
    labour: labour,
    timeFrame: timeFrame,
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

      await updateModelCategory(modelCategory_id, {
        model_id: modelId,
        type_of_repair: formData.typeOfRepair,
        raw: parseInt(formData.raw),
        tax: parseFloat(formData.tax),
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
        <Button>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Model Category</DialogTitle>
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

export default EditModelCategory;
