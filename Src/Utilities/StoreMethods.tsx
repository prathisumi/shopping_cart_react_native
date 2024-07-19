import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key: string, payload: any) {
  try {
    let storeRes = await AsyncStorage.setItem(
      key,
      typeof payload === 'string' || typeof payload === 'number'
        ? payload.toString()
        : JSON.stringify(payload),
    );
    return storeRes;
  } catch (error) {}
}

const isJsonString = (data: string) => {
  try {
    let response = data && JSON.parse(data);
    return true;
  } catch (err) {
    return false;
  }
};

export async function retrieveData(key: string) {
  try {
    const session = await AsyncStorage.getItem(key);
    if (session !== undefined && session !== null) {
      return isJsonString(session) ? JSON.parse(session) : session;
    }
  } catch (error) {}
}

export async function removeData(key: string) {
  try {
    let removeRes = await AsyncStorage.removeItem(key);
    return removeRes;
  } catch (error) {}
}

export async function clearStorage() {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
}
