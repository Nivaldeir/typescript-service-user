import { Company } from "../../../domain/Company/Company";
import { IBaseRepository } from "../../interface/repository/IBaseRepository";
import { Delete } from "./Delete";

it('should delete an existing entity when given a valid id', async () => {
  const repositoryMock: IBaseRepository<Company> = {
    save: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const deleteInstance = new Delete<Company>(repositoryMock);
  await deleteInstance.execute({ id: 'validId' });
  expect(repositoryMock.delete).toHaveBeenCalledWith('validId');
});