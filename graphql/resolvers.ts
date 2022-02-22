import { printType } from "graphql";

export const resolvers = {
  Query: {
    tasks: (parent: any, args: any, ctx: any) => {
      printType(parent);
      printType(args);
      return ctx.prisma.task.findMany()
    }
  }
}
