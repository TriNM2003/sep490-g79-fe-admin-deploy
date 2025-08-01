
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Loader2Icon } from 'lucide-react';
import { useContext, useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppContext from '@/context/AppContext';

const loginSchema = z.object({
  email: z.string().trim().min(1, {
    message: "Tên tài khoản hoặc email không được để trống"
  }),
  password: z.string().trim().min(1,{
    message: "Mật khẩu không được để trống"
  }),
})


function Login() {
  const [loginLoading, setLoginLoading] = useState<Boolean>(false);
  // const [googleloginLoading, setGoogleLoginLoading] = useState<Boolean>(false);
  // const hasRun = useRef(false);
  const { login, authAPI } = useContext(AppContext);
  const navigate = useNavigate();
  

  // useEffect(() => {
  //   // cho toast hien thi 1 lan duy nhat
  //   if (hasRun.current) return;
  //   hasRun.current = true;

  //   const urlParams = new URLSearchParams(window.location.search);
  //   const isLoginByGoogle = urlParams.get("isLoginByGoogle");
  //   const message = urlParams.get("message");

  //   if(isLoginByGoogle === 'false'){
  //     setGoogleLoginLoading(false);
  //     setTimeout(() => {
  //               setGoogleLoginLoading(false);
  //               toast.error(message);
  //             }, 1000);
  //   }

  //   if(isLoginByGoogle === 'true'){
  //       setGoogleLoginLoading(true);
  //       axios.get(`${authAPI}/getUserByAccessToken`,{withCredentials: true})
  //         .then(res => {
  //           const {user, accessToken} = res.data;
  //           switch(user.status){
  //             case 'verifying':
  //               setGoogleLoginLoading(false);
  //               toast.error("Tài khoản của bạn chưa kích hoạt! Hãy kích hoạt thông qua email")
  //                   break;
  //             case 'banned':
  //               setGoogleLoginLoading(false);
  //               toast.error("Tài khoản của bạn đã bị khóa!")
  //                   break;
  //            default:
  //             toast.success("Đăng nhập bằng tài khoản google thành công!")
  //             setTimeout(() => {
  //               setGoogleLoginLoading(false);
  //               login(accessToken, user);
  //               navigate("/admin/dashboard")
  //             }, 2000);
  //             break;
  //         }
  //         })
  //         .catch(error => {
  //           console.log(error?.response.data.message);
  //         });
  //     }
  // }, [])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onLogin = async ({ email, password }: z.infer<typeof loginSchema>) => {
  setLoginLoading(true);
  try {
    const response = await axios.post(`${authAPI}/login`, {
      email: email,
      password: password,
      type: 'admin'
    });

    if (response.status === 200) {
      toast.success("Đăng nhập thành công!");
      login(response.data.accessToken, response.data.user)
      setTimeout(() => {
        setLoginLoading(false);
        navigate("/admin/dashboard");
      }, 2000);
    }
  } catch (error: any) {
    if(error.response?.status === 400){
      toast.error(error?.response.data.message);
    }else {
      toast.error(error?.response.data.message);
    }
    setLoginLoading(false);
  }
};

  
  // function handleGoogleLogin(){
  //   window.open(`${authAPI}/admin/loginByGoogle`, "_self");
  // }

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
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
                    // disabled={googleloginLoading ? true : undefined}
                  >
                    Đăng nhập
                  </Button>
                )}
              </form>
            </Form>
          </CardContent>
          {/* <CardFooter className="flex-col gap-2">
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
          </CardFooter> */}
        </Card>
      </div>
    </div>
  );
}

export default Login;
