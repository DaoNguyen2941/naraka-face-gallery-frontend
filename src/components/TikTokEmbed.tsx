"use client";

import { useEffect, useRef } from "react";

type TikTokEmbedProps = {
  url: string;
};

export default function TikTokEmbed({ url }: TikTokEmbedProps) {
  const ref = useRef<HTMLQuoteElement>(null); // ✅ đúng kiểu cho <blockquote>
  const videoId = extractVideoId(url);

  useEffect(() => {
    const existingScript = document.querySelector("#tiktok-embed-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      script.id = "tiktok-embed-script";
      document.body.appendChild(script);
    } else {
      // Nếu đã có, gọi lại hàm render TikTok
      setTimeout(() => {
        (window as any).tiktok?.embedLoad?.();
      }, 100);
    }
  }, [videoId]);

  if (!videoId) {
    return <div className="text-red-500">❌ URL video TikTok không hợp lệ.</div>;
  }

return (
  <div style={{ width: "100%", maxWidth: "605px", margin: "0 auto" }}>
    <blockquote
      ref={ref}
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ width: "100%" }}
    >
      <section></section>
    </blockquote>
  </div>
);

}

function extractVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : null;
}
