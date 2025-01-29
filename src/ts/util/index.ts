const domContentLoadedCallbacks: Array<() => void> = [];

const onDOMContentLoaded = (callback: () => void): void => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!domContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of domContentLoadedCallbacks) {
          callback();
        }
      });
    }

    domContentLoadedCallbacks.push(callback);
  } else {
    callback();
  }
};

/* SLIDE UP */
const slideUp = (target: HTMLElement, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = `${duration}ms`;
  target.style.boxSizing = 'border-box';
  target.style.height = `${target.offsetHeight}px`;
  target.style.overflow = 'hidden';

  window.setTimeout(() => {
    target.style.height = '0';
    target.style.paddingTop = '0';
    target.style.paddingBottom = '0';
    target.style.marginTop = '0';
    target.style.marginBottom = '0';
  }, 1);

  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

/* SLIDE DOWN */
const slideDown = (target: HTMLElement, duration = 500) => {
  target.style.removeProperty('display');
  let { display } = window.getComputedStyle(target);

  if (display === 'none') {
    display = 'block';
  }

  target.style.display = display;
  const height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = '0';
  target.style.paddingTop = '0';
  target.style.paddingBottom = '0';
  target.style.marginTop = '0';
  target.style.marginBottom = '0';

  window.setTimeout(() => {
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = `${duration}ms`;
    target.style.height = `${height}px`;
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
  }, 1);

  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
};

/* TOGGLE */
const slideToggle = (target: HTMLElement, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    slideDown(target, duration);
    return;
  }

  slideUp(target, duration);
};

/* THEME TOGGLER FUNCTION */
const initThemeToggler = () => {
  const themeToggler = document.getElementById('theme-toggler');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.body.setAttribute('data-bs-theme', savedTheme);
  updateStyles(savedTheme as 'dark' | 'light');
  themeIcon?.classList.add(savedTheme === 'dark' ? 'bi-sun' : 'bi-moon');

  themeToggler?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-bs-theme', newTheme);
    updateStyles(newTheme);
    themeIcon?.classList.remove(currentTheme === 'dark' ? 'bi-sun' : 'bi-moon');
    themeIcon?.classList.add(newTheme === 'dark' ? 'bi-sun' : 'bi-moon');

    localStorage.setItem('theme', newTheme);
  });

  function updateStyles(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#121212';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  }
};

// Add the theme toggler initialization to DOMContentLoaded
onDOMContentLoaded(initThemeToggler);

export { onDOMContentLoaded, slideUp, slideDown, slideToggle, initThemeToggler };
