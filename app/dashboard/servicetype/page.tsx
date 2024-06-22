"use client";

import CustomContainer from "@/components/CustomContainer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function ServiceTypeTable() {
  const [search, setSearch] = useState("");

  const servicetypes: { id: number; type: string; description: string }[] = [
    {
      id: 1,
      type: "general_service",
      description: "Regular maintenance and checks.",
    },
    { id: 2, type: "repairs_service", description: "Repair and fix issues." },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const filteredServiceTypes = servicetypes.filter((servicetype) => {
    return (
      search.toLowerCase() === "" ||
      servicetype.type.toLowerCase().includes(search)
    );
  });

  return (
    <CustomContainer>
      <h1 className="text-3xl px-2 mb-4">Service types</h1>
      <Card className="mb-4">
        <div className="flex justify-between items-center gap-5 px-3 py-6">
          <div className="flex items-center border border-primary-foreground px-3 rounded-md ">
            <Search />
            <Input
              placeholder="Search service type..."
              className="w-96 border-none focus-visible:outline-none"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServiceTypes.map((serviceType) => (
          <Card key={serviceType.id} className="p-4">
            <Link
              href={`/dashboard/servicetype/services?servicetype=${serviceType.type}`}
            >
              <div className="flex flex-col items-start">
                <h2 className="text-2xl font-bold mb-2">
                  {serviceType.type.replace("_", " ")}
                </h2>
                <p className="text-gray-600 mb-4">{serviceType.description}</p>
                <button className="mt-auto text-blue-500 hover:underline">
                  Select
                </button>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </CustomContainer>
  );
}

export default ServiceTypeTable;
