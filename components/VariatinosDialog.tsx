import { Dialog, DialogContent, DialogTrigger } from '@/components/TopDialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import VariationForm from '@/forms/VariationsForm';

type VariationsDialogProps = {
   getVariations: (variations: any[]) => void;
};

const VariationsDialog = ({ getVariations }: VariationsDialogProps) => {
   const [variations, setVariations] = useState<any[]>([]);
   const [open, setOpen] = useState(false);

   const handleAddVariation = async (newVariation: any) => {
      setVariations((prevVariations) => {
         return [...prevVariations, newVariation];
      });
   };

   getVariations(variations);
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button type='button' variant='secondary'>
               Add Variation
            </Button>
         </DialogTrigger>
         <DialogContent>
            <VariationForm
               setOpen={setOpen}
               onAddVariation={handleAddVariation}
            />
         </DialogContent>
      </Dialog>
   );
};

export default VariationsDialog;
