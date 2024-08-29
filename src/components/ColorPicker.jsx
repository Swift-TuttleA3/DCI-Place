import { handleButtonClick } from "../components/clickHandler.jsx";
import { colors } from "../data/colors.jsx";



const ColorPicker = ({ selectedColorIndex, setColor, setSelectedColorIndex }) => {
  return (
    <div id="buttonwrap">
      {colors.map((color, index) => (
        <button
          id="colorButton"
          key={index}
          style={{
            backgroundColor: color,
            border: selectedColorIndex === index ? "2px solid black" : "none",
          }}
          onClick={() => handleButtonClick(color, index, setColor, setSelectedColorIndex)}
        ></button>
      ))}
    </div>
  );
};

export default ColorPicker;
