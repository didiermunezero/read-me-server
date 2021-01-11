import { Resolver, Subscription,Query, Mutation, Args,} from '@nestjs/graphql';
import {PubSub} from 'apollo-server-express'
import { CatsService } from './cats.service';
import { CatType } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat.input';
const pubSub = new PubSub();

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [CatType])
  async cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => CatType)
  async createCat(@Args('input') input: CatInput) {
    pubSub.publish('newCat', { newCat: input });
    return this.catsService.create(input);
  }
  @Subscription(() => CatType)
  newCat() {
    return pubSub.asyncIterator('newCat');
  }
}
