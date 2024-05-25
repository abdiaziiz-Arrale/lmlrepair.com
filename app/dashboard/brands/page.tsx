import CustomContainer from '@/components/CustomContainer';
import BrandsTable from '../../../components/BrandsTable';

function Brands() {
   const brands = [
      {
         brand_id: 1,
         brand_name: 'Apple',
         brand_image: '/apple_logo.png',
         brand_desc: 'Apple products',
      },
      {
         brand_id: 2,
         brand_name: 'Samsung',
         brand_image: '/samsung_logo.png',
         brand_desc: 'Samsung products',
      },
      {
         brand_id: 3,
         brand_name: 'Microsoft',
         brand_image: '/microsoft_logo.png',
         brand_desc: 'Microsoft products',
      },
      {
         brand_id: 4,
         brand_name: 'Google',
         brand_image: '/google_logo.png',
         brand_desc: 'Google products',
      },
      {
         brand_id: 5,
         brand_name: 'Oneplus',
         brand_image: '/oneplus_logo.png',
         brand_desc: 'Oneplus products',
      },
      {
         brand_id: 6,
         brand_name: 'LG',
         brand_image: '/lg_logo.png',
         brand_desc: 'LG products',
      },
      {
         brand_id: 7,
         brand_name: 'Sony',
         brand_image: '/sony_logo.png',
         brand_desc: 'Sony products',
      },
      {
         brand_id: 8,
         brand_name: 'Nintendo',
         brand_image: '/nintendo_logo.png',
         brand_desc: 'Nintendo products',
      },
      {
         brand_id: 9,
         brand_name: 'Motorola',
         brand_image: '/motorola_logo.png',
         brand_desc: 'Motorola products',
      },
   ];
   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8 '>
            <BrandsTable brands={brands} />
         </div>
      </CustomContainer>
   );
}

export default Brands;
