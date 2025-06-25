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

const identityServiceUrl: string = import.meta.env.VITE_IDENTITY_SERVICE_URL;
const resourceApiUrl: string = import.meta.env.VITE_RESOURCE_API_URL;
const pApiUrl: string = import.meta.env.VITE_P_API_URL;
const isDevelopment: boolean = import.meta.env.MODE === "development";

const AuthenticationService = {
  initSubjects() {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "{}"
    ) as UserProfileDetail;
    return { currentUser };
  },

  get appId(): string {
    const appId = import.meta.env.VITE_APP_ID || "http://localhost:4200";
    // Fallback to 4200 if 9008 causes issues, to match potential server config
    return "http://localhost:4200";
  },

  isUserNameExists(username: string): Promise<Message> {
    console.log("Requesting isUserNameExists:", `${pApiUrl}/isUsernameExists?username=${username}`);
    return axios
      .get<Message>(`${pApiUrl  }/isUsernameExists?username=${username}`)
      .then((response) => ({
        ...response.data,
        message: response.data.message === "true",
      }))
      .catch((error) => {
        console.error("Error in isUserNameExists:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw new Error("Failed to check username existence");
      });
  },

  // accessToken(code: string, code_verifier: string): Promise<TokenDetails> {
  //   console.log("AccessToken Request:", {
  //     code,
  //     code_verifier,
  //     redirect_uri: "http://localhost:4200",
  //   });
  //   return axios
  //     .post<TokenDetails>(`${identityServiceUrl}/auth/token`, {
  //       code,
  //       code_verifier,
  //       redirect_uri: "http://localhost:4200",
  //     })
  //     .then((response) => {
  //       console.log("AccessToken Response:", response.data);
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.error("AccessToken Error:", {
  //         status: error.response?.status,
  //         data: error.response?.data,
  //         message: error.message,
  //       });
  //       throw new Error("Failed to obtain access token");
  //     });
  // },
 async accessToken(code: string, code_verifier: string): Promise<TokenDetails> {
    try {
      const response = await axios.post<TokenDetails>(
        `${identityServiceUrl}/auth/token`,
        {
          code,
          code_verifier,
          redirect_uri: "http://localhost:4200",
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("AccessToken Error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw new Error("Failed to obtain access token");
    }
  },

//   accesssToken(code: string, code_verifier: string): Promise<TokenDetails> {
//   const redirectUri = "http://localhost:4200";
//   const clientId = "07bfba60-bbc5-42f1-994d-dc17db71b873";

//   const params = new URLSearchParams();
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", redirectUri);
//   params.append("code_verifier", code_verifier);
//   params.append("client_id", clientId);

//   return axios
//     .post<TokenDetails>(`${identityServiceUrl}/auth/token`, params.toString(), {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//     .then((response) => {
//       console.log("✅ AccessToken Response:", response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.error("❌ AccessToken Error:", {
//         status: error.response?.status,
//         headers: error.response?.headers,
//         data: error.response?.data,
//         message: error.message,
//       });
//       throw new Error("Failed to obtain access token");
//     });
// }
// ,
  refreshToken(tokenDetails: TokenDetails): Promise<TokenDetails> {
    return axios
      .post<TokenDetails>(`${identityServiceUrl}/auth/refresh`, {
        refresh_token: tokenDetails.refresh_token,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("RefreshToken Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
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

  removeCurrentUserValue(): void {
    localStorage.removeItem("currentUser");
  },

  getCurrentUserToken(): TokenDetails | null {
    return JSON.parse(
      localStorage.getItem("tokenDetails") || "{}"
    ) as TokenDetails;
  },

  setCurrentUserToken(tokenDetails: TokenDetails): void {
    localStorage.setItem("tokenDetails", JSON.stringify(tokenDetails));
  },

  removeUserToken(): void {
    localStorage.removeItem("tokenDetails");
  },

  userDetails(username?: string): Promise<UserProfileDetail | null> {
  if (!username) username = AuthenticationService.getCurrentUserValue()?.userName;
  const token = AuthenticationService.getCurrentUserToken()?.access_token;

  if (username && token) {
    console.log(username);
    return axios
      .get<UserProfileDetail>(`${pApiUrl}/private/users/username?username=${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        AuthenticationService.setCurrentUserValue(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("UserDetails Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        throw new Error("Failed to fetch user details");
      });
  }

  return Promise.resolve(null);
},

  initiateAuthFlow(userName: string): void {
    const codeVerifier = this.generateRandomString();
    const clientChallenge = this.generateCodeChallenge(codeVerifier);
    const clientState = this.generateRandomString(32);
    const nonce = this.generateRandomString(10);
    const scope = "openid api.read api.write";
    const url = identityServiceUrl.replace("8082", "9000");

    localStorage.setItem("codeVerifier", codeVerifier);
    localStorage.setItem("username", userName);
    console.log("Stored in localStorage:", { codeVerifier, username: userName });

    const authorizationUrl = `${url}/oauth2/authorize?client_id=oidc-client&redirect_uri=${this.appId}&scope=${scope}&response_type=code&response_mode=query&code_challenge_method=S256&code_challenge=${clientChallenge}&state=${clientState}&nonce=${nonce}`;
    console.log("React Auth URL:", authorizationUrl);
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
    const challenge = CryptoJS.SHA256(codeVerifier)
      .toString(CryptoJS.enc.Base64)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
    console.log("codeVerifier:", codeVerifier, "codeChallenge:", challenge);
    return challenge;
  },

  removeVerifier(): void {
    localStorage.removeItem("codeVerifier");
    localStorage.removeItem("username");
  },

  removeUserDetails(): void {
    this.removeCurrentUserValue();
    this.removeUserToken();
    this.removeVerifier();
  },

  registerUser(userPayload: RegisterUserDetail): Promise<any> {
    return axios
      .post(`${pApiUrl}/register`, userPayload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("RegisterUser Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
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
        console.error("UpdatePassword Error:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
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