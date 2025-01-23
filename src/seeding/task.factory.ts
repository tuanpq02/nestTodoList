import { faker } from '@faker-js/faker';
import { Task } from '../entities/task.entity';
import { setSeederFactory } from 'typeorm-extension';


export const TaskFactory = setSeederFactory(Task, () => {
  const task = new Task();
  task.name = faker.word.verb(); 
  return task;
});
