import "reflect-metadata";
import { Container } from "inversify";
import { REPOSITORY } from "./constant/repository";

// REPOSITORY
import ClassRepository from "../../repository/interface/ClassRepository";
import ClassRepositoryImpl from "../../repository/firebase/ClassRepositoryImpl";

// SERVICE
import ClassService from "../../service/ClassService";
import {SERVICE} from "./constant/service";


const diContainer: Container = new Container();


// REPOSITORY
diContainer.bind<ClassRepository>(REPOSITORY.ClassRepository).to(ClassRepositoryImpl).inSingletonScope();

// SERVICE
diContainer.bind<ClassService>(SERVICE.ClassService).to(ClassService).inSingletonScope();


export default diContainer;
