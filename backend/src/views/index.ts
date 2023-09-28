import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { eventRouter } from "./event";
import { withAuth } from "../middlewares/withAuth";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/event", withAuth, eventRouter);
