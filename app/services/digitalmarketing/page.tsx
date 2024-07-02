import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/website/footer";
import Header from "@/components/website/header";

export default function Contact() {
  return (
    <div>
      <Header />

      <main className="flex flex-col justify-center items-center p-5 md:p-10 py-16 md:py-32">
        <div className="mb-5">
          <h1 className="text-4xl text-red-500 tracking-widest mx-auto flex justify-center text-center">
            Digital Marketing Services
          </h1>
          <p className="text-md text-center">
            Select your preference:
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 content-start">
          {/*Items will grid */}
          {[
            { title: "SEO Optimization", src: "/Digitalimages/seo.jpg", link: "/services/digitalmarketing/seooptimization" },
            { title: "PPC Advertising", src: "/Digitalimages2/PPC.jpg", link: "/services/digitalmarketing/ppcadvertising" },
            { title: "Social Media Management", src: "/Digitalimages2/contentmarketing.jpg", link: "/services/digitalmarketing/socialmediamanagement" },
            { title: "Content Marketing", src: "/Digitalimages2/contentmarketing.jpg", link: "/services/digitalmarketing/contentmarketing" },
            { title: "Email Marketing", src: "/Digitalimages2/Emailmarketing.jpeg", link: "/services/digitalmarketing/emailmarketing" },
          ].map((service, index) => (
            <Link key={index} href={service.link} passHref>
              <div>
                <article className="flex bg-gray-100 flex-col gap-5 justify-center text-center p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <figure className="p-5">
                    <figcaption className="text-sm font-bold mb-4">{service.title}</figcaption>
                    <Image
                      src={service.src}
                      alt={service.title}
                      width={200}
                      height={200}
                      className="rounded-lg mx-auto h-52"
                    />
                  </figure>
                </article>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
