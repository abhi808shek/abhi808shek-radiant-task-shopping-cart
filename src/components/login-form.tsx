import { FormEvent, MouseEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Import Lucide icons
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/services/apis/login.api";
import { useNavigate } from "react-router-dom";
import { customLocalStorage } from "@/utils/customLocalStorage";

interface LoginResponse {
  token: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // 👁️ Toggle password visibility
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email.");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setLoading(true);
      const response = await login({ email, password });

      if (!response.data || !response.data.token) {
        setEmailError("Invalid email or password.");
        return;
      }

      const { token }: LoginResponse = response.data;
      customLocalStorage.setData("token", token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome To Radiant Infonet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                {/* Email Input */}
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm">{emailError}</p>
                  )}
                </div>

                {/* Password Input with Show/Hide Toggle */}
                <div className="grid gap-3 relative">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={passwordError ? "border-red-500" : ""}
                    />
                    {/* Show/Hide Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-red-500 text-sm">{passwordError}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
