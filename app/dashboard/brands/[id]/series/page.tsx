import CustomContainer from "@/components/CustomContainer";
import SeriesTable from "@/components/seriesTable";
import { getSeries } from "@/lib/db/seriesCrud";
interface paramsType {
  params: { id: string };
}

async function SeriesList({ params }: paramsType) {
  let series: any = [];
  let error = "";

  try {
    series = await getSeries(parseInt(params.id));
  } catch (err) {
    console.error("Error fetching brands:", err);
    error = "Check your internet connection.";
  }
  return (
    <CustomContainer>
      <div className="flex flex-col justify-center gap-8">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <SeriesTable series={series} brandId={parseInt(params.id)} />
        )}
      </div>
    </CustomContainer>
  );
}

export default SeriesList;
