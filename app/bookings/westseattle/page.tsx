import Footer from "@/components/website/footer";
import Header from "@/components/website/header";
export default function WestSeattle() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-24">
        <div className="flex flex-col justify-center items-center p-10 bg-white">
          <h1 className="text-4xl mb-10 tracking-widest">
            West Seattle Bookings
          </h1>

          <p className="text-center">
            Please specify your device and the repair needed inside Appointment
            Notes
          </p>

          <iframe
            src="https://squareup.com/appointments/book/89pnd6xdrlisrg/LWQRVGS73Q18V/start"
            title="Square bridge for Setting Appointments"
            height="1200px"
            className="w-full mt-5"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
