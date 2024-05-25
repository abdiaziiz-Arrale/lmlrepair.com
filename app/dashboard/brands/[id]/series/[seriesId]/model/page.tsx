import CustomContainer from '@/components/CustomContainer';
import ModelTable from '@/components/ModelTable';

interface paramsType {
   params: { id: string; seriesId: string };
}

function ModelList({ params }: paramsType) {
   const { seriesId } = params;

   const model = [
      {
         model_name: 'iPhone 15 Pro Max',
         model_image: '/iphone15_pro_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 15 Pro',
         model_image: '/iphone15_pro_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 15 Plus',
         model_image: '/iphone15_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 15',
         model_image: '/iphone15_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 14 Pro Max',
         model_image: '/iphone14_pro_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 14 Pro',
         model_image: '/iphone14_pro_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 14 Plus',
         model_image: '/iphone14_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 14',
         model_image: '/iphone14_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone SE 2022',
         model_image: '/iphone_se_2022_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 13 Pro Max',
         model_image: '/iphone13_pro_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 13 Pro',
         model_image: '/iphone13_pro_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 13',
         model_image: '/iphone13_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 13 Mini',
         model_image: '/iphone13_mini_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 12 Pro Max',
         model_image: '/iphone12_pro_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 12 Pro',
         model_image: '/iphone12_pro_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 12',
         model_image: '/iphone12_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 12 Mini',
         model_image: '/iphone12_mini_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 11 Pro Max',
         model_image: '/iphone11_pro_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 11 Pro',
         model_image: '/iphone11_pro_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 11',
         model_image: '/iphone11_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone XS Max',
         model_image: '/iphone_xs_max_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone XS',
         model_image: '/iphone_xs_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone XR',
         model_image: '/iphone_xr_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone X',
         model_image: '/iphone_x_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 8 Plus',
         model_image: '/iphone8_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 8',
         model_image: '/iphone8_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone SE 2020',
         model_image: '/iphone_se_2020_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 7 Plus',
         model_image: '/iphone7_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 7',
         model_image: '/iphone7_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 6s Plus',
         model_image: '/iphone6s_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 6s',
         model_image: '/iphone6s_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 6 Plus',
         model_image: '/iphone6_plus_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 6',
         model_image: '/iphone6_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 5 SE',
         model_image: '/iphone5_se_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 5C',
         model_image: '/iphone5c_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 5S',
         model_image: '/iphone5s_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 5',
         model_image: '/iphone5_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 4S',
         model_image: '/iphone4s_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPhone 4',
         model_image: '/iphone4_image.png',
         series_id: 1,
      },
      {
         model_name: 'iPad Pro 12.9',
         model_image: '/ipad_pro_12_9_image.png',
         series_id: 2,
      },
      {
         model_name: 'iPad Pro 11',
         model_image: '/ipad_pro_11_image.png',
         series_id: 2,
      },
      {
         model_name: 'iPad Pro 10.5',
         model_image: '/ipad_pro_10_5_image.png',
         series_id: 2,
      },
      {
         model_name: 'iPad Pro 9.7',
         model_image: '/ipad_pro_9_7_image.png',
         series_id: 2,
      },
      {
         model_name: 'Galaxy S24',
         model_image: '/galaxy_s24_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S23',
         model_image: '/galaxy_s23_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S22',
         model_image: '/galaxy_s22_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S21',
         model_image: '/galaxy_s21_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S20',
         model_image: '/galaxy_s20_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S10',
         model_image: '/galaxy_s10_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S9',
         model_image: '/galaxy_s9_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S8',
         model_image: '/galaxy_s8_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S7',
         model_image: '/galaxy_s7_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S6',
         model_image: '/galaxy_s6_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S5',
         model_image: '/galaxy_s5_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S4',
         model_image: '/galaxy_s4_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy S3',
         model_image: '/galaxy_s3_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 20',
         model_image: '/galaxy_note_20_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 10',
         model_image: '/galaxy_note_10_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 9',
         model_image: '/galaxy_note_9_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 8',
         model_image: '/galaxy_note_8_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 7',
         model_image: '/galaxy_note_7_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 5',
         model_image: '/galaxy_note_5_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 4',
         model_image: '/galaxy_note_4_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 3',
         model_image: '/galaxy_note_3_image.png',
         series_id: 3,
      },
      {
         model_name: 'Galaxy Note 2',
         model_image: '/galaxy_note_2_image.png',
         series_id: 3,
      },
      {
         model_name: 'Pixel 8 Pro',
         model_image: '/pixel_8_pro_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 8',
         model_image: '/pixel_8_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 7 Pro',
         model_image: '/pixel_7_pro_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 7',
         model_image: '/pixel_7_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 6 Pro',
         model_image: '/pixel_6_pro_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 6',
         model_image: '/pixel_6_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 5a',
         model_image: '/pixel_5a_image.png',
         series_id: 4,
      },
      {
         model_name: 'Pixel 5',
         model_image: '/pixel_5_image.png',
         series_id: 4,
      },
      {
         model_name: 'Surface Pro 7 Plus',
         model_image: '/surface_pro_7_plus_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Pro 7',
         model_image: '/surface_pro_7_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Pro 6',
         model_image: '/surface_pro_6_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Pro 5',
         model_image: '/surface_pro_5_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Pro 4',
         model_image: '/surface_pro_4_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Pro 3',
         model_image: '/surface_pro_3_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Book 2',
         model_image: '/surface_book_2_image.png',
         series_id: 5,
      },
      {
         model_name: 'Surface Book 1',
         model_image: '/surface_book_1_image.png',
         series_id: 5,
      },
      {
         model_name: 'Xbox Series X',
         model_image: '/xbox_series_x_image.png',
         series_id: 5,
      },
      {
         model_name: 'Xbox Series S',
         model_image: '/xbox_series_s_image.png',
         series_id: 5,
      },
      {
         model_name: 'Xbox One X',
         model_image: '/xbox_one_x_image.png',
         series_id: 5,
      },
      {
         model_name: 'Xbox One S',
         model_image: '/xbox_one_s_image.png',
         series_id: 5,
      },
      {
         model_name: 'Xbox One',
         model_image: '/xbox_one_image.png',
         series_id: 5,
      },
   ];

   const matchedModels = model.filter(
      (md) => md.series_id === parseInt(seriesId)
   );

   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8 '>
            <ModelTable models={matchedModels} />
         </div>
      </CustomContainer>
   );
}

export default ModelList;
