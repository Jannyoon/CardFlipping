// types/worker.d.ts
declare module '*.worker.js' {
  const WebWorker: new () => Worker;
  export default WebWorker;
}