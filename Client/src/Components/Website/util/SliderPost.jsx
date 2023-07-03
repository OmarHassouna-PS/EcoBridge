import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import { Autoplay, Pagination, Navigation } from "swiper";
import Loader from "../General/Loader";

export default function Slider({ blocks, style }) {

    const [perView, setPerView] = useState();

    useEffect(() => {
      // Update the screen width when the window is resized
      const handleResize = () => {
        const width = window.innerWidth;
        if (width > 1050) {
          setPerView(() => 3);
        } else if (width > 800) {
          setPerView(() => 2);
        } else {
          setPerView(() => 1);
        }
      };

      handleResize();
      
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
    
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [blocks]);

    if (!perView || !blocks) {
      return <Loader />;
    }
    

    return (
        <>
            <Swiper
                loop={true}
                slidesPerView={1}
                grabCursor={true}
                spaceBetween={30}
                centeredSlides={true}
                // autoplay={{
                //     delay: 7500,
                //     disableOnInteraction: false,
                // }}
                pagination={{
                    clickable: true,

                }}
                modules={[Autoplay, Pagination, Navigation]}
                className={style}
            >
                {blocks?.map((block) => {
                    return (
                        <SwiperSlide>{block}</SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}
