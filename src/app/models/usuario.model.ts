

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password: string,
    // Una vez se pone un parámetro opcional, todos los demás también son opcionales
    public img?: string,
    public role?: string,
    public google?: boolean,
    public _id?: string
  ) {

  }
}
