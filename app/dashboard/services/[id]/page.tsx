"use client";
import AddCategory from "@/components/AddCategory";
import CustomContainer from "@/components/CustomContainer";
import EditCategory from "@/components/EditCategory";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCategory } from "@/lib/db/category";
import { Category } from "@prisma/client";
import { ArrowLeftIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    serviceName: string;
    serviceImage: string;
  };
}

const Service = ({ params, searchParams }: Props) => {
  const router = useRouter();
  const { theme } = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getCategory(parseInt(params.id));
        setCategories(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <CustomContainer>
      <div className="flex flex-col gap-7">
        <Card>
          <div className="flex justify-between p-5">
            <div className="flex items-center gap-4 ">
              <img
                src={searchParams.serviceImage}
                alt={searchParams.serviceName}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-4">
                  <h1 className="text-2xl font-semibold">
                    {searchParams.serviceName}
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Button
                className={`${
                  theme === "light"
                    ? "bg-primary text-secondary-foreground"
                    : "bg-primary text-secondary"
                }`}
                onClick={() => router.back()}
              >
                <ArrowLeftIcon />
              </Button>
              <AddCategory
                serviceId={parseInt(params.id)}
                serviceName={searchParams.serviceName}
                serviceImage={searchParams.serviceImage}
              />
            </div>
          </div>
        </Card>
        <Card>
          {loading ? (
            <div className="p-5">Loading...</div>
          ) : error ? (
            <div className="p-5 text-red-500">Failed to load categories.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type Of Repair</TableHead>
                  <TableHead>Raw</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Shipping</TableHead>
                  <TableHead>Labour</TableHead>
                  <TableHead>Time Frame</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.category_id}>
                    <TableCell>{category.type_Of_Repair}</TableCell>
                    <TableCell className="font-medium">
                      {category.raw}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.tax}%
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.shipping}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.labour}
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.timeFrame}
                    </TableCell>
                    <TableCell className="font-medium">
                      $
                      {Math.ceil(category.raw +
                        category.raw * (category.tax / 100) +
                        category.shipping +
                        category.labour)}
                    </TableCell>

                    <TableCell className="font-medium">
                      <EditCategory
                        categoryId={category.category_id}
                        serviceId={category.service_id}
                        tax={category.tax.toString()}
                        labour={category.labour.toString()}
                        shipping={category.shipping.toString()}
                        raw={category.raw.toString()}
                        timeFrame={category.timeFrame}
                        typeOfRepair={category.type_Of_Repair.toString()}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </CustomContainer>
  );
};

export default Service;
