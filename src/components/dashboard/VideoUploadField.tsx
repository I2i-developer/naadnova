"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import styles from "@/app/dashboard/dashboard.module.css";

export function VideoUploadField({ courseId }: { courseId: string }) {
  const [path, setPath] = useState("");
  const [status, setStatus] = useState("Choose an MP4 or WebM lesson video");

  async function upload(file: File | undefined) {
    if (!file) return;
    setStatus("Preparing secure upload...");
    try {
      const response = await fetch("/api/admin/video-upload", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ courseId, fileName: file.name }) });
      const payload = await response.json() as { path?: string; token?: string; error?: string };
      if (!response.ok || !payload.path || !payload.token) throw new Error(payload.error ?? "Upload could not start");
      setStatus("Uploading video...");
      const supabase = createClient();
      const { error } = await supabase.storage.from("course-videos").uploadToSignedUrl(payload.path, payload.token, file, { contentType: file.type });
      if (error) throw error;
      setPath(payload.path);
      setStatus(`Ready: ${file.name}`);
    } catch (error) {
      setPath("");
      setStatus(error instanceof Error ? error.message : "Upload failed");
    }
  }

  return <label className={styles.uploadField}><span><UploadCloud size={17} /> Private lesson video</span><input type="file" accept="video/mp4,video/webm" onChange={(event) => upload(event.target.files?.[0])} /><input type="hidden" name="storage_path" value={path} /><small>{status}</small></label>;
}
