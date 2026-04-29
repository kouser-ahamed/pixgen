import Link from "next/link";
import PhotoCard from "./PhotoCard";
import { Button } from "@heroui/react";

const TopGenerations = async () => {
  const res = await fetch("https://pixgen-umber.vercel.app/data.json");
  const photos = await res.json();

  const topPhotos = photos.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-2">
      <h1 className="text-2xl font-bold mt-10 mb-6">Top Generations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {topPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/all-photos">
          <Button
            variant="bordered"
            className="px-10 font-semibold border-2 hover:bg-black hover:text-white transition-all"
          >
            View All Photos
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TopGenerations;
