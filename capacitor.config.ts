import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.qrattendance',
  appName: 'qr-attendance',
  webDir: 'build',
  server: {
    url: 'http://172.20.10.5:3000',
    cleartext: true
  },
  plugins: {
    Camera: {
      // Thông báo cho người dùng khi app truy cập camera
      cameraUsageDescription: 'Used to scan QR codes',
    },
  },
};

export default config;
