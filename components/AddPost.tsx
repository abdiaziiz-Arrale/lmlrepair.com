'use client';
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { createPost } from '@/lib/db/postCrud';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useToast } from './ui/use-toast';
import { getStaffs } from '@/lib/db/staffCrud';
import { getCategory } from '@/lib/db/categoryCrud';
import TextAreaEditor from './ui/textareaeditor';
import { Label } from '@radix-ui/react-label';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.preprocess(val => Number(val), z.number().min(1, 'Author is required')),
  blogCategoryId: z.preprocess(val => Number(val), z.number().min(1, 'Blog Category is required')),
  tag: z.string().optional(),
   published: z.boolean().default(false), 
});
interface Author {
  staff_id: number;
  staff_name: string;

}

interface Category {
  category_id: number;
  type_Of_Repair: string;
}
type FormData = z.infer<typeof schema>;

const AddPost = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit, control,     reset,formState: { errors }, register } = methods;

  useEffect(() => {
    async function fetchData() {
      try {
        const authorsData = await getStaffs();
        const categoriesData = await getCategory(1);
        setAuthors(authorsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching authors or categories:', error);
      }
    }

    fetchData();
  }, []);

  async function onSubmit(formData: FormData) {
    try {
      setLoading(true);

      await createPost({
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        blogCategoryId: formData.blogCategoryId,
        tag: formData.tag || '',
        metaDescription: '',
        metaTitle: '',
        publishedAt: new Date(),
        published: formData.published,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      window.location.reload();
      reset();
      setLoading(false);
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Failed to create post',
        description: 'An error occurred while creating the post. Please try again.',
      });
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add new</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <InputField control={control} name="title" label="Title" placeholder="Enter post title" error={errors.title} />
          <TextAreaField control={control} name="content" label="Content" placeholder="Enter post content" error={errors.content} />
          <SelectField control={control} name="authorId" label="Author" options={authors} placeholder="Select author" error={errors.authorId} />
          <SelectField control={control} name="blogCategoryId" label="Blog Category" options={categories} placeholder="Select category" error={errors.blogCategoryId} />
          <InputField control={control} name="tag" label="Tag" placeholder="Enter post tag (optional)" error={errors.tag} />
<div className="flex items-center mt-4">
            <Label htmlFor="published" className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="published"
                {...register('published')}
                className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Publish</span>
            </Label>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} variant="default">
              {loading ? 'Loading' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  error?: any;
}

const InputField: React.FC<InputFieldProps> = ({ control, name, label, type = 'text', placeholder, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <Input
        id={name}
        {...control.register(name)}
        type={type}
        placeholder={placeholder}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

interface TextAreaFieldProps extends InputFieldProps {}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ control, name, label, placeholder, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextAreaEditor
            {...field}
            placeholder={placeholder}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        )}
      />
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

interface SelectFieldProps extends InputFieldProps {
  options: { staff_id: number; staff_name: string }[] | { category_id: number; type_Of_Repair: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ control, name, label, options, placeholder, error }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <select
        id={name}
        {...control.register(name)}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="">{`Select ${placeholder.toLowerCase()}`}</option>
        {options.map(option => (
          'staff_id' in option ? (
            <option key={option.staff_id} value={option.staff_id}>
              {option.staff_name}
            </option>
          ) : (
            <option key={option.category_id} value={option.category_id}>
              {option.type_Of_Repair}
            </option>
          )
        ))}
      </select>
    </div>
    {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
  </div>
);

export default AddPost;
