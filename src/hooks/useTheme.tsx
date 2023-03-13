// Hook that will toggle the theme between light and dark mode
// We are usning tailwindcss to handle the theme
import { useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  return { theme, toggleTheme };
};
