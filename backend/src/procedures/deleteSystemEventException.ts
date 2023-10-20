import { SystemEventException } from "@prisma/client";
import { prisma } from "../db";

export async function deleteSystemEventException(
  id: SystemEventException["id"]
) {
  try {
    await prisma.systemEventException.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (err) {
    return false;
  }
}
