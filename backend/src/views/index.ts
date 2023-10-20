import { Router } from "express";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { eventRouter } from "./event";
import { withAuth } from "../middlewares/withAuth";
import { logRouter } from "./log";
import { eventExceptionRouter } from "./eventException";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", withAuth, userRouter);
apiRouter.use("/event", withAuth, eventRouter);
apiRouter.use("/log", withAuth, logRouter);
apiRouter.use("/exception", withAuth, eventExceptionRouter);
