// Browser and device from the user agent, in the browser. A small parser instead of a library: the demo only
// shows the browser's name and major version, the OS and the kind of device. Anything it doesn't recognise
// returns null, which the card shows as "Nicht prüfbar".

export function browserName(ua = navigator.userAgent): string | null {
  const rules: [RegExp, string][] = [
    [/Edg(?:e|A|iOS)?\/(\d+)/, 'Edge'],
    [/OPR\/(\d+)/, 'Opera'],
    [/SamsungBrowser\/(\d+)/, 'Samsung Internet'],
    [/(?:Firefox|FxiOS)\/(\d+)/, 'Firefox'],
    [/(?:Chrome|CriOS)\/(\d+)/, 'Chrome'],
    [/Version\/(\d+)(?:\.\d+)*.*Safari\//, 'Safari'],
  ];
  for (const [pattern, name] of rules) {
    const match = pattern.exec(ua);
    if (match) return `${name} ${match[1]}`;
  }
  return null;
}

export function deviceName(ua = navigator.userAgent, touchPoints = navigator.maxTouchPoints): string | null {
  // iPads ask for the desktop site and say "Macintosh"; only touch tells them apart.
  const ipad = /iPad/.test(ua) || (/Macintosh/.test(ua) && touchPoints > 1);
  const os = ipad
    ? 'iPadOS'
    : /iPhone|iPod/.test(ua)
      ? 'iOS'
      : /Android/.test(ua)
        ? 'Android'
        : /Windows NT/.test(ua)
          ? 'Windows'
          : /CrOS/.test(ua)
            ? 'ChromeOS'
            : /Macintosh|Mac OS X/.test(ua)
              ? 'macOS'
              : /Linux/.test(ua)
                ? 'Linux'
                : null;
  if (!os) return null;
  const kind = ipad || (/Android/.test(ua) && !/Mobile/.test(ua)) ? 'Tablet' : /iPhone|iPod|Mobile/.test(ua) ? 'Smartphone' : 'Desktop';
  return `${os} · ${kind}`;
}

export function timeZone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}
