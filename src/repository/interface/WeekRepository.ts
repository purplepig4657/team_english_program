import CRUDBase from "./base/CRUDBase";
import Week from "../../model/Week";
import WeekId from "../../model/identifier/WeekId";

export default interface WeekRepository extends CRUDBase<Week, WeekId>{
    getAll(): Promise<Array<Week>>;

}
