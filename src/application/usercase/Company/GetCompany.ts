import { Company, ICompany } from '../../../domain/Company/Company';
import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class GetCompany {
  constructor(private readonly repository: IBaseRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.get(input.id);
  }
}

type Input = {
  id: string
}
type Output = Company