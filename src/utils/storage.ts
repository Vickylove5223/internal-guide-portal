
import { logger } from './logger';

interface StorageSchema {
  [key: string]: (data: any) => boolean;
}

const schemas: StorageSchema = {
  user: (data: any) => 
    data && 
    typeof data === 'object' && 
    typeof data.id === 'string' && 
    typeof data.email === 'string',
  
  events: (data: any) => 
    Array.isArray(data) && 
    data.every(event => 
      event && 
      typeof event === 'object' && 
      typeof event.id !== 'undefined' && 
      typeof event.title === 'string'
    ),
  
  posts: (data: any) => 
    Array.isArray(data) && 
    data.every(post => 
      post && 
      typeof post === 'object' && 
      typeof post.id !== 'undefined' && 
      typeof post.title === 'string'
    ),
};

export class SafeStorage {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsed = JSON.parse(item);
      
      // Validate against schema if available
      if (schemas[key] && !schemas[key](parsed)) {
        logger.warn(`Invalid data structure for ${key}, using default`, { parsed });
        return defaultValue;
      }

      return parsed as T;
    } catch (error) {
      logger.error(`Failed to get ${key} from localStorage`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): boolean {
    try {
      // Validate against schema if available
      if (schemas[key] && !schemas[key](value)) {
        logger.error(`Invalid data structure for ${key}`, { value });
        return false;
      }

      localStorage.setItem(key, JSON.stringify(value));
      logger.debug(`Successfully saved ${key} to localStorage`);
      return true;
    } catch (error) {
      logger.error(`Failed to save ${key} to localStorage`, error);
      return false;
    }
  }

  static remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      logger.debug(`Successfully removed ${key} from localStorage`);
      return true;
    } catch (error) {
      logger.error(`Failed to remove ${key} from localStorage`, error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      localStorage.clear();
      logger.info('Successfully cleared localStorage');
      return true;
    } catch (error) {
      logger.error('Failed to clear localStorage', error);
      return false;
    }
  }
}
