import ConstantWeight from "../../model/ConstantWeight";

export default interface ConstantWeightRepository {
    get(): Promise<ConstantWeight>;
    update(newConstantWeight: ConstantWeight): Promise<boolean>;
}
