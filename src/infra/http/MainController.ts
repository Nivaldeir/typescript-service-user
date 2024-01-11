import { UsecaseFactory } from './../../application/repository/factory/UsecaseFactory';
import { HttpServer } from './HttpServer';
import { UserController } from './Controllers/UserController';
export class MainController {
  constructor(private httpServer: HttpServer, private usecaseFactory: UsecaseFactory) {
    new UserController(httpServer, usecaseFactory);
  }
}