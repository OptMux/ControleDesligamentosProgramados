import { Router } from "express";
import { HttpStatus } from "../enums/requests";
import type { AuthRequest } from "../middlewares/auth.types";
import { onlyAdmin } from "../middlewares/onlyAdmin";
import { withAuth } from "../middlewares/withAuth";
import { changePassword } from "../procedures/changePassword";
import { createUser } from "../procedures/createUser";
import { userLogin } from "../procedures/userLogin";
import { deleteUser } from "../procedures/deleteUser";

export const authRouter = Router();

authRouter.post("/register", withAuth, onlyAdmin, async (req, res) => {
  const {
    username = "",
    password = "",
    isAdmin = false,
  }: { username: string; password: string; isAdmin: boolean } = req.body ?? {};

  if (username?.length === 0 || password?.length === 0)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "username or password must not be empty",
    });

  const user = await createUser(username, password, isAdmin);

  res.status(HttpStatus.OK).json({
    message: "user created successfully",
    data: { user },
  });
});

authRouter.get("/teste", withAuth, async (req, res) => {
  res.status(HttpStatus.OK).json({
    message: "OK",
  });
});

authRouter.post("/login", async (req, res) => {
  const {
    username = "",
    password = "",
  }: { username: string; password: string } = req.body ?? {};

  if (username?.length === 0 || password?.length === 0)
    return res.status(HttpStatus.UNAUTHORIZED).json({
      message: "username or password must not be empty",
    });

  try {
    const { user, token } = await userLogin(username, password);
    res.status(HttpStatus.OK).json({
      token,
      data: {
        user,
      },
    });
  } catch (err: any) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      message: err?.message,
    });
  }
});

authRouter.put("/changePassword", withAuth, async (req, res) => {
  const { id } = (req as AuthRequest)?.userInfo ?? {};

  const {
    oldPassword = "",
    newPassword = "",
  }: { oldPassword: string; newPassword: string } = req.body ?? {};

  if (oldPassword?.length === 0 || newPassword?.length === 0)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "passwords must not be empty",
    });

  try {
    const result = await changePassword(id, oldPassword, newPassword);
    if (result) {
      res.status(HttpStatus.OK).json({
        message: "password changed successfully",
      });
    } else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        message: "invalid old password",
      });
    }
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).end();
  }
});

authRouter.delete("/user/:userId", withAuth, onlyAdmin, async (req, res) => {
  const { userId } = req.params;
  const { id } = (req as AuthRequest)?.userInfo ?? {};

  if (userId === id)
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: "you can't delete yourself",
    });

  const result = await deleteUser(userId);

  if (result)
    return res.status(HttpStatus.OK).json({
      message: "deleted user successfully",
    });
  res.status(HttpStatus.NOT_FOUND).json({
    message: "user not found",
  });
});
