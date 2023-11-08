export default interface CRUDBase<TYPE, ID> {
    create(t: TYPE): TYPE;
    get(id: ID): TYPE | null;
    update(t: TYPE): TYPE;
    delete(id: ID): boolean;
}
