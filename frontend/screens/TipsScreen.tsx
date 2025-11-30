import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { TIPS } from '../constants/tips';

export const TipsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-bg-app px-6 pt-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4 font-fredoka">Dicas Sustentáveis</Text>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4 pb-10">
        {TIPS.map((tip) => {
          // Color mapping based on category/tip color
          let bgColor = 'bg-blue-400';
          let iconColor = '#4299e1';
          
          if (tip.category === 'waste') {
            bgColor = 'bg-green-400';
            iconColor = '#48bb78';
          } else if (tip.category === 'consumption') {
            bgColor = 'bg-purple-400';
            iconColor = '#9f7aea';
          } else if (tip.category === 'mobility') {
            bgColor = 'bg-orange-400';
            iconColor = '#ed8936';
          } else if (tip.category === 'digital') {
            bgColor = 'bg-indigo-500';
            iconColor = '#667eea';
          }

          return (
            <GlassCard key={tip.id} className="p-0 overflow-hidden mb-4">
              <View className={`h-24 ${bgColor} relative p-4 justify-end`}>
                <FontAwesome5 
                  name={tip.icon as any} 
                  size={80} 
                  color={tip.bgIcon || iconColor} 
                  style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.3 }} 
                />
                <Text className="text-white font-bold text-lg font-fredoka">{tip.title}</Text>
              </View>
              <View className="p-4">
                <Text className="text-sm text-gray-600 font-nunito">{tip.description}</Text>
              </View>
            </GlassCard>
          );
        })}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};
