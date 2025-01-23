import { faker } from "@faker-js/faker";
import { Task } from "../entities/task.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager):
    Promise<any> {
        const userFactory = factoryManager.get(User);

        console.log("seeding user....");
        const users = await userFactory.saveMany(10);
        
        const taskFactory = factoryManager.get(Task);

        console.log('seeding tasks...');
        const tasks = await Promise.all(
            Array(50).fill("").map(async () => {
                const task = await taskFactory.make({
                    user: faker.helpers.arrayElement(users),                    
                  });
                  return task;
            })
        )

        const taskRepo = dataSource.getRepository(Task);
        await taskRepo.save(tasks);
    }
}