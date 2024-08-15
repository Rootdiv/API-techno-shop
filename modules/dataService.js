import { readFile, writeFile } from 'node:fs/promises';
import { DB_FILE, DB_ORDERS } from '../const.js';

export const loadData = async () => {
  try {
    const data = await readFile(DB_FILE);
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read data file:', err);
    return [];
  }
};

export const loadOrders = async () => {
  try {
    const data = await readFile(DB_ORDERS, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to read orders file:', err);
    return [];
  }
};

export const saveOrders = async orders => {
  try {
    await writeFile(DB_ORDERS, JSON.stringify(orders), 'utf8');
    return true;
  } catch (err) {
    console.error('Failed to write to orders file:', err);
    return false;
  }
};
