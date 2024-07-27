import { useState } from "react";

export default function ToggleButton() {
    const [toggled, setIsToggled] = useState(false);
  
    const handleChange = () => {
      setIsToggled(!toggled);
    };
  
    return (
      <button onClick={handleChange} className={`toggle-btn ${toggled ? 'toggled' : 'off'}`}>
        <div className="thumb"></div>
      </button>
    );
  }