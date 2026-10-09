import { useState, type Ref } from "react";
import { mediaUrl } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuVideoProps {
  src: string;
  /** attach src only when true (in-view) — avoids loading every video up front */
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

  return (
    <div className={`relative overflow-hidden ${wrapperClassName ?? ""}`}>
      {load && !ready && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <video
        ref={videoRef}
        src={load ? mediaUrl(src) : undefined}
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
