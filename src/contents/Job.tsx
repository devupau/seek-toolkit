// Styles
import mainStyles from "data-text:~/main.css";

// Components
import JobListView from "~/components/JobListView";

// Types
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList,
  PlasmoGetStyle,
} from "plasmo";

export default function ContentScript({ anchor }: PlasmoCSUIProps) {
  const jobId =
    anchor.element instanceof HTMLElement && anchor.element.dataset.jobId;
    
  if (jobId) {
    return <JobListView anchor={anchor} jobId={jobId} />;
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

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () => {
  const anchors = document.querySelectorAll("article");
  return Array.from(anchors).map((element) => ({
    element,
    insertPosition: "afterend",
  }));
};
