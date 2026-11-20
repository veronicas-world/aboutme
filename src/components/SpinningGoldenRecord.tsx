"use client";

import { useEffect, useRef, useState } from "react";

export default function SpinningGoldenRecord() {
  const [retry, setRetry] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);

  // An image that fails before hydration never fires React's onError.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth === 0) setRetry((n) => n + 1);
  }, [retry]);

  return (
    <span className="golden-record">
      {retry < 3 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={retry}
          ref={imgRef}
          src={retry === 0 ? "/golden-record-nav.png" : `/golden-record-nav.png?r=${retry}`}
          alt="Voyager Golden Record"
          width={55}
          height={55}
          loading="lazy"
          onError={() => setRetry((n) => n + 1)}
        />
      ) : null}
    </span>
  );
}