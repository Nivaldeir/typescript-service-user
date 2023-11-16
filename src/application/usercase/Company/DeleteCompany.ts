import { Company } from '../../../domain/Company/Company';
import { IBaseRepository } from '../../interface/IBaseRepository';

export class DeleteCompany {
  constructor(private readonly repository: IBaseRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.delete(input.id);
  }
}
type Input = {
  id: string
}
type Output = void