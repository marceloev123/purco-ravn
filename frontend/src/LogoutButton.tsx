import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/session";
import { getJWT } from "getJWT";

export default function LogoutButton() {
  const sessionContext = useSessionContext();
  const navigate = useNavigate();

  getJWT();

  async function logoutClicked() {
    await signOut();
    navigate("/auth");
  }

  if (sessionContext.loading === true) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        height: "70px",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: "75px",
        paddingRight: "75px",
      }}
    >
      <div
        onClick={logoutClicked}
        style={{
          display: "flex",
          width: "116px",
          height: "42px",
          backgroundColor: "#000000",
          borderRadius: "10px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          fontWeight: "bold",
        }}
      >
        SIGN OUT
      </div>
    </div>
  );
}
