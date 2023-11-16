import { Company, ICompany } from '../../../domain/Company/Company';
import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class SaveCompany {
  constructor(private readonly repository: IBaseRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    const company = new Company(input);
    await this.repository.save(company);
    return company;
  }
}

type Input = ICompany
type Output = Company