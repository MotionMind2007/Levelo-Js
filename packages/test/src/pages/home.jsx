import { state, head, mount, cleanup, effect } from 'levelojs';
import '../Mind.css';

export function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>
  );
}

function Home() {
  head({
    title: 'Lifecycle & V2 Test | Levelo JS',
    description: 'Testing mount, cleanup, and reactive layers in Levelo JS v2.0.0',
  });

  const [isLight, setIsLight] = state(true);

  mount(() => {
    console.log("🔥 [Levelo V2] Mount Success: Elements are painted into the Real DOM!");
  });

  let timerId;
  
  effect(() => {
    const currentMode = isLight() ? 'Light Mode' : 'Dark Mode';
    console.log(`📡 Effect triggered for: ${currentMode}`);

    timerId = setInterval(() => {
      console.log(`⏱️ Pulse ticking inside ${currentMode}...`);
    }, 2000);

    cleanup(() => {
      console.log(`🧹 Cleanup success: Cleared interval for ${currentMode}`);
      clearInterval(timerId);
    });
  });

  return (
    <div class="body">
      <div class="head">
        <div class="ls"><h2 class="gradient-text">Levelo Js v2.0.0</h2></div>
        <div class="rs"><h2><strong>Motion Mind</strong></h2><p>⚡Powered By TS</p></div>
      </div>

      <div class="hero">
        <div class="hero-text">
          <h1>Lifecycle <br/><span class="gradient-text">Tracking</span><br/>Ground</h1>
        </div>

        <div class="levelBox" style={{ padding: "20px", display: "inline-flex", justifyContent: "center", alignItems: "center", minHeight: "64px" }}>
          {isLight() ? <SunIcon /> : <MoonIcon />}
        </div>

        <div class="levelCountBtn" style={{ marginTop: "20px" }}>
          <button onclick={() => setIsLight(!isLight())} id="increase">
            Toggle Icon State
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;