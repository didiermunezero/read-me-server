import { User } from 'src/user/interfaces/user.interface';
import { InputType, Field} from 'type-graphql';

@InputType()
export class CreateInput {
  @Field()
  readonly name: string;
  @Field()
 readonly author: [string];
}
