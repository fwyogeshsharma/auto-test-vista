import { useEffect, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import AuthenticationService from "@/services/AuthenticationService";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({ username: "" });
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [returnUrl, setReturnUrl] = useState("/dashboard");

  useEffect(() => {
    AuthenticationService.removeUserDetails();
    localStorage.setItem("logout-event", "logout" + Math.random());

    const params = new URLSearchParams(location.search);
    const ret = params.get("returnUrl");
    if (ret) setReturnUrl(decodeURIComponent(ret));
  }, [location]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setShowProgressBar(true);
    setInvalidLogin(false);

    if (!credentials.username.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username is required",
      });
      setShowProgressBar(false);
      return;
    }

    try {
      const response = await AuthenticationService.isUserNameExists(credentials.username);
      if (response.message) {
        AuthenticationService.initiateAuthFlow(credentials.username);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid username",
        });
        setCredentials({ username: "" });
        setInvalidLogin(true);
        setShowProgressBar(false);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login",
      });
      setShowProgressBar(false);
      setInvalidLogin(true);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setShowProgressBar(true);

    try {
      const response = await AuthenticationService.isUserNameExists(registerForm.username);
      if (response.message) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Username already exists",
        });
        setShowProgressBar(false);
      } else {
        await AuthenticationService.registerUser(registerForm);
        AuthenticationService.initiateAuthFlow(registerForm.username);
        toast({
          title: "Success",
          description: "Registration successful! Initiating login...",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required",
      });
      setShowProgressBar(false);
    }
  };

  const handlePassChange = () => {
    navigate("/forgot-password");
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex ${isLogin ? "flex-row" : "flex-row-reverse"} items-center justify-center p-4 h-[78vh]`}>
      {/* Hero Image */}
      <div className="flex-[0.6] flex justify-center items-center m-[3%]">
        <motion.div
          className="w-full max-w-lg order-1 lg:order-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src="img/hero-img.png" className="w-full h-auto" alt="Hero" />
        </motion.div>
      </div>

      {/* Auth Card */}
      <div className="flex-[0.4] bg-gradient-to-b from-[#fbfcfd] to-white p-6 rounded-lg shadow-xl">
        {showProgressBar && (
          <>
            <div className="h-1 bg-blue-100 rounded overflow-hidden mb-4">
              <div className="h-full bg-blue-600 animate-pulse w-full" />
            </div>
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-bounce" />
            </div>
          </>
        )}

        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 p-0 h-auto text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">PT</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Pintailer</h1>
            <p className="text-gray-600 mt-2">
              {isLogin ? "Sign in to your PinTailer account" : "Register to get started"}
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              {isLogin ? "Login" : "Register"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    onKeyUp={(e) => e.key === "Enter" && handleLogin(e)}
                    required
                  />
                </div>

                {invalidLogin && (
                  <p className="text-red-500 text-sm">Invalid username. Please try again.</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!credentials.username.trim()}
                >
                  Sign In
                </Button>

                <div className="text-sm text-center mt-2">
                  <p
                    onClick={handlePassChange}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Forgot Password?
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    New user?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign Up
                    </Button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={registerForm.firstName}
                      onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={registerForm.lastName}
                      onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    value={registerForm.phoneNumber}
                    onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                  <p
                    className="text-sm text-gray-600 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Already a user? Log In
                  </p>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
