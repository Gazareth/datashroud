import {rooms_, departments_, computers_, users_} from "./DATAGEN_Dimensions.js";
import {rp_} from "../../utility/RNG.js";

const computers = computers_.map((e,i)=> ({computer: e, room: rp_(rooms_)}));
const users = users_.map((e,i)=> ({user: e, department: rp_(departments_)}));

export const GetComputer = ()=> rp_(computers);
export const GetUser = ()=> rp_(users);