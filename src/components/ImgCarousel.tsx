'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper/types';
import { useState } from 'react';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/bundle';

const ImgCarousel = ({ imgUrls }: { imgUrls: string[] }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState<number>(0);

  const swiperParams = {
    effect: 'coverflow',
    spaceBetween: 40,
    slidesPerView: 1.5,
    initialSlide: currentImgIdx,
    navigation: true,
    centeredSlides: true,
    pagination: { clickable: true },
    modules: [Navigation, Pagination, EffectCoverflow],
    onSlideChange: (swiper: SwiperType) => setCurrentImgIdx(swiper.activeIndex),
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    className: 'my-12 w-3/5 flex justify-center mx-auto',
  };

  return (
    <Swiper {...swiperParams}>
      {imgUrls && imgUrls.length > 0 ? (
        imgUrls.map((url, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[350px] max-w-[550px] mx-auto">
              <Image
                src={url}
                alt={`Slide image ${idx + 1}`}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-lg object-cover"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div className="w-full h-[350px] max-w-[600px] mx-auto">
            <Image
              src="/default.png"
              alt="default image"
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-lg"
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ImgCarousel;
