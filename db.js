/**
 * IndexedDB Management Module
 */

const DB_NAME = 'PilotSalaryDB';
const DB_VERSION = 1;
const STORE_SETTINGS = 'settings';
const STORE_RECORDS = 'monthlyRecords';

let dbInstance = null;

/**
 * Initialize Database
 * @returns {Promise<IDBDatabase>}
 */
export function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
                db.createObjectStore(STORE_SETTINGS, { keyPath: 'id' });
            }
            if (!db.objectStoreNames.contains(STORE_RECORDS)) {
                const store = db.createObjectStore(STORE_RECORDS, { keyPath: 'id' });
                store.createIndex('month', 'month', { unique: false });
            }
        };

        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };

        request.onerror = (event) => {
            reject(`Database error: ${event.target.errorCode}`);
        };
    });
}

/**
 * Get Database Instance
 */
export function getDB() {
    if (!dbInstance) {
        throw new Error("Database not initialized. Call initDB() first.");
    }
    return dbInstance;
}

/**
 * Save Settings
 * @param {Object} settingsData
 * @returns {Promise<void>}
 */
export async function saveSettings(settingsData) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_SETTINGS], 'readwrite');
        const store = tx.objectStore(STORE_SETTINGS);
        const request = store.put({ id: 'config', ...settingsData });

        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
}

/**
 * Get Settings
 * @returns {Promise<Object>}
 */
export async function getSettings() {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_SETTINGS], 'readonly');
        const store = tx.objectStore(STORE_SETTINGS);
        const request = store.get('config');

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = (e) => reject(e);
    });
}

/**
 * Add Monthly Record
 * @param {Object} record
 * @returns {Promise<void>}
 */
export async function addRecord(record) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_RECORDS], 'readwrite');
        const store = tx.objectStore(STORE_RECORDS);
        const request = store.put(record);

        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
}

/**
 * Get All Records (Sorted by Date Descending)
 * @returns {Promise<Array>}
 */
export async function getAllRecords() {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_RECORDS], 'readonly');
        const store = tx.objectStore(STORE_RECORDS);
        const request = store.getAll();

        request.onsuccess = () => {
            const records = request.result;
            // Sort by createdAt descending
            records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            resolve(records);
        };
        request.onerror = (e) => reject(e);
    });
}

/**
 * Delete Record
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteRecord(id) {
    const db = getDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction([STORE_RECORDS], 'readwrite');
        const store = tx.objectStore(STORE_RECORDS);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = (e) => reject(e);
    });
}
