import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px] flex">
        <div className="flex-1 flex flex-col gap-4 justify-center items-center ">
          <div className="w-[200px] h-[50px] cursor-pointer">
            <img
              src="../../public/SocialLogin/NaverLongBtn.webp"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[200px] h-[50px] cursor-pointer">
            <img
              src="../../public/SocialLogin/GoogleLongBtn.webp"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        <b className="w-1 self-stretch bg-gray-200" />

        <div className="flex-1 px-4 py-2">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your account information to login.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="submit">Login</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
