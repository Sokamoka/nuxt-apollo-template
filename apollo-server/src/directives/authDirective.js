import { defaultFieldResolver } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';

export function authDirective(directiveName) {
  const typeDirectiveArgumentMaps = {};

  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
    requires: Role = ADMIN,
    ) on OBJECT | FIELD_DEFINITION
  
    enum Role {
      USER
      ADMIN
    }`,
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                console.log(context);
                const user = getUser(context.userRole);
                if (!user.hasRole(requires)) {
                  throw new Error('Not Authorized');
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
}

function getUser(userRole) {
  const roles = ['USER', 'ADMIN'];
  return {
    hasRole: (role) => {
      const tokenIndex = roles.indexOf(userRole);
      const roleIndex = roles.indexOf(role);
      return roleIndex >= 0 && tokenIndex >= roleIndex;
    },
  };
}
