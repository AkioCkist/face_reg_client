// Helper utility functions
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

export const generateId = (prefix = '') => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`;
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retry = async (fn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i)); // Exponential backoff
    }
  }
};

export const arrayToObject = (array, keyField) => {
  return array.reduce((obj, item) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});
};

export const groupBy = (array, keyField) => {
  return array.reduce((groups, item) => {
    const key = item[keyField];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, keyField, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[keyField];
    const bVal = b[keyField];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterBy = (array, filters) => {
  return array.filter(item => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key];
      const itemValue = item[key];
      
      if (typeof filterValue === 'string') {
        return itemValue.toLowerCase().includes(filterValue.toLowerCase());
      }
      
      return itemValue === filterValue;
    });
  });
};

export const paginate = (array, page = 1, pageSize = 10) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      pageSize,
      totalItems: array.length,
      totalPages: Math.ceil(array.length / pageSize),
      hasNext: endIndex < array.length,
      hasPrevious: startIndex > 0
    }
  };
};

export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

export const isEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  
  if (typeof a === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) return false;
    
    for (const key of keysA) {
      if (!keysB.includes(key) || !isEqual(a[key], b[key])) {
        return false;
      }
    }
    
    return true;
  }
  
  return false;
};

export const downloadFile = (data, filename, type = 'text/plain') => {
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      return true;
    } catch (fallbackErr) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
};
