// flow-typed signature: 1b4fdeebaab7d5b76d2544db354b7f3a
// flow-typed version: baac52f05b/base64-arraybuffer_v1.x.x/flow_>=v0.83.x

declare module 'base64-arraybuffer' {
  declare function encode(arraybuffer: ArrayBuffer): string;

  declare function decode(base64: string): ArrayBuffer;
}
