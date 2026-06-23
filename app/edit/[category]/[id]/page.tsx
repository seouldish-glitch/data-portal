"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FORMS_CONFIG } from "../../../lib/formConfig";

export default function EditPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>(
    {},
  );
  const [removedFiles, setRemovedFiles] = useState<Record<string, string[]>>(
    {},
  );
  const [removedFiles, setRemovedFiles] = useState<Record<string, string[]>>(
    {},
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/user/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.user) {
          router.push("/login");
        } else {
          setIsAuthenticated(true);
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetch(`/api/submissions/${params.category}/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setInitialData(data.submission);
        setIsLoadingData(false);
      })
      .catch(() => {
        router.push("/my-submissions");
      });
  }, [isAuthenticated, params.category, params.id, router]);

  const config = FORMS_CONFIG[params.category];

  if (!config) {
    return (
      <div
        className="page-wrapper"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        <h2>Form Not Found</h2>
        <Link href="/" style={{ color: "var(--sbc-green)" }}>
          Return Home
        </Link>
      </div>
    );
  }

  if (isAuthenticated === null || isLoadingData) {
    return (
      <div
        className="page-wrapper"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleFileChange = (
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files)
        .map((file) => file.name)
        .join(", ");
      setSelectedFiles((prev) => ({ ...prev, [fieldName]: names }));
    } else {
      setSelectedFiles((prev) => {
        const copy = { ...prev };
        delete copy[fieldName];
        return copy;
      });
    }
  };

  const getExistingFiles = (name: string) => {
    if (!initialData) return [];
    let backendName = name;
    if (name === "logo") backendName = "logoUrl";
    if (name === "groupPhoto") backendName = "groupPhotoUrl";
    if (name === "mediaUploads") backendName = "mediaLinks";
    if (name === "houseFlag") backendName = "houseFlagUrl";
    if (name === "guildLogo") backendName = "badgeLogoUrl";
    let val = initialData[backendName] || initialData[name];
    if (!val) return [];
    if (!Array.isArray(val)) val = [val];
    const removed = removedFiles[name] || [];
    return val.filter((url: string) => !removed.includes(url));
  };

  const handleRemoveFile = (fieldName: string, url: string) => {
    setRemovedFiles((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), url],
    }));
    // If a new file was selected for this field, clear it to avoid confusion
    setSelectedFiles((prev) => {
      const copy = { ...prev };
      if (copy[fieldName]) {
        delete copy[fieldName];
      }
      return copy;
    });
  };

  const getExistingFiles = (name: string) => {
    if (!initialData) return [];

    // Some backend fields don't match frontend exact names perfectly for files in some edge cases
    // but we mapped them well in the update script.
    // Let's use the field.name or mapped names
    let backendName = name;
    if (name === "logo") backendName = "logoUrl";
    if (name === "groupPhoto") backendName = "groupPhotoUrl";
    if (name === "mediaUploads") backendName = "mediaLinks"; // sportForm uses mediaLinks
    if (name === "houseFlag") backendName = "houseFlagUrl";
    if (name === "guildLogo") backendName = "badgeLogoUrl";

    let val = initialData[backendName] || initialData[name];
    if (!val) return [];
    if (!Array.isArray(val)) val = [val];

    const removed = removedFiles[name] || [];
    return val.filter((url: string) => !removed.includes(url));
  };

  const handleRemoveFile = (fieldName: string, url: string) => {
    setRemovedFiles((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), url],
    }));
  };

  const getDefVal = (name: string) => {
    if (!initialData) return "";
    const val = initialData[name];
    if (Array.isArray(val)) return val.join(", ");
    return val || "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData(formRef.current);

      // Get Cloudinary signature
      const signRes = await fetch("/api/cloudinary/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: `sbc-portal/${params.category}` }),
      });
      if (!signRes.ok)
        throw new Error("Failed to securely sign upload request.");
      const { signature, timestamp, cloudName, apiKey } = await signRes.json();

      const newFormData = new FormData();
      const uploadPromises: Promise<void>[] = [];

      for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
          const uploadData = new FormData();
          uploadData.append("file", value);
          uploadData.append("api_key", apiKey);
          uploadData.append("timestamp", timestamp.toString());
          uploadData.append("signature", signature);
          uploadData.append("folder", `sbc-portal/${params.category}`);

          const promise = fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
            {
              method: "POST",
              body: uploadData,
            },
          )
            .then((r) => r.json())
            .then((data) => {
              if (data.secure_url) {
                newFormData.append(key, data.secure_url);
              } else {
                throw new Error(data.error?.message || "File upload failed");
              }
            });
          uploadPromises.push(promise);
        } else if (!(value instanceof File && value.size === 0)) {
          // Keep existing non-empty non-file data
          newFormData.append(key, value);
        }
      }

      await Promise.all(uploadPromises);

      const res = await fetch(
        `/api/edit?category=${params.category}&id=${params.id}`,
        {
          method: "POST",
          body: newFormData,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong during submission.",
        );
      }

      setSubmitStatus("success");
      formRef.current.reset();
      setSelectedFiles({});
      setRemovedFiles({});
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Server connection failed.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Modal Feedback Overlays */}
      {submitStatus === "success" && (
        <div className="feedback-overlay">
          <div className="feedback-card">
            <div className="feedback-success-icon">✓</div>
            <h2 style={{ color: "var(--sbc-green)", marginBottom: "1rem" }}>
              Update Successful
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              Your records have been successfully updated and archived to
              MongoDB. Thank you for contributing to the 161st Anniversary
              Digital Project.
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              style={{
                background: "var(--sbc-green)",
                color: "#050505",
                border: "none",
                borderRadius: "8px",
                padding: "0.8rem 2rem",
                fontWeight: "800",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {submitStatus === "error" && (
        <div className="feedback-overlay">
          <div className="feedback-card" style={{ borderColor: "#ef4444" }}>
            <div
              className="feedback-success-icon"
              style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
            >
              ✕
            </div>
            <h2 style={{ color: "#ef4444", marginBottom: "1rem" }}>
              Submission Failed
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              {errorMessage}
            </p>
            <button
              onClick={() => setSubmitStatus("idle")}
              style={{
                background: "#ef4444",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "0.8rem 2rem",
                fontWeight: "800",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <main
        className="main-content"
        style={{ maxWidth: "800px", margin: "0 auto", paddingTop: "4rem" }}
      >
        <Link
          href="/"
          style={{
            color: "var(--sbc-green)",
            textDecoration: "none",
            marginBottom: "2.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontSize: "0.9rem",
          }}
        >
          <span>&larr;</span> Back to Dashboard
        </Link>
        <header
          style={{
            marginBottom: "3.5rem",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            paddingBottom: "2.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              marginBottom: "1rem",
              color: "var(--sbc-green)",
              fontFamily: "'Cinzel', serif",
              letterSpacing: "1px",
            }}
          >
            {config.title}
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: "1.6",
              fontWeight: 500,
            }}
          >
            {config.subtitle}
          </p>
        </header>
        <div
          style={{
            background: "rgba(34, 197, 94, 0.1)",
            borderLeft: "4px solid var(--sbc-green)",
            padding: "1rem",
            marginBottom: "2.5rem",
            color: "var(--text-primary)",
          }}
        >
          <strong style={{ color: "var(--sbc-green)" }}>Note:</strong> Please
          ensure you upload pictures of achievements, including historical/old
          photos if available.
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          {config.fields.map((field, i) => (
            <div
              key={i}
              className="form-group"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <label className="form-label">
                {field.label}{" "}
                {field.required && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
              {field.type === "textarea" && (
                <textarea
                  name={field.name}
                  required={field.required}
                  rows={4}
                  placeholder={`Enter details...`}
                  defaultValue={getDefVal(field.name)}
                  className="form-input-control"
                  style={{ resize: "vertical" }}
                />
              )}
              {field.type === "select" && field.options && (
                <select
                  name={field.name}
                  required={field.required}
                  className="form-input-control"
                  defaultValue={getDefVal(field.name)}
                >
                  <option value="" disabled>
                    Select an option...
                  </option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "file" && (
                <div className="form-file-wrapper">
                  {getExistingFiles(field.name).length > 0 && (
                    <div
                      style={{
                        marginBottom: "1rem",
                        background: "rgba(255,255,255,0.03)",
                        padding: "1rem",
                        borderRadius: "8px",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          marginBottom: "0.5rem",
                          fontSize: "0.85rem",
                          color: "var(--text-secondary)",
                        }}
                      >
                        Currently Uploaded:
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        {getExistingFiles(field.name).map(
                          (url: string, idx: number) => (
                            <div
                              key={idx}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                background: "rgba(0,0,0,0.3)",
                                padding: "0.5rem 1rem",
                                borderRadius: "6px",
                              }}
                            >
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  color: "var(--sbc-green)",
                                  fontSize: "0.85rem",
                                  textDecoration: "none",
                                  maxWidth: "70%",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {url.split("/").pop()}
                              </a>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveFile(field.name, url)
                                }
                                style={{
                                  background: "transparent",
                                  color: "#ef4444",
                                  border: "1px solid rgba(239,68,68,0.3)",
                                  borderRadius: "4px",
                                  padding: "0.25rem 0.5rem",
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                  transition: "all 0.2s",
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.background =
                                    "rgba(239,68,68,0.1)")
                                }
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.background =
                                    "transparent")
                                }
                              >
                                Remove
                              </button>
                              <input
                                type="hidden"
                                name={`existing_${field.name}`}
                                value={url}
                              />
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className="file-icon">⇪</div>
                  <span
                    style={{
                      fontWeight: "700",
                      color: "var(--text-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {selectedFiles[field.name]
                      ? "New files selected:"
                      : "Upload new file / drag & drop"}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color: selectedFiles[field.name]
                        ? "var(--sbc-green)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {selectedFiles[field.name] ||
                      `Accepts ${field.accept || "images"}`}
                  </span>
                  <input
                    type="file"
                    name={field.name}
                    accept={field.accept}
                    required={
                      field.required &&
                      getExistingFiles(field.name).length === 0
                    }
                    multiple={
                      field.name === "mediaUploads" ||
                      field.name === "officialPhotos" ||
                      field.name === "actionPhotos" ||
                      field.name === "achievementPhotos"
                    }
                    onChange={(e) => handleFileChange(field.name, e)}
                    className="form-file-input"
                  />
                </div>
              )}
              {(field.type === "text" ||
                field.type === "tel" ||
                field.type === "number") && (
                <input
                  type={field.type}
                  name={field.name}
                  required={field.required}
                  placeholder={`Type response here...`}
                  defaultValue={getDefVal(field.name)}
                  className="form-input-control"
                />
              )}
            </div>
          ))}
          <button type="submit" disabled={isSubmitting} className="btn-submit">
            {isSubmitting ? "Updating Records..." : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
