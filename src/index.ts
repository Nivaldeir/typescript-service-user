import { PrismaClient } from "@prisma/client";
import { UsecaseFactory } from "./application/repository/factory/UsecaseFactory";
import { RepositoryFactoryDatabase } from "./infra/database/factory/RepositoryFactoryDatabase";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/http/MainController";
import { EmailExternal } from "./infra/Email/EmailExternal";
import { RedisAdapter } from "./infra/cache/RedisAdapter";

console.log(process.env.DATABASE_URL)

async function main() {
  const httpServer = new ExpressAdapter()
  const client = new PrismaClient()
  const repositoryFactory = new RepositoryFactoryDatabase(client)
  const usecase = new UsecaseFactory(repositoryFactory, new EmailExternal(), RedisAdapter.getInstance())
  new MainController(httpServer, usecase)
  httpServer.listen(Number(process.env.PORT || 3000), process.env.HOST?.toString()!)
}
main()
