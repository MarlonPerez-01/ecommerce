export interface JwtAccessPayload {
  sub: number;
  correo: string;
  nombre: string;
  iat: number;
  exp: number;
}
