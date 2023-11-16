import { Company } from '../../../domain/Company/Company';
import { GenericRepository } from "../../interface/repository/GenericRepository";

export class DeleteCompany {
  constructor(private readonly repository: GenericRepository<Company>) { }
  async execute(input: Input): Promise<Output> {
    return await this.repository.delete(input.id);
  }
}
type Input = {
  id: string
}
type Output = void