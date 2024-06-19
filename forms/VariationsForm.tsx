import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

type VariationFormProps = {
   onAddVariation: (variation: any) => void;
   setOpen: (open: boolean) => void;
};

const VariationForm = ({ onAddVariation, setOpen }: VariationFormProps) => {
   const [name, setName] = useState('');
   const [value, setValue] = useState('');

   const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (name && value) {
         onAddVariation({ name, value });
         setName('');
         setValue('');
         setOpen(false);
      } else {
         alert('Please fill in all fields');
      }
   };

   return (
      <form className='space-y-4'>
         <div>
            <Label className='block mb-1'>Variation Name</Label>
            <Input
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder='e.g. Color'
               className='w-full'
            />
         </div>
         <div>
            <Label className='block mb-1'>Variation Value</Label>
            <Input
               value={value}
               onChange={(e) => setValue(e.target.value)}
               placeholder='e.g. Red'
               className='w-full'
            />
         </div>
         <Button type='button' onClick={handleSubmit}>
            Add Variation
         </Button>
      </form>
   );
};

export default VariationForm;
