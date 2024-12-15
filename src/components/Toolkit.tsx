import { useState, useRef } from 'react'
import { Download, ChevronDown, Undo,  RotateCcw, ImageDown,Trash } from 'lucide-react'
import { saveAs } from "file-saver"
import CanvasDraw  from 'react-canvas-draw'

interface ToolkitProps {
  imgSrc: string | undefined;
  canvasRef: React.RefObject<CanvasDraw>;
  children: React.ReactNode;
  setBrushColor: (color: string) => void;
  brushRadius: number;
  setBrushRadius: (radius: number) => void;
  brushColor: string;
  deleteImage: (imgSrc: string | null) => void;
}
const Toolkit = ({ 
  imgSrc,
  canvasRef, 
  children, 
  setBrushColor, 
  brushRadius, 
  setBrushRadius, 
  brushColor,
  deleteImage,
}:ToolkitProps) => {
  const colorInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false)


  const toggleDropdown = () => setDropdownOpen((prev) => !prev)

  const downloadImage = (bgColor: string | null = null) => {
    const canvas = canvasRef.current?.canvas.drawing
    const baseCanvas = canvasRef.current?.canvas.grid

    const tempCanvas = document.createElement("canvas")
    const tempCtx = tempCanvas.getContext("2d")

    if (tempCtx) {
      tempCanvas.width = baseCanvas.width
      tempCanvas.height = baseCanvas.height

      if (bgColor) {
        tempCtx.fillStyle = bgColor
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
        tempCtx.globalCompositeOperation = "source-over"
        tempCtx.drawImage(canvas, 0, 0)
      } else {
        tempCtx.drawImage(baseCanvas, 0, 0)
        tempCtx.drawImage(canvas, 0, 0)
      }

      tempCanvas.toBlob((blob) => {
        if (blob) saveAs(blob, "canvas-drawing.png")
      })
    }
  }

  const downloadMasked = () => {
    downloadImage("black")
  }

  const downloadDrawn = () => {
    downloadImage()
  }

  const changeColor = (color: string) => {
    setBrushColor(color)
    console.log(color)
  }

  const undoLastAction = () => {
    canvasRef.current?.undo()
  }



  const clearCanvas = () => {
    canvasRef.current?.clear()
  }



  return (
    <div className='w-full flex flex-col justify-evenly items-center gap-4 p-4'>
    

      <div className='border border-black shadow-md my-4 py-2 px-4 rounded-lg flex gap-2 w-fit h-full justify-center items-center 0'>
        <div  className='relative h-8 w-8 px-auto outline-none border border-black rounded-lg'  style={{ backgroundColor: brushColor }} onClick={()=> colorInputRef.current?.click()} >
        <input 
          ref= {colorInputRef}
          type='color' 
          onChange={(e) => changeColor(e.target.value)} 
          className='opacity-0 absolute top-0 left-0 h-0 w-0 cursor-pointer'
          style={{ backgroundColor: brushColor }} 
          />
          </div>
        <input 
          type="range" 
          min={0} 
          max="100" 
          step={0.5} 
          className="w-32 sm:w-96 ml-4" 
          value={brushRadius} 
          onChange={(e) => setBrushRadius(Number(e.target.value))} 
        />
      </div>

      {children}

      <div className='border border-black shadow-md py-2  px-4 rounded-lg flex gap-2 w-fit h-full justify-center items-center'>
     
      <div className="relative py-2 w-fit h-fit bg-gray-50">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 border border-black rounded-lg px-4 py-2 hover:bg-gray-200 transition duration-200"
        >
          <Download size={16} />
          <span className="text-xs font-medium">Download</span>
          <ChevronDown size={16} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 -top-[4.5rem] bg-white border border-gray-300 rounded-lg shadow-md z-10 w-40 ">
            <button
              onClick={() => {
                downloadMasked()
                toggleDropdown()
              }}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 transition duration-200"
            >
              <ImageDown size={16} />
              <span className="text-sm font-medium">Masked Image</span>
            </button>
            <button
              onClick={() => {
                downloadDrawn()
                toggleDropdown()
              }}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 transition duration-200"
            >
              <ImageDown size={16} />
              <span className="text-sm font-medium">Canvas</span>
            </button>
          </div>
        )}
      </div>
        <button 
          onClick={undoLastAction} 
          className='border border-black rounded-lg p-2 hover:bg-gray-200 transition duration-200'
        >
          <Undo size={16} />
        </button>
       
        <button 
          onClick={clearCanvas} 
          className='border border-black rounded-lg p-2 hover:bg-gray-200 transition duration-200'
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={()=>{deleteImage(imgSrc) }} 
          className='border border-black rounded-lg p-2 hover:bg-gray-200 transition duration-200'
        >
          <Trash size={16}  />
        </button>
      </div>
    </div>
  )
}

export default Toolkit

