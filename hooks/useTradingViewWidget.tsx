"use client";

import { useEffect, useRef } from "react";

interface TradingViewWidgetOptions {
  [key: string]: any;
}

const useTradingViewWidget = (widgetOptions: TradingViewWidgetOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = containerRef.current;
    if (ref && !ref.querySelector("iframe")) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify(widgetOptions);
      ref.appendChild(script);
    }

    return () => {
      if (ref) {
        const iframe = ref.querySelector("iframe");
        if (iframe) {
          ref.removeChild(iframe);
        }
      }
    };
  }, [widgetOptions]);

  return containerRef;
};

export default useTradingViewWidget;
