export default interface CRUDBase<TYPE, ID> {
    create(t: TYPE): Promise<TYPE>;
    get(id: ID): Promise<TYPE | null>;
    update(t: TYPE): Promise<boolean>;
    delete(id: ID): Promise<boolean>;
}
