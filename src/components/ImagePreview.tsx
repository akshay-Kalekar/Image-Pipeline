import { useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
interface ImagePreviewProps {
  imgSrc: string | undefined;
  canvasRef: React.RefObject<CanvasDraw>;
  brushColor: string;
  brushRadius: number;
  saveDrawingState: (data: any) => void;
  loadDrawingState: any;
}
const ImagePreview = ({ 
  imgSrc, 
  canvasRef, 
  brushColor, 
  brushRadius, 
  saveDrawingState, 
  loadDrawingState,
  
}: ImagePreviewProps) => {

  useEffect(() => {
    if (canvasRef.current) {
    
      canvasRef.current.clear();
  

      const savedCanvas = canvasRef.current.ctx.temp.canvas;
      const savedContext = savedCanvas.getContext("2d");
      savedContext.clearRect(0, 0, savedCanvas.width, savedCanvas.height);
  
      const backgroundCanvas = canvasRef.current.ctx.grid.canvas;
      const bgContext = backgroundCanvas.getContext("2d");
      bgContext.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
  
      const backgroundImage = new Image();
      if(imgSrc) backgroundImage.src = imgSrc;

      backgroundImage.onload = () => {
        bgContext.drawImage(
          backgroundImage,
          0,
          0,
          backgroundCanvas.width,
          backgroundCanvas.height
        );
      };
  
      if (loadDrawingState) {
        canvasRef.current.loadSaveData(loadDrawingState, true); 
      }
    }
  }, [imgSrc, loadDrawingState,canvasRef]); 
  return (
    <div className="flex flex-col items-center justify-center border border-black shadow-md ">
      <CanvasDraw
        ref={canvasRef}
        lazyRadius={0}
        brushColor={brushColor}
        brushRadius={brushRadius}
        canvasWidth={500}
        canvasHeight={500}
        imgSrc={imgSrc}
        onChange={() => {saveDrawingState(canvasRef.current?.getSaveData())}} 
      />
    </div>
  );
};

export default ImagePreview;
