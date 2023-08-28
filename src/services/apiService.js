/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';

const BASE_URL = 'https://your-backend-url.com';

const submitFeedback = async (feedback) => {
  try {
    const response = await axios.post(`${BASE_URL}/feedback`, { feedback });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default { submitFeedback };
