// import { NextResponse } from "next/server";
// import { getSession } from "next-auth/react";

// // Middleware untuk pengecekan session
// export async function middleware(req) {
//   const session = await getSession({ req });

//   // Jika tidak ada session, redirect ke halaman sign-in
//   if (!session) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   return NextResponse.next(); // Lanjutkan ke halaman yang diminta
// }

// export const config = {
//   matcher: "/profile", // Tentukan halaman yang ingin diatur middleware-nya
// };
