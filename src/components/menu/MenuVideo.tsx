import { useEffect, useState, type Ref } from "react";
import { mediaUrl } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuVideoProps {
  src: string;
  /** attach src on first true (in-view); stays attached after — no re-fetch on scroll */
  load: boolean;
  videoRef?: Ref<HTMLVideoElement>;
  /** sizing/positioning/rounding of the box */
  wrapperClassName?: string;
  className?: string;
}

export default function MenuVideo({
  src,
  load,
  videoRef,
  wrapperClassName,
  className,
}: MenuVideoProps) {
  const [ready, setReady] = useState(false);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    if (load) setAttached(true);
  }, [load]);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      {attached && !ready && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <video
        ref={videoRef}
        src={attached ? mediaUrl(src) : undefined}
        onLoadedData={() => setReady(true)}
        onError={() => setReady(true)}
        className={`${className ?? ""} ${ready ? "" : "opacity-0"}`}
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}
