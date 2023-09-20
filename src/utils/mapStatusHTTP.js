const httpErrorMap = {
    SUCCESSFUL: 200,
    CREATED: 201,
    DELETED: 204,
    UNAUTHENTICATED: 400,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNAUTHORIZED_USER: 401,
  };
  
  const mapStatusHTTP = (status) => httpErrorMap[status] || 500;
  
  module.exports = mapStatusHTTP;