// utils/apiTimer.js
export const timedApiCall = async (label, apiCallFn) => {
  const start = Date.now();

  try {
    const response = await apiCallFn();
    const end = Date.now();
    const duration = end - start;

    console.log(`⏱️ [${label}] Success in ${duration} ms`);
    return response;
  } catch (error) {
    const end = Date.now();
    const duration = end - start;

    console.log(`❌ [${label}] Failed after ${duration} ms:`, error.message);
    throw error;
  }
};
