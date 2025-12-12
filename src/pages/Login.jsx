import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import authImage from "@/assets/auth_screen_2.png";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/features/auth/authThunk";
import { clearError } from "@/features/auth/authSlice";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch all form values at once to avoid multiple re-renders
  const formValues = watch();

  // Memoize form validation to prevent unnecessary re-renders
  const isFormValid = useMemo(() => {
    return isValid && formValues.email && formValues.password;
  }, [isValid, formValues.email, formValues.password]);

  // Clear Redux error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect on successful login
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
      toast({
        title: "Success",
        description: "Logged in successfully!",
      });
    }
  }, [user, navigate, toast, isLoading]);

  const onSubmit = async (data) => {
    dispatch(clearError());
    const result = await dispatch(loginUser({ email: data.email, password: data.password }));
    
    if (loginUser.fulfilled.match(result)) {
      // Success - redirect will be handled by useEffect watching user state
      // No need to navigate here as useEffect will handle it
    } else if (loginUser.rejected.match(result)) {
      // Error - show error message
      toast({
        title: "Login Failed",
        description: result.payload || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen min-h-screen">
      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col h-full relative">
        {/* Mobile full-screen image background */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src={authImage}
            alt="Salon16"
            className="w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />
        </div>

        <div className="relative px-4 pt-4 pb-2 flex items-center justify-between z-10">
          <Link to="/" className="flex items-center gap-2 text-sm text-white bg-black/50 backdrop-blur px-3 py-2 rounded-full">
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="text-right">
            <h2 className="text-xl font-bold text-white">Salon16</h2>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-end px-4 pb-10 relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="w-full max-w-lg mx-auto" style={{ pointerEvents: 'auto' }}>
            <Card style={{ pointerEvents: 'auto' }}>
              <CardHeader>
                <CardTitle className="text-3xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to continue your Salon16 experience
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-4">
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          disabled={isLoading}
                          className={errors.email ? "border-destructive" : ""}
                          autoComplete="email"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className={errors.password ? "border-destructive" : ""}
                          autoComplete="current-password"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop / large layout */}
      <div className="hidden lg:flex h-full">
        {/* Image: 3/5 of screen */}
        <div className="w-3/5 relative">
          <img
            src={authImage}
            alt="Salon16"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/60" />
        </div>

        {/* Form: 2/5 of screen */}
        <div className="w-2/5 flex items-center justify-center bg-background px-8">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to continue your Salon16 experience
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-4">
                  {/* EMAIL */}
                  <div className="space-y-2">
                    <Label htmlFor="email-desktop">Email</Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="email-desktop"
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          disabled={isLoading}
                          className={errors.email ? "border-destructive" : ""}
                          autoComplete="email"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* PASSWORD */}
                  <div className="space-y-2">
                    <Label htmlFor="password-desktop">Password</Label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="password-desktop"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className={errors.password ? "border-destructive" : ""}
                          autoComplete="current-password"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Sign up
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

