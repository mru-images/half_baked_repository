import React from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Heart } from 'lucide-react';
import { Song } from '@/types';
import { useTheme } from '@/components/ThemeContext';

interface MinimizedPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onMaximize: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  onToggleLike: () => void;
  formatNumber: (num: number) => string;
  imageUrl?: string;
}

const MinimizedPlayer: React.FC<MinimizedPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onMaximize,
  onPrevious,
  onNext,
  onClose,
  onToggleLike,
  formatNumber,
  imageUrl
}) => {
  const { isDarkMode } = useTheme();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLike();
  };

  return (
    <div className={`fixed bottom-20 left-0 right-0 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t z-40 shadow-lg`}>
      {/* Progress Bar */}
      <div className={`w-full h-1 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <div className="h-full bg-purple-500 w-1/3 transition-all duration-300"></div>
      </div>
      
      <div className="flex items-center justify-between p-3">
        {/* Song Info - Clickable to maximize */}
        <div className="flex items-center flex-1 min-w-0 cursor-pointer" onClick={onMaximize}>
          <img
            src={imageUrl || song.image}
            alt={song.name}
            className="w-12 h-12 rounded-lg object-cover mr-3 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} truncate text-sm`}>{song.name}</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs truncate`}>{song.artist}</p>
          </div>
        </div>
        
        {/* Like Button */}
        <button 
          onClick={handleLike}
          className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors mr-2`}
        >
          <Heart 
            size={16} 
            className={`transition-colors ${song.isLiked ? 'text-red-500 fill-red-500' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} 
          />
        </button>
        
        {/* Controls */}
        <div className="flex items-center space-x-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            <SkipBack size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            {isPlaying ? (
              <Pause size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} />
            ) : (
              <Play size={20} className={isDarkMode ? 'text-white' : 'text-gray-900'} fill={isDarkMode ? 'white' : '#111827'} />
            )}
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors`}
          >
            <SkipForward size={18} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
          </button>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full transition-colors ml-1`}
          >
            <X size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinimizedPlayer;