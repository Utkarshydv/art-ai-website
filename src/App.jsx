import { useState } from "react";
import "./App.css";

const SUGGESTIONS = [
  "A neon cyberpunk cityscape",
  "A futuristic robot dog",
  "Van Gogh style night sky",
  "Alien forest landscape",
  "Surreal dream castle",
  "Naruto eating pizza"
];

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [theme, setTheme] = useState(true); // true = dark, false = light

  const generateImage = async (query) => {
    setLoading(true);
    setShowResult(true);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(query)}`;
    setImage(imageUrl);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) generateImage(prompt);
  };

  const handleRefresh = () => {
    if(prompt.trim()) generateImage(prompt);
  };

  const handleSuggestion = (text) => {
    setPrompt(text);
    generateImage(text);
  };

  const handleToggle = () => setTheme(t => !t);

  const handleDownload = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'ai-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // New: clear app to initial state, back to main page
  const handleClear = () => {
    setPrompt("");
    setImage("");
    setLoading(false);
    setShowResult(false);
  };

  return (
    <div className={theme ? "container dark" : "container light"}>
      {/* Top Bar */}
      <div className="topbar">
        <h1>Art⚛︎AI </h1>
        <div className="toggle" onClick={handleToggle}>
          <div className={theme ? "circle active" : "circle"} />
        </div>
      </div>

      {!showResult &&
        <div className="middle">
          <h2>Hello ✎ᝰ</h2>
          <p className="subhead">Type a Message to convert it into an Image [◉¯]</p>
          <form className="searchbar" onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="type a message.."
            />
            <button type="submit" className="searchbtn" aria-label="Search">➤</button>
          </form>
          <div className="suggest-label">Suggestions ᯓ</div>
          <div className="suggestions">
            {SUGGESTIONS.map((text, i) =>
              <button key={i} className="suggestion" onClick={() => handleSuggestion(text)}>{text}</button>
            )}
          </div>
        </div>
      }

      {showResult &&
        <div className="result-section">
          <form className="searchbar" onSubmit={handleSubmit}>
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="type a message.."
            />
            <button type="submit" className="searchbtn" aria-label="Search">➤</button>
          </form>
          <div className="img-result">
            {loading ? <p>Loading...</p> :
              image && <img src={image} alt="AI Result" />
            }
          </div>
          <button className="download" onClick={handleDownload}>⬇Download </button>
          {/* Clear Button */}
          <button className="clear" onClick={handleClear}>
           ♻ Clear 
          </button>
        </div>
      }
    </div>
  );
}

export default App;
