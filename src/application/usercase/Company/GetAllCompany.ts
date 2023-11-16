import { Company, ICompany } from '../../../domain/Company/Company';
import { GenericRepository } from "../../interface/repository/GenericRepository";

export class GetAllCompany {
  constructor(private readonly repository: GenericRepository<Company>) { }
  async execute(): Promise<Output> {
    return await this.repository.getAll();
  }
}

type Output = Company[]