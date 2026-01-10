import { useEffect, useRef } from "react";

export default function BannerWidget({ banners }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (
          Math.ceil(scrollContainer.scrollLeft + scrollContainer.clientWidth) >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div ref={scrollRef} className="flex gap-8 overflow-auto mt-5 scrollbar-hide">
      {banners.map((banner) => (
        <img key={banner?.banner_name} src={banner?.banner_image} alt={banner?.banner_name} />
      ))}
    </div>
  );
}
