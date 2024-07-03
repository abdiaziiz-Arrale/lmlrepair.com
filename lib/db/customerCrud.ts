"use server";

import prisma from "@/lib/prisma";
import { Customer, Prisma } from "@prisma/client";
import { PartialBy } from "../type";
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
export const getCustomers = async (): Promise<Customer[]> => {
  try {
    return await prisma.customer.findMany({
      orderBy: { customer_name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
};

export const createCustomer = async (
  customerData: PartialBy<Customer, "customer_id">
) => {
  try {
    return await prisma.customer.create({
      data: customerData,
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Failed to create customer");
  }
};


export const createBulkCustomer = async (
  customerData: Omit<Customer, "customer_id">[]
) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.customer.createMany({
        data: customerData,
      });
    });
    return { success: true };
  } catch (error) {
    console.error("Error creating customers:", error);
    throw new Error("Failed to create customers");
  } finally {
    await prisma.$disconnect();
  }
};

export const updateCustomer = async (
  customerId: number,
  updatedData: PartialBy<Customer, "customer_id">
) => {
  try {
    return await prisma.customer.update({
      where: { customer_id: customerId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error("Failed to update customer");
  }
};


export const deleteCustomer = async (customerId: number) => {
  try {
    await prisma.customer.delete({
      where: {
        customer_id: customerId,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};

export const createCustomerInContactUs = async (
  customerData: PartialBy<Customer, "customer_id">,message:string,location:string
) => {
  try {
    const existingCustomer = await prisma.customer.findUnique({
      where: { customer_email: customerData.customer_email },
    });

    if (existingCustomer) {
console.log("exxisting");
      await sendEmailWithMessage(existingCustomer, message, location);

      return { customer: existingCustomer, messageSent: true };
    }

    const newCustomer = await prisma.customer.create({
      data: customerData,
    });


    await sendEmailWithMessage(newCustomer, message, location);

    return { customer: newCustomer, messageSent: true };
  } catch (error) {
    console.error('Error creating customer or sending message:', error);
    throw error; 
  }
};
const sendEmailWithMessage = async (
  customer: Prisma.CustomerCreateInput,
  message: string,
  location: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || '',
        pass: process.env.GMAIL_PASS || '',
      },
    });

    const logoPath = path.join('C:', 'Users', 'abdia', 'Desktop', 'Project', 'lmlrepair.com', 'public', 'images', 'favicon.png');
        const logo = fs.readFileSync(logoPath);

    const mailOptions = {
      from: process.env.GMAIL_USER || '',
      to: process.env.GMAIL_USER || '',
      subject: `New Message From Customers In ${location}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #f7f7f7; padding: 20px; text-align: center;">
            <img src="cid:companyLogo" alt="Company Logo" style="max-width: 200px;"/>
          </div>
          <div style="padding: 20px;">
            <h2 style="color: #555;">New Message From Customer</h2>
            <p style="margin: 0;"><strong>Name:</strong> ${customer.customer_name}</p>
            <p style="margin: 0;"><strong>Email:</strong> ${customer.customer_email}</p>
            <p style="margin: 0;"><strong>Phone:</strong> ${customer.customer_phone}</p>
            <p style="margin: 0;"><strong>Message:</strong> ${message}</p>
          </div>
          <div style="background-color: #f7f7f7; padding: 20px; text-align: center; color: #999;">
            <p style="margin: 0;">Thank you for contacting us.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'companyLogo.png',
          content: logo,
          cid: 'companyLogo',
        },
      ],
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Ensure to handle or propagate the error as necessary
  }
};