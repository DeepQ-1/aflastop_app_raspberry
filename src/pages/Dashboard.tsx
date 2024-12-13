import React from 'react';
import { BarChart2, Users, Activity } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { PageTitle } from '../components/ui/PageTitle';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageTitle subtitle="Monitor your activity and progress">
        Dashboard Overview
      </PageTitle>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">1,234</h3>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </Card>

        <Card className="border-l-4 border-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Now</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">423</h3>
            </div>
            <Activity className="text-green-500" size={24} />
          </div>
        </Card>

        <Card className="col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Weekly Analytics</h3>
            <BarChart2 className="text-gray-400" size={20} />
          </div>
          <div className="h-32 flex items-end justify-between gap-2">
            {[40, 70, 45, 90, 65, 30, 85].map((height, index) => (
              <div
                key={index}
                className="w-full bg-blue-100 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </Card>
      </div>
    </div>
  );
};