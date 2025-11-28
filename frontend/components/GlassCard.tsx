import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';

interface GlassCardProps extends ViewProps {
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, ...props }) => {
  return (
    <View 
      className={`bg-white/90 border border-white rounded-3xl shadow-sm ${className}`} 
      {...props}
    >
      {children}
    </View>
  );
};
