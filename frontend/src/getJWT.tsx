import Session from "supertokens-auth-react/recipe/session";

export async function getJWT() {
  if (await Session.doesSessionExist()) {
    const userId = await Session.getUserId();
    const jwt = (await Session.getAccessTokenPayloadSecurely()).jwt;
    console.log("userId", userId);
    console.log("jwt", jwt);
  }
}
