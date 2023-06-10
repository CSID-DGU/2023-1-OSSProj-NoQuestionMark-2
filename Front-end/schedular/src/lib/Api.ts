import axios from 'axios';
import {IAuthForm} from '../interfaces/IAuthForm'
import {EventSourceInput} from '../interfaces/CalendarState'
import {EclassInput} from 'interfaces/EclassSchedule';

async function post(endpoint:string, data?:IAuthForm|EventSourceInput|EclassInput|string){
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});
	return res;
}

//get
async function get(endpoint:string) {
	const apiUrl = endpoint; 
	const res = await axios(apiUrl, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});


	return res;
}
//patch
async function patch(endpoint:string, data:{}) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	//   응답 코드가 4XX 계열일 때 (400, 403 등)
	if (res.status !== 200) {
		console.log('에러 답변', res);
		//throw new Error(res)
	}
	return res;
}
//put
async function put(endpoint:string, data:{}) {
	const apiUrl = endpoint;
	const bodyData = JSON.stringify(data);

	const res = await axios(apiUrl, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		data: bodyData,
	});

	//   응답 코드가 4XX 계열일 때 (400, 403 등)
	if (res.status !== 200) {
		console.log('에러 답변', res);
		//throw new Error(res);
	}
	return res;
}
//delete
async function del(endpoint:string) {
	const apiUrl = endpoint;

	const res = await fetch(apiUrl, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	// 응답 코드가 4XX 계열일 때 (400, 403 등)
	if (!res.ok) {
		const errorContent = await res.json();
		const { reason } = errorContent;

		throw new Error(reason);
	}

	return res;
}

export { post, get, patch, put, del as delete };