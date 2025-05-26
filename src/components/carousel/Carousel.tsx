import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface ImageProps {
  alt: string;
  url: string;
}

interface SliderProps {
  images: ImageProps[];
}

export function Slider({ images }: SliderProps) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.slide}>
      <div className={styles.slide__container}>
        <img
          className={styles.slide__image}
          src={images[currentImage].url}
          alt={images[currentImage].alt}
        />
      </div>

      <div className={styles.slide__dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.slide__dot} ${
              currentImage === index ? styles["slide__dot--active"] : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
