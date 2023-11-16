import { Company, ICompany } from "../../../domain/Company/Company";
import { User } from "../../../domain/User/User";
import { IBaseRepository } from "../../interface/repository/IBaseRepository";
import { GetAll } from "./GetAll";

test('should save input successfully', async () => {
  const inputCompany = {
    name: "test",
    users: ["12345"],
  }
  const company = new Company(inputCompany)
  const inputUser = {
    name: "test",
    email: "nivaldeir.silva@taticca.com.br",
    password: "123456",
    companyId: company.companyId as string,
    sector: ["Atendimento"]
  }
  const user = User.create(inputUser.name, inputUser.email, inputUser.password, inputUser.companyId, inputUser.sector)
  const repositoryMock: IBaseRepository<User> = {
    save: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn().mockResolvedValue([user.get(), user.get()]),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const get = new GetAll(repositoryMock);
  const output = await get.execute();
  console.log(output)
});