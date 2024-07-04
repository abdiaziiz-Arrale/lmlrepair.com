import Header from "@/components/website/header";
import ServicesCardsComponent from "./ServicesCardsComponent";

export default async function Services() {

  return (
    <>
      <Header />
      <main className="p-5 mt-10 md:mt-20 md:mx-4">
      <div>
        <ServicesCardsComponent/>
      </div>
      </main>
      
    </>
  );
}
