/* Julian's overlay reads gsap and CustomEase from window. Import this before sunbeam-overlay.js. */
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);
window.gsap = gsap;
window.CustomEase = CustomEase;
