import MessageData from '../../../../shared/lib/interfaces/MessageData';

export default interface ApiResponse {
	status: number;
	success: boolean;
	message: string;
	data?: MessageData;
}
