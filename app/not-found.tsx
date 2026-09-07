import NotFoundSection from "@/components/sections/NotFoundSection";

/*
  Shown for any address the site does not have, and wherever notFound() is
  called. It renders inside the root layout, so the header, the contact
  section and the footer come with it. Next.js does not read a metadata
  export from this file; the tab keeps the site title.
*/
export default function NotFound() {
  return <NotFoundSection />;
}
