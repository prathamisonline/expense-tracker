import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./user.resolvers.js";
import transactionsResolver from "./transaction.resolvers.js";

const mergedResolvers = mergeResolvers([userResolver, transactionsResolver]);


export default mergedResolvers