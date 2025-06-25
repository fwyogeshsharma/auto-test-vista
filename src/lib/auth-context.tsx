import React, { createContext, useContext, useState } from "react";
import AuthenticationService from "@/services/AuthenticationService";

const AuthContext = createContext({
  accessToken: AuthenticationService.accessToken,
  setCurrentUserToken: AuthenticationService.setCurrentUserToken,
  userDetails: AuthenticationService.userDetails,
  removeVerifier: AuthenticationService.removeVerifier,
  removeCurrentUserValue: AuthenticationService.removeCurrentUserValue,
  removeUserToken: AuthenticationService.removeUserToken,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider
      value={{
        accessToken: AuthenticationService.accessToken,
        setCurrentUserToken: AuthenticationService.setCurrentUserToken,
        userDetails: AuthenticationService.userDetails,
        removeVerifier: AuthenticationService.removeVerifier,
        removeCurrentUserValue: AuthenticationService.removeCurrentUserValue,
        removeUserToken: AuthenticationService.removeUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);