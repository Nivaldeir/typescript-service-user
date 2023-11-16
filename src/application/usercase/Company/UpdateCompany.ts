import { Company } from '../../../domain/Company/Company';
import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class UpdateCompany {
  constructor(private readonly repository: IBaseRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.update(input.id, input.data);
  }
}

type Input = {
  id: string
  data: Company
}
type Output = void