import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-4 bg-primary p-6 text-slate-100 xs:mt-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-8 px-2 sm:flex-row sm:gap-4">
        <Logo />
        <div className="flex flex-col items-center sm:items-end">
          <p>&copy; {new Date().getFullYear()} - Adam Petroff</p>
          <a
            href="https://www.linkedin.com/in/adam-petroff-2098b8143/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
