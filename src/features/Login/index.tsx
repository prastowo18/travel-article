import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import type { LoginUser } from '@/type';
import { userLoginSchema, type UserLoginValues } from '@/schemas';

import { useLogin } from '@/mutations/use-login';

const Login = () => {
  const form = useForm<LoginUser>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const { mutate: mutateRes, isPending } = useLogin();

  const onSubmit: SubmitHandler<UserLoginValues> = (data) => {
    mutateRes(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6">
      <div className="bg-[#F4F4F4] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link to="/">
                <span className="text-2xl font-semibold font-poppins">
                  newapp
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base underline border-none"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">Welcome back to NewApp.</h1>
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="email@gmail.com"
                      {...field}
                    />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" size="lg" className="">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="hidden w-full h-screen lg:col-span-3 lg:block"
        style={{
          backgroundImage: "url('/auth-img.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default Login;
