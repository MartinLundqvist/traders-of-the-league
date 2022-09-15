import { useEffect, useState } from 'react';

const preloadImage = (src: string) => {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      res(img);
      console.log('Loaded ' + img.src);
    };
    img.onerror = () => {
      rej(src);
    };
    img.src = src;
  });
};

export const useImagePreloader = (imageList: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const effect = async () => {
      console.log('Preloading');

      if (isCancelled) return;

      const imagesPromiseList: Promise<any>[] = [];

      for (const img of imageList) {
        imagesPromiseList.push(preloadImage(img));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) return;

      setImagesPreloaded(true);
    };

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
};
