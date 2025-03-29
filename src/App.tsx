import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Calibration } from './pages/Calibration';
import { Testing } from './pages/Testing';
import { History } from './pages/History';
import { Advanced } from './pages/Advanced';
import { NotFound } from './pages/NotFound';
import { TouchRipple } from './components/TouchRipple';
import { CalibrationProvider } from './context/CalibrationContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { LayoutProvider } from './context/LayoutContext';
import { TrayStatusProvider } from './context/TrayStatusContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CalibrationProvider>
          <LayoutProvider>
            <TrayStatusProvider>
              <BrowserRouter>
                <TouchRipple />
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="calibration" element={<Calibration />} />
                    <Route path="testing" element={<Testing />} />
                    <Route path="history" element={<History />} />
                    <Route path="advanced" element={<Advanced />} />
                    <Route path="*" element={<MainLayout />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TrayStatusProvider>
          </LayoutProvider>
        </CalibrationProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;