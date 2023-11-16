import { Company, ICompany } from '../../../domain/Company/Company';
import { GenericRepository } from "../../interface/repository/GenericRepository";

export class GetCompany {
  constructor(private readonly repository: GenericRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.get(input.id);
  }
}

type Input = {
  id: string
}
type Output = Company