import React from 'react';
import { toast } from 'sonner';
import { Save, Bell, Moon, Globe } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PageTitle } from '../components/ui/PageTitle';

export const Settings: React.FC = () => {
  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 h-full overflow-y-auto">
      <PageTitle subtitle="Manage your application preferences">
        Settings
      </PageTitle>

      <div className="space-y-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-blue-500" size={20} />
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Notifications
              </label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>All notifications</option>
                <option>Important only</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Push Notifications
              </label>
              <select className="w-full border rounded-md p-2 bg-white">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Moon className="text-blue-500" size={20} />
            <h3 className="font-semibold">Appearance</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select className="w-full border rounded-md p-2 bg-white">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <span className="flex items-center gap-2">
              <Save size={16} />
              Save Changes
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};