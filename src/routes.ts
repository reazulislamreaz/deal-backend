import { Router } from "express";
import authRoute from "./app/modules/auth/auth.route";
import userRoute from "./app/modules/user/user.route";
import uploadRoute from "./app/modules/upload/upload.route";
import machineRoute from "./app/modules/machine/machine.route";
import investorRoute from "./app/modules/investor/investor.route";
import maintenance_route from "./app/modules/maintenance/maintenance.route";
import contactRoute from './app/modules/contact/contact.route';
import privacyRoute from './app/modules/privacy/privacy.route';

const appRouter = Router();

const moduleRoutes = [
    { path: "/privacy", route: privacyRoute },
    { path: "/contact", route: contactRoute },
  { path: "/investor", route: investorRoute },
  { path: "/machine", route: machineRoute },
  { path: "/upload", route: uploadRoute },
  { path: "/auth", route: authRoute },
  { path: "/user", route: userRoute },
  { path: "/maintenance", route: maintenance_route },
];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;
