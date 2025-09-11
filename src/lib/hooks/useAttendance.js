import { useState, useCallback } from 'react';
import { AttendanceService } from '../services';

export const useAttendance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const markAttendance = useCallback(async (faceData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AttendanceService.markAttendance(faceData);
      return result;
    } catch (err) {
      console.error('Mark attendance error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceHistory = useCallback(async (userId, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AttendanceService.getAttendanceHistory(userId, filters);
      return result;
    } catch (err) {
      console.error('Get attendance history error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAttendanceStats = useCallback(async (userId, period = 'month') => {
    try {
      setLoading(true);
      setError(null);
      const result = await AttendanceService.getAttendanceStats(userId, period);
      return result;
    } catch (err) {
      console.error('Get attendance stats error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFaceImage = useCallback(async (imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AttendanceService.uploadFaceImage(imageData);
      return result;
    } catch (err) {
      console.error('Upload face image error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyFace = useCallback(async (imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await AttendanceService.verifyFace(imageData);
      return result;
    } catch (err) {
      console.error('Verify face error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    markAttendance,
    getAttendanceHistory,
    getAttendanceStats,
    uploadFaceImage,
    verifyFace
  };
};
