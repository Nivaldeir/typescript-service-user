import { UsecaseFactory } from './../../application/repository/factory/UsecaseFactory';
import { HttpServer } from './HttpServer';
import { UserController } from './Controllers/UserController';
export class MainController {
  useController: UserController
  constructor(private readonly httpServer: HttpServer, private readonly usecaseFactory: UsecaseFactory) {
    this.useController = new UserController(httpServer, usecaseFactory);
    
  }
}