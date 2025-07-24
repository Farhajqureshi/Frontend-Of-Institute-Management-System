
import img1 from "../assets/galleryImg/galleryImg1.jpg";
import img2 from "../assets/galleryImg/mainImg2.jpg";
import img3 from "../assets/galleryImg/galleryImg3.jpg";
import img4 from "../assets/galleryImg/imgSix.jpg";
import img5 from "../assets/galleryImg/mainImg5.jpeg";
import img6 from "../assets/galleryImg/imgTwo.jpg";

const Gallery = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Institute Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
            <img src={img1} alt="Gallery" className="w-full h-full hover:scale-105 transition" />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img src={img2} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition" />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img src={img3} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition" />
          </div>

          <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
            <img src={img4} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition" />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img src={img5} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition" />
          </div>

          <div className="col-span-2 overflow-hidden rounded-xl">
            <img src={img6} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
