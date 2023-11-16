import { Company, ICompany } from '../../../domain/Company/Company';
import { GenericRepository } from "../../interface/repository/GenericRepository";

export class SaveCompany {
  constructor(private readonly repository: GenericRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    const company = new Company(input);
    await this.repository.save(company);
    return company;
  }
}

type Input = ICompany
type Output = Company