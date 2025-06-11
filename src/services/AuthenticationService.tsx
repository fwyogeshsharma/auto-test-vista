import axios from "axios";
import * as CryptoJS from "crypto-js";

interface UserProfileDetail {
  userName: string;
  [key: string]: any;
}

interface TokenDetails {
  access_token: string;
  refresh_token: string;
  [key: string]: any;
}

interface Message {
  message: boolean | string;
}

interface RegisterUserDetail {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phoneNumber: string;
}

// Safely access environment variables with fallbacks
const identityServiceUrl: string = import.meta.env.VITE_IDENTITY_SERVICE_URL;
const resourceApiUrl: string = import.meta.env.VITE_RESOURCE_API_URL;
const pApiUrl: string = import.meta.env.VITE_P_API_URL;
const appId: string =
  import.meta.env.VITE_APP_ID ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:4200"
    : "http://localhost:9008");


const AuthenticationService = {
  initSubjects() {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    ) as UserProfileDetail;
    return { currentUser };
  },

  isUserNameExists(username: string): Promise<Message> {
    return axios
      .get<Message>(`${pApiUrl}/isUsernameExists?username=${username}`)
      .then((response) => ({
        ...response.data,
        message: response.data.message === "true",
      }))
      .catch((error) => {
        throw new Error("Failed to check username existence");
      });
  },

  accessToken(code: string, code_verifier: string): Promise<TokenDetails> {
    return axios
      .post<TokenDetails>(`${identityServiceUrl}/auth/token`, {
        code,
        code_verifier,
        redirect_uri: appId,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Failed to obtain access token");
      });
  },

  refreshToken(tokenDetails: TokenDetails): Promise<TokenDetails> {
    return axios
      .post<TokenDetails>(`${identityServiceUrl}/auth/refresh`, {
        refresh_token: tokenDetails.refresh_token,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Failed to refresh token");
      });
  },

  logout() {
    const currentUser = this.getCurrentUserValue();
    if (currentUser) {
      const url = identityServiceUrl.replace("8082", "9000");
      const authorizationUrl = `${url}/oauth/logout`;
      window.location.href = authorizationUrl;
    }
    this.removeUserDetails();
  },

  getCurrentUserValue(): UserProfileDetail | null {
    return JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    ) as UserProfileDetail;
  },

  setCurrentUserValue(userDetails: UserProfileDetail): void {
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
  },

  getCurrentUserToken(): TokenDetails | null {
    return JSON.parse(
      localStorage.getItem("tokenDetails") || "{}"
    ) as TokenDetails;
  },

  setCurrentUserToken(tokenDetails: TokenDetails): void {
    localStorage.setItem("tokenDetails", JSON.stringify(tokenDetails));
  },

  userDetails(username?: string): Promise<UserProfileDetail | null> {
    if (!username) username = this.getCurrentUserValue()?.userName;
    if (username) {
      return axios
        .get<UserProfileDetail>(`${resourceApiUrl}/users/username?username=${username}`)
        .then((response) => {
          this.setCurrentUserValue(response.data);
          return response.data;
        })
        .catch((error) => {
          throw new Error("Failed to fetch user details");
        });
    }
    return Promise.resolve(null);
  },

  initiateAuthFlow(userName: string): void {
    const codeVerifier = this.generateRandomString();
    const clientChallenge = this.generateCodeChallenge(codeVerifier);
    const clientState = this.generateRandomString(10);
    const nonce = this.generateRandomString(10);
    const scope = "openid api.read api.write";
    const url = identityServiceUrl.replace("8082", "9000");

    localStorage.setItem("codeVerifier", codeVerifier);
    localStorage.setItem("username", userName);

    
    const authorizationUrl = `${url}/oauth2/authorize?client_id=oidc-client&redirect_uri=${appId}&scope=${scope}&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${clientChallenge}&state=${clientState}&nonce=${nonce}`;
    console.log(authorizationUrl)
    return
    window.location.href = authorizationUrl;
  },

  generateRandomString(
    len: number = 128,
    charSet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  ): string {
    let randomString = "";
    for (let i = 0; i < len; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
  },

  generateCodeChallenge(codeVerifier: string): string {
    return CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  },

  removeUserDetails(): void {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("tokenDetails");
    localStorage.removeItem("codeVerifier");
    localStorage.removeItem("username");
  },

  registerUser(userPayload: RegisterUserDetail): Promise<any> {
    return axios
      .post(`${pApiUrl}/register`, userPayload, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Failed to register user");
      });
  },

  updatePassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ): Promise<Message> {
    return axios
      .post<Message>(
        `${resourceApiUrl}/users/updateUserPassword?username=${username}&oldPassword=${oldPassword}&newPassword=${newPassword}`
      )
      .then((response) => response.data)
      .catch((error) => {
        throw new Error("Failed to update password");
      });
  },

  startStorageEvent(): void {
    window.addEventListener("storage", (event) => {
      if (event.storageArea === localStorage) {
        const token = localStorage.getItem("tokenDetails");
        if (!token) {
          this.logout();
        }
      }
    });
  },
};

export default AuthenticationService;