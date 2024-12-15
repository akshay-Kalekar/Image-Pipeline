import { useEffect } from "react";


interface UploadedImagesProps {
    uploadFileRef: React.RefObject<HTMLInputElement>;
    imgSrc: string | null;
    uploadImages: string[];
    setUploadImages: React.Dispatch<React.SetStateAction<string[]>>;
    setSelectedImg: React.Dispatch<React.SetStateAction<string | null>>;
  }
const UploadedImages = ({
    uploadFileRef,
    imgSrc,
    uploadImages,
    setUploadImages,
    setSelectedImg,
    
}   :UploadedImagesProps) => {

    const triggerFileInput = () => {
        if (uploadFileRef.current) {
            uploadFileRef.current.click(); 
        }
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const imgSrc = e.target?.result as string;
                setUploadImages([...uploadImages, imgSrc]);
                setSelectedImg(imgSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (uploadFileRef.current) {
            uploadFileRef.current.click(); 
        }
    }, [uploadFileRef]);
    useEffect(()=>{
console.log(imgSrc);
    },[imgSrc])
    return (
        <div className="px-4 flex gap-2  items-center justify-center w-full">
            <button
                onClick={triggerFileInput}
                className="hover:bg-gray-400 p-2 bg-gray-200 rounded-md flex items-center justify-center w-16 h-16"
            >
                <img src="/plus.svg" alt="Upload" width={30} height={30} />
            </button>
            <input
                ref={uploadFileRef}
                type="file"
                accept=".jpeg,.png"
                className="hidden"
                onChange={handleFileChange}
            />
            <div className="flex gap-4 overflow-x-scroll  p-2 scrollbar-hidden">
              
                {uploadImages.map((src, i) => (
                <>
                        <img
                        key={i}
                            src={src}
                            width={30}
                            height={30}
                            alt="Uploaded Preview"
                            className={`w-16 h-16 object-cover rounded-md shadow-lg ${imgSrc === src ? 'border-2 border-black' : ''
                                }`}
                            onClick={() => {
                                setSelectedImg(src);
                            }}
                        />
                        
                  </>
                ))}
            </div>
        </div>
    );
};

export default UploadedImages;
