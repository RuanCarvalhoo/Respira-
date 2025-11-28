import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { useUserStore } from '../store/userStore';

export const MissionsScreen = () => {
  const { totalPoints } = useUserStore();

  return (
    <SafeAreaView className="flex-1 bg-bg-app px-6 pt-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800 font-fredoka">Missões</Text>
        <View className="bg-yellow-100 px-3 py-1 rounded-full">
          <Text className="text-yellow-600 text-xs font-bold font-nunito">XP: {totalPoints}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4">
        {/* Mission 1 */}
        <GlassCard className="p-4 overflow-hidden relative">
          <View className="absolute top-0 right-0 bg-green-100 px-2 py-1 rounded-bl-lg">
            <Text className="text-green-600 text-[10px] font-bold">FÁCIL</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="w-12 h-12 rounded-2xl bg-teal-100 items-center justify-center">
              <FontAwesome5 name="bicycle" size={20} color="#319795" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-gray-800 font-fredoka text-lg">Dia sem Carro</Text>
              <Text className="text-xs text-gray-500 mb-3 font-nunito">Vá de bike ou transporte público.</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs font-bold text-teal-600">+100 pts</Text>
                <TouchableOpacity className="bg-teal-500 px-3 py-1.5 rounded-lg shadow-sm">
                  <Text className="text-white text-xs font-bold">Aceitar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Mission 2 */}
        <GlassCard className="p-4 overflow-hidden relative opacity-80">
          <View className="absolute top-0 right-0 bg-orange-100 px-2 py-1 rounded-bl-lg">
            <Text className="text-orange-600 text-[10px] font-bold">MÉDIO</Text>
          </View>
          <View className="flex-row gap-4">
            <View className="w-12 h-12 rounded-2xl bg-orange-100 items-center justify-center">
              <FontAwesome5 name="hamburger" size={20} color="#dd6b20" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-gray-800 font-fredoka text-lg">Refeição Vegana</Text>
              <Text className="text-xs text-gray-500 mb-3 font-nunito">Experimente um almoço sem carne.</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-xs font-bold text-teal-600">+150 pts</Text>
                <View className="bg-gray-200 px-3 py-1.5 rounded-lg">
                  <Text className="text-gray-500 text-xs font-bold">Bloqueado</Text>
                </View>
              </View>
            </View>
          </View>
        </GlassCard>
      </ScrollView>
    </SafeAreaView>
  );
};
