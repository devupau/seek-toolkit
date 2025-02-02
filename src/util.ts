import type { HiddenJobs } from "~/types";

export function getHiddenJobs(): HiddenJobs {
  try {
    const hiddenJobs = localStorage.getItem("HIDDEN_SEEK_JOBS");

    if (Array.isArray(hiddenJobs)) {
      return JSON.parse(hiddenJobs);
    }

    return [];
  } catch (e) {
    if (isDev()) {
      console.error("Failed to get hidden jobs:", e);
    }
    return [];
  }
}

export function isJobHidden(jobId: string): boolean {
  const hiddenJobs = getHiddenJobs();
  return hiddenJobs.some((hiddenJobId: string) => hiddenJobId === jobId);
}

export function addJob(jobId: string) {
  try {
    const existingHiddenJobs = getHiddenJobs();
    const updatedHiddenJobs = [...existingHiddenJobs, jobId];
    localStorage.setItem("HIDDEN_SEEK_JOBS", JSON.stringify(updatedHiddenJobs));
  } catch (e) {
    if (isDev()) {
      console.error("Failed to add hidden job:", e);
    }
  }
}

export function removeJob(jobId: string) {
  try {
    const existingHiddenJobs = getHiddenJobs();
    const updatedHiddenJobs = existingHiddenJobs.filter(
      (hiddenJobId) => hiddenJobId !== jobId
    );
    localStorage.setItem("HIDDEN_SEEK_JOBS", JSON.stringify(updatedHiddenJobs));
  } catch (e) {
    if (isDev()) {
      console.error("Failed to remove hidden job:", e);
    }
  }
}

export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}
