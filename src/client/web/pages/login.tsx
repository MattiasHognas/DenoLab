import { AxiosError, AxiosResponse } from "https://esm.sh/axios";
import React, { useState } from "https://esm.sh/react";
import { LoginResponse } from "../contracts/loginresponse.ts";
import { User } from "../contracts/user.ts";
import { redirect } from "../deps.ts";
import authentication from "../services/authentication.ts";

export default function Home() {
	const [username, setUsername] = useState(''),
		[password, setPassword] = useState(''),
		[message, setMessage] = useState(''),
		[errors, setErrors] = useState<{ message: string, reference: string }[]>([]),
		[loading, setLoading] = useState(false),
		[user, setUser] = useState<User | null>(null),
		onChangeUsername = (event: React.ChangeEvent): void => {
			/*
			 * Todo: Set loginState.errors here
			 * get loginState.errors
			 * filter on reference and remove them
			 * set new errors like this:
			 * props.message add() { message: 'xxx'; reference: event.currentTarget.name }
			 */
			setUsername(event.currentTarget.value)
		},
		onChangePassword = (event: React.ChangeEvent): void => {
			/*
			 * Todo: Set loginState.errors here
			 * get loginState.errors
			 * filter on reference and remove them
			 * set new errors like this:
			 * props.message add() { message: 'xxx'; reference: event.currentTarget.name }
			 */
			setPassword(event.currentTarget.value)
		},
		onSubmitLogin = (event: React.ChangeEvent): void => {
			if (errors.length === 0) {
				setMessage('');
				setLoading(true);
				authentication.login(username, password)
					.then((response: AxiosResponse<LoginResponse>) =>
						authentication.getUser(response.data.jwt)
					)
					.then((response: AxiosResponse<User>) => {
						const user = response.data
						setUser(user)
						redirect('/dashboard', true);
					})
					.catch((error: AxiosError) => {
						const resMessage =
							(error.response &&
								error.response.data &&
								error.response.data.message) ||
							error.message ||
							error.toString()
						setMessage(resMessage);
						setLoading(false);
					})
			}
			event.preventDefault()
		}

	return (
		<>
			<h2>Login</h2>
			<form onSubmit={onSubmitLogin}>
				Username:<br />
				<input
					name="username"
					onChange={onChangeUsername}
					type="text"
					role="textbox"
					data-testid="login-username"
				/>
				Password:<br />
				<input
					name="password"
					onChange={onChangePassword}
					type="text"
					role="textbox"
					data-testid="login-password"
				/>
				{message && <span>{message}</span>}
				<input
					type="submit"
					disabled={loading || errors.length > 0}
					value={loading ? 'Signing in..' : 'Sign in'}
					role="button"
					data-testid="login-submit"
				/>
			</form>
		</>
	);
}
