import axios from 'axios';

export async function getAPIData(url) {
  try {
    return await axios.get(url);
  } catch (error) {
    console.error('Error', error);
  }
}

export async function PostCartData(url, val) {
  try {
    return await axios.post(url, val);
  } catch (error) {
    console.error('Error', error);
  }
}

export async function deleteProduct(url) {
  try {
    return await axios.delete(url);
  } catch (error) {
    console.error('Error', error);
  }
}
