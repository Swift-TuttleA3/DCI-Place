import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import useThreeSetup from "../hooks/useThreeSetup.js";
import { handleCanvasClick } from "./clickHandler.jsx";

const ThreeCanvas = ({ colorRef }) => {
  const canvasRef = useRef(null);
  const { sceneRef, cameraRef, rendererRef } = useThreeSetup(canvasRef);

  useEffect(() => {
    console.log("useEffect executed");

    const handleClick = (event) => {
      const rect = rendererRef.current.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      console.log(`Canvas clicked at: (${event.clientX}, ${event.clientY})`);
      console.log(`Normalized coordinates: (${x}, ${y})`);
      console.log(`Adding pixel at: (${x}, ${y}) with color: ${colorRef.current}`);
      handleCanvasClick(x, y, colorRef.current, sceneRef.current, cameraRef.current);
    };

    if (rendererRef.current) {
      rendererRef.current.domElement.addEventListener("click", handleClick);
      console.log("Event listener added");
    } else {
      console.log("rendererRef.current is null");
    }

    return () => {
      if (rendererRef.current) {
        rendererRef.current.domElement.removeEventListener("click", handleClick);
        console.log("Event listener removed");
      }
    };
  }, [colorRef, rendererRef, sceneRef, cameraRef]);

  return <div ref={canvasRef} />;
};

ThreeCanvas.propTypes = {
  colorRef: PropTypes.shape({
    current: PropTypes.string
  }).isRequired
};

ThreeCanvas.defaultProps = {
  colorRef: { current: "#000000" } // Standardfarbe Schwarz
};

export default ThreeCanvas;