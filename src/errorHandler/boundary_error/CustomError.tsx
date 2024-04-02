/**
 * CustomError class extends the built-in Error class to create custom error objects with an additional 'type' property.
 */
export class CustomError extends Error {
  type: string;

  constructor(type: string, message: string) {
    super(message);
    this.type = type;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default CustomError;
