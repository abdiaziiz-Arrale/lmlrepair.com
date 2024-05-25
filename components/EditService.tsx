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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateService } from "@/lib/db/serviceCrud";
import moment from "moment";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Pencil } from "lucide-react";

interface EditServiceProps {
  serviceId: number;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
  serviceType: string;
}

const EditService: React.FC<EditServiceProps> = ({
  serviceId,
  serviceName,
  serviceImage,
  serviceDescription,
  serviceType,
}: EditServiceProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceName: serviceName,
    serviceDescription: serviceDescription,
    serviceImage: serviceImage,
  });
  const [type, setType] = useState(serviceType);

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
      const formattedDate = moment().format("YYYY-MM-DD");

      await updateService(serviceId, {
        service_id: serviceId,
        service_name: formData.serviceName,
        service_desc: formData.serviceDescription,
        service_type: type,
        service_image: formData.serviceImage,
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
        <Button variant="default">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
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
              placeholder="Service image"
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

export default EditService;
