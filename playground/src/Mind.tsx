import { state, effect, batch } from "levelojs";

export default function Mind() {
  // Batch test
  const [batchCount, setBatchCount] = state(0);
  const [batchText, setBatchText] = state("Init");
  const [batchRuns, setBatchRuns] = state(0);
  const [batchTime, setBatchTime] = state("0.0000");

  // Direct test
  const [directCount, setDirectCount] = state(0);
  const [directText, setDirectText] = state("Init");
  const [directRuns, setDirectRuns] = state(0);
  const [directTime, setDirectTime] = state("0.0000");

  // Local counters (not reactive)
  let batchEffectRuns = 0;
  let directEffectRuns = 0;

  effect(() => {
    batchCount();
    batchText();

    batchEffectRuns++;
    setBatchRuns(batchEffectRuns);
  });

  effect(() => {
    directCount();
    directText();

    directEffectRuns++;
    setDirectRuns(directEffectRuns);
  });

  function runBatch() {
    const id = Math.floor(Math.random() * 100);
    const startTime = performance.now();

    // 🚀 ১০০০ বার স্টেট চেঞ্জ হবে, কিন্তু ইফেক্ট রান হবে মাত্র ১ বার!
    batch(() => {
      for (let i = 0; i < 1000; i++) {
        setBatchCount(v => v + 1);
      }
      setBatchText(`Batch-User-${id}`);
    });

    const endTime = performance.now();
    setBatchTime((endTime - startTime).toFixed(4));
  }

  function runDirect() {
    const id = Math.floor(Math.random() * 100);
    const startTime = performance.now();

    // 💥 ১০০০ বার স্টেট চেঞ্জ ডিরেক্টলি, প্রতিবারে ইফেক্ট ট্রিগার হবে!
    for (let i = 0; i < 1000; i++) {
      setDirectCount(v => v + 1);
    }
    setDirectText(`Direct-User-${id}`);

    const endTime = performance.now();
    setDirectTime((endTime - startTime).toFixed(4));
  }

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px", fontFamily: "sans-serif" }}>

      {/* BATCH TEST SECTION */}
      <div style={{ flex: 1, border: "2px solid #007bff", padding: "16px", borderRadius: "8px", background: "#f8f9fa" }}>
        <h3 style={{ color: "#007bff", marginTop: 0 }}>Batch() - 1000+ Loops</h3>

        <p>Count: {() => batchCount()}</p>
        <p>Text: {() => batchText()}</p>

        <hr style={{ border: "0", borderTop: "1px solid #ccc" }} />

        <p>Effect Runs: {() => batchRuns()}</p>
        <p style={{ fontWeight: "bold", color: "#28a745" }}>
          Execution Time: {() => batchTime()} ms
        </p>

        <button 
          onclick={runBatch}
          style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Trigger 1000 Batch Updates
        </button>
      </div>

      {/* DIRECT TEST SECTION */}
      <div style={{ flex: 1, border: "2px solid #dc3545", padding: "16px", borderRadius: "8px", background: "#f8f9fa" }}>
        <h3 style={{ color: "#dc3545", marginTop: 0 }}>Direct - 1000+ Loops</h3>

        <p>Count: {() => directCount()}</p>
        <p>Text: {() => directText()}</p>

        <hr style={{ border: "0", borderTop: "1px solid #ccc" }} />

        <p>Effect Runs: {() => directRuns()}</p>
        <p style={{ fontWeight: "bold", color: "#dc3545" }}>
          Execution Time: {() => directTime()} ms
        </p>

        <button 
          onclick={runDirect}
          style={{ padding: "8px 16px", background: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Trigger 1000 Direct Updates
        </button>
      </div>

    </div>
  );
}