import Footer from "@/components/website/footer";
import Header from "@/components/website/header";

export default function Mail() {
  return (
    <>
      <Header />

      <div className="container mx-auto">
        <div className="flex flex-col justify-center items-center p-10 bg-white">
          <h1 className="text-4xl mb-10 tracking-widest"> Mail</h1>

          <p className="text-md mb-5">
            <b> Mail in? use the form & ship your device to: </b>
          </p>
          <p className="text-md "> LML Repair </p>
          <p className="text-md text-center">
            3400 Harbor Ave SW STE #332 Seattle, WA 98126{" "}
          </p>

          <p className="text-md text-center">
            Once completed, you will recieve an invoice and the package will be
            sent back!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
