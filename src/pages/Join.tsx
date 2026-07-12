import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/Card";
import { supabase } from "../lib/supabase";

const joinSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  role: z.enum(["Web Engineer", "Growth Partner", "Client"]),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  gpayNumber: z.string().optional(),
});

type JoinFormValues = z.infer<typeof joinSchema>;

export function Join() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      role: "Client",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: JoinFormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      // 1. Create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          }
        }
      });

      if (authError) throw authError;

      // 2. Insert into the public.users table (Pending status by default)
      if (authData.user) {
        const { error: dbError } = await supabase.from('users').insert([
          {
            id: authData.user.id,
            email: data.email,
            name: data.fullName,
            role: data.role,
            gpay_number: data.role !== 'Client' ? data.gpayNumber : null,
            status: "Pending" // Explicitly pending
          }
        ]);

        if (dbError) throw dbError;
      }

      setIsSubmitted(true);
    } catch (error: any) {
      setErrorMsg(error.message || "An error occurred during sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-growbroo-500/20 text-growbroo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <CardTitle>Application Received</CardTitle>
            <CardDescription>Your application is currently under review. You will receive access after approval.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={() => window.location.href = '/'}>Return Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Join Growbroo<span className="text-growbroo-500">.</span></h1>
          <p className="text-gray-400">Fill out the form below to continue.</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm text-center">
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <Input {...register("fullName")} placeholder="John Doe" />
                {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <Input {...register("email")} type="email" placeholder="john@example.com" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Input {...register("password")} type="password" placeholder="Create a strong password" />
                {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Phone (Optional)</label>
                  <Input {...register("phone")} placeholder="+1..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Role</label>
                  <select 
                    {...register("role")}
                    className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-growbroo-500"
                  >
                    <option value="Client">Client</option>
                    <option value="Web Engineer">Web Engineer</option>
                    <option value="Growth Partner">Growth Partner</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Portfolio Link (Optional)</label>
                <Input {...register("portfolio")} placeholder="https://..." />
                {errors.portfolio && <p className="text-xs text-red-500">{errors.portfolio.message}</p>}
              </div>

              {(selectedRole === "Web Engineer" || selectedRole === "Growth Partner") && (
                <div className="space-y-2 border-t border-border mt-4 pt-4">
                  <label className="text-sm font-medium text-growbroo-400">GPay / UPI Transaction Number (Required for Payouts)</label>
                  <Input {...register("gpayNumber")} placeholder="Enter your GPay or UPI number" required />
                  <p className="text-xs text-gray-400">We need this to pay you for your work!</p>
                </div>
              )}

              <Button type="submit" className="w-full mt-2" variant="premium" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
