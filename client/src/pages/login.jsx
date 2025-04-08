import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";


const Login = () => {
  const navigate=useNavigate();
  const [signupInput, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [signinInput, setSignin] = useState({ email: "", password: "" });
  const [
    registerUser,
    {
      data: registeredData,
      error: registeredError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  function changeinputhandler(event, type) {
    const { name, value } = event.target;
    if (type === "signupInput") {
      setSignup({ ...signupInput, [name]: value });
    } else {
      setSignin({ ...signinInput, [name]: value });
    }
  }

  const handleRegistration = async (type) => {
    const inputData = type === "signupInput" ? signupInput : signinInput;
    const action = type === "signupInput" ? registerUser : loginUser;
    await action(inputData); // Unwrapping to handle possible errors better
  };
  useEffect(() => {
    if (registerIsSuccess && registeredData) {
      toast.success(registeredData.message || "Signup Succesfully");
    }
    if (registeredError) {
      toast.error(registeredError?.data?.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "login Succesfully");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginError,
    registeredError,
    loginData,
    registeredData,
  ]);

  return (
    <div className="flex items-center w-full justify-center mt-16">
      <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="signin">Signin</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeinputhandler(e, "signupInput")}
                  placeholder="anshul"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeinputhandler(e, "signupInput")}
                  placeholder="anshul@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  type="password"
                  onChange={(e) => changeinputhandler(e, "signupInput")}
                  placeholder="xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signupInput")}>
                SignUp
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <CardTitle>Signin</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Email</Label>
                <Input
                  name="email"
                  value={signinInput.email}
                  type="email"
                  onChange={(e) => changeinputhandler(e, "signinInput")}
                  placeholder="anshul@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">Password</Label>
                <Input
                  name="password"
                  value={signinInput.password}
                  type="password"
                  onChange={(e) => changeinputhandler(e, "signinInput")}
                  placeholder="xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signinInput")}>
                SignIn
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
