import { Buffer } from "buffer";

// Make Buffer available globally
if (typeof window !== "undefined") {
  window.Buffer = Buffer;
}
if (typeof global !== "undefined") {
  global.Buffer = Buffer;
}
if (typeof globalThis !== "undefined") {
  globalThis.Buffer = Buffer;
}

export default Buffer;

