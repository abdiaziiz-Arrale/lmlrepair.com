"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createLeave } from "@/lib/db/leaveCrud";
import { Input } from "../../../../components/ui/input";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { DateRangePicker } from "../../../../components/ui/DateRangePicker";
import { useToast } from "../../../../components/ui/use-toast";
import moment from "moment";
import { Button } from "@/components/ui/button";

const schema = z.object({
  leaveType: z.string().min(1, "Leave type is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof schema>;

const AddLeave = ({ staffId }: { staffId: number }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const router = useRouter();
  const { toast } = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  async function onSubmit(formData: FieldValues) {
    try {
      if (!date || !date.from || !date.to) {
        toast({
          title: "Please Choose Date",
          description: "Try again.",
          variant: "default",
        });
        return;
      }

      setLoading(true);
      await createLeave({
        type: formData.leaveType,
        start_date: moment(date.from).format("MMMM Do YYYY"),
        end_date: moment(date.to).format("MMMM Do YYYY"),
        description: formData.description,
        staff_id: staffId,
      });
      setLoading(false);
      toast({
        title: "Leave requested successfully",
        description: "Your leave request has been submitted.",
        variant: "default",
      });
      router.push("/dashboard/leave");
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Try again.",
        variant: "destructive",
      });
      console.error("An error occurred:", error);
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">
          Add Leave Request
        </h2>
        <Form {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={control}
              name="leaveType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Types:</SelectLabel>
                          <SelectItem value="sick_leave">Sick Leave</SelectItem>
                          <SelectItem value="casual_leave">
                            Casual Leave
                          </SelectItem>
                          <SelectItem value="paid_leave">Paid Leave</SelectItem>
                          <SelectItem value="unpaid_leave">
                            Unpaid Leave
                          </SelectItem>
                          <SelectItem value="maternity_leave">
                            Maternity Leave
                          </SelectItem>
                          <SelectItem value="paternity_leave">
                            Paternity Leave
                          </SelectItem>
                          <SelectItem value="bereavement_leave">
                            Bereavement Leave
                          </SelectItem>
                          <SelectItem value="personal_leave">
                            Personal Leave
                          </SelectItem>
                          <SelectItem value="vacation_leave">
                            Vacation Leave
                          </SelectItem>
                          <SelectItem value="jury_duty_leave">
                            Jury Duty Leave
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {errors.leaveType && (
                    <p className="text-red-500">{errors.leaveType.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Leave Description" {...field} />
                  </FormControl>
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Date Range</FormLabel>
              <DateRangePicker date={date} setDate={setDate} />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading} variant="default">
                {loading ? "Loading" : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddLeave;
