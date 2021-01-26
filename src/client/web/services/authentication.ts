import axios, { AxiosResponse } from "https://esm.sh/axios";
import { AuthHeader } from '../contracts/authheader.ts';
import { LoginResponse } from '../contracts/loginresponse.ts';
import { Message } from '../contracts/message.ts';
import { User } from '../contracts/user.ts';

const { localStorage } = (window as any)

const API_URL = 'http://localhost:8001/';

const authHeader = (): AuthHeader => {
	const currentUser = getCurrentUser()
	if (currentUser && currentUser.accessToken) {
		return { authorization: `Bearer ${currentUser.accessToken}` }
	}
	return {}
},
	authHeaderByAccessToken = (accessToken: string): AuthHeader => ({
		authorization: `Bearer ${accessToken}`,
	}),
	getCurrentUser = (): User | null =>
		JSON.parse(localStorage.getItem('user') as string) as User,
	getUser = (accessToken: string): Promise<AxiosResponse<User>> =>
		axios.get<User>(`${API_URL}user`, {
			headers: authHeaderByAccessToken(accessToken),
		}),
	login = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> =>
		axios.post<LoginResponse>(`${API_URL}login`, {
			email,
			password,
		}),
	logout = (): void => {
		localStorage.removeItem('user')
	},
	register = (register: {
		email: string
		username: string
		password: string
	}): Promise<AxiosResponse<Message>> =>
		axios.post<Message>(`${API_URL}register`, register),
	removeCurrentUser = (): void => {
		localStorage.clear()
	},
	setCurrentUser = (user: User | null): void => {
		localStorage.setItem('user', JSON.stringify(user))
	}

export default {
	authHeader,
	authHeaderByAccessToken,
	getCurrentUser,
	getUser,
	login,
	logout,
	register,
	removeCurrentUser,
	setCurrentUser,
}
