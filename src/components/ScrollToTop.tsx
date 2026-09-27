import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll window + learn main pane to top on every route change. */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const main = document.querySelector('.main-content');
    if (main instanceof HTMLElement) {
      main.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
