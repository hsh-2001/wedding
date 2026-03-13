import tokenService from "../services/tokenService";

export default defineEventHandler(async (event) => {
//   const authHeader = event.req.headers['authorization'] || event.req.headers['Authorization'] as string;
//     if (!authHeader) { 
//         throw createError({
//             statusCode: 401,
//             statusMessage: 'Authorization header missing',
//         });  
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//         throw createError({
//             statusCode: 401,
//             statusMessage: 'Token missing',
//         });
//     }

//     try {
//         const decoded = tokenService.verifyToken(token);
//         if (!decoded) {
//             throw createError({
//                 statusCode: 401,
//                 statusMessage: 'Invalid token',
//             });
//         }   
//         event.context.userId = decoded.id;
//     } catch (error) {
//         throw createError({
//             statusCode: 401,
//             statusMessage: 'Invalid token',
//         });
//     }
});