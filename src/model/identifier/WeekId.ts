import BaseId from "./base/BaseId";

export default class WeekId extends BaseId {

    // public constructor(id: string) {
    //     super(id);
    // }

    public static thisWeek(): WeekId {
        const currentDate = this.getMonday(new Date());
        return WeekId.getWeekId(currentDate);
    }

    public thisWeekFromSelf(): WeekId {
        return this;
    }

    public static nextWeek(): WeekId {
        const currentDate = this.getMonday(new Date());
        currentDate.setDate(currentDate.getDate() + 7);
        return WeekId.getWeekId(currentDate);
    }

    public nextWeekFromSelf(): WeekId {
        const weekIdDate: Date = this.getDateFromWeekId(this);
        weekIdDate.setDate(weekIdDate.getDate() + 7);
        return WeekId.getWeekId(weekIdDate);
    }

    public static lastWeek(): WeekId {
        const currentDate = this.getMonday(new Date());
        currentDate.setDate(currentDate.getDate() - 7);
        return WeekId.getWeekId(currentDate);
    }

    public lastWeekFromSelf(): WeekId {
        const weekIdDate: Date = this.getDateFromWeekId(this);
        weekIdDate.setDate(weekIdDate.getDate() - 7);
        return WeekId.getWeekId(weekIdDate);
    }

    private static getWeekId(date: Date): WeekId {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const week = WeekId.getWeek(date);
        return new WeekId(`${year}-${month}-${week}`);
    }

    private static getWeek(date: Date): number {
        const currentDate = date.getDate();
        const firstDay = new Date(date.setDate(1)).getDay();

        return Math.ceil((currentDate + firstDay) / 7);
    }

    private static getMonday(date: Date): Date {
        date = new Date(date);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    }

    private getDateFromWeekId(weekId: WeekId): Date {
        const weekIdStringList: Array<string> = weekId.id.split("-");
        const year: string = weekIdStringList[0];
        const month: string = weekIdStringList[1];
        const week: number = Number(weekIdStringList[2]);
        let date: Date = new Date(`${year}-${month}`);
        date = WeekId.getMonday(date);
        date.setDate(date.getDate() + (7 * (week - 1)));
        return date;
    }

}
