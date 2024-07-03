import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from './ui/use-toast';
import { createCustomerInContactUs } from '@/lib/db/customerCrud';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'address is required'),
    message: z.string().min(1, 'Message is required'),
  
});

type FormData = z.infer<typeof schema>;
interface ContactFormProps {
  Customerlocation: string; 
}
const ContactForm: React.FC<ContactFormProps> = ({ Customerlocation }) => {
    const { toast } = useToast();
      const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
          setLoading(true);

    try {
      await createCustomerInContactUs({ customer_name: data.firstName+data.lastName,
        customer_email: data.email,
        customer_phone: data.phone,
          customer_address: data.address,
      }, data.message,Customerlocation)
              toast({ description: 'The Forn submited Successfully', variant: 'destructive' });
              setLoading(false);

    } catch (error) {
              setLoading(false);

      console.error('Error submitting form:', error);
      toast({ description: 'Error submitting form', variant: 'default', });
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-gray-100 mx-auto p-6 sm:mx-4 md:mx-8 lg:mx-16 xl:mx-20">
      <CardHeader className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <div className="space-y-1">
          <CardTitle className="text-3xl font-bold">Get in Touch</CardTitle>
          <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
        </div>
        <MailIcon className="h-10 w-10 text-yellow-300 mt-4 sm:mt-0" />
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} placeholder="Enter your first name" />
              {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} placeholder="Enter your last name" />
              {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="Enter your email" />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" type="text" {...register('address')} placeholder="Enter your address" />
            {errors.address && <p className="text-red-600">{errors.address.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register('phone')} placeholder="Enter your phone number" />
            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" {...register('message')} placeholder="Enter your message" className="min-h-[120px]" />
            {errors.message && <p className="text-red-600">{errors.message.message}</p>}
          </div>
          <CardFooter>
                      <Button type="submit" className="ml-auto text-black bg-yellow-300">
                                        {loading ? 'Submitting...' : 'Submit'}


            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

interface MailIconProps extends React.SVGProps<SVGSVGElement> {}

const MailIcon: React.FC<MailIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
};

export default ContactForm;
