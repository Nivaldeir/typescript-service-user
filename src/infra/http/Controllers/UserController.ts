import { Request, Response } from 'express';
import { UsecaseFactory } from '../../../application/repository/factory/UsecaseFactory';
import { Middleware } from '../Middleware';
import { HttpServer } from '../HttpServer';
export class UserController {
    private readonly url = "/users"
    constructor(private readonly http: HttpServer, private readonly usecaseFactory: UsecaseFactory) {
        this.setupRoutes();
    }
    private setupRoutes() {
        this.http.on("get", `${this.url}`, [Middleware.isAdmin], async (req: Request) => {
            return [await this.usecaseFactory.User().show.execute(req.query), 200]
        })
        this.http.on("get", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
            return [await this.usecaseFactory.User().get.execute(req.params.id), 200]
        })
        this.http.on("post", `${this.url}`, [], async (req: Request) => {
            return [await this.usecaseFactory.User().save.execute(req.body), 200]
        })
        this.http.on("post", `${this.url}/authentication`, [], async (req: Request, res: Response) => {
            const result = await this.usecaseFactory.User().authentication.execute(req.body)
            res.cookie('token', result.token);
            return [, 200]
        })
        this.http.on("put", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
            return [await this.usecaseFactory.User().update.execute(req.params.id, req.body), 200]
        })
        this.http.on("delete", `${this.url}/:id`, [Middleware.isValidToUser], async (req: Request) => {
            return [await this.usecaseFactory.User().delete.execute(req.params.id), 200]
        })
        this.http.on("post", `${this.url}/active/code`, [], async (req: Request) => {
            return [await this.usecaseFactory.User().sendCodeActive.execute(req.body), 200]
        })
        this.http.on("post", `${this.url}/active/verify`, [], async (req: Request) => {
            return [await this.usecaseFactory.User().activeUser.execute(req.body), 200]
        })
        this.http.on("post", `${this.url}/recover/code`, [Middleware.isValidToUser], async (req: Request) => {
            return [await this.usecaseFactory.User().sendCodePassword.execute(req.body), 200]
        })
        this.http.on("post", `${this.url}/recover/verify`, [Middleware.isValidToUser], async (req: Request) => {
            return [await this.usecaseFactory.User().forgotPassword.execute(req.body), 200]
        })
        this.http.on("post", `${this.url}/logout`, [], async (req: Request, res: Response) => {
            res.clearCookie("token");
            return [, 200]
        })
    }
}

