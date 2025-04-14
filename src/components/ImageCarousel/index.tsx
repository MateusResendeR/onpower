import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: {
    src: string;
    alt: string;
  }[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Adiciona a mudança automática a cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Container do carrossel */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        {/* Slides */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-transform duration-500 ease-in-out ${
              index === activeIndex ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de navegação */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50"
        aria-label="Slide anterior"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 rounded-full p-2 hover:bg-white/50"
        aria-label="Próximo slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicadores de slide */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === activeIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}