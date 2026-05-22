"use client";

import Script from "next/script";

/**
 * Tawk.to live chat widget.
 *
 * Configured via the admin panel under Site → Live chat (Tawk.to).
 * Falls back to NEXT_PUBLIC_TAWK_PROPERTY_ID / NEXT_PUBLIC_TAWK_WIDGET_ID
 * environment variables if admin values are not set.
 *
 * The widget will not render if neither source has both IDs.
 *
 * To get your IDs:
 *   1. Sign up at https://www.tawk.to
 *   2. Create a property for Merishaw Schools
 *   3. Go to Administration → Channels → Chat Widget
 *   4. Your embed code URL will be: https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
 *   5. Paste those two values in the admin panel under Site → Live chat
 */
export default function TawkChat({
  propertyId: adminPropertyId,
  widgetId: adminWidgetId,
}: {
  propertyId?: string;
  widgetId?: string;
}) {
  const propertyId =
    adminPropertyId || process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "";
  const widgetId =
    adminWidgetId || process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "";

  // Don't render anything if not configured
  if (!propertyId || !widgetId) return null;

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
          s1.src = 'https://embed.tawk.to/' + '${propertyId}' + '/' + '${widgetId}';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
