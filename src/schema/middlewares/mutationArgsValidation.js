export const mutationArgsValidation = {
  async Mutation(resolve, root, args, context, info) {
    const mutationField = info.schema.getMutationType().getFields()[info.fieldName];
    const { validateArgs } = mutationField;

    if (validateArgs) {
      await validateArgs(root, args, context, info)
    }

    return resolve(root, args, context, info);
  }
}
