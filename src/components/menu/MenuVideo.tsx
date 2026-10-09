import { useState, type Ref } from "react";
import { mediaUrl } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuVideoProps {
  src: string;
  videoRef?: Ref<HTMLVideoElement>;
  /** sizing/positioning/rounding of the box */
  wrapperClassName?: string;
  className?: string;
}

/** Src always attached: the browser prefetches the whole menu in the background. */
export default function MenuVideo({
  src,
  videoRef,
  wrapperClassName,
  className,
}: MenuVideoProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      {!ready && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <video
        ref={videoRef}
        src={mediaUrl(src)}
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
        className={`${className ?? ""} ${ready ? "" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
