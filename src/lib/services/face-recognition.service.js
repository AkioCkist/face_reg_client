// Face recognition service for handling facial recognition operations
class FaceRecognitionService {
  async initializeCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        }
      });
      
      return stream;
    } catch (error) {
      console.error('Camera initialization error:', error);
      throw new Error('Failed to initialize camera');
    }
  }

  async captureFrame(videoElement) {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      context.drawImage(videoElement, 0, 0);
      
      return new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.8);
      });
    } catch (error) {
      console.error('Frame capture error:', error);
      throw new Error('Failed to capture frame');
    }
  }

  async detectFaces(imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('image', imageData);
      
      const response = await fetch('/api/face-recognition/detect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face detection failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Face detection error:', error);
      throw new Error('Face detection failed');
    }
  }

  async recognizeFace(imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('image', imageData);
      
      const response = await fetch('/api/face-recognition/recognize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face recognition failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Face recognition error:', error);
      throw new Error('Face recognition failed');
    }
  }

  async enrollFace(userId, imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('image', imageData);
      
      const response = await fetch('/api/face-recognition/enroll', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face enrollment failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Face enrollment error:', error);
      throw new Error('Face enrollment failed');
    }
  }

  async verifyFace(userId, imageData) {
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('image', imageData);
      
      const response = await fetch('/api/face-recognition/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Face verification failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Face verification error:', error);
      throw new Error('Face verification failed');
    }
  }

  stopCamera(stream) {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  }
}

export default new FaceRecognitionService();
