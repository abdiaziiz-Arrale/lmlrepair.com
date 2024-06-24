import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getSeries } from "@/lib/db/seriesCrud";
import { Series } from "@prisma/client";
import Link from "next/link";

interface SeiresProps {
  searchParams: { brandid: string };
}

export default async function SeriesPage({ searchParams }: SeiresProps) {
  let series: Series[] = [];
  let error = "";

  try {
    series = await getSeries(parseInt(searchParams.brandid));
  } catch (err) {
    console.error("Error fetching series:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl tracking-widest text-yellow-300">Series</h1>
          <p className="text-md">
            Select the series category you are interested in
          </p>
        </section>

        <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            series.map((series) => (
              <figure
                key={series.series_id}
                className="bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-10 py-14 md:py-6 p-5"
              >
                <div>
                  <figcaption>{series.series_name}</figcaption>
                </div>
                <div>
                  <Link
                    href={`/services/brands/series/models?seriesid=${series.series_id}`}
                  >
                    <img
                      className="rounded-lg w-48 h-52"
                      src={series.series_image}
                      alt={series.series_name}
                      width={100}
                      height={100}
                    />
                  </Link>
                </div>
              </figure>
            ))
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
