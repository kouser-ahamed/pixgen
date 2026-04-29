

const TopGenerations = async() => {
    const res = await fetch("https://pixgen-umber.vercel.app/data.json");
    const photos = await res.json();

    const topPhotos = photos.slice(0, 8);

    console.log(topPhotos);
    return (
        <div>
            <h1 className="text-2xl">Top Generations</h1>
            
        </div>
    );
};

export default TopGenerations;