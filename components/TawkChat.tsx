"use client";

import Script from "next/script";

/**
 * Tawk.to live chat widget.
 *
 * Configured via the admin panel under Site > Live chat (Tawk.to).
 * The admin can paste the full embed URL or the full Tawk script snippet.
 * Falls back to NEXT_PUBLIC_TAWK_EMBED_URL, then to the legacy
 * NEXT_PUBLIC_TAWK_PROPERTY_ID / NEXT_PUBLIC_TAWK_WIDGET_ID environment
 * variables if admin values are not set.
 *
 * The widget will not render if no valid Tawk embed URL can be resolved.
 */
export default function TawkChat({
  embedUrl: adminEmbedUrl,
  propertyId: adminPropertyId,
  widgetId: adminWidgetId,
}: {
  embedUrl?: string;
  propertyId?: string;
  widgetId?: string;
}) {
  const embedUrl =
    getTawkEmbedUrl(adminEmbedUrl) ||
    getTawkEmbedUrl(process.env.NEXT_PUBLIC_TAWK_EMBED_URL) ||
    buildTawkEmbedUrl(adminPropertyId, adminWidgetId) ||
    buildTawkEmbedUrl(
      process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
      process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
    );

  if (!embedUrl) return null;

  return (
    <Script id="tawk-chat" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();

        // Customize the widget to match Merishaw brand
        Tawk_API.customStyle = {
          visibility: {
            desktop: { position: 'br', xOffset: 20, yOffset: 20 },
            mobile:  { position: 'br', xOffset: 10, yOffset: 10 },
          },
        };

        (function(){
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = ${JSON.stringify(embedUrl)};
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}

function getTawkEmbedUrl(value?: string) {
  if (!value) return "";

  const match = value.match(
    /https:\/\/embed\.tawk\.to\/([a-z0-9]+)\/([a-z0-9_-]+)/i,
  );

  return match ? `https://embed.tawk.to/${match[1]}/${match[2]}` : "";
}

function buildTawkEmbedUrl(propertyId?: string, widgetId?: string) {
  const property = normalizeTawkPart(propertyId);
  const widget = normalizeTawkPart(widgetId);

  return property && widget
    ? `https://embed.tawk.to/${property}/${widget}`
    : "";
}

function normalizeTawkPart(value?: string) {
  const trimmed = value?.trim();

  if (!trimmed || !/^[a-z0-9_-]+$/i.test(trimmed)) return "";

  return trimmed;
}
