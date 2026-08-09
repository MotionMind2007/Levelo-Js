// src/home.tsx
import { head } from 'levelojs';

export default function Home() {
  // Reference to hold the log box DOM element
  const logBoxRef = { current: null as HTMLDivElement | null };
  const inputRef = { current: null as HTMLInputElement | null };

  const handleAddLog = () => {
    const input = inputRef.current;
    const logBox = logBoxRef.current;

    if (input && input.value.trim() !== "" && logBox) {
      // Create a new log item manually and append to DOM
      const p = document.createElement('p');
      p.style.padding = '6px 10px';
      p.style.margin = '4px 0';
      p.style.backgroundColor = '#f1f5f9';
      p.style.borderRadius = '4px';
      p.style.fontSize = '14px';
      p.textContent = `Log: ${input.value}`;
      
      logBox.appendChild(p);

      // Directly scroll to the bottom using ref!
      logBox.scrollTop = logBox.scrollHeight;

      // Clear input
      input.value = "";
      input.focus();
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Levelo JS Ref Demo</h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>
        Testing direct DOM manipulation for auto-scrolling log box.
      </p>
      

      {/* Scrollable Container controlled via ref */}
      <div 
        ref={logBoxRef} 
        style={{ 
          height: '150px', 
          border: '1px solid #cbd5e1', 
          borderRadius: '6px', 
          padding: '10px', 
          overflowY: 'auto', 
          marginBottom: '15px',
          backgroundColor: '#fff'
        }}
      >
        <p style={{ color: '#94a3b8', fontStyle: 'italic' }}>System initialized...</p>
      </div>

      {/* Input Field with ref */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          ref={inputRef} 
          type="text" 
          id="logInput"
          name="logInput"
          placeholder="Type a log message..." 
          style={{ flex: "1", padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
        />
        <button 
          onClick={handleAddLog} 
          style={{ padding: '8px 15px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Add Log
        </button>
      </div>
    </div>
  );
}