import Link from "next/link";
import { Button } from "@heroui/react";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">

      <h1 className="text-7xl font-bold mb-2">404</h1>

      <h2 className="text-lg text-gray-600 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </h2>

      <Link href="/">
        <Button startContent={<FaHome />}>
          Back to Home
        </Button>
      </Link>

    </div>
  );
};

export default NotFound;