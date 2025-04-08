const workerCode = `
self.onmessage = async (event) => {
  const { id, pngSrc } = event.data;

  try {
    const res = await fetch(pngSrc);
    if (!res.ok) throw new Error("❌ Fetch failed with status " + res.status);
    const blob = await res.blob();

    const bitmap = await createImageBitmap(blob);
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx){
      self.postMessage({id, error : "Canvas context not supported"});
      return;
    }

    ctx.drawImage(bitmap, 0, 0);
    const webpBlob = await canvas.convertToBlob({
      type: "image/webp",
      quality: 0.8
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      const webpDataURL = reader.result;
      self.postMessage({id, webpUrl: webpDataURL});
    };
    reader.onerror = (err) => {
      self.postMessage({ id, error: "FileReader error" });
    };
    reader.readAsDataURL(webpBlob);

  } catch (error) {
    self.postMessage({ id, error: error.message });
  }
};
`;

export default workerCode;