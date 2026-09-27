export interface LearningModule {
  id: string;
  path: string;
  title: string;
  category: string;
}

/** Curriculum modules tracked for progress. */
export const LEARNING_MODULES: LearningModule[] = [
  { id: 'crp', path: '/learn/critical-rendering-path', title: 'Critical Rendering Path', category: 'Browser & DOM Internals' },
  { id: 'mount-hydrate', path: '/learn/react-mount-hydrate', title: 'Mount & Hydrate', category: 'Browser & DOM Internals' },
  { id: 'synthetic-events', path: '/learn/synthetic-events', title: 'Synthetic Event System', category: 'Browser & DOM Internals' },
  { id: 'jsx-basics', path: '/learn/jsx-basics', title: 'JSX Basics', category: 'Fundamentals' },
  { id: 'component-props', path: '/learn/component-props', title: 'Components & Props', category: 'Fundamentals' },
  { id: 'event-handling', path: '/learn/event-handling', title: 'Event Handling', category: 'Fundamentals' },
  { id: 'conditional-rendering', path: '/learn/conditional-rendering', title: 'Conditional Rendering', category: 'Fundamentals' },
  { id: 'lists-and-keys', path: '/learn/lists-and-keys', title: 'Lists & Keys', category: 'Fundamentals' },
  { id: 'use-state', path: '/learn/use-state', title: 'useState Hook', category: 'React Hooks' },
  { id: 'use-effect', path: '/learn/use-effect', title: 'useEffect Hook', category: 'React Hooks' },
  { id: 'use-context', path: '/learn/use-context', title: 'useContext Hook', category: 'React Hooks' },
  { id: 'use-reducer', path: '/learn/use-reducer', title: 'useReducer Hook', category: 'React Hooks' },
  { id: 'use-memo', path: '/learn/use-memo', title: 'useMemo Hook', category: 'React Hooks' },
  { id: 'use-callback', path: '/learn/use-callback', title: 'useCallback Hook', category: 'React Hooks' },
  { id: 'use-ref', path: '/learn/use-ref', title: 'useRef Hook', category: 'React Hooks' },
  { id: 'custom-hooks', path: '/learn/custom-hooks', title: 'Custom Hooks Intro', category: 'React Hooks' },
  { id: 'tk-debounce', path: '/learn/toolkit/use-debounce', title: 'useDebounce', category: 'Custom Hooks Toolkit' },
  { id: 'tk-outside', path: '/learn/toolkit/use-onclick-outside', title: 'useOnClickOutside', category: 'Custom Hooks Toolkit' },
  { id: 'tk-storage', path: '/learn/toolkit/use-local-storage', title: 'useLocalStorage', category: 'Custom Hooks Toolkit' },
  { id: 'tk-media', path: '/learn/toolkit/use-media-query', title: 'useMediaQuery', category: 'Custom Hooks Toolkit' },
  { id: 'tk-copy', path: '/learn/toolkit/use-copy-to-clipboard', title: 'useCopyToClipboard', category: 'Custom Hooks Toolkit' },
  { id: 'tk-interval', path: '/learn/toolkit/use-interval', title: 'useInterval', category: 'Custom Hooks Toolkit' },
  { id: 'tk-window', path: '/learn/toolkit/use-window-size', title: 'useWindowSize', category: 'Custom Hooks Toolkit' },
];

/** Ordered lesson flow including the final assessment (for next/prev nav). */
export const LESSON_SEQUENCE: LearningModule[] = [
  ...LEARNING_MODULES,
  {
    id: 'master-assessment',
    path: '/learn/master-assessment',
    title: 'Master SDE-1 & SDE-2 Quiz',
    category: 'Assessment',
  },
];

export const TOTAL_MODULES = LEARNING_MODULES.length;

export function getAdjacentLessons(pathname: string) {
  const index = LESSON_SEQUENCE.findIndex((m) => m.path === pathname);
  if (index === -1) {
    return { prev: null, next: LESSON_SEQUENCE[0] ?? null, current: null };
  }
  return {
    prev: index > 0 ? LESSON_SEQUENCE[index - 1] : null,
    next: index < LESSON_SEQUENCE.length - 1 ? LESSON_SEQUENCE[index + 1] : null,
    current: LESSON_SEQUENCE[index],
  };
}
