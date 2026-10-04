"use client";

export function SecureVideo({ src, title }: { src: string; title: string }) {
  return (
    <video
      src={src}
      aria-label={title}
      controls
      controlsList="nodownload noplaybackrate"
      disablePictureInPicture
      onContextMenu={(event) => event.preventDefault()}
      preload="metadata"
    />
  );
}
