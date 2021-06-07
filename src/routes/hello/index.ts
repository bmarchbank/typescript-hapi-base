import { Request, ResponseToolkit } from "@hapi/hapi";
import Joi from "joi";
import { registerRoute } from "..";


registerRoute({
    path: '/hello/{name}',
    method: 'GET',
    handler: async (request: Request, h: ResponseToolkit) => {
        return h.response({
            hello: request.params.name
        })
    },
    options: {
        description: 'Test endpoint',
        notes: 'Prints hello {name} using the name passed in on the path',
        validate: {
            params: Joi.object({
                name : Joi.string()
                        .required()
                        .description('the name to print'),
            })
        }
    }
})