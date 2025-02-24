/**
 * Un-bundles the message from either a request response or error
 *
 * @param {object} args Function arguments
 * @param {object} args.error Error response object
 * @param {object} args.response Response object
 * @returns {string} Message
 */
export declare const responseMessageHandler: ({ response, error, }: {
    response?: any;
    error?: any;
}) => string;
