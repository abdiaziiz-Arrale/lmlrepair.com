// components/ServicesCardsComponent.tsx
import Link from "next/link";

const ServicesCardsComponent = () => {
  const services = [
    {
      id: 1,
      name: "Software Development",
      description: "We provide top-notch software development services to enhance customer engagement and market success. LML, Your Digital Solution",
      backgroundImage: "/homeimg.jpg", // Replace with your image path
      link: "/software-development", // Replace with your desired link
    },
    {
      id: 2,
      name: "Digital Marketing",
      backgroundImage: "/faq2.png", // Replace with your image path
      link: "/digital-marketing", // Replace with your desired link
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-5 text-black">
      <h1 className="text-4xl tracking-widest text-yellow-300 mb-10">Our Services</h1>
      <div className="flex flex-col md:flex-row gap-10 justify-center w-full max-w-6xl">
        <Link href={services[0].link} className="w-full md:w-1/2">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden h-72 md:h-96 shadow-lg p-5 flex flex-col justify-center transform transition-transform hover:-translate-y-1"
            style={{ backgroundImage: `url(${services[0].backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className=" p-5 rounded ">
              <h4 className="text-xl font-semibold mb-2">{services[0].name}</h4>
              <p>{services[0].description}</p>
            </div>
          </div>
        </Link>
        <Link href={services[1].link} className="w-full md:w-1/2">
          <div
            className="bg-gray-100 rounded-lg overflow-hidden h-72 md:h-96 shadow-lg p-5 flex flex-col justify-center transform transition-transform hover:-translate-y-1"
            style={{ backgroundImage: `url(${services[1].backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className=" p-5 rounded ">
              <h2 className="text-2xl font-semibold text-center">{services[1].name}</h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ServicesCardsComponent;
