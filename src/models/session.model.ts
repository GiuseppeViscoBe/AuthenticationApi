import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";


export class Session {
    @prop({ref: () => User})
    user: Ref<User>

    @prop({default : true})
    valid: boolean;

}

//different wau to add schema options
const SessionModel = getModelForClass(Session, {
    schemaOptions : {
        timestamps: true,
    }
})

export default SessionModel