import { Button, Card, Chip, Separator } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaHeart,
  FaArrowLeft,
  FaRobot,
  FaMagic,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  PiDownloadSimpleBold,
  PiShareFatBold,
  PiSelectionAllBold,
} from "react-icons/pi";
import { MdOutlineCategory, MdOutlineFitScreen } from "react-icons/md";

const PhotoDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch("https://pixgen-umber.vercel.app/data.json");
  const allphotosDetails = await res.json();

  const photo = allphotosDetails.find((p) => p.id === Number(id));

  if (!photo) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-3xl font-black text-gray-300 italic">
          404 | Art Not Found
        </h2>
        <Link href="/">
          <Button variant="flat" color="primary" className="mt-4">
            Return to Gallery
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-all group font-medium"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Link>
          <div className="flex gap-2">
            <Button
              isIconOnly
              radius="full"
              variant="flat"
              className="bg-white shadow-sm border border-gray-100"
            >
              <PiShareFatBold size={20} />
            </Button>
            <Button
              isIconOnly
              radius="full"
              variant="flat"
              className="bg-white shadow-sm border border-gray-100 text-danger"
            >
              <FaHeart size={18} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: The Masterpiece (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-none bg-transparent shadow-none overflow-hidden rounded-[32px]">
              <div className="relative group">
                <Image
                  src={photo.imageUrl}
                  width={1200}
                  height={1200}
                  alt={photo.title}
                  priority
                  className="w-full h-auto object-cover rounded-[32px] shadow-2xl transition-transform duration-1000 group-hover:scale-[1.02]"
                />
              </div>
            </Card>

            {/* Tags Section */}
            <div className="flex flex-wrap gap-2 px-2">
              {photo.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="dot"
                  color="primary"
                  className="border-none bg-white shadow-sm text-xs font-semibold py-4 px-3"
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          </div>

          {/* Right Column: Information (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Chip className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none font-bold px-3 py-1 uppercase text-[10px] tracking-widest shadow-lg shadow-purple-200">
                  {photo.category}
                </Chip>
                <span className="text-gray-400 text-xs flex items-center gap-1 font-medium">
                  <FaRegCalendarAlt />{" "}
                  {new Date(photo.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
                {photo.title}
              </h1>
            </div>

            <Separator className="my-2 bg-gray-200" />

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-3xl text-center border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter mb-1">
                  Total Likes
                </p>
                <p className="font-black text-xl text-danger">{photo.likes}</p>
              </div>
              <div className="bg-white p-4 rounded-3xl text-center border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter mb-1">
                  Downloads
                </p>
                <p className="font-black text-xl text-primary">
                  {photo.downloads}
                </p>
              </div>
              <div className="bg-white p-4 rounded-3xl text-center border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter mb-1">
                  Res.
                </p>
                <p className="font-black text-sm text-gray-800 leading-tight flex items-center justify-center h-full">
                  {photo.resolution}
                </p>
              </div>
            </div>

            {/* AI Generation Box (Prompt) */}
            <div className="bg-[#111] p-7 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <FaMagic size={24} className="text-purple-400" />
              </div>
              <p className="text-xs font-bold text-purple-400 uppercase mb-4 flex items-center gap-2">
                <FaRobot size={16} /> AI Model: {photo.model}
              </p>
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">
                Prompt Information
              </h4>
              <p className="text-gray-200 italic font-medium leading-relaxed">
                "{photo.prompt}"
              </p>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                className="absolute bottom-4 right-4 text-gray-400 hover:text-white"
              >
                <PiSelectionAllBold size={18} />
              </Button>
            </div>

            {/* Download Section */}
            <div className="mt-auto pt-6 space-y-4">
              <div className="flex items-center gap-2 px-2 text-sm text-gray-500 font-medium">
                <MdOutlineFitScreen className="text-lg" />
                <span>Verified Original Quality (HD)</span>
              </div>
              <Button
                size="lg"
                className="w-full h-16 rounded-3xl bg-black hover:bg-gray-800 text-white font-black text-lg shadow-xl shadow-gray-200 transition-all active:scale-95"
                startContent={
                  <PiDownloadSimpleBold size={24} className="mr-1" />
                }
              >
                Download Full Resolution
              </Button>
              <Button
                size="lg"
                variant="bordered"
                className="w-full h-16 rounded-3xl border-2 font-bold text-gray-900 border-gray-200 hover:bg-gray-50"
              >
                View All From {photo.category}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailPage;
