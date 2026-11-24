// Cloudinary unsigned upload helper (images only).
// The cloud name and the unsigned upload preset are public values by design.
// Never put the API secret in front-end code.
const CLOUD_NAME = "hprslzfg";
const UPLOAD_PRESET = "portfolio_unsigned";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(
      (err && err.error && err.error.message) ||
        `Cloudinary upload failed (${res.status})`
    );
  }

  const data = await res.json();
  return data.secure_url;
}
