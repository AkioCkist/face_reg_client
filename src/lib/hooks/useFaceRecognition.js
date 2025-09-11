import { useState, useCallback, useRef, useEffect } from 'react';
import { FaceRecognitionService } from '../services';

export const useFaceRecognition = () => {
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef(null);

  const initializeCamera = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const mediaStream = await FaceRecognitionService.initializeCamera();
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      return mediaStream;
    } catch (err) {
      console.error('Initialize camera error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      FaceRecognitionService.stopCamera(stream);
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  const captureFrame = useCallback(async () => {
    try {
      if (!videoRef.current) {
        throw new Error('Video element not available');
      }
      
      setIsCapturing(true);
      setError(null);
      const frameBlob = await FaceRecognitionService.captureFrame(videoRef.current);
      return frameBlob;
    } catch (err) {
      console.error('Capture frame error:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const detectFaces = useCallback(async (imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await FaceRecognitionService.detectFaces(imageData);
      return result;
    } catch (err) {
      console.error('Detect faces error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const recognizeFace = useCallback(async (imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await FaceRecognitionService.recognizeFace(imageData);
      return result;
    } catch (err) {
      console.error('Recognize face error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const enrollFace = useCallback(async (userId, imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await FaceRecognitionService.enrollFace(userId, imageData);
      return result;
    } catch (err) {
      console.error('Enroll face error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyFace = useCallback(async (userId, imageData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await FaceRecognitionService.verifyFace(userId, imageData);
      return result;
    } catch (err) {
      console.error('Verify face error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    stream,
    loading,
    error,
    isCapturing,
    initializeCamera,
    stopCamera,
    captureFrame,
    detectFaces,
    recognizeFace,
    enrollFace,
    verifyFace,
    isCameraActive: !!stream
  };
};
