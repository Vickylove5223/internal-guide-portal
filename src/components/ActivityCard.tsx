
import React from 'react';
import { Dot } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: number;
  type: string;
  title?: string;
  description: string;
  amount: string | null;
  date: Date | string;
  status: string;
  reference?: string;
}

interface ActivityCardProps {
  activity: Activity;
  clickable?: boolean;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, clickable = false }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return date;
    }
    return format(date, 'MMM dd, yyyy • h:mm a');
  };

  const handleClick = () => {
    if (clickable) {
      navigate('/activities');
      return;
    }

    // Navigate based on activity type
    switch (activity.type) {
      case 'loan_request':
      case 'topup':
      case 'loan_disbursement':
        navigate('/loan-history');
        break;
      case 'repayment':
        navigate('/loan-detail/1'); // Navigate to loan detail page
        break;
      case 'loan_offer':
        navigate('/loan-offer');
        break;
      case 'verification':
      case 'profile_update':
        navigate('/profile');
        break;
      default:
        navigate('/activities');
        break;
    }
  };

  return (
    <div 
      className={`flex items-start space-x-4 py-2 cursor-pointer hover:bg-gray-50`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mt-1">
        <Dot className="h-5 w-5 text-smartcash-blue" />
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-1 items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {activity.title || activity.description}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {formatDate(activity.date)}
          </p>
        </div>
        
        <div className="flex items-center space-x-6 ml-4">
          {activity.amount && (
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
              {activity.amount}
            </span>
          )}
          
          <span
            className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getStatusColor(activity.status)}`}
          >
            {activity.status}
          </span>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex-1 flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {activity.title || activity.description}
          </h3>
          <p className="text-xs text-gray-500">
            {formatDate(activity.date)}
          </p>
        </div>
        
        <div className="flex flex-col items-end space-y-2 ml-4 flex-shrink-0">
          {activity.amount && (
            <span className="text-sm font-medium text-gray-900">
              {activity.amount}
            </span>
          )}
          <span
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}
          >
            {activity.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
