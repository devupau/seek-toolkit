// Styles
import mainStyles from "data-text:~/main.css";

// Components
import JobView from "~/components/JobView";

// Types
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchor,
  PlasmoGetStyle,
} from "plasmo";

export default function ContentScript({ anchor }: PlasmoCSUIProps) {
  const jobId = window.location.pathname.split("/").pop();

  if (anchor.element instanceof HTMLElement) {
    return <JobView anchor={anchor} jobId={jobId} />;
  }

  return null;
}

/**
 * Configuration.
 */

export const config: PlasmoCSConfig = {
  matches: ["https://www.seek.com.au/*", "https://www.seek.co.nz/*"],
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = mainStyles;
  return style;
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector("h1"),
  insertPosition: "afterend",
});
