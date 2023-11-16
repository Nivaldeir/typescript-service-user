import { Company } from '../../../domain/Company/Company';
import { IBaseRepository } from '../../interface/repository/IBaseRepository';

export class GetAllCompany {
  constructor(private readonly repository: IBaseRepository<Company>) { }
  async execute(): Promise<Output> {
    return await this.repository.getAll();
  }
}

type Output = Company[]