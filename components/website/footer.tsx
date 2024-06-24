import Link from "next/link";
import Image from "next/image";
import { LoginButton, LogoutButton } from "../../app/auth";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/config/authOptions";

export default async function Footer() {
  const staffInSession: Session | null = await getServerSession(authOptions);
  return (
    <>
      <footer className="bg-gray-50  shadow px-5 md:px-16   ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                width={100}
                height={100}
                src="/images/favicon.png"
                className="h-8 w-8"
                alt="lml Logo"
              />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
              <li>
                <Link href="/" className="hover:underline me-4 md:me-6">
                  home
                </Link>
              </li>
              <li>
                <Link
                  href="/productcategories"
                  className="hover:underline me-4 md:me-6"
                >
                  products
                </Link>
              </li>
              <li>
                <Link href="services" className="hover:underline me-4 md:me-6">
                  services
                </Link>
              </li>
              <li>
                <Link href="contact" className="hover:underline me-4 md:me-6">
                  contact
                </Link>
              </li>

              <li>
                {staffInSession ? (
                  <>
                    <Link
                      href="/dashboard"
                      className=" text-lg font-light bg-yellow-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-yellow-600 hover:text-yellow-300 hover:underline me-4 md:me-6 transition duration-300"
                    >
                      Dashboard
                    </Link>

                    <LogoutButton />
                  </>
                ) : (
                  <LoginButton />
                )}
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-600 sm:text-center dark:text-gray-600">
            © 2024
            <Link href="/" className=" ml-2 mr-2 hover:underline">
              LML Repair
            </Link>
            All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
