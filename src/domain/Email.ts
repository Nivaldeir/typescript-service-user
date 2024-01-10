export class Email {
  value: string
  constructor(value: string) {
    if (this.#isValid()) throw new Error("Email_not_valid")
    this.value = value
  }
  #isValid() {
    return String(this.value).toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}