export default class BaseId {
    private _id: string;

    public constructor(id: string) {
        this._id = id;
    }

    // Getter

    public get id(): string {
        return this._id;
    }

}
