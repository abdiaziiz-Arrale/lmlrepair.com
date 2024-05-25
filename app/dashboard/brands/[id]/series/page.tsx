import CustomContainer from '@/components/CustomContainer';
import SeriesTable from '@/components/seriesTable';
interface paramsType {
   params: { id: string };
}

function SeriesList({ params }: paramsType) {
   const series = [
      {
         series_id: 1,
         series_name: 'Iphone',
         series_image: '/iphone_image.png',
         series_desc: 'Apple iPhone series',
         brand_id: 1,
      },
      {
         series_id: 2,
         series_name: 'Ipad',
         series_image: '/ipad_image.png',
         series_desc: 'Apple iPad series',
         brand_id: 1,
      },
      {
         series_id: 3,
         series_name: 'Watch',
         series_image: '/watch_image.png',
         series_desc: 'Apple Watch series',
         brand_id: 1,
      },
      {
         series_id: 4,
         series_name: 'MacBook',
         series_image: '/macbook_image.png',
         series_desc: 'Apple MacBook series',
         brand_id: 1,
      },
      {
         series_id: 5,
         series_name: 'Galaxy S',
         series_image: '/galaxy_s_image.png',
         series_desc: 'Samsung Galaxy S series',
         brand_id: 2,
      },
      {
         series_id: 6,
         series_name: 'Galaxy Note',
         series_image: '/galaxy_note_image.png',
         series_desc: 'Samsung Galaxy Note series',
         brand_id: 2,
      },
      {
         series_id: 7,
         series_name: 'A series',
         series_image: '/a_series_image.png',
         series_desc: 'Samsung Galaxy A series',
         brand_id: 2,
      },
      {
         series_id: 8,
         series_name: 'Pixel',
         series_image: '/pixel_image.png',
         series_desc: 'Google Pixel series',
         brand_id: 3,
      },
      {
         series_id: 9,
         series_name: 'Surface Pro',
         series_image: '/surface_pro_image.png',
         series_desc: 'Microsoft Surface Pro series',
         brand_id: 4,
      },
      {
         series_id: 10,
         series_name: 'Surface Book',
         series_image: '/surface_book_image.png',
         series_desc: 'Microsoft Surface Book series',
         brand_id: 4,
      },
      {
         series_id: 11,
         series_name: 'Xbox',
         series_image: '/xbox_image.png',
         series_desc: 'Microsoft Xbox series',
         brand_id: 4,
      },
      {
         series_id: 12,
         series_name: 'Phones',
         series_image: '/generic_phone_image.png',
         series_desc: 'Generic Phones series',
         brand_id: 5,
      },
      {
         series_id: 13,
         series_name: 'LG phones',
         series_image: '/lg_phone_image.png',
         series_desc: 'LG Phones series',
         brand_id: 6,
      },
      {
         series_id: 14,
         series_name: 'Consoles',
         series_image: '/consoles_image.png',
         series_desc: 'Gaming Consoles series',
         brand_id: 7,
      },
      {
         series_id: 15,
         series_name: 'Nintendo',
         series_image: '/nintendo_image.png',
         series_desc: 'Nintendo Consoles series',
         brand_id: 8,
      },
      {
         series_id: 16,
         series_name: 'Motorola',
         series_image: '/motorola_image.png',
         series_desc: 'Motorola Phones series',
         brand_id: 9,
      },
   ];

   const matchedSeries = series.filter((sr) => {
      return sr.brand_id === parseInt(params.id);
   });

   return (
      <CustomContainer>
         <div className='flex flex-col justify-center gap-8 '>
            <SeriesTable series={matchedSeries} brandId={params.id} />
         </div>
      </CustomContainer>
   );
}

export default SeriesList;
