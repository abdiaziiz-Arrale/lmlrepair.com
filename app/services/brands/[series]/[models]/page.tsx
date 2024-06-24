import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getModel } from "@/lib/db/modelCrud";
import { Model } from "@prisma/client";
import Link from "next/link";

interface ModelProps {
  searchParams: { seriesid: string };
}

export default async function ModelPage({ searchParams }: ModelProps) {
  let model: Model[] = [];
  let error = "";
  try {
    model = await getModel(parseInt(searchParams.seriesid));
  } catch (err) {
    console.error("Error fetching model:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl tracking-widest text-yellow-300">Model</h1>
          <p className="text-md">Select the model you are interested in</p>
        </section>

        <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
          {error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            model.map((model) => (
              <figure
                key={model.model_id}
                className="bg-gray-100 rounded-lg flex flex-col justify-center items-center gap-10 py-14 md:py-6 p-5"
              >
                <div>
                  <figcaption>{model.model_name}</figcaption>
                </div>
                <div>
                  <Link
                    href={`/services/brands/series/models/modelcategory?modelid=${model.model_id}`}
                  >
                    <img
                      className="rounded-lg w-48 h-52"
                      src={model.model_image}
                      alt={model.model_name}
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
