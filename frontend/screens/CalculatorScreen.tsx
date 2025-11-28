import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { GlassCard } from '../components/GlassCard';
import { useUserStore } from '../store/userStore';

import { calculatorApi } from '../services/api';

export const CalculatorScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'transport' | 'energy' | 'food'>('transport');
  const [inputValue, setInputValue] = useState('');
  const [selectedType, setSelectedType] = useState('car_gasoline_km');
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const addEmission = useUserStore(state => state.addEmission);

  const calculate = async () => {
    setLoading(true);
    try {
      let result;
      const val = parseFloat(inputValue) || 0;

      if (activeTab === 'transport') {
        result = await calculatorApi.calculateTransport(selectedType, val);
      } else if (activeTab === 'energy') {
        result = await calculatorApi.calculateEnergy(selectedType, val);
      } else if (activeTab === 'food' && selectedDiet) {
        // For food, we might want to ask for days, defaulting to 1 for now if not in UI
        result = await calculatorApi.calculateFood(selectedDiet, 1);
      }

      if (result) {
        addEmission(activeTab, result.emissions_kg);
        alert(`Adicionado ${result.emissions_kg.toFixed(2)}kg CO2e ao seu registro!`);
        navigation.navigate('Home');
      }
    } catch (error) {
      alert('Erro ao calcular emissões. Verifique sua conexão.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app px-6 pt-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4 font-fredoka">Calculadora CO2</Text>

      {/* Tabs */}
      <View className="flex-row p-1 bg-gray-100 rounded-xl mb-6">
        {['transport', 'energy', 'food'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 rounded-lg items-center ${activeTab === tab ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`text-sm font-bold capitalize ${activeTab === tab ? 'text-teal-600' : 'text-gray-500'}`}>
              {tab === 'transport' ? 'Transporte' : tab === 'energy' ? 'Energia' : 'Comida'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'transport' && (
          <View>
            <Text className="text-xs font-bold text-gray-500 mb-2 uppercase font-nunito">Meio de Transporte</Text>
            <View className="bg-white rounded-2xl p-1 border-2 border-gray-200 mb-4 flex-row items-center">
              <FontAwesome5 name="bus" size={16} color="#cbd5e0" style={{ marginLeft: 12 }} />
              {/* Simplified Select for Demo */}
              <View className="flex-1 p-3">
                 <Text className="text-gray-800">Carro (Gasolina)</Text>
              </View>
            </View>

            <Text className="text-xs font-bold text-gray-500 mb-2 uppercase font-nunito">Distância (KM)</Text>
            <View className="bg-white rounded-2xl p-1 border-2 border-gray-200 mb-6 flex-row items-center focus:border-teal-400">
              <FontAwesome5 name="road" size={16} color="#cbd5e0" style={{ marginLeft: 12 }} />
              <TextInput 
                className="flex-1 p-3 text-gray-800 font-nunito"
                placeholder="Ex: 15"
                keyboardType="numeric"
                value={inputValue}
                onChangeText={setInputValue}
              />
            </View>
          </View>
        )}

        {activeTab === 'energy' && (
           <View>
             <Text className="text-xs font-bold text-gray-500 mb-2 uppercase font-nunito">Consumo (kWh)</Text>
             <View className="bg-white rounded-2xl p-1 border-2 border-gray-200 mb-6 flex-row items-center">
               <FontAwesome5 name="tachometer-alt" size={16} color="#cbd5e0" style={{ marginLeft: 12 }} />
               <TextInput 
                 className="flex-1 p-3 text-gray-800 font-nunito"
                 placeholder="Ex: 100"
                 keyboardType="numeric"
                 value={inputValue}
                 onChangeText={setInputValue}
               />
             </View>
           </View>
        )}

        {activeTab === 'food' && (
          <View className="space-y-3 mb-6">
            {[
              { id: 'meat_heavy_day', label: 'Comi muita carne', color: 'text-red-400', tag: 'Alto' },
              { id: 'vegetarian_day', label: 'Vegetariana', color: 'text-green-500', tag: 'Baixo' },
              { id: 'vegan_day', label: 'Vegana', color: 'text-green-600', tag: 'Ótimo' },
            ].map((diet) => (
              <TouchableOpacity
                key={diet.id}
                onPress={() => setSelectedDiet(diet.id)}
                className={`p-4 rounded-2xl border-2 flex-row items-center bg-white/90 ${selectedDiet === diet.id ? 'border-teal-400' : 'border-transparent'}`}
              >
                <View className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${selectedDiet === diet.id ? 'border-teal-500' : 'border-gray-300'}`}>
                  {selectedDiet === diet.id && <View className="w-2.5 h-2.5 rounded-full bg-teal-500" />}
                </View>
                <Text className="font-bold text-gray-700 font-nunito">{diet.label}</Text>
                <Text className={`ml-auto text-xs font-bold ${diet.color}`}>{diet.tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <GlassCard className="bg-teal-50 p-6 items-center mb-6 border-teal-100">
          <Text className="text-xs text-gray-500 font-bold uppercase mb-1 font-nunito">Impacto Estimado</Text>
          <Text className="text-4xl font-extrabold text-teal-600 mb-1 font-fredoka">
            {/* Simple preview calculation */}
            0.00
          </Text>
          <Text className="text-sm text-gray-500 font-nunito">kg CO2e</Text>
        </GlassCard>

        <TouchableOpacity 
          onPress={calculate}
          disabled={loading}
          className={`bg-teal-500 rounded-2xl p-4 flex-row items-center justify-center shadow-lg shadow-teal-500/40 active:scale-95 ${loading ? 'opacity-70' : ''}`}
        >
          {loading ? (
            <Text className="text-white font-bold text-lg font-nunito">Calculando...</Text>
          ) : (
            <>
              <FontAwesome5 name="calculator" size={16} color="white" style={{ marginRight: 8 }} />
              <Text className="text-white font-bold text-lg font-nunito">Calcular e Salvar</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};
