import { useState, useEffect } from 'react'
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import './App.css'
function App() {
  const [count, setCount] = useState(0);
  const [timeAddCount, setTimeAddCount] = useState(1);
  const [timeSubtractCount, setTimeSubtractCount] = useState(1);
  const [savedColor, setSavedColor] = useState("#4f46e5");
  const [tempColor, setTempColor] = useState("#4f46e5");
  const [rgb, setRgb] = useState({ r: 79, g: 70, b: 229 });
  const [open, setOpen] = useState(false);
  const [hexError, setHexError] = useState(false);
  const hexToRgb = (hex) => {
    if (!/^#([0-9A-Fa-f]{6})$/.test(hex)) {
      return { r: 255, g: 0, b: 0 }; 
    }
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  };
  const rgbToHex = (r, g, b) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("")
    );
  };
  useEffect(() => {
    if (!tempColor) return;
    const timer = setTimeout(() => {
      const isValid = /^#([0-9A-Fa-f]{6})$/.test(tempColor);
      setHexError(!isValid);
      if (isValid) {
        setRgb(hexToRgb(tempColor));
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [tempColor]);
  return (
    <>
      <div className="everything" style={{ backgroundColor: savedColor }}>
        <div className="site" style={{ backgroundColor: savedColor }}>
          <div className="top">
            <div className="icons">
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="reactlogo" alt="React logo"/>
              </a>
            </div>
            <div className="textout">
              <div className="text">
                <h1>V</h1><h1>i</h1><h1>t</h1><h1>e</h1><h1>&nbsp;+&nbsp;</h1><h1>R</h1><h1>e</h1><h1>a</h1><h1>c</h1><h1>t</h1>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="cardwrapper">
              <div className="cardmain count">
                <h3>Count IS <b>{count}</b></h3>
                <div className="coolbuttons">
                  <button onClick={() => setCount((c) => c + timeAddCount)} className="coolbutton">
                    <b> + </b>
                  </button>
                  <button onClick={() => setCount((c) => c - timeSubtractCount)} className="coolbutton">
                    <b> -- </b>
                  </button>
                </div>
              </div>
              <div className="cardwrappercount">
                <div className="card addcount">
                  <h3>+ Step: <b>{timeAddCount}</b></h3>
                  <div className="buttons">
                    <button onClick={() => setTimeAddCount((c) => c + 1)}><b> + </b></button>
                    <button onClick={() => setTimeAddCount((c) => c - 1)}><b> -- </b></button>
                  </div>
                </div>
                <div className="card subtractcount">
                  <h3>- Step: <b>{timeSubtractCount}</b></h3>
                  <div className="buttons">
                    <button onClick={() => setTimeSubtractCount((c) => c + 1)}><b> + </b></button>
                    <button onClick={() => setTimeSubtractCount((c) => c - 1)}><b> -- </b></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="color-panel">
          <button className="picker" onClick={() => setOpen(!open)}>
            🎨 Toggle Color Menu
          </button>
          {open && (
            <div>
              <input
                className="hex"
                value={tempColor}
                onChange={(e) => setTempColor(e.target.value)}
                placeholder="#ffffff"
              />
              <div className="rgb">
                <div className="grouper">
                  <h1>R</h1>
                  <input
                    className="r"
                    type="number"
                    value={rgb.r}
                    onChange={(e) => {
                      const r = Number(e.target.value);
                      const newRgb = { ...rgb, r };
                      setRgb(newRgb);
                      setTempColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }}
                  />
                </div>
                <div className="grouper">
                  <h1>G</h1>
                  <input
                    className="g"
                    type="number"
                    value={rgb.g}
                    onChange={(e) => {
                      const g = Number(e.target.value);
                      const newRgb = { ...rgb, g };
                      setRgb(newRgb);
                      setTempColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }}
                />
                </div>
                <div className="grouper">
                  <h1>B</h1>
                  <input
                    className="b"
                    type="number"
                    value={rgb.b}
                    onChange={(e) => {
                      const b = Number(e.target.value);
                      const newRgb = { ...rgb, b };
                      setRgb(newRgb);
                      setTempColor(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
                    }}
                  />
                </div>
              </div>
              <div
                className="preview"
                style={{
                  background: hexError ? "#ff4d4d" : tempColor,
                  height: "90px",
                  borderRadius: "10px",
                  opacity: hexError ? 0.6 : 1
                }}
              >
                {hexError ? "Invalid HEX" : "Preview"}
              </div>
              <button className="save"
                onClick={() => setSavedColor(tempColor)}
              >
                💾 Save Color
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default App;