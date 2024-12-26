import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in","/sign-up", "/select-org"])

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId } = await auth();

  const currentPath = req.nextUrl.pathname;

  // Allow access to /select-org if the user is authenticated, even with an orgId
  if (userId && orgId && currentPath === "/select-org") {
    return NextResponse.next();
  }

  if (userId && isPublicRoute(req)) {
    let path = "/select-org";

    if (orgId) {
      path = `/organization/${orgId}`;
    }

    // Prevent unnecessary redirects if the user is already on the target page
    if (currentPath !== path) {
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    return NextResponse.next();
  }

  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("returnUrl", req.url); // Add the original URL as a return URL
    return NextResponse.redirect(signInUrl);
  }

  if (userId && !orgId && currentPath !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Proceed to the next middleware or route handler
  return NextResponse.next();

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};