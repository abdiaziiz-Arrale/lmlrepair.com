import Link from "next/link";
import Image from "next/image";
import { getProductCategories } from "@/lib/db/productCategoryCrud";
import Header from "@/components/website/header";
import Footer from "@/components/website/footer";
export default async function ProductTypes() {
  return (
    <>
      <Header />

      <div className="p-5 bg-white mt-10 md:mt-20 mx-2 md:mx-4">
        <section className="flex flex-col justify-center items-center p-5 bg-white">
          <h1 className="text-4xl tracking-widest text-yellow-300">Products</h1>
          <p className="text-md ">Select the section you are interested in</p>

          <article className="flex flex-col md:flex-row flex-wrap gap-5 justify-center text-center p-10">
            <figure className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10">
              <div className="w-52 h-44">
                <Link href={`/producttypes/productcategories?type=accessories`}>
                  <img
                    src={"/images/products/accessories/accessories.png"}
                    alt={"Accessories"}
                    width={200}
                    height={200}
                    className="w-48 h-52"
                  />
                </Link>
              </div>
              <div>
                <figcaption>Accessories</figcaption>
              </div>
            </figure>

            <figure className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10">
              <div className="w-52 h-44">
                <Link href={`/productcategories?type=devices`}>
                  <img
                    src={"/images/products/accessories/devices.png"}
                    alt={"Devices"}
                    width={200}
                    height={200}
                    className="w-48 h-52"
                  />
                </Link>
              </div>
              <div>
                <figcaption>Devices</figcaption>
              </div>
            </figure>

            <figure className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10">
              <div className="w-52 h-44">
                <Link href={`/productcategories?type=dyi`}>
                  <img
                    src={"/images/products/accessories/dyi.png"}
                    alt={"Dyi"}
                    width={200}
                    height={200}
                    className="w-48 h-52"
                  />
                </Link>
              </div>
              <div>
                <figcaption>Dyi</figcaption>
              </div>
            </figure>

            <figure className="bg-gray-100 rounded-lg p-5 flex flex-col justify-between gap-10">
              <div className="w-52 h-44">
                <Link href={`/productcategories?type=insurance`}>
                  <img
                    src={"/images/products/accessories/insurance.png"}
                    alt={"Insurance"}
                    width={200}
                    height={200}
                    className="w-48 h-52"
                  />
                </Link>
              </div>
              <div>
                <figcaption>Insurance</figcaption>
              </div>
            </figure>
          </article>
        </section>
      </div>
      <Footer />
    </>
  );
}
