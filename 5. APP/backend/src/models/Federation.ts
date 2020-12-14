import Sport from "./Sport";
import {Property} from "@tsed/schema";
import {Hydrator} from './Model';

export default class Federation {
   @Hydrator() @Property() id: number;
   @Hydrator() @Property() name: string;
   @Hydrator() @Property() sport: Sport;
}
