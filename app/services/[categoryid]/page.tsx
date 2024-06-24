import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
import { getCategory } from "@/lib/db/categoryCrud";

interface CategoryProps {
  params: { categoryid: string };
}

export default async function CategoryPage({ params }: CategoryProps) {
  let category: any[] = [];
  let error = "";
  try {
    category = await getCategory(parseInt(params.categoryid));
  } catch (err) {
    console.error("Error fetching category:", err);
    error = "Check your internet connection.";
  }

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl tracking-widest text-yellow-300">
            {category[0].Service.service_name}
          </h1>
        </section>

        <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
          <table className="table-auto ">
            <thead>
              <tr className="text-center bg-gray-100 font-bold">
                <th className="w-1/2 md:w-1/6 md:min-w-[160px] border-l  py-4 md:px-3 text-lg font-medium  lg:py-7 lg:px-4">
                  Type of Repair
                </th>
                <th className="w-1/4 md:w-1/4 md:min-w-[160px] border-l  py-4 md:px-3 text-lg font-medium  lg:py-7 lg:px-4">
                  Price
                </th>
                <th className="w-1/3 md:w-1/4 md:min-w-[160px] border-l  py-4 md:px-3 text-lg font-medium  lg:py-7 lg:px-4">
                  Time Frame
                </th>
              </tr>
            </thead>
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : (
              category.map((i) => (
                <tbody>
                  <tr key={i.category_id}>
                    <td className="text-dark border-b border-l   dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                      {i.type_Of_Repair}
                    </td>
                    <td className="text-dark border-b border-l   dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                      {"$" +
                        Math.ceil(
                          i.raw + i.raw * (i.tax / 100) + i.shipping + i.labour
                        )}
                    </td>
                    <td className="text-dark border-b border-l   dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                      {i.timeFrame}
                    </td>
                  </tr>
                </tbody>
              ))
            )}
          </table>
        </article>
      </main>
      <Footer />
    </>
  );
}
