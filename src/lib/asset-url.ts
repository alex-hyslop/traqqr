// Image imports are { src, … } in Astro and a plain URL string in Storybook's Vite; this takes either.
export const assetUrl = (image: string | { src: string }) => (typeof image === 'string' ? image : image.src);
