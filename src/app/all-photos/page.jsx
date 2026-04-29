import PhotoCard from "@/components/PhotoCard";

const AllPhotosPage = async() => {

const res = await fetch("https://pixgen-umber.vercel.app/data.json");
const allPhotos = await res.json();

    return (
        <div>
            <h1 className="font-bold text-2xl m-4">All Photos</h1>
            <div className="grid grid-cols-4 gap-5">
                {allPhotos.map((photo) => (

                    <PhotoCard key={photo.id} photo={photo} > </PhotoCard>
                ))}
            </div>
            
        </div>
    );
};

export default AllPhotosPage;