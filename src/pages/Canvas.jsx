import { useState, useRef, useEffect } from "react";
import ThreeCanvas from "../components/ThreeCanvas.jsx";
import ColorPicker from "../components/ColorPicker.jsx";

const Canvas = () => {
  const [color, setColor] = useState("#ff4500");
  const colorRef = useRef(color);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  return (
    <div>
      <ThreeCanvas colorRef={colorRef} />
      <ColorPicker
        selectedColorIndex={selectedColorIndex}
        setColor={setColor}
        setSelectedColorIndex={setSelectedColorIndex}
      />
    </div>
  );
};

export default Canvas;

