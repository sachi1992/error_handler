export class CustomError extends Error {
  type: string

  constructor(type: string, message: string) {
    super(message)
    this.type = type
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export default CustomError
