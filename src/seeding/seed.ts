import dbConfig from "src/config/db.config";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { TaskFactory } from "./task.factory";
import { UserFactory } from "./user.factory";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories: [TaskFactory, UserFactory],
    seeds: [MainSeeder]
}

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})