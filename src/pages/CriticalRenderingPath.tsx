import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { GitCompare, Layers, Paintbrush, TreePine, HelpCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import './LessonExtras.css'

const steps = [
  {
    id: 'html',
    label: '1. HTML arrives',
    short: 'Bytes → tokens → nodes',
    detail:
      'The browser downloads your HTML file as raw text (bytes). It tokenizes tags like <div> and builds a tree of objects in memory. That tree is the DOM.',
    plain:
      'Think of HTML as a shopping list written on paper. The browser reads the paper and builds a family tree of boxes in its brain — parent, child, grandchild.',
  },
  {
    id: 'cssom',
    label: '2. CSSOM',
    short: 'Stylesheets → style tree',
    detail:
      'CSSOM (CSS Object Model) is the twin of the DOM — but for styles. The browser downloads CSS, parses rules, and builds a tree of which selectors apply to which elements. CSS blocks rendering until it is ready (otherwise you would see unstyled flashes).',
    plain:
      'If the DOM is the skeleton of the page, CSSOM is the wardrobe. The browser will not dress the body until it knows which clothes (colors, sizes, fonts) go where.',
  },
  {
    id: 'render',
    label: '3. Render Tree',
    short: 'Visible nodes only',
    detail:
      'The browser merges DOM + CSSOM into a Render Tree: only nodes that will actually show on screen. display:none is skipped; visibility:hidden still takes space. This is what gets measured next.',
    plain:
      'Throw away anything invisible. Keep only the furniture that will appear in the room photo.',
  },
  {
    id: 'layout',
    label: '4. Layout (Reflow)',
    short: 'Geometry math',
    detail:
      'Layout (also called reflow) calculates exact pixel boxes: x, y, width, height for every render-tree node. Changing font-size, adding DOM nodes, or reading offsetHeight after a style change can force the browser to redo this expensive math.',
    plain:
      'The browser gets out a measuring tape and decides where every box sits on the page. Do this 40 times in a row and the page feels janky — that is layout thrashing.',
  },
  {
    id: 'paint',
    label: '5. Paint',
    short: 'Fill in pixels',
    detail:
      'Paint turns boxes into actual pixels: text, colors, borders, shadows, images. This often happens in layers. Paint does not mean "the user saw it yet" — compositing still comes next. LCP (Largest Contentful Paint) roughly tracks when the biggest meaningful paint (hero image / big text) finishes.',
    plain:
      'Coloring inside the lines. The big headline or hero image finishing is what Core Web Vitals call LCP — "when did the main thing show up?"',
  },
  {
    id: 'composite',
    label: '6. Composite',
    short: 'GPU stitches layers',
    detail:
      'The compositor (often on the GPU) stacks painted layers into the final frame you see at ~60fps. Transforms and opacity can often animate on the compositor without re-layout or re-paint — that is why they are "cheap" animations.',
    plain:
      'Like stacking transparent slides on a projector. Sliding a slide sideways is cheaper than redrawing the whole picture.',
  },
]

const CriticalRenderingPath: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [mode, setMode] = useState<'dom' | 'fiber'>('dom')
  const [domOps, setDomOps] = useState(0)
  const [fiberOps, setFiberOps] = useState(0)
  const boxRef = useRef<HTMLDivElement>(null)

  const thrashDom = () => {
    const el = boxRef.current
    if (!el) return
    let reads = 0
    for (let i = 0; i < 40; i++) {
      const h = el.offsetHeight
      el.style.height = `${40 + (h % 20)}px`
      reads++
    }
    setDomOps(reads)
  }

  const fiberBatch = () => {
    const el = boxRef.current
    if (!el) return
    const h = el.offsetHeight
    requestAnimationFrame(() => {
      el.style.height = `${40 + (h % 20)}px`
      setFiberOps((n) => n + 1)
    })
  }

  const step = steps[activeStep]

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">The Critical Rendering Path</h1>
        <p className="page-description">
          From a URL click to pixels on screen — what the browser actually does, why React exists,
          and how to stop accidentally fighting the browser.
        </p>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HelpCircle size={20} color="#1e3c97" /> What the heck is the DOM?
        </h3>
        <p className="concept-description">
          <strong>DOM</strong> means <em>Document Object Model</em>. It is not your HTML file on disk —
          it is a live tree of JavaScript-accessible objects the browser builds after reading HTML.
          When you write <code>document.querySelector(&apos;button&apos;)</code>, you are talking to that tree.
        </p>
        <div className="lesson-plain">
          HTML is the recipe. The DOM is the cooked meal sitting on the counter that you can poke,
          taste, and rearrange. Change the meal (DOM) and the browser eventually redraws what you see.
        </div>
        <div className="lesson-callout" style={{ marginTop: '1rem' }}>
          <strong>Why the browser needs it:</strong> screens do not understand angle brackets. The
          browser needs a structured in-memory model so it can apply CSS, handle clicks, run JS, and
          figure out what to paint.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">How a page loads (from scratch)</h3>
        <p className="concept-description">
          You type a URL → DNS finds the server → HTML starts streaming down. The parser does not
          wait for the whole file. As tags arrive it grows the DOM. When it hits{' '}
          <code>&lt;link rel=&quot;stylesheet&quot;&gt;</code> it fetches CSS (and usually pauses
          showing content until CSSOM is ready). When it hits <code>&lt;script&gt;</code> without{' '}
          <code>defer</code>/<code>async</code>, parsing pauses so the script can run and maybe
          mutate the DOM. Images and fonts keep loading in parallel and can affect later paints (and LCP).
        </p>
        <div className="lesson-steps-detail">
          <div className="lesson-step-block">
            <h4>Network → Parse</h4>
            <p>Bytes become tokens become DOM nodes. Incomplete HTML is still partially shown when possible.</p>
          </div>
          <div className="lesson-step-block">
            <h4>Discover more files</h4>
            <p>CSS, JS, images, fonts are requested. CSS is render-blocking; JS can be parser-blocking.</p>
          </div>
          <div className="lesson-step-block">
            <h4>First paint → meaningful paint</h4>
            <p>
              First Paint might be a blank background. <strong>LCP</strong> (Largest Contentful Paint)
              marks when the largest text block or image in the viewport finishes painting — a Core Web
              Vital for &quot;did the page feel loaded?&quot;
            </p>
          </div>
        </div>
        <div className="lesson-plain">
          Opening a website is like receiving a flat-pack desk: first the instructions (HTML), then
          the finish/paint cans (CSS), then optional power tools (JS). You can start assembling early,
          but you should not photograph the finished desk (paint) until the stain (CSS) arrives — or
          the photo looks naked (FOUC — flash of unstyled content).
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TreePine size={20} color="#1e3c97" /> Critical Rendering Path — step by step
        </h3>
        <p className="concept-description">
          Click each stage. This is the pipeline from HTML bytes to a composited frame.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
          {steps.map((s, i) => (
            <motion.button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(i)}
              whileHover={{ scale: 1.02 }}
              style={{
                flex: '1 1 140px',
                padding: '0.75rem',
                borderRadius: '8px',
                border: activeStep === i ? '2px solid #1e3c97' : '1px solid #e2e8f0',
                background: activeStep === i ? '#eff6ff' : 'white',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700 }}>{s.label}</div>
              <div style={{ fontWeight: 600, color: '#1e3c97', fontSize: '0.8rem', marginTop: 4 }}>{s.short}</div>
            </motion.button>
          ))}
        </div>

        <div className="lesson-step-block" style={{ marginTop: '1rem', borderColor: '#bfdbfe', background: '#f8fbff' }}>
          <h4>{step.label}</h4>
          <p>{step.detail}</p>
          <div className="lesson-plain">{step.plain}</div>
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">Why was React needed in the first place?</h3>
        <p className="concept-description">
          In the jQuery era we manually poked the DOM: find a node, change text, toggle a class,
          remember what state the UI was in. As apps grew (Gmail-scale interactivity), that bookkeeping
          became bug magnets — especially when many updates hit the DOM in one user action and forced
          repeated layout/paint.
        </p>
        <p className="concept-description">
          React&apos;s bet: <strong>describe UI as a function of state</strong> (declarative). You say
          &quot;given this data, the screen should look like X.&quot; React diffs that description
          against the previous one (Virtual DOM / Fiber) and then touches the real DOM as little as
          possible, usually in one commit — protecting the Critical Rendering Path from thrashing.
        </p>
        <div className="lesson-plain">
          Instead of micromanaging every brick in the wall, you hand React a blueprint. React figures
          out which bricks actually need moving.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title">React vs Svelte vs Angular (honest layman version)</h3>
        <div className="lesson-compare">
          <div className="lesson-compare-card">
            <h4>React</h4>
            <ul>
              <li>UI = f(state). Re-render in memory, then patch the DOM.</li>
              <li>Runtime library in the browser (Fiber reconciler).</li>
              <li>Huge ecosystem; you compose with hooks.</li>
            </ul>
          </div>
          <div className="lesson-compare-card">
            <h4>Svelte</h4>
            <ul>
              <li>Compiler writes tiny DOM-update code at build time.</li>
              <li>Often no Virtual DOM — it surgically updates what changed.</li>
              <li>Feels &quot;magical&quot; and small; different mental model.</li>
            </ul>
          </div>
          <div className="lesson-compare-card">
            <h4>Angular</h4>
            <ul>
              <li>Full framework: DI, RxJS, templates, router, forms.</li>
              <li>Change detection walks component trees (Zone.js historically).</li>
              <li>Batteries included; steeper structure/opinion.</li>
            </ul>
          </div>
        </div>
        <div className="lesson-plain">
          React is a skilled assistant that compares two sketches before touching the real canvas.
          Svelte is a factory that pre-builds the exact brush strokes. Angular is an entire design studio
          with rules for every department.
        </div>
      </div>

      <div className="concept-card">
        <h3 className="concept-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GitCompare size={20} color="#1e3c97" /> Demo: Real DOM thrash vs batched update
        </h3>
        <p className="concept-description">
          Interleaving <em>measure</em> (<code>offsetHeight</code>) and <em>mutate</em> (style write)
          forces the browser to re-layout over and over. React&apos;s commit style is closer to
          &quot;measure once, write once.&quot;
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setMode('dom')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: mode === 'dom' ? '2px solid #ef4444' : '1px solid #ddd',
              background: mode === 'dom' ? '#fef2f2' : 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Real DOM Thrash
          </button>
          <button
            type="button"
            onClick={() => setMode('fiber')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: mode === 'fiber' ? '2px solid #22c55e' : '1px solid #ddd',
              background: mode === 'fiber' ? '#f0fdf4' : 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Batched update
          </button>
        </div>

        <div
          ref={boxRef}
          style={{
            height: 48,
            background: 'linear-gradient(90deg, #1e3c97, #007acc)',
            borderRadius: '8px',
            marginBottom: '1rem',
            transition: mode === 'fiber' ? 'height 0.2s' : 'none',
          }}
        />

        <button
          type="button"
          onClick={mode === 'dom' ? thrashDom : fiberBatch}
          style={{
            padding: '0.65rem 1.25rem',
            background: '#1e3c97',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {mode === 'dom' ? 'Run 40 interleaved read/writes' : 'Run measure → mutate once'}
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', background: '#fef2f2', borderRadius: '8px', border: '1px solid #fecaca' }}>
            <Paintbrush size={16} style={{ marginBottom: 4 }} />
            <div style={{ fontWeight: 700 }}>Forced layouts</div>
            <div style={{ fontSize: '1.75rem', color: '#ef4444' }}>{domOps}</div>
          </div>
          <div style={{ padding: '1rem', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
            <Layers size={16} style={{ marginBottom: 4 }} />
            <div style={{ fontWeight: 700 }}>Batched commits</div>
            <div style={{ fontSize: '1.75rem', color: '#16a34a' }}>{fiberOps}</div>
          </div>
        </div>
        <div className="lesson-plain">
          Thrashing is like asking &quot;how tall is the shelf?&quot; then moving a book, then measuring
          again, forty times. Batching is measuring once, then rearranging.
        </div>
      </div>

      <CodeBlock
        title="Protect the rendering path"
        code={`// ❌ Layout thrashing — read/write interleaved
for (const el of nodes) {
  const h = el.offsetHeight;      // force layout NOW
  el.style.height = h + 10 + 'px'; // invalidate layout
}

// ✅ Batch: read all, then write all
const heights = nodes.map((el) => el.offsetHeight);
nodes.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});

// React's mental model
// 1. Render phase: compute next UI in memory (can pause)
 // 2. Commit phase: apply DOM changes, then browser paints`}
      />
    </div>
  )
}

export default CriticalRenderingPath
