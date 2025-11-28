import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';

export const TipsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-bg-app px-6 pt-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4 font-fredoka">Dicas Sustentáveis</Text>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
        <GlassCard className="p-0 overflow-hidden mb-4">
          <View className="h-24 bg-blue-400 relative p-4 justify-end">
            <FontAwesome5 name="water" size={80} color="#4299e1" style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.3 }} />
            <Text className="text-white font-bold text-lg font-fredoka">Economia de Água</Text>
          </View>
          <View className="p-4">
            <Text className="text-sm text-gray-600 font-nunito">Reduza o tempo no banho em 2 minutos e economize até 30 litros de água por dia!</Text>
            <TouchableOpacity className="mt-3">
              <Text className="text-blue-500 text-xs font-bold uppercase tracking-wider">Ler mais</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>

        <GlassCard className="p-0 overflow-hidden mb-4">
          <View className="h-24 bg-yellow-400 relative p-4 justify-end">
            <FontAwesome5 name="sun" size={80} color="#ecc94b" style={{ position: 'absolute', bottom: -10, right: -10, opacity: 0.3 }} />
            <Text className="text-white font-bold text-lg font-fredoka">Energia Solar</Text>
          </View>
          <View className="p-4">
            <Text className="text-sm text-gray-600 font-nunito">Aproveite a luz natural. Abra as cortinas e apague as lâmpadas durante o dia.</Text>
            <TouchableOpacity className="mt-3">
              <Text className="text-yellow-600 text-xs font-bold uppercase tracking-wider">Ler mais</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};
