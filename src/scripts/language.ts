// The visitor's language choice (Kev's 5 Nov update): saved in localStorage only once they choose, by
// the suggestion card's Switch or ✕, or a pick in the nav switcher. The homepage reads it in the
// <head> (BaseLayout) to open in that language on later visits. Storage can throw (private mode,
// blocked site data); the site works the same without it, the card just shows again next time.

export const LANG_KEY = 'tq-lang';

function save(lang: string) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}

function saved() {
  try {
    return localStorage.getItem(LANG_KEY);
  } catch {
    return null;
  }
}

export function initLanguageSuggestion() {
  // Any link marked as a language pick (the card's Switch, the nav switcher's rows) saves its language.
  document.addEventListener('click', (e) => {
    const pick = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>('a[data-lang-pick][hreflang]') : null;
    if (pick) save(pick.hreflang);
  });

  const card = document.querySelector<HTMLElement>('[data-lang-suggest]');
  if (!card || saved()) return;
  const page = card.dataset.pageLang!;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (languages.some((l) => l.toLowerCase().split('-')[0] === page)) return;

  setTimeout(() => {
    card.hidden = false;
    card.getBoundingClientRect(); // start the transition from the hidden state
    card.dataset.state = 'in';
  }, 800);

  card.querySelector('[data-lang-dismiss]')?.addEventListener('click', () => {
    save(page);
    card.dataset.state = 'out';
    setTimeout(() => (card.hidden = true), 160);
  });
}
