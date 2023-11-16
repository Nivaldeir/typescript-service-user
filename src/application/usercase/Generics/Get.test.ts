import { Company, ICompany } from "../../../domain/Company/Company";
import { IBaseRepository } from "../../interface/repository/IBaseRepository";
import { Get } from "./Get";
import { Save } from "./Save";

test("should get input successfully", async () => {
  const input: ICompany = {
    name: "test",
    users: ["12345"],
  }
  const company = new Company(input)
  const repositoryMock: IBaseRepository<Company> = {
    save: jest.fn().mockResolvedValue(company.get()),
    get: jest.fn().mockResolvedValue(company.get()),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const save = new Save(repositoryMock);
  const output = await save.execute(company);
  const get = new Get(repositoryMock)
  const getOutput = await get.execute(output.companyId as string)
  expect(getOutput).toEqual(company.get())
})