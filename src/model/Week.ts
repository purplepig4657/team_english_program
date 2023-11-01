import WeekId from "./identifier/WeekId";

export default class Week {
    private _id: WeekId;
    private _name: string;

    public constructor(id: WeekId, name: string) {
        this._id = id;
        this._name = name;
    }

    // Getter

    get idObjcet(): WeekId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get name(): string {
        return this._name;
    }

}
