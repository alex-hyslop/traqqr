// The live demo's only code on page load: wait for the visitor to ask. Everything that reads the browser,
// asks the server or draws the map is imported after the click (TDDDG §25: consent before reading).
for (const root of document.querySelectorAll<HTMLElement>('[data-live-demo]')) {
  root.querySelector('[data-demo-reveal]')?.addEventListener(
    'click',
    async () => {
      const { reveal } = await import('./reveal');
      await reveal(root);
    },
    { once: true },
  );
}
