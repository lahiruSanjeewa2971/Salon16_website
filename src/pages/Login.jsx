import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
// import authImage from "@/assets/auth_screen.png";
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
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange", // Validate on change for real-time validation
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Watch form values to check if form is valid
  const emailValue = watch("email");
  const passwordValue = watch("password");

  // Check if form is valid (all fields pass validation)
  const isFormValid = isValid && emailValue && passwordValue;

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
    <div className="h-screen min-h-screen bg-background overflow-hidden">
      {/* Mobile layout */}
      <div className="lg:hidden flex flex-col h-full relative">
        {/* Mobile full-screen image background */}
        <div className="absolute inset-0">
          <img
            src={authImage}
            alt="Salon16"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80" />
        </div>

        <div className="relative z-20 px-4 pt-4 pb-2 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-smooth bg-background/80 backdrop-blur px-3 py-2 rounded-full shadow-elegant"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="text-right">
            <h2 className="text-xl font-bold text-foreground">Salon16</h2>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-8 pb-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg mx-auto"
          >
            <Card className="shadow-elegant border-border/60 bg-background/90 backdrop-blur">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                <CardDescription>
                  Sign in to continue your Salon16 experience
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      disabled={isLoading}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      disabled={isLoading}
                      className={errors.password ? "border-destructive" : ""}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button
                    type="submit"
                    className="w-full gradient-primary text-white"
                    disabled={!isFormValid || isLoading}
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
          </motion.div>
        </div>
      </div>

      {/* Desktop / large layout */}
      <div className="hidden lg:block h-full">
        <div className="relative h-full w-full overflow-hidden">
          {/* Image: 4/5 of screen */}
          {/* <div className="absolute inset-y-0 left-0 w-[80vw]"> */}
          <div className="absolute inset-y-0 left-0 w-[58vw]">
            <img
              src={authImage}
              alt="Salon16"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-background/30 to-background/60" />
          </div>

          {/* Form: overlaps image by ~1/3 of image, extends into remaining 1/5 */}
          <div className="absolute inset-y-0 right-0 flex items-center justify-center pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-[45vw] max-w-xl"
              style={{ marginLeft: '-26vw' }} // overlap roughly 1/3 of the 80vw image
            >
              <Card className="shadow-elegant border-border/60 bg-background/90 backdrop-blur">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to continue your Salon16 experience
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email-desktop">Email</Label>
                      <Input
                        id="email-desktop"
                        type="email"
                        placeholder="you@example.com"
                        {...register("email")}
                        disabled={isLoading}
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password-desktop">Password</Label>
                      <Input
                        id="password-desktop"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                        disabled={isLoading}
                        className={errors.password ? "border-destructive" : ""}
                      />
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button
                      type="submit"
                      className="w-full gradient-primary text-white"
                      disabled={!isFormValid || isLoading}
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
            </motion.div>
          </div>

          {/* Brand card on image lower-left
          <div className="absolute bottom-10 left-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-background/70 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-elegant max-w-md"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Salon16</h2>
            </motion.div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;

