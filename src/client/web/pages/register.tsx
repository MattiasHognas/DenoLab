import { AxiosError, AxiosResponse } from "https://esm.sh/axios";
import React, { useState } from "https://esm.sh/react";
import { Message } from "../contracts/message.ts";
import { User } from "../contracts/user.ts";
import { redirect } from "../deps.ts";
import authentication from "../services/authentication.ts";

export default function Home() {
	const [email, setEmail] = useState(""),
		[username, setUsername] = useState(""),
		[password, setPassword] = useState(""),
		[message, setMessage] = useState(""),
		[errors, setErrors] = useState<{ message: string, reference: string }[]>([]),
		[loading, setLoading] = useState(false),
		[user, setUser] = useState<User | null>(null),
		onChangeEmail = (event: React.ChangeEvent): void => {
			/*
			 * Todo: Set loginState.errors here
			 * get loginState.errors
			 * filter on reference and remove them
			 * set new errors like this:
			 * props.message add() { message: 'xxx'; reference: event.currentTarget.name }
			 */
			setEmail(event.currentTarget.value)
		},
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
		onSubmitRegister = (event: React.ChangeEvent) => {
			if (errors.length === 0) {
				setMessage('');
				setLoading(true);
				authentication.register({
					email,
					username,
					password,
				})
					.then((response: AxiosResponse<Message>) => {
						setMessage("Signed up");
						setLoading(false);
						redirect('/login', true);
					})
					.catch((error: AxiosError) => {
						const resMessage =
							(error.response &&
								error.response.data &&
								error.response.data.message) ||
							error.message ||
							error.toString();
						setMessage(resMessage);
						setLoading(false);
					})
			}
			event.preventDefault()
		}

	return (
		<>
			<h2>Register</h2>
			<form onSubmit={onSubmitRegister}>
				Email:<br />
				<input
					name="email"
					onChange={onChangeEmail}
					type="text"
					role="textbox"
					data-testid="login-email"
				/>
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
					value={loading ? 'Signing up..' : 'Register'}
					role="button"
					data-testid="register-submit"
				/>
			</form>
		</>
	);
}
