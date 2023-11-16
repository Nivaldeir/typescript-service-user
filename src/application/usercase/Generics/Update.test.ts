import { Company, ICompany } from "../../../domain/Company/Company";
import { IBaseRepository } from "../../interface/repository/IBaseRepository";
import { Save } from "./Save";
import { Update } from "./Update";

test("should update input successfully", async () => {
    const input: ICompany = {
        name: "test",
        users: ["12345"],
    }
    const company = new Company(input)
    const repositoryMock: IBaseRepository<Company> = {
        save: jest.fn().mockResolvedValue(company.get()),
        get: jest.fn().mockResolvedValue(company.get()),
        getAll: jest.fn(),
        update: jest.fn().mockResolvedValue(company.get()),
        delete: jest.fn(),
    };
    const save = new Save(repositoryMock);
    const output = await save.execute(company);
    const companyUpdate = new Company({
        companyId: output.companyId,
        name: "test2",
        users: ["12345"],
        logo_url: "Test",
        sector: ["Test"],
    })
    const repositoryMockUpdate: IBaseRepository<Company> = {
        save: jest.fn(),
        get: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn().mockResolvedValue(companyUpdate),
        delete: jest.fn(),
    };
    const update = new Update(repositoryMockUpdate);

    const ouputUpdate = await update.execute(output.companyId as string, companyUpdate)
    console.log(output)
    console.log(ouputUpdate)
})