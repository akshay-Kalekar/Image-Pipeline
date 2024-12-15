
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        <img src={'/trailimg1.png'} height={250} width={250} alt="Page Logo" />
        <h1 className="font-bold text-3xl text-center leading-relaxed">
          Simple Image <br /> Inpainting Widget
        </h1>
        <a
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4 flex gap-2 items-center"
          href="/upload"
        >
          <img src="/upload.svg" height={25} width={25} alt="Upload Icon" />
          Upload Image
        </a>
      </div>
      <div className="pt-4">
        <p className="text-center mt-4 font-bold">Try One of These</p>
        <div className="flex gap-4 p-2">
          <img className="rounded-md" src="/trailimg1.png" height={60} width={60} alt="Image 1" />
          <img className="rounded-md" src="/trailimg2.png" height={60} width={60} alt="Image 2" />
          <img className="rounded-md" src="/trailimg3.png" height={60} width={60} alt="Image 3" />
        </div>
      </div>
    </div>
  );
};

export default Home;
