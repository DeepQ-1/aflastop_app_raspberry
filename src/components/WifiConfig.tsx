import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, ChevronRight, ArrowLeft } from 'lucide-react';

interface WifiNetwork {
  ssid: string;
}

interface WifiStatus {
  connected: boolean;
  ssid?: string;
  ip?: string;
}

export const WifiConfig: React.FC = () => {
  const { t } = useTranslation();
  const [networks, setNetworks] = useState<WifiNetwork[]>([]);
  const [wifiStatus, setWifiStatus] = useState<WifiStatus>({ connected: false });
  const [isScanning, setIsScanning] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState<string | null>(null);

  const getWifiStatus = async () => {
    try {
      const status = await window.electron.invoke('execute-script', 'dependency_scripts/wifi_status.sh');
      const statusJson = JSON.parse(status);
      setWifiStatus(statusJson);
    } catch (error) {
      console.error('Error getting WiFi status:', error);
      setWifiStatus({ connected: false });
    }
  };

  const scanNetworks = async () => {
    setIsScanning(true);
    setNetworks([]);
    try {
      const result = await window.electron.invoke('execute-script', 'dependency_scripts/wifi_scan.sh');
      console.log('Scan result:', result);
      
      let networksJson;
      try {
        networksJson = JSON.parse(result);
        if (!Array.isArray(networksJson)) {
          throw new Error('Not an array');
        }
      } catch (parseError) {
        console.error('Error parsing network list:', parseError);
        networksJson = [];
      }
      
      setNetworks(networksJson);
      
      // Log found networks for debugging
      console.log('Found networks:', networksJson.length);
      networksJson.forEach((network, index) => {
        console.log(`Network ${index + 1}:`, network.ssid);
      });
    } catch (error) {
      console.error('Error scanning WiFi networks:', error);
      setNetworks([]);
    } finally {
      setIsScanning(false);
    }
  };

  const connectToNetwork = async () => {
    if (!selectedNetwork) return;
    
    setIsConnecting(true);
    setConnectionMessage(null);
    
    try {
      const result = await window.electron.invoke(
        'execute-script', 
        'dependency_scripts/wifi_connect.sh',
        selectedNetwork,
        password
      );
      
      if (result.includes('successfully')) {
        setConnectionMessage(t('settings.wifi.connectionSuccess'));
        // Refresh WiFi status after connection
        await getWifiStatus();
        // Reset form
        setSelectedNetwork(null);
        setPassword('');
      } else {
        setConnectionMessage(t('settings.wifi.connectionFailed'));
      }
    } catch (error) {
      console.error('Error connecting to WiFi:', error);
      setConnectionMessage(t('settings.wifi.connectionFailed'));
    } finally {
      setIsConnecting(false);
    }
  };

  // Initial load of WiFi status
  useEffect(() => {
    getWifiStatus();
  }, []);

  return (
    <div className="wifi-config p-4 space-y-6">
      {/* Status section */}
      <div className="bg-opacity-10 bg-white p-4 rounded-lg">
        <h3 className="text-3xl font-medium mb-2">{t('settings.wifi.status')}</h3>
        <div className="flex items-center gap-4">
          {wifiStatus.connected ? (
            <>
              <Wifi className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-xl font-medium">{t('settings.wifi.connected')}</p>
                <p className="text-lg">{wifiStatus.ssid}</p>
                <p className="text-lg">{wifiStatus.ip}</p>
              </div>
            </>
          ) : (
            <>
              <WifiOff className="w-8 h-8 text-red-500" />
              <p className="text-xl font-medium">{t('settings.wifi.disconnected')}</p>
            </>
          )}
        </div>
        
        <button 
          onClick={getWifiStatus}
          className="mt-4 bg-opacity-20 bg-white py-2 px-4 rounded-lg hover:bg-opacity-30 transition-colors"
        >
          Refresh Status
        </button>
      </div>

      {/* Network selection section */}
      {!selectedNetwork ? (
        <div className="bg-opacity-10 bg-white p-4 rounded-lg">
          <h3 className="text-3xl font-medium mb-4">{t('settings.wifi.scan')}</h3>
          
          <button 
            onClick={scanNetworks}
            disabled={isScanning}
            className="bg-opacity-20 bg-white py-3 px-4 rounded-lg hover:bg-opacity-30 transition-colors w-full mb-4"
          >
            {isScanning ? 'Scanning...' : t('settings.wifi.scan')}
          </button>
          
          <div className="network-list space-y-2 max-h-64 overflow-y-auto">
            {networks.map((network, index) => (
              <button
                key={index}
                onClick={() => setSelectedNetwork(network.ssid)}
                className="flex items-center justify-between w-full p-3 bg-opacity-10 bg-white rounded-lg hover:bg-opacity-20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6" />
                  <span className="text-xl">{network.ssid}</span>
                </div>
                <ChevronRight className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-opacity-10 bg-white p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <button 
              onClick={() => setSelectedNetwork(null)}
              className="mr-2"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h3 className="text-3xl font-medium">{t('settings.wifi.enterPassword')}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xl mb-2">{t('settings.wifi.ssid')}</label>
              <div className="bg-opacity-20 bg-white p-3 rounded-lg text-xl">
                {selectedNetwork}
              </div>
            </div>
            
            <div>
              <label className="block text-xl mb-2">{t('settings.wifi.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-opacity-20 bg-white p-3 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-opacity-50"
                placeholder="********"
              />
            </div>
            
            {connectionMessage && (
              <div className={`p-3 rounded-lg text-center ${
                connectionMessage.includes('successfully') 
                  ? 'bg-green-500 bg-opacity-20' 
                  : 'bg-red-500 bg-opacity-20'
              }`}>
                {connectionMessage}
              </div>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedNetwork(null)}
                className="flex-1 bg-opacity-20 bg-white py-3 px-4 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                {t('settings.wifi.cancel')}
              </button>
              <button
                onClick={connectToNetwork}
                disabled={isConnecting}
                className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isConnecting ? t('settings.wifi.connecting') : t('settings.wifi.connect')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};