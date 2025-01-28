export default {
    async fetch(request, env) {
      return await handleRequest(request, env);
    }
  };