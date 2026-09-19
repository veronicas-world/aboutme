import { redirect } from "next/navigation";

// Contact lives under the About page now; forward any old /contact links there.
export default function ContactRedirect() {
  redirect("/about#contact");
}
