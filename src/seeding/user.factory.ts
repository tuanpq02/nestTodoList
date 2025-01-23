import { faker } from '@faker-js/faker';
import { User, UserRole } from '../entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { Role } from 'src/auth/enums/role.enum';


export const UserFactory = setSeederFactory(User, () => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.role = faker.helpers.enumValue(Role);
  return user;
});