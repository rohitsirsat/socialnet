// a class for ApiSuccessResponse
export class ApiSuccessResponse {
  constructor(data, message = "Success") {
    this.data = data;
    this.message = message;
    this.success = true;
  }
}

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// A class that provides utility function for working with local storage

export class LocalStorage {
  // Get a value from local storage by key
  static get(key) {
    if (!isBrowser) return;
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Set a value in local storage by key
  static set(key, value) {
    if (!isBrowser) return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Remove a value from local storage by key
  static remove(key) {
    if (!isBrowser) return;
    localStorage.removeItem(key);
  }

  // Clear all values from local storage
  static clear() {
    if (!isBrowser) return;
    localStorage.clear();
  }
}
