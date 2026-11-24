import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import api from "../services/api";

const THEMES = [
  { value: "classic-red", label: "Classic Red Scrapbook" },
  { value: "pink-love", label: "Pink Love" },
  { value: "purple-dream", label: "Purple Dream" },
  { value: "pastel", label: "Pastel Birthday" },
  { value: "dark-night", label: "Dark Night Birthday" },
];

/**
 * Shared create/edit form for a birthday experience.
 * Handles text fields, wishes list, theme selection, and photo upload.
 * `initialData` (if provided) means we're editing an existing birthday.
 */
const BirthdayForm = ({ initialData }) => {
  const navigate = useNavigate();
  const isEdit = Boolean(initialData?._id);

  const [form, setForm] = useState({
    recipientName: initialData?.recipientName || "",
    slug: initialData?.slug || "",
    birthdayDate: initialData?.birthdayDate ? initialData.birthdayDate.slice(0, 10) : "",
    greeting: initialData?.greeting || "",
    personalLetter: initialData?.personalLetter || "",
    finalMessage: initialData?.finalMessage || "",
    wishesText: (initialData?.wishes || []).join("\n"),
    musicUrl: initialData?.musicUrl || "",
    theme: initialData?.theme || "classic-red",
  });

  const [photos, setPhotos] = useState(initialData?.photos || []);
  const [newFiles, setNewFiles] = useState([]);
  const [id, setId] = useState(initialData?._id || null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleFileSelect = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        recipientName: form.recipientName,
        slug: form.slug,
        birthdayDate: form.birthdayDate || undefined,
        greeting: form.greeting,
        personalLetter: form.personalLetter,
        finalMessage: form.finalMessage,
        wishes: form.wishesText.split("\n").map((w) => w.trim()).filter(Boolean),
        musicUrl: form.musicUrl,
        theme: form.theme,
      };

      let savedId = id;

      if (isEdit) {
        await api.put(`/birthdays/${id}`, payload);
      } else {
        const { data } = await api.post("/birthdays", payload);
        savedId = data._id;
        setId(savedId);
      }

      // Upload any newly selected photos
      if (newFiles.length > 0) {
        const formData = new FormData();
        newFiles.forEach((file) => formData.append("photos", file));
        const { data } = await api.post(`/birthdays/${savedId}/photos`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPhotos(data.photos);
        setNewFiles([]);
      }

      setSuccess("Saved successfully! 🎉");
      if (!isEdit) {
        setTimeout(() => navigate(`/admin/birthdays/${savedId}/edit`), 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!id) return;
    try {
      const { data } = await api.delete(`/birthdays/${id}/photos/${photoId}`);
      setPhotos(data.photos);
    } catch (err) {
      alert("Failed to delete photo");
    }
  };

  const handleCaptionChange = async (photoId, caption) => {
    setPhotos((prev) => prev.map((p) => (p._id === photoId ? { ...p, caption } : p)));
  };

  const handleCaptionBlur = async (photoId, caption) => {
    if (!id) return;
    try {
      await api.put(`/birthdays/${id}/photos/${photoId}`, { caption });
    } catch (err) {
      console.error("Failed to save caption");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={grid2}>
        <Field label="Recipient Name">
          <input required style={inputStyle} value={form.recipientName} onChange={(e) => update("recipientName", e.target.value)} />
        </Field>
        <Field label="Slug (URL)">
          <input
            style={inputStyle}
            placeholder="e.g. riya-birthday"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
          />
        </Field>
      </div>

      <div style={grid2}>
        <Field label="Birthday Date">
          <input type="date" style={inputStyle} value={form.birthdayDate} onChange={(e) => update("birthdayDate", e.target.value)} />
        </Field>
        <Field label="Theme">
          <select style={inputStyle} value={form.theme} onChange={(e) => update("theme", e.target.value)}>
            {THEMES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Short Greeting">
        <input style={inputStyle} value={form.greeting} onChange={(e) => update("greeting", e.target.value)} placeholder="Happy Birthday My Bestie ❤️" />
      </Field>

      <Field label="Personal Letter">
        <textarea style={{ ...inputStyle, minHeight: 160 }} value={form.personalLetter} onChange={(e) => update("personalLetter", e.target.value)} />
      </Field>

      <Field label="Wishes (one per line)">
        <textarea style={{ ...inputStyle, minHeight: 100 }} value={form.wishesText} onChange={(e) => update("wishesText", e.target.value)} />
      </Field>

      <Field label="Final Message">
        <input style={inputStyle} value={form.finalMessage} onChange={(e) => update("finalMessage", e.target.value)} placeholder="Never stop smiling ❤️" />
      </Field>

      <Field label="Background Music URL (optional)">
        <input style={inputStyle} value={form.musicUrl} onChange={(e) => update("musicUrl", e.target.value)} placeholder="https://.../song.mp3" />
      </Field>

      <Field label="Photos">
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "2px dashed var(--pink)",
            borderRadius: 12,
            padding: 16,
            cursor: "pointer",
            color: "var(--dark-red)",
            fontWeight: 600,
          }}
        >
          <Upload size={18} />
          {newFiles.length > 0 ? `${newFiles.length} file(s) selected` : "Click to select photos"}
          <input type="file" accept="image/*" multiple onChange={handleFileSelect} style={{ display: "none" }} />
        </label>

        {photos.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
            {photos.map((p) => (
              <div key={p._id} style={{ width: 130, position: "relative" }}>
                <img src={p.url} alt={p.caption} style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 8 }} />
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(p._id)}
                  style={{ position: "absolute", top: -8, right: -8, background: "var(--dark-red)", color: "white", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}
                  aria-label="Delete photo"
                >
                  <X size={14} />
                </button>
                <input
                  placeholder="Caption"
                  value={p.caption || ""}
                  onChange={(e) => handleCaptionChange(p._id, e.target.value)}
                  onBlur={(e) => handleCaptionBlur(p._id, e.target.value)}
                  style={{ ...inputStyle, fontSize: "0.8rem", marginTop: 6, padding: "6px 8px" }}
                />
              </div>
            ))}
          </div>
        )}
        {!id && <p style={{ fontSize: "0.8rem", opacity: 0.6, marginTop: 6 }}>Save the birthday first, then upload photos.</p>}
      </Field>

      {error && <p style={{ color: "var(--dark-red)" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <button
        type="submit"
        disabled={saving}
        className="btn"
        style={{ background: "var(--dark-red)", color: "var(--white)", borderRadius: 999, fontWeight: 700, alignSelf: "flex-start" }}
      >
        {saving ? "Saving..." : isEdit ? "Save Changes" : "Create Birthday"}
      </button>
    </form>
  );
};

const Field = ({ label, children }) => (
  <label style={{ display: "block" }}>
    <span style={{ fontSize: "0.9rem", fontWeight: 600, display: "block", marginBottom: 4 }}>{label}</span>
    {children}
  </label>
);

const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 };

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid var(--light-pink)",
  fontFamily: "inherit",
  fontSize: "0.95rem",
};

export default BirthdayForm;
