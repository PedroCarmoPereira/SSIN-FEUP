import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({ baseURL: 'http://192.168.1.196:8010' });

async function storeToken(token){
	try {
		console.log("Logging Token");
		console.log(token);
		await SecureStore.setItemAsync(
		  'token',
		  token,
		);
	  } catch (error) {
		// There was an error on the native side
		console.log(error);
	  }
}

async function getToken(){
	try {
		const token = await SecureStore.getItemAsync('token');
		const s = token === null ? '' : token;
		if (s !== undefined || s !== '') {
		  return s;
		} else {
		  return null;
		}
	  } catch (error) {
		// There was an error on the native side
		console.log(error);
	  }
}

export {
	api,
	storeToken,
	getToken,
};