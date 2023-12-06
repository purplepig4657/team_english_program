import ConstantWeightRepository from "../repository/interface/ConstantWeightRepository";
import ConstantWeightRepositoryImpl from "../repository/firebase/ConstantWeightRepositoryImpl";
import ConstantWeight from "../model/ConstantWeight";

export default class ConstantWeightService {

    private _constantWeightRepository: ConstantWeightRepository;

    constructor() {
        this._constantWeightRepository = new ConstantWeightRepositoryImpl();
    }

    public async getConstantWeight(): Promise<ConstantWeight> {
        return await this._constantWeightRepository.get();
    }

    public async updateConstantWeight(newConstantWeight: ConstantWeight): Promise<boolean> {
        return await this._constantWeightRepository.update(newConstantWeight);
    }

}
