import MessageData from './MessageData';

export default interface ApiResponse {
	status: number
	success: boolean;
	message: string;
	data?: MessageData
};
