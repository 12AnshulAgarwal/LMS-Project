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
import { useState } from "react";

const login = () => {
  const [signupInput, setSignup] = useState({
    username: "",
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
    await action(inputData);
  };

  return (
    <div className="flex items-center w-full justify-center">
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
                <Label htmlFor="username">Name</Label>
                <Input
                  type="text"
                  name="username"
                  value={signupInput.username}
                  onChange={(e) => changeinputhandler(e, "signupInput")}
                  placeholder="anshul"
                  required={true}
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
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password}
                  type="password"
                  onChange={(e) => changeinputhandler(e, "signupInput")}
                  placeholder="xyz"
                  required={true}
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
                <Label htmlFor="username">Email</Label>
                <Input
                  name="email"
                  value={signinInput.email}
                  type="email"
                  onChange={(e) => changeinputhandler(e, "signinInput")}
                  placeholder="anshul@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  name="password"
                  value={signinInput.password}
                  type="password"
                  onChange={(e) => changeinputhandler(e, "signinInput")}
                  placeholder="xyz"
                  required={true}
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
export default login;
