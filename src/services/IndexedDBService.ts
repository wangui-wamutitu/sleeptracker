import { openDB } from "idb";

// Database and store names
const DB_NAME = "SleepTrackerDB";
const SLEEP_STORE = "sleepData";
const SLEEPINESS_STORE = "sleepinessData";

// Initialize Database
export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(SLEEP_STORE)) {
        db.createObjectStore(SLEEP_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(SLEEPINESS_STORE)) {
        db.createObjectStore(SLEEPINESS_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveSleepData = async (sleepStart: Date, sleepEnd: Date) => {
  const db = await initDB();
  return db.put(SLEEP_STORE, {
    sleepStart,
    sleepEnd,
    timestamp: new Date().toISOString(),
  });
};

export const saveSleepinessData = async (
  rating: number,
  timeLogged: string,
  description?: string
) => {
  const db = await initDB();
  return db.put(SLEEPINESS_STORE, {
    rating,
    timeLogged,
    description: description || "",
    timestamp: new Date().toISOString(),
  });
};

export const getAllSleepData = async () => {
  const db = await initDB();
  return db.getAll(SLEEP_STORE);
};

export const getAllSleepinessData = async () => {
  const db = await initDB();
  return db.getAll(SLEEPINESS_STORE);
};

export const deleteSleepData = async (id: number) => {
  const db = await initDB();
  return db.delete(SLEEP_STORE, id);
};

export const deleteSleepinessData = async (id: number) => {
  const db = await initDB();
  return db.delete(SLEEPINESS_STORE, id);
};
