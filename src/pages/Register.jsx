import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/features/auth/authThunk";
import { clearError } from "@/features/auth/authSlice";

// -------------------- ZOD VALIDATION --------------------
const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required.")
      .min(2, "First name must be at least 2 characters."),
    lastName: z
      .string()
      .min(1, "Last name is required.")
      .min(2, "Last name must be at least 2 characters."),
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// =======================================================
//                     REGISTER COMPONENT
// =======================================================
const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch all form values at once to avoid multiple re-renders
  const formValues = watch();

  // Memoize form validation to prevent unnecessary re-renders
  const isFormValid = useMemo(() => {
    return (
      isValid &&
      formValues.firstName &&
      formValues.lastName &&
      formValues.email &&
      formValues.password &&
      formValues.confirmPassword
    );
  }, [isValid, formValues.firstName, formValues.lastName, formValues.email, formValues.password, formValues.confirmPassword]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(clearError());

    const result = await dispatch(
      registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      })
    );

    if (registerUser.fulfilled.match(result)) {
      toast({
        title: "Success",
        description: "Account created successfully! A verification email has been sent to your inbox.",
      });
      navigate("/");
    } else {
      toast({
        title: "Registration Failed",
        description: result.payload || "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen min-h-screen">
      {/* ====================== MOBILE ====================== */}
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

        {/* Header */}
        <div className="relative px-4 pt-4 pb-2 flex items-center justify-between z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white bg-black/50 backdrop-blur px-3 py-2 rounded-full"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <h2 className="text-xl font-bold text-white">Salon16</h2>
        </div>

        {/* Form section */}
        <div className="flex-1 flex flex-col justify-end px-4 pb-10 relative z-20" style={{ pointerEvents: 'auto' }}>
          <div className="w-full max-w-lg mx-auto" style={{ pointerEvents: 'auto' }}>
            <Card style={{ pointerEvents: 'auto' }}>
              <CardHeader>
                <CardTitle className="text-3xl">Create Account</CardTitle>
                <CardDescription>
                  Sign up to start your Salon16 experience
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-4">
                  {/* FIRST NAME */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          {...field}
                          disabled={isLoading}
                          className={errors.firstName ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* LAST NAME */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          {...field}
                          disabled={isLoading}
                          className={errors.lastName ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

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
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className={errors.confirmPassword ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword.message}
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
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>

      {/* ====================== DESKTOP ====================== */}
      <div className="hidden lg:flex h-full">
        <div className="w-3/5 relative">
          <img
            src={authImage}
            alt="Salon16"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/40 to-black/60" />
        </div>

        <div className="w-2/5 flex items-center justify-center bg-background px-8">
          <div className="w-full max-w-md">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">Create Account</CardTitle>
                <CardDescription>
                  Sign up to start your Salon16 experience
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName-desktop">First Name</Label>
                      <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="firstName-desktop"
                            type="text"
                            placeholder="John"
                            {...field}
                            disabled={isLoading}
                            className={errors.firstName ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName-desktop">Last Name</Label>
                      <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="lastName-desktop"
                            type="text"
                            placeholder="Doe"
                            {...field}
                            disabled={isLoading}
                            className={errors.lastName ? "border-destructive" : ""}
                          />
                        )}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

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
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

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
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword-desktop">Confirm Password</Label>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="confirmPassword-desktop"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          disabled={isLoading}
                          className={errors.confirmPassword ? "border-destructive" : ""}
                        />
                      )}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">
                        {errors.confirmPassword.message}
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
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
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

export default Register;
