import { Company } from '../../../domain/Company/Company';
import { GenericRepository } from "../../interface/repository/GenericRepository";

export class UpdateCompany {
  constructor(private readonly repository: GenericRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.update(input.id, input.data);
  }
}

type Input = {
  id: string
  data: Company
}
type Output = void