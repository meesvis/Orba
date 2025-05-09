// Generate a unique ID for entities
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Format date to a readable string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format date to time only
export const formatTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Calculate time ago
export const timeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Get random avatar URL
export const getRandomAvatar = (): string | null => {
  // Return null to indicate that a default vector icon (e.g., <Bot /> from lucide-react)
  // should be used by components displaying the avatar.
  return null;
};

// Get token distribution data
export const getTokenDistribution = () => {
  return [
    {
      category: 'Public Sale',
      percentage: 40,
      description: 'Available to the public through IDO',
      color: '#10B981'
    },
    {
      category: 'Team',
      percentage: 15,
      description: '3-year vesting with 1-year cliff',
      color: '#3B82F6'
    },
    {
      category: 'Development',
      percentage: 20,
      description: 'Ongoing platform development',
      color: '#6366F1'
    },
    {
      category: 'Marketing',
      percentage: 10,
      description: 'Partnerships and community growth',
      color: '#8B5CF6'
    },
    {
      category: 'Liquidity',
      percentage: 10,
      description: 'DEX liquidity provision',
      color: '#EC4899'
    },
    {
      category: 'Advisors',
      percentage: 5,
      description: '2-year vesting',
      color: '#F59E0B'
    }
  ];
};