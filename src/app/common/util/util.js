export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// return the file extension
export function getFileExtension(fileName) {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
}
