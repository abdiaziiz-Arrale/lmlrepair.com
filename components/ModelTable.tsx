"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import CustomContainer from "./CustomContainer";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import AddModel from "./AddModel";
import EditModel from "./EditModel";

type Model = {
  model_id: number;
  model_name: string;
  model_image: string;
  series_id: number;
  series: {
    brand_id: number;
    series_name: string;
  };
};

interface ModalTableProps {
  models: Model[];
  seriesId: number;
  brandId: number;
}

function ModalTable({ models, seriesId, brandId }: ModalTableProps) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const filteredModel = models.filter((model) => {
    return (
      search.toLowerCase() === "" ||
      model.model_name.toLowerCase().includes(search)
    );
  });
  return (
    <CustomContainer>
      <h1 className="text-3xl px-2 mb-4">
        {models.length !== 0 ? models[0].series.series_name : "No"} model
      </h1>
      <Card className="mb-4">
        <div className="flex justify-between items-center gap-5 px-3 py-6">
          <div className="flex items-center border border-primary-foreground px-3 rounded-md ">
            <Search />
            <Input
              placeholder="Search series..."
              className="w-96 border-none focus-visible:outline-none "
              onChange={handleInputChange}
            />
          </div>

          <AddModel seriesId={seriesId} brandId={brandId} />
        </div>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-72">Model Name</TableHead>
            <TableHead>Model Image</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredModel.map((model) => (
            <TableRow>
              <TableCell>
                <Link
                  className="hover:underline"
                  href={`/dashboard/brands/${model.series.brand_id}/series/${seriesId}/model`}
                >
                  {model.model_name}
                </Link>
              </TableCell>
              <TableCell>
                <img
                  src={model.model_image}
                  alt={model.model_name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
              </TableCell>
              <TableCell>
                <EditModel
                  seriesId={model.series_id}
                  brandId={model.series.brand_id}
                  modelId={model.model_id}
                  modelName={model.model_name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CustomContainer>
  );
}
export default ModalTable;
