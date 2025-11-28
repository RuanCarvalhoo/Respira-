import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { FontAwesome5 } from '@expo/vector-icons';

import { authApi } from '../services/api';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await authApi.login(email, password);
      // In a real app, we would store the token here
      navigation.replace('Main');
    } catch (error) {
      alert("Erro ao entrar. Verifique suas credenciais.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-6"
      >
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-teal-100 rounded-full items-center justify-center mb-4 shadow-lg shadow-teal-200">
             <FontAwesome5 name="leaf" size={40} color="#319795" />
          </View>
          <Text className="text-3xl font-bold text-gray-800 font-fredoka">Respira+</Text>
          <Text className="text-gray-500 font-nunito mt-2">Sua jornada sustentável começa aqui.</Text>
        </View>

        <GlassCard className="p-6 w-full">
          <Text className="text-xl font-bold text-gray-800 mb-6 font-fredoka text-center">Bem-vindo de volta!</Text>
          
          <View className="mb-4">
            <Text className="text-gray-600 font-bold mb-2 font-nunito ml-1">Email</Text>
            <TextInput 
              className="bg-white/80 border border-gray-200 rounded-xl p-4 font-nunito text-gray-800 focus:border-teal-500"
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-600 font-bold mb-2 font-nunito ml-1">Senha</Text>
            <TextInput 
              className="bg-white/80 border border-gray-200 rounded-xl p-4 font-nunito text-gray-800 focus:border-teal-500"
              placeholder="********"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            disabled={loading}
            className={`bg-teal-500 rounded-xl py-4 items-center shadow-lg shadow-teal-500/30 active:scale-95 ${loading ? 'opacity-70' : ''}`}
          >
            <Text className="text-white font-bold text-lg font-nunito">{loading ? 'Entrando...' : 'Entrar'}</Text>
          </TouchableOpacity>
        </GlassCard>

        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-600 font-nunito">Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-teal-600 font-bold font-nunito">Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
