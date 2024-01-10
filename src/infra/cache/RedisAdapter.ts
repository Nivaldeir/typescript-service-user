import Redis from "ioredis"
import logger from "../logger";
import { CacheRepository } from "../../application/repository/interface/CacheRepository";

export class RedisAdapter extends Redis implements CacheRepository {
  private static instance: RedisAdapter;
  constructor() {
    super({
      password: process.env.REDIS_PASSWORD
    });
    super.on("error", (err: Error) => {
      logger.error(`[REDIS]: ${err.message}`);
      process.exit(1)
    })
    super.on("connect", () => {
      logger.info("[REDIS]: Connected")
    })
  }
  public static getInstance(): RedisAdapter {
    if (!RedisAdapter.instance) {
      RedisAdapter.instance = new RedisAdapter()
    }
    return RedisAdapter.instance
  }
  async Get(value: string): Promise<string | null> {
    return this.get(value)
  }
  async Set(key: string, value: string): Promise<void> {
    this.set(key, value, "EX", 30)
  }
}