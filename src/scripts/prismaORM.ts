import "dotenv/config";
import { hash } from "bcryptjs";
import prismaClient from "../prisma";

async function runCrudORM() {
  try {
    const passwordHash = await hash("senhamuitofodaslk", 8);
    const createdUser = await prismaClient.user.create({
      data: {
        name: "Guilherme de Souza",
        email: `guilhermedesouza+${Date.now()}@byronsolutions.com`,
        password: passwordHash,
      },
    });
    console.log("Usuário criado:", createdUser);
    const foundUser = await prismaClient.user.findUnique({
      where: {
        id: createdUser.id,
      },
    });
    console.log("Usuário buscado por id", foundUser);
    const updatedUser = await prismaClient.user.update({
      where: {
        id: createdUser.id,
      },
      data: {
        name: "Guilherme S.",
      },
    });
    console.log("Usuário atualizado:", updatedUser);
    const verifiedUser = await prismaClient.user.findUnique({
      where: {
        id: createdUser.id,
      },
    });
    console.log("Verificação pós-atualização:", verifiedUser);
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: createdUser.id,
      },
    });
    console.log("Usuário removido:", deletedUser);
    const userAfterDelete = await prismaClient.user.findUnique({
      where: {
        id: createdUser.id,
      },
    });
    console.log("Busca pós-remoção:", userAfterDelete);
  } finally {
    await prismaClient.$disconnect();
  }
}

runCrudORM().catch((error) => {
  console.error(error);
  process.exit(1);
});
