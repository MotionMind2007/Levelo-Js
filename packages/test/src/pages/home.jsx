import { state, effect, head, style } from 'levelojs';
import '../Mind.css';
import logo from '../assets/logo.svg';

head({
  title: 'Next Level Frontend with Levelo JS',
  description: 'Ultra fast reactive framework. No Virtual DOM. Direct Real DOM. Built for speed and simplicity.'
});

function Home() {
  const [count, setCount] = state(2);
  return (
    <div class="body">
      <div class="head">
        <div class="ls">
          <img class="logo" src={logo} alt="Levelo Js Logo" />
          <h2 class="gradient-text">Levelo Js</h2>
        </div>
        <div class="rs">
          <h2>
            <strong>Motion Mind</strong>
          </h2>
          <p>⚡Powered By</p>
        </div>
      </div>
      <div class="hero">
        <div class="badge">
            <p style={{fontWeight: 400}}>available version <strong style={{ marginLeft: "5px" }} class="gradient-text">2.0.0</strong></p>
        </div>
        {/*content*/}
        <div class="hero-text">
          <h1>Next Level <br/><span class="gradient-text">Frontend</span><br/>with Levelo JS</h1>
        </div>
        <p class="details">
          A lightweight & Ultra fast reactive framework. No Virtual DOM. Direct Real DOM. 
          Built for speed and simplicity by Motion Mind.
        </p>
        <div class="levelBtn">
          <a class="level" href="#increase">Start Leveling Up ➔</a>
        </div>
        <p class="docs-note">
          New to Levelo JS?
          <a class="gradient-text" href="/document">
            Read the documentation →
          </a>
        </p>
        <div class="levelBox">
          <h2>{count()}</h2>
        </div>
        <div class="levelCountBtn">
          <button onclick={() => setCount(count() + 1)} id="increase">Level Up 
          </button>
        </div>
        <div class="dashActive">
          <div class="dashHeader">
            <span class="dotContent">
              <span  class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </span>
            <p class="brandText">powered by Motion Mind</p>
          </div>
          <div class="dashContent">
            <h2 class="dashTitle">Levelo Js</h2>
            <p class="dashSubTitle">Real DOM • Zero Runtime</p>
          </div>
          <div class="refer">
            <div class="rb dom">
              <p class="mt">Real DOM Updates</p>
              <p class="ma">Direct</p>
              <p class="msa">Native Performance</p>
            </div>
            <div class="rb overhead">
              <p class="mt">Runtime Overhead</p>
              <p class="ma">0%</p>
              <p class="msa">Ultra Light</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;