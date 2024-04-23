import { faker } from '@faker-js/faker';

export async function generateAlias(): Promise<string> {
  return faker.person.fullName();
}
