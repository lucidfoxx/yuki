let quality = "low";

export function getQuality() {
  return quality;
}

export function autoDetectQuality() {
  const cores = navigator.hardwareConcurrency || 4;

  if (cores <= 4) quality = "low";
  else if (cores <= 8) quality = "medium";
  else quality = "high";

  console.log("Quality:", quality);
}
