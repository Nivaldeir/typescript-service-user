import { Company, ICompany } from "../../../domain/Company/Company";
import { IBaseRepository } from "../../interface/repository/IBaseRepository";
import { Save } from "./Save";

test('should save input successfully', async () => {
  // Arrange
  const input: ICompany = {
    name: "test",
    users: ["12345"],
  }
  const company = new Company(input)
  const repositoryMock: IBaseRepository<Company> = {
    save: jest.fn().mockResolvedValue(company.get()),
    get: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const save = new Save(repositoryMock);
  const output = await save.execute(company);
  console.log(output)
  expect(output.companyId).toBeDefined();
});