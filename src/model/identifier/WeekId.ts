import BaseId from "./base/BaseId";

export default class WeekId extends BaseId {

    public constructor(id: string) {
        super(id);
    }
    public static thisWeek(): WeekId {
        return new WeekId("thisWeek");
    }

    public nextWeek(): WeekId {
        return new WeekId("nextWeek");
    }

    public lastWeek(): WeekId {
        return new WeekId("lastWeek");
    }

}
