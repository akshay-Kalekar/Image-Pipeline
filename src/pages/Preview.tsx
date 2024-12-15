import { useEffect, useRef, useState } from "react";
import ImagePreview from "../components/ImagePreview";
import Toolkit from "../components/Toolkit";
import UploadedImages from "../components/UploadedImages";
interface CanvasSaveData {
  
  pathData: string; 
  color: string;
}

interface CanvasRef extends HTMLCanvasElement {
  getSaveData: () => CanvasSaveData; 
  loadSaveData: (data: CanvasSaveData, reset: boolean) => void; 
}

const Preview = () => {
  const canvasRef = useRef<CanvasRef | null>(null);
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [drawingStates, setDrawingStates] = useState<(CanvasSaveData | null)[]>([]);
  const [imgSrc, setSelectedImg] = useState<string | undefined>();
  const [brushColor, setBrushColor] = useState<string>("#ffffff");
  const [brushRadius, setBrushRadius] = useState<number>(5);

  const deleteImage = (imgSrc: string |  undefined) => {
    if (!imgSrc) return;
    const index = uploadImages.indexOf(imgSrc);
    if (index !== -1) {
      const newImages = [...uploadImages];
      newImages.splice(index, 1);
      setUploadImages(newImages);

      const newDrawingStates = [...drawingStates];
      newDrawingStates.splice(index, 1);
      setDrawingStates(newDrawingStates);

      if (newImages.length > 0) {
        setSelectedImg(newImages[newImages.length - 1]); 
      } else {
        setSelectedImg(''); 
      }
    }
  };

  const saveDrawingState = () => {
    const currentIndex = uploadImages.indexOf(imgSrc || "");
    if (canvasRef.current && currentIndex !== -1) {
      const saveData = canvasRef.current.getSaveData();
      const newStates = [...drawingStates];
      newStates[currentIndex] = saveData;
      setDrawingStates(newStates);
    }
  };

  const loadDrawingState = () => {
    const currentIndex = uploadImages.indexOf(imgSrc || "");
    if (currentIndex !== -1 && drawingStates[currentIndex]) {
      canvasRef.current?.loadSaveData(drawingStates[currentIndex]!, true); 
    }
  };

  useEffect(() => {
    loadDrawingState();
  }, [imgSrc]);

  return (
    <>
      <UploadedImages
        uploadFileRef={uploadFileRef}
        imgSrc={imgSrc}
        uploadImages={uploadImages}
        setUploadImages={setUploadImages}
        setSelectedImg={setSelectedImg}
      />
      <Toolkit
        imgSrc={imgSrc}
        canvasRef={canvasRef}
        setBrushColor={setBrushColor}
        brushRadius={brushRadius}
        setBrushRadius={setBrushRadius}
        brushColor={brushColor}
        deleteImage={deleteImage}
      >
        <ImagePreview
          imgSrc={imgSrc}
          canvasRef={canvasRef}
          brushColor={brushColor}
          brushRadius={brushRadius}
          saveDrawingState={saveDrawingState}
          loadDrawingState={drawingStates[uploadImages.indexOf(imgSrc || "")]}
        />
      </Toolkit>
    </>
  );
};

export default Preview;
