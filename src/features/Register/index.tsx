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

import type { RegisterUser } from '@/type';
import { userRegisterSchema, type UserRegisterValues } from '@/schemas';

import { useRegister } from '@/mutations/use-register';

const Register = () => {
  const form = useForm<RegisterUser>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const { handleSubmit } = form;

  const { mutate: mutateRes, isPending } = useRegister();

  const onSubmit: SubmitHandler<UserRegisterValues> = (data) => {
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
                <span className="text-2xl font-semibold">Trail.Script</span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base underline border-none"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Your adventures, your words. Share them on TrailScript.
            </h1>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Input your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Input your email"
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
                      placeholder="Input your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" size="lg" className="">
              Register
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

export default Register;
