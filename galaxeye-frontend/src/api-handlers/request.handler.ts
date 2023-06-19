import axios, { AxiosRequestConfig } from "axios";

export type ResponseObject = {
	message: string;
	success: boolean;
	code: number;
	data: {};
};
export const ErrorObject: ResponseObject = {
	message: "",
	success: false,
	code: 400,
	data: {},
};

const API_URL = process.env.REACT_APP_API + "/api/";

export default function request_handler({
	method = "get",
	endpoint = "",
	data = {},
}: {
	method?: "get" | "post" | "put" | "delete";
	endpoint: string;
	data?: {
		access_token?: string | null | undefined;
		key?: string | null | undefined;
		[key: string]: any;
	};
}): Promise<ResponseObject> {
	return new Promise(async (resolve, reject) => {
		const responseObj = { ...ErrorObject };

		const req_obj: AxiosRequestConfig = {
			method: method,
			url: API_URL + endpoint,
			params: method === "get" ? data : {},
			data: method !== "get" ? data : {},
			responseType: "json",
            headers:{
                "Content-Type":"application/json"
            }
			// timeout: 30000,
		};

        console.log("Sending request to", req_obj)

		axios
			.request(req_obj)
			.then((res) => {
				const data = res.data;
				if (data.success) {
					resolve(data);
				} else {
					reject(data);
				}
			})
			.catch((error) => {
				let err: ResponseObject;
				if (error && error?.response?.status === 0 && error?.message) {
					responseObj.message = error.message;
					err = responseObj;
				} else if (
					error &&
					error?.response?.data?.success === false &&
					error?.response?.data?.message
				) {
					err = error.response.data as ResponseObject;
				} else {
					responseObj.message =
						"Something went wrong on our side. \
					Please try again. Sorry for the inconvenience";
					err = responseObj;
				}
                console.log(err)
				reject(err);
			});
	});
}
