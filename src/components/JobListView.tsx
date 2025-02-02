// Hooks
import { useEffect, useState } from "react";

// Components
import { addJob, isJobHidden, removeJob } from "~/util";
import ToggleButton from "~/components/ToggleButton";

// Types
import type { PlasmoCSUIProps } from "plasmo";

export type JobListViewProps = PlasmoCSUIProps & {
  jobId: string;
};

export default function JobListView({ anchor, jobId }: JobListViewProps) {
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
    } else {
      hide();
    }
  }

  function hide() {
    setIsHidden(true);
    addJob(jobId);
    applyHideStyles();
  }

  function show() {
    setIsHidden(false);
    removeJob(jobId);
    removeHideStyles();
  }

  function applyHideStyles() {
    if (anchor.element instanceof HTMLElement) {
      anchor.element.style.opacity = "0.25";
    }
  }

  function removeHideStyles() {
    if (anchor.element instanceof HTMLElement) {
      anchor.element.style.opacity = "1";
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "10px",
        width: "100%",
      }}
    >
      <ToggleButton isHidden={isHidden} handler={toggle} />
    </div>
  );
}
