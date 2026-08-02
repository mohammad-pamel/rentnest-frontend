const Footer = () => {
  return (
    <footer className="border-t bg-gray-100">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 md:flex-row">
        <p className="text-sm text-gray-500">
          © 2026 RentNest. All Rights Reserved.
        </p>

        <p className="text-sm text-gray-500">
          Built with Next.js & Shadcn UI
        </p>
      </div>
    </footer>
  );
};

export default Footer;