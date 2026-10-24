import { useState, useRef, useEffect } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: () => void;
}

export default function BlurImage({
  src,
  alt,
  className = '',
  wrapperClassName = '',
  priority = false,
  referrerPolicy = 'no-referrer',
  onClick,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // If image is already cached by browser upon mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      }
    }
  }, [src]);

  return (
    <div
      onClick={onClick}
      className={`relative w-full h-full overflow-hidden bg-[#0c0c0c] ${wrapperClassName}`}
    >
      {/* 1. Skeleton Blur Shimmer (visible while image is loading) */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-0 bg-[#121212] skeleton-shimmer flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-zinc-950 opacity-90" />
          {/* Subtle pulsating camera placeholder aperture */}
          <div className="relative w-8 h-8 rounded-full border border-white/10 opacity-30 animate-pulse flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
        </div>
      )}

      {/* 2. Main High-Fidelity Image with Blur-Up Transition */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy={referrerPolicy}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded
            ? 'opacity-100 blur-0 scale-100'
            : 'opacity-0 blur-md scale-105'
        } ${className}`}
      />

      {/* 3. Fallback error state if broken */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 text-white/40 text-xs font-mono">
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
}
