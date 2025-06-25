import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth-context';

const Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    accessToken,
    setCurrentUserToken,
    userDetails,
    removeVerifier,
    removeCurrentUserValue,
    removeUserToken,
  } = useAuth();

  const [isProcessing, setIsProcessing] = useState(false); // ✅ prevent duplicate call

  useEffect(() => {
    const code = searchParams.get('code');
    const codeVerifier = localStorage.getItem('codeVerifier');
    const username = localStorage.getItem('username');

    if (!code || !codeVerifier || isProcessing) {
      return;
    }

    setIsProcessing(true); // ✅ Lock the effect

    const initAccessToken = async () => {
      try {
        console.log("Calling accessToken with:", code, codeVerifier);
        const tokenResponse = await accessToken(code, codeVerifier);
        console.log("Received tokenResponse:", tokenResponse);
        setCurrentUserToken(tokenResponse);

        if (username) {
          const user = await userDetails(username);
          console.log("User details fetched:", user);
        }

        removeVerifier();
        navigate('/dashBoard');
      } catch (error) {
        console.error("Callback error:", error);
        removeVerifier();
        removeUserToken();
        removeCurrentUserValue();
        navigate('/login');
      }
    };

    initAccessToken();
  }, [
    searchParams,
    accessToken,
    setCurrentUserToken,
    userDetails,
    navigate,
    removeVerifier,
    removeUserToken,
    removeCurrentUserValue,
    isProcessing
  ]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 py-20 px-4">
      <Card className="max-w-md p-6 shadow-md bg-white text-center">
        <CardContent className="text-gray-600">Processing login...</CardContent>
      </Card>
    </section>
  );
};

export default Callback;
