declare module '*.did' {
  const IDL: any;
  export { IDL };
  export default IDL;
}

declare module '*.did.js' {
  const IDL: any;
  export { IDL };
  export default IDL;
}

declare module '*.did.d.ts' {
  const _SERVICE: any;
  export { _SERVICE };
  export default _SERVICE;
}
