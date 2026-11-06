// The demo's map: MapLibre with OpenFreeMap's dark style (free, no key), a white dot on the visitor's city.
// Loaded only after the click, as its own chunk (it's large). Not interactive, so it never captures the page
// scroll; the © OpenStreetMap attribution stays visible, as the licence requires.
import { Map, Marker, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// MapLibre finds its worker next to its own file, which bundling breaks; point it at the bundled copy.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

const STYLE = 'https://tiles.openfreemap.org/styles/dark';

export interface DemoMap {
  show(lat: number, lon: number): void;
}

export function createMap(container: HTMLElement, lat: number, lon: number, reducedMotion: boolean): DemoMap {
  setWorkerUrl(workerUrl);
  const map = new Map({
    container,
    style: STYLE,
    center: [lon, lat],
    zoom: 10,
    interactive: false,
    attributionControl: { compact: false },
    fadeDuration: reducedMotion ? 0 : 300,
  });
  // Toned to the Traqqr palette: the style's background in the card's dark.
  map.on('style.load', () => {
    if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', '#141210');
  });
  const dot = document.createElement('span');
  dot.className = 'live-demo-dot';
  dot.style.margin = '0';
  const marker = new Marker({ element: dot }).setLngLat([lon, lat]).addTo(map);
  return {
    show(nextLat, nextLon) {
      map.jumpTo({ center: [nextLon, nextLat] });
      marker.setLngLat([nextLon, nextLat]);
    },
  };
}
