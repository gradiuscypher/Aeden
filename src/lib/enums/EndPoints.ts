/**
 * @ignore
 * @constant
 * @readonly
 * @name EndPoints
 * @description Enumeration for API server {@link EndPoints}.
 * @enum {string}
 */
enum EndPoints {
	// guild endpoints
	isAedenHere = '/api/guild/isAedenHere/:id',
	getEditableMessages = '/api/guild/getEditableMessages/:id',
	getEmojis = '/api/guild/getEmojis/:id',

	// message endpoints
	createMessage = '/api/message/createMessage',
	updateMessage = '/api/message/updateMessage'
};

export default EndPoints;