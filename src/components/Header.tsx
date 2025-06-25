import { BedDouble } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <BedDouble className="h-6 w-6 text-primary" />
            <span className="font-bold">StayAI</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
