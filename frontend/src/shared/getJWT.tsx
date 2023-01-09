import Session from "supertokens-auth-react/recipe/session";

export async function getJWT() {
  if (await Session.doesSessionExist()) {
    const jwt = (await Session.getAccessTokenPayloadSecurely()).jwt;
    return jwt;
  }
  return undefined;
}
