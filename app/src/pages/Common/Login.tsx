
import { Button } from '@/components/ui/button';
import { FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner"
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  usernameOrEmail: z.string().trim().min(1, {
    message: "Tên tài khoản hoặc email không được để trống"
  }),
  password: z.string().trim().min(1,{
    message: "Mật khẩu không được để trống"
  }),
})


function Login() {
  const [loginLoading, setLoginLoading] = useState<Boolean>(false);
  const [googleloginLoading, setGoogleLoginLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    }
  })

  const onLogin = ({usernameOrEmail, password}: z.infer<typeof loginSchema>) => {
    setLoginLoading(true);
    if(usernameOrEmail === "abc" && password === "abc"){
      setTimeout(function(){
      setLoginLoading(false)
      toast.success("Đăng nhập thành công!");
    }, 2000);
      setTimeout(function(){
      navigate("/admin/dashboard")
    }, 3000);
    }else{
      toast.error("Sai tài khoản hoặc mật khẩu, vui lòng thử lại!")
      setLoginLoading(false)
      console.log("✅ Data:", usernameOrEmail, password)
    }
    
  }
  

  function handleGoogleLogin(){
    setGoogleLoginLoading(true);
    setTimeout(function(){
      setGoogleLoginLoading(false)
      toast.success("Đăng nhập thành công!");
    }, 2000);
  }

  return (
    <div className="flex flex-col flex-grow">
      <div className="w-full min-h-50 text-center  mt-5 flex flex-col justify-center items-center place-content-around gap-9">
        <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
          Hệ thống quản trị PawShelter
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Vui lòng đăng nhập để quản trị hệ thống
        </p>
      </div>

      {/* Phần còn lại: căn giữa card */}
      <div className="flex justify-center items-center bg-background px-4">
        <Card className="w-full max-w-sm shadow-lg">
          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onLogin)}
                className="flex flex-col gap-2"
              >
                <FormField
                  control={form.control}
                  name="usernameOrEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên tài khoản hoặc email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {loginLoading ? (
                  <Button type="submit" className="w-full" disabled>
                    <Loader2Icon className="animate-spin" />
                    Vui lòng chờ
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={googleloginLoading ? true : undefined}
                  >
                    Đăng nhập
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Separator  />
            <p>Hoặc</p>

            {googleloginLoading ? (
              <Button type="submit" className="w-full" disabled>
                <Loader2Icon className="animate-spin" />
                Vui lòng chờ
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 cursor-pointer"
                onClick={handleGoogleLogin}
                disabled={loginLoading ? true : undefined}
              >
                <FaGoogle />
                Đăng nhập bằng tài khoản Google
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;
