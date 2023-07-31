import React from "react";
import { ZodType, z } from "zod";
import "./App.css";
import { FormData } from "./type";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const schema: ZodType<FormData> = z
    .object({
      firstName: z.string().min(2).max(30),
      lastName: z.string().min(2).max(30),
      age: z.number().min(18).max(100),
      email: z.string().email(),
      password: z.string().min(5).max(20),
      confirmPassword: z.string().min(5).max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
        <label>First name</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <label>Last name</label>
        <input type="text" {...register("lastName")} />
        <label>Age</label>
        <input type="number" {...register("age", { valueAsNumber: true })} />
        <label>Email</label>
        <input type="email" {...register("email")} />
        <label>Password</label>
        <input type="password" {...register("password")} />
        <label>Confirm Password</label>
        <input type="password" {...register("confirmPassword")} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
