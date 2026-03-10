import { Router } from "express";
import authRoute from "./app/modules/auth/auth.route";
import userRoute from "./app/modules/user/user.route";
import uploadRoute from "./app/modules/upload/upload.route";
import machineRoute from "./app/modules/machine/machine.route";
import investorRoute from './app/modules/investor/investor.route';

const appRouter = Router();

const moduleRoutes = [
    { path: "/investor", route: investorRoute },
  { path: "/machine", route: machineRoute },
  { path: "/upload", route: uploadRoute },
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;
