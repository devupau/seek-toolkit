// Hooks
import { useEffect, useState } from "react";

// Components
import { addJob, isJobHidden, removeJob } from "src/util";
import ToggleButton from "~/components/ToggleButton";

// Types
import type { PlasmoCSUIProps } from "plasmo";

export type JobViewProps = PlasmoCSUIProps & {
  jobId?: string;
};

export default function JobView({ anchor, jobId }: JobViewProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    init();
  }, []);

  function init() {
    if (isJobHidden(jobId)) {
      setIsHidden(true);
      applyHideStyles();
    }
  }

  function toggle() {
    if (isJobHidden(jobId)) {
      show();
      removeHideStyles();
    } else {
      hide();
      applyHideStyles();
    }
  }

  function hide() {
    setIsHidden(true);
    addJob(jobId);
    removeHideStyles();
  }

  function show() {
    setIsHidden(false);
    removeJob(jobId);
    applyHideStyles();
  }

  function applyHideStyles() {
    if (anchor.element instanceof HTMLElement) {
      anchor.element.style.textDecoration = "line-through";
      anchor.element.style.textDecorationThickness = "4px";
      anchor.element.style.textDecorationColor = "red";
    }
  }

  function removeHideStyles() {
    if (anchor.element instanceof HTMLElement) {
      anchor.element.style.textDecoration = "none";
    }
  }

  return <ToggleButton isHidden={isHidden} handler={toggle} />;
}
