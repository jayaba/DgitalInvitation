import { useEffect, useState } from 'react';

/**
 * Loads a photo from the `public/` folder and reports whether it is there.
 *   status: 'loading' | 'ready' | 'missing'
 * A missing file is not an error: the section that uses it simply falls back
 * or hides itself, so the site works before the photos are added.
 */
export function usePhoto(file) {
  const src = file ? `${import.meta.env.BASE_URL}${file}` : '';
  const [photo, setPhoto] = useState({ status: 'loading', width: 0, height: 0 });

  useEffect(() => {
    if (!src) {
      setPhoto({ status: 'missing', width: 0, height: 0 });
      return undefined;
    }
    let isCurrent = true;
    const image = new Image();
    image.onload = () => {
      if (isCurrent) {
        setPhoto({ status: 'ready', width: image.naturalWidth, height: image.naturalHeight });
      }
    };
    image.onerror = () => {
      if (isCurrent) setPhoto({ status: 'missing', width: 0, height: 0 });
    };
    image.src = src;
    return () => {
      isCurrent = false;
    };
  }, [src]);

  return { src, ...photo, isLandscape: photo.width > photo.height };
}
