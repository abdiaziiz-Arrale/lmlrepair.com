// components/ServicesCardsComponent.tsx
'use client'
import Link from "next/link";

const ServicesCardsComponent = () => {
  const services = [
    {
      id: 1,
      name: "Software Development",
      backgroundImage: "Digitalimages/code.jpg", // Replace with your image path
      link: "services/softwaredevelopment", // Replace with your desired link
    },
    {
      id: 2,
      name: "Digital Marketing",
      backgroundImage: "Digitalimages/designcard.jpg", // Replace with your image path
      link: "services/digitalmarketing", // Replace with your desired link
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-5 text-white">
      <h1 className="text-4xl tracking-widest text-red-500 mb-10">Our Services</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center w-full max-w-6xl">
        <Link href={services[0].link} className="w-full md:w-1/2">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden h-72 md:h-96 shadow-2xl p-5 flex flex-col justify-center transform transition-transform hover:-translate-y-1 border border-red-700"
            style={{ backgroundImage: `url(${services[0].backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className=" p-5 rounded">
              <h4 className="text-xl font-bold mb-2 text-center">{services[0].name}</h4>
            </div>
          </div>
        </Link>
        <Link href={services[1].link} className="w-full md:w-1/2">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden h-72 md:h-96 p-5 flex flex-col justify-center transform transition-transform hover:-translate-y-1 border border-red-700 shadow-2xl"
            style={{ backgroundImage: `url(${services[1].backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
          >
            <div className=" p-5">
              <h2 className="text-2xl font-bold text-center">{services[1].name}</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCardsComponent;
