import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { useUserStore } from '../store/userStore';
import { MISSIONS } from '../constants/missions';

export const MissionsScreen = ({ navigation }: any) => {
  const { totalPoints, activeMission, acceptMission } = useUserStore();

  const handleAcceptMission = (mission: typeof MISSIONS[0]) => {
    if (activeMission) {
      Alert.alert(
        "Missão em andamento",
        "Você já tem uma missão ativa. Termine-a antes de iniciar outra!"
      );
      return;
    }
    
    acceptMission(mission);
    Alert.alert(
      "Missão Aceita! 🚀",
      `Você iniciou a missão: ${mission.title}. Boa sorte!`,
      [{ text: "OK", onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app px-6 pt-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800 font-fredoka">Missões</Text>
        <View className="bg-yellow-100 px-3 py-1 rounded-full">
          <Text className="text-yellow-600 text-xs font-bold font-nunito">XP: {totalPoints}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="space-y-4 pb-10">
        {MISSIONS.map((mission) => {
          const isLocked = false; // Future logic for locking hard missions
          const isActive = activeMission?.id === mission.id;
          
          // Color mapping
          let bgBadge = 'bg-green-100';
          let textBadge = 'text-green-600';
          let iconColor = '#319795'; // teal-500
          let iconBg = 'bg-teal-100';

          if (mission.difficulty === 'MÉDIO') {
            bgBadge = 'bg-orange-100';
            textBadge = 'text-orange-600';
            iconColor = '#dd6b20'; // orange-500
            iconBg = 'bg-orange-100';
          } else if (mission.difficulty === 'DIFÍCIL') {
            bgBadge = 'bg-red-100';
            textBadge = 'text-red-600';
            iconColor = '#e53e3e'; // red-500
            iconBg = 'bg-red-100';
          }

          return (
            <GlassCard key={mission.id} className={`p-4 overflow-hidden relative mb-4 ${isActive ? 'border-2 border-teal-500' : ''}`}>
              <View className={`absolute top-0 right-0 ${bgBadge} px-2 py-1 rounded-bl-lg`}>
                <Text className={`${textBadge} text-[10px] font-bold`}>{mission.difficulty}</Text>
              </View>
              
              <View className="flex-row gap-4">
                <View className={`w-12 h-12 rounded-2xl ${iconBg} items-center justify-center`}>
                  <FontAwesome5 name={mission.icon as any} size={20} color={iconColor} />
                </View>
                
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 font-fredoka text-lg">{mission.title}</Text>
                  <Text className="text-xs text-gray-500 mb-3 font-nunito">{mission.description}</Text>
                  
                  {mission.duration && (
                     <Text className="text-[10px] text-gray-400 font-bold mb-2">⏱ {mission.duration}</Text>
                  )}

                  <View className="flex-row justify-between items-center">
                    <Text className="text-xs font-bold text-teal-600">+{mission.points} pts</Text>
                    
                    {isActive ? (
                       <View className="bg-teal-100 px-3 py-1.5 rounded-lg">
                        <Text className="text-teal-600 text-xs font-bold">Em Andamento</Text>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        onPress={() => handleAcceptMission(mission)}
                        className="bg-teal-500 px-3 py-1.5 rounded-lg shadow-sm active:scale-95"
                      >
                        <Text className="text-white text-xs font-bold">Aceitar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </GlassCard>
          );
        })}
        <View className="h-10" /> 
      </ScrollView>
    </SafeAreaView>
  );
};
