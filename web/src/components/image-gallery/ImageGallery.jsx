import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";
import styles from "./ImageGallery.module.css";
import { classnames } from "@/lib/util";

const Gallery = ({
  slidesPerView = 2,
  onSlideClick = null,
  initial = 0,
  loop = true,
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial,
      slides: {
        perView: slidesPerView,
        spacing: 15,
      },
      loop,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [
      (slider) => {
        if (!loop) return;
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, i) => (
            <div
              className={classnames("keen-slider__slide", styles.gallery)}
              key={i}
              onClick={() => onSlideClick?.(i)}
            >
              {slide}
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div className="arrows">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </div>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="dots">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
};

const Arrow = (props) => {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
};

export const ImageGallery = ({ slidesPerView = 2, slides, loop = true }) => {
  const [modalImage, setModalImage] = useState(null);

  return (
    <>
      <Gallery
        onSlideClick={(slide) => setModalImage(slide)}
        slidesPerView={slidesPerView}
        slides={slides}
        loop={loop}
      />
      {modalImage !== null && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setModalImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M12 10.586l5.657-5.657 1.414 1.414L13.414 12l5.657 5.657-1.414 1.414L12 13.414l-5.657 5.657-1.414-1.414L10.586 12 4.929 6.343l1.414-1.414z" />
              </svg>
            </button>
            <div className="modal__image">
              <Gallery
                slidesPerView={1}
                initial={modalImage}
                loop={false}
                slides={slides}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const BjelowbarImageGallery = () => (
  <ImageGallery
    slides={new Array(11).fill("").map((_, i) => (
      <Image
        key={i}
        src={`/galerija/${i + 1}.jpg`}
        alt="PLK Bjelowbar"
        width={1920}
        height={1080}
      />
    ))}
  />
);
