import logger from "../../logger";
import { Queue } from "../Queue";
import amqp from "amqplib"
export class RabbitMQAdapter implements Queue {
  connection: any
  consume(name: string, callback: Function): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(`amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_USER}@${process.env.RABBITMQ_URL}`);
      logger.info("[RABBITMQ]: Connected to RabbitMQ")
    } catch (error) {
      logger.error("[RABBITMQ]: Error to conneted RabbitMQ")
    }
  }
  async publish(name: string, data: any): Promise<void> {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(name, { durable: true });
    channel.sendToQueue(name, Buffer.from(JSON.stringify(data)));
  }
}