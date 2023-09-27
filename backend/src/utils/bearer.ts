export function getBearerToken(bearerString: string) {
  const [bearer, token] = bearerString.split(" ");
  if (bearer !== "Bearer") throw new Error("This is not a bearer token");
  if (!token) throw new Error("Token is empty");
  return token;
}
