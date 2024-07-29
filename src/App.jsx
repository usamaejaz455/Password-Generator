import { useState, useCallback } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '~!@#$%^&*()_+{}|><?/';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setCopied(false); 
  }, [length, numAllowed, charAllowed]);

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password).then(
        () => {
          setCopied(true); 
          setTimeout(() => setCopied(false), 2000); 
        },
        (err) => {
          console.error('Failed to copy text: ', err);
        }
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Password Generator</h1>
        
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Password Length
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
            max="20"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={numAllowed}
            onChange={(e) => setNumAllowed(e.target.checked)}
            className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-pink-400"
          />
          <label className="text-gray-600">Include Numbers</label>
        </div>
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
            className="mr-2 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-pink-400"
          />
          <label className="text-gray-600">Include Special Characters</label>
        </div>
        
        <button
          onClick={passwordGenerator}
          className="w-full bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
        >
          Generate Password
        </button>
        
        <div className="mt-6">
          <h2 className="text-lg font-medium text-gray-700">Generated Password:</h2>
          <div className="flex items-center justify-between mt-2 p-4 border border-gray-300 rounded bg-gray-50 text-gray-800 font-mono">
            <span>{password || "Your password will appear here"}</span>
            <button
              onClick={copyToClipboard}
              className={`bg-gray-200 text-gray-600 py-1 px-3 rounded hover:bg-gray-300 transition duration-300 ${copied ? "text-green-500" : ""}`}
              aria-label="Copy to clipboard"
            >
              {copied ? (
                <i className="fas fa-check-circle"></i> 
              ) : (
                <i className="fas fa-copy"></i> 
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
