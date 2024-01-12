import { PrismaClient } from "@prisma/client";
import { UsecaseFactory } from "./application/repository/factory/UsecaseFactory";
import { RepositoryFactoryDatabase } from "./infra/database/factory/RepositoryFactoryDatabase";
import { ExpressAdapter } from "./infra/http/ExpressAdapter";
import { MainController } from "./infra/http/MainController";
import { EmailExternal } from "./infra/Email/EmailExternal";
import { RedisAdapter } from "./infra/cache/RedisAdapter";
import { RabbitMQAdapter } from "./infra/queue/rabbitmq/RabbitMqAdapter";

async function main() {
  const httpServer = new ExpressAdapter()
  const client = new PrismaClient()
  const rabbitMq = new RabbitMQAdapter()
  await rabbitMq.connect().then(() => {
    const email = new EmailExternal(rabbitMq)
    const repositoryFactory = new RepositoryFactoryDatabase(client)
    const usecase = new UsecaseFactory(repositoryFactory, email, RedisAdapter.getInstance())
    new MainController(httpServer, usecase)
    httpServer.listen(Number(process.env.PORT || 3000), process.env.HOST?.toString()!)
  }).catch((e: Error) => {
    console.log(e.message)
    process.exit(1)
  })
}
main()
