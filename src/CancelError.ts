export class CancelError extends Error {
  constructor() {
    super("The cooperation was canceled.");
    this.name = "CancelError";
  }
}
