// The demo's visitor ID, computed in the browser only: a SHA-256 of signals that stay the same across reloads
// and windows of the same browser (canvas and WebGL rendering, hardware, language, time zone), shortened to
// 12 characters. Nothing leaves the browser. The production Traqqr SDK isn't used: it gets its ID from a
// remote fingerprint service and sends events to the API, which this demo must not do.
// The user agent, screen size and touch points are left out on purpose: they change with browser updates,
// monitors and device emulation.

function canvasSignal(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 60;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  const gradient = ctx.createLinearGradient(0, 0, 240, 0);
  gradient.addColorStop(0, '#f59e0b');
  gradient.addColorStop(1, '#0ea5e9');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 240, 60);
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#1c1917';
  ctx.font = '16px "Times New Roman", serif';
  ctx.fillText('Traqqr.ai fingerprint ✓ 🔍', 6, 24);
  ctx.font = '13px Arial, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('äöü ß ¿ Ω ≈ ∑', 8, 48);
  ctx.beginPath();
  ctx.arc(200, 30, 18, 0, Math.PI * 1.7);
  ctx.stroke();
  return canvas.toDataURL();
}

function webglSignal(): string {
  try {
    const gl = document.createElement('canvas').getContext('webgl');
    if (!gl) return '';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = info ? gl.getParameter(info.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR);
    const renderer = info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    return `${vendor}|${renderer}|${gl.getParameter(gl.MAX_TEXTURE_SIZE)}`;
  } catch {
    return '';
  }
}

const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** The visitor ID, or null where the browser can't hash (no secure context). */
export async function visitorId(): Promise<string | null> {
  if (!crypto?.subtle) return null;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const signals = [
    canvasSignal(),
    webglSignal(),
    nav.hardwareConcurrency,
    nav.deviceMemory,
    nav.platform,
    nav.languages?.join(','),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen.colorDepth,
  ].join('§');
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(signals)));
  return Array.from(digest.slice(0, 12), (byte) => ALPHABET[byte % ALPHABET.length]).join('');
}
