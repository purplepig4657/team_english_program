import ClassWeekRepository from "../interface/ClassWeekRepository";
import ClassWeek from "../../model/ClassWeek";
import ClassWeekId from "../../model/identifier/ClassWeekId";

import { db } from "../../config/firebaseConfig";

export default class ClassWeekRepositoryImpl implements ClassWeekRepository {

    create(t: ClassWeek): ClassWeek {
        return null;
    }

    get(id: ClassWeekId): ClassWeek | null {
        return null;
    }

    update(t: ClassWeek): ClassWeek {
        return null;
    }

    delete(id: ClassWeekId): boolean {
        return false;
    }
    
}
