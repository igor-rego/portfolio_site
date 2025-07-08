document.addEventListener('DOMContentLoaded', () => {
  const btn    = document.getElementById('theme-toggle');
  const saved  = localStorage.getItem('theme'); 
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Aplica tema guardado ou preferência do sistema
  document.documentElement.setAttribute(
    'data-theme',
    saved || (prefersDark ? 'dark' : 'light')
  );

  // Alterna e guarda no localStorage
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next    = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
});
