
import Link from "next/link";
import { Home, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/property" },
  { label: "About Us", href: "/about-us" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Home className="h-5 w-5" />
              </span>

              <span className="text-xl font-bold tracking-tight text-foreground">
                Rent<span className="text-emerald-600">Nest</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Find your perfect place to call home. Explore properties
              and enjoy a simple, reliable rental experience with RentNest.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-emerald-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground">
              Contact Information
            </h3>

            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                Contact us through our platform
              </p>

              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                Bangladesh
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} RentNest. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
