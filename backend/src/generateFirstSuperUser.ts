import { prisma } from "./db";
import { createUser } from "./procedures/createUser";
import { settings } from "./settings";

export async function generateFirstSuperUser() {
  const user = await prisma.user.findFirst({
    where: {
      isAdmin: {
        equals: true,
      },
    },
  });

  if (user !== null) return;

  console.log(
    "user with admin permissions not found, creating a new one with default credentials..."
  );

  await createUser(settings.defaultUsername, settings.defaultPassword, true);
}
