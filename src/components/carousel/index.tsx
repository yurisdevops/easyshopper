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
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [currentImage]);

  const handleNext = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImage(index);
  };

  return (
    <div className={styles.slider}>
      {/* <button className={styles.arrowLeft} onClick={handlePrev}>
        &lt;
      </button> */}
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={images[currentImage].url}
          alt={images[currentImage].alt}
        />
      </div>
      {/* <button className={styles.arrowRight} onClick={handleNext}>
        &gt;
      </button> */}
      <div className={styles.dots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              currentImage === index ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
