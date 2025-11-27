const CLOUD_NAME = "dp368vdzh"; 
const UPLOAD_PRESET = "reddit_clone_preset"; 

const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
   const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

   const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error.message);
    }

    return {
      url: data.secure_url,
      type: data.resource_type 
    };

  } catch (error) {
    console.error("Upload Failed:", error);
    throw error;
  }
};

export default uploadToCloudinary;