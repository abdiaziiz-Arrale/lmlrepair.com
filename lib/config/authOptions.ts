  import { Staff } from "@prisma/client";
  import { type NextAuthOptions } from "next-auth";
  import CredentialsProvider from "next-auth/providers/credentials";
  import bcryptjs from "bcryptjs";
  import { getStaff } from "../db/staffCrud";

  export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        name: "Sign in",
        credentials: {
          email: {
            label: "Email",
            type: "email",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          try {
            if (!credentials?.email || !credentials.password) {
              throw new Error("Missing email or password");
            }

            const staff = await getStaff(credentials.email);

            if (!staff) {
              throw new Error("No user found with the provided email");
            }

            const passwordMatch = await bcryptjs.compare(
              credentials.password,
              staff.password
            );

            if (!passwordMatch) {
              throw new Error("Incorrect password");
            }

            return {
              id: `${staff.staff_id}`,
              staff_id: staff.staff_id,
              staff_name: staff.staff_name,
              email: staff.email,
              name: staff.staff_name,
              role: staff.role,
              mobile_number: staff.mobile_number,
            };
          } catch (error) {
            console.error("Authorization error:", error);
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (token) {
          session.user = {
            id: token.id,
            staff_id: token.staff_id,
            staff_name: token.staff_name,
            email: token.email,
            role: token.role,
            mobile_number: token.mobile_number,
            name: session.user.name,
            image: session.user.image,
          };
        }
        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          const s = user as unknown as Staff;
          token.staff_id = s.staff_id;
          token.staff_name = s.staff_name;
          token.email = s.email;
          token.role = s.role;
          token.mobile_number = s.mobile_number;
        }
        return token;
      },
    },
  };
