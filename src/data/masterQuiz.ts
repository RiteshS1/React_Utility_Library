export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: 'SDE-1' | 'SDE-2';
}

export const masterQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    level: 'SDE-1',
    question: "What is rendered when the button is clicked once?",
    codeSnippet: `function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return <button onClick={handleClick}>{count}</button>;
}`,
    options: [
      "3",
      "1",
      "0",
      "React throws a maximum update depth warning"
    ],
    correctIndex: 1,
    explanation: "State updates in event handlers are batched, and closures capture the 'count' value at the time of rendering (0). All three calls execute 'setCount(0 + 1)'. To get 3, you must use functional updates: setCount(c => c + 1)."
  },
  {
    id: 2,
    level: 'SDE-2',
    question: "Why does using the array index as a 'key' prop lead to UI bugs in reordered dynamic lists with local state?",
    options: [
      "Keys must be UUIDs; numbers are rejected by React Fiber.",
      "React identifies Fiber nodes by key and type. Reordering keeps the index identical, so child component instances retain previous internal state while receiving new props.",
      "It disables React 19 concurrent mode batching.",
      "It triggers a full unmount and remount of the entire list container."
    ],
    correctIndex: 1,
    explanation: "When index keys are used and list order changes, item 0 remains item 0. React reuses the existing Fiber node at that position, preserving local input or animation state instead of tracking the item's identity."
  },
  {
    id: 3,
    level: 'SDE-2',
    question: "What is the critical execution difference between useLayoutEffect and useEffect?",
    options: [
      "useLayoutEffect runs on the server; useEffect runs on the client.",
      "useLayoutEffect runs synchronously immediately after DOM mutations but BEFORE the browser paints; useEffect runs asynchronously AFTER the browser paints.",
      "useEffect runs synchronously before DOM mutations; useLayoutEffect runs after paint.",
      "useLayoutEffect bypasses React's reconciliation engine."
    ],
    correctIndex: 1,
    explanation: "useLayoutEffect blocks browser painting to allow synchronous DOM measurements and mutations (preventing visual flickers). useEffect runs passively after paint so it doesn't block frame rendering."
  },
  {
    id: 4,
    level: 'SDE-2',
    question: "What does this component print to the console when mounted?",
    codeSnippet: `function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(count);
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{count}</div>;
}`,
    options: [
      "0, 1, 2, 3, 4 ... indefinitely",
      "0, 0, 0, 0, 0 ... every second",
      "NaN on the second tick",
      "Throws an unhandled closure exception"
    ],
    correctIndex: 1,
    explanation: "This is a classic Stale Closure. The useEffect has an empty dependency array [], so the interval closure permanently captures 'count' as 0 from the initial render. Every tick logs 0 and calls setCount(0 + 1)."
  },
  {
    id: 5,
    level: 'SDE-1',
    question: "How does React 18+ Automatic Batching handle state updates inside setTimeout or fetch promises?",
    options: [
      "It does not batch them; each setState triggers an immediate independent render.",
      "It automatically batches all updates into a single re-render, regardless of where they are dispatched.",
      "It requires ReactDOM.unstable_batchedUpdates to bundle them.",
      "It only batches them when running in production mode."
    ],
    correctIndex: 1,
    explanation: "Prior to React 18, updates inside promises, setTimeout, or native event handlers were unbatched. React 18+ batches updates across all contexts by default using the Root Schedule."
  },
  {
    id: 6,
    level: 'SDE-2',
    question: "Where does React 17, 18, and 19 attach native event listeners when you define onClick on a JSX button?",
    options: [
      "Directly to the HTML button DOM node.",
      "To the document.body element.",
      "To the root DOM container (e.g., #root) passed to createRoot.",
      "To window.top."
    ],
    correctIndex: 2,
    explanation: "React 17 moved event delegation from 'document' to the root DOM container holding the React tree (#root). This prevents cross-tree event conflicts in micro-frontend architectures."
  },
  {
    id: 7,
    level: 'SDE-2',
    question: "What is the primary architectural purpose of React Fiber?",
    options: [
      "To replace JavaScript with WebAssembly for faster DOM rendering.",
      "To introduce an incremental, interruptible reconciler that can pause, resume, and assign priorities to rendering work.",
      "To provide client-side state caching across multiple tabs.",
      "To automatically memoize all JSX components without React.memo."
    ],
    correctIndex: 1,
    explanation: "The legacy Stack Reconciler was synchronous and could block the main thread during heavy updates. Fiber represents a virtual stack frame with unit-of-work linked lists that allows concurrent scheduling, pausing, and prioritization."
  },
  {
    id: 8,
    level: 'SDE-1',
    question: "Why do components mount twice and console.logs run twice in local development?",
    options: [
      "Vite Hot Module Replacement has a bug.",
      "React.StrictMode intentionally double-invokes render phases and effects to catch side-effects and missing cleanups.",
      "The browser is pre-fetching client bundles.",
      "Two root containers were declared in index.html."
    ],
    correctIndex: 1,
    explanation: "In development, React.StrictMode renders twice to ensure functions remain pure and verifies that useEffect cleanup functions properly teardown listeners, subscriptions, and timers."
  },
  {
    id: 9,
    level: 'SDE-2',
    question: "How does React treat component reconciliation when a child's element type changes between renders (e.g. from <Header/> to <nav />)?",
    options: [
      "It mutates the DOM node attributes and retains child component state.",
      "It completely destroys the entire old subtree, unmounts its Fiber node, and mounts an entirely new tree from scratch.",
      "It renames the DOM element tag while preserving hooks state.",
      "It throws a reconciliation mismatch warning."
    ],
    correctIndex: 1,
    explanation: "React's diffing heuristic states that two elements of different types generate different trees. Changing element type causes React to unmount the old tree, destroying all child component states completely."
  },
  {
    id: 10,
    level: 'SDE-1',
    question: "Does mutating ref.current trigger a component re-render?",
    options: [
      "Yes, always.",
      "No, mutating a ref is a side-effect that does not notify React to schedule a re-render.",
      "Only if the ref is passed as a prop.",
      "Only if the ref holds primitive values like numbers or booleans."
    ],
    correctIndex: 1,
    explanation: "useRef returns a plain JavaScript object with a mutable '.current' property. Changing it does not alter component state and does not trigger React's render loop."
  },
  {
    id: 11,
    level: 'SDE-2',
    question: "What is the 'Context re-render blast radius' problem and how is it best mitigated?",
    options: [
      "Context loses state on page refresh; mitigated by cookies.",
      "Any change to the Provider's 'value' triggers a re-render in ALL consumer components, even if they only read an unchanged property; mitigated by splitting contexts or memoizing consumers.",
      "Context crashes when combined with Redux; mitigated by Zustand.",
      "Context cannot hold objects; mitigated by JSON serialization."
    ],
    correctIndex: 1,
    explanation: "Context does not support selector-based fine-grained subscriptions natively. When Provider value changes (by reference), all useContext consumers re-render. Splitting unrelated states into separate providers isolates updates."
  },
  {
    id: 12,
    level: 'SDE-2',
    question: "When should you prefer useTransition over standard state updates?",
    options: [
      "For all user typing inputs.",
      "To mark non-urgent state updates as interruptible so that urgent updates (like typing or clicking) keep the UI responsive.",
      "To replace async/await when fetching data from an API.",
      "To execute state updates inside Web Workers."
    ],
    correctIndex: 1,
    explanation: "useTransition lets you downgrade an update's priority. If a user types into an input while a transition-wrapped chart/filter recalculates, React pauses the transition to process the keypress immediately."
  },
  {
    id: 13,
    level: 'SDE-2',
    question: "What happens when an event bubbles through a React Portal?",
    options: [
      "It bubbles through the native DOM tree hierarchy where the portal node physically resides.",
      "It bubbles through the React Virtual DOM hierarchy, reaching ancestor components in the JSX tree regardless of where the portal DOM node exists.",
      "Portals swallow all events; bubbling is completely disabled.",
      "It only bubbles if document.body has an active listener."
    ],
    correctIndex: 1,
    explanation: "Even though a portal node is rendered elsewhere in the real DOM (e.g. document.body), React propagates SyntheticEvents according to the React Virtual DOM component hierarchy."
  },
  {
    id: 14,
    level: 'SDE-1',
    question: "If two separate components import and call the same custom hook `useCounter()`, what is shared between them?",
    options: [
      "They share the exact same state values (singleton pattern).",
      "They only share the stateful logic and algorithms; each component receives completely independent, isolated state.",
      "They share state only if rendered inside the same parent div.",
      "Custom hooks cannot maintain state in multiple components."
    ],
    correctIndex: 1,
    explanation: "Custom hooks reuse logic, not state. Each time a custom hook is invoked inside a component, React allocates a fresh, isolated state cell in that component's Fiber node."
  },
  {
    id: 15,
    level: 'SDE-2',
    question: "Which of the following errors CANNOT be caught by a standard React Error Boundary?",
    options: [
      "Errors thrown during rendering in child components.",
      "Errors thrown inside constructor or lifecycle methods.",
      "Asynchronous errors (e.g. inside setTimeout, requestAnimationFrame, or async promise handlers).",
      "Errors thrown in useLayoutEffect."
    ],
    correctIndex: 2,
    explanation: "Error Boundaries only catch errors during the render phase, lifecycle methods, and constructors of the tree below them. They do not catch errors inside async callbacks, event handlers, or during SSR."
  },
  {
    id: 16,
    level: 'SDE-1',
    question: "Why should you avoid creating functions or objects inline inside JSX props without careful thought?",
    options: [
      "Inline functions cause syntax errors in TypeScript.",
      "They create new object/function references on every render, causing memoized children (React.memo) to fail shallow equality checks and re-render unnecessarily.",
      "They trigger automatic unmounting of the child component.",
      "Inline functions cannot read props."
    ],
    correctIndex: 1,
    explanation: "Inline object and function literals create a new memory reference on every render. If passed to a component wrapped with React.memo, the shallow comparison fails ({...} !== {...}), bypassing memoization."
  },
  {
    id: 17,
    level: 'SDE-2',
    question: "In React 19, what role does the new React Compiler ('Forget') play regarding useMemo and useCallback?",
    options: [
      "It deprecates all functional components in favor of classes.",
      "It automatically optimizes memoization at build time, reducing or eliminating the need to manually write useMemo and useCallback.",
      "It moves React rendering completely to the server.",
      "It replaces the virtual DOM with direct DOM bindings like Svelte."
    ],
    correctIndex: 1,
    explanation: "The React Compiler is an optimizing compiler that automatically memorizes values and functions based on semantic understanding of JavaScript, eliminating manual hook memoization overhead."
  },
  {
    id: 18,
    level: 'SDE-2',
    question: "What is the primary danger of reading or modifying ref.current directly during the component render phase?",
    options: [
      "It throws a compile-time JSX syntax error.",
      "Because concurrent rendering can render, pause, discard, and re-render components multiple times before committing, reading or mutating refs during render leads to unpredictable, non-deterministic UI.",
      "It forces the browser into infinite reflow.",
      "It turns the component into an uncontrolled input."
    ],
    correctIndex: 1,
    explanation: "The render phase must remain pure and free of side effects. Since concurrent React can abandon renders, mutating or reading refs during render leads to stale or mismatched states. Refs should only be accessed in effects or handlers."
  },
  {
    id: 19,
    level: 'SDE-2',
    question: "Why does wrapping an unstable function prop in useCallback have zero performance benefit if the receiving child component is NOT wrapped in React.memo?",
    options: [
      "useCallback only works in development mode.",
      "If the child isn't memoized, parent re-renders will re-render the child regardless of whether its props changed by reference.",
      "useCallback converts functions into strings.",
      "React cancels the hook if React.memo is missing."
    ],
    correctIndex: 1,
    explanation: "By default, React re-renders all children when a parent re-renders. Stabilizing function identity via useCallback is only useful if a child or dependency array uses that reference for shallow equality checks (e.g. React.memo)."
  },
  {
    id: 20,
    level: 'SDE-2',
    question: "What is the main difference between useDeferredValue and debouncing?",
    options: [
      "useDeferredValue has an arbitrary fixed delay, while debouncing does not.",
      "Debouncing introduces an artificial fixed delay (e.g. 300ms) before doing work; useDeferredValue works directly with React's concurrent scheduler, rendering immediately on fast devices and lagging gracefully only under heavy load.",
      "useDeferredValue runs in a separate Web Worker thread.",
      "Debouncing is built directly into React 19."
    ],
    correctIndex: 1,
    explanation: "Debouncing waits for a fixed timeout, which feels sluggish on fast devices. useDeferredValue is integrated into React's concurrency: it starts rendering immediately after paint and can be interrupted by new user interactions."
  }
];
