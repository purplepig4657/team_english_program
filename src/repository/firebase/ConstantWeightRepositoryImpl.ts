import ConstantWeightRepository from "../interface/ConstantWeightRepository";
import ConstantWeight, {constantWeightConverter} from "../../model/ConstantWeight";
import {collection, doc, DocumentSnapshot, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../config/firebaseConfig";
import {CONSTANT_WEIGHT_COLLECTION} from "../common/firebaseCollectionNames";

export default class ConstantWeightRepositoryImpl implements ConstantWeightRepository {

    async get(): Promise<ConstantWeight> {
        const constantWeightRef = doc(collection(db, CONSTANT_WEIGHT_COLLECTION), "0")
            .withConverter(constantWeightConverter);
        const constantWeightSnap: DocumentSnapshot<ConstantWeight> = await getDoc(constantWeightRef);
        if (constantWeightSnap.exists()) return constantWeightSnap.data();
        else return new ConstantWeight(0, 1, 1, 1, 1, 1);
    }

    async update(newConstantWeight: ConstantWeight): Promise<boolean> {
        const constantWeightRef = doc(collection(db, CONSTANT_WEIGHT_COLLECTION), "0");
        const updateModel = constantWeightConverter.toFirestore(newConstantWeight);
        return updateDoc(constantWeightRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
