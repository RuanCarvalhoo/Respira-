import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard } from '../components/GlassCard';
import { FontAwesome5 } from '@expo/vector-icons';

import { authApi } from '../services/api';

export const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      await authApi.register(name, email, password);
      // In a real app, we would store the token here
      navigation.replace('Main');
    } catch (error) {
      alert("Erro ao cadastrar. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg-app">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-teal-100 rounded-full items-center justify-center mb-4 shadow-lg shadow-teal-200">
               <FontAwesome5 name="user-plus" size={32} color="#319795" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 font-fredoka">Crie sua conta</Text>
            <Text className="text-gray-500 font-nunito mt-2">Junte-se ao movimento Respira+.</Text>
          </View>

          <GlassCard className="p-6 w-full">
            <View className="mb-4">
              <Text className="text-gray-600 font-bold mb-2 font-nunito ml-1">Nome</Text>
              <TextInput 
                className="bg-white/80 border border-gray-200 rounded-xl p-4 font-nunito text-gray-800 focus:border-teal-500"
                placeholder="Seu Nome"
                value={name}
                onChangeText={setName}
              />
            </View>

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

            <View className="mb-4">
              <Text className="text-gray-600 font-bold mb-2 font-nunito ml-1">Senha</Text>
              <TextInput 
                className="bg-white/80 border border-gray-200 rounded-xl p-4 font-nunito text-gray-800 focus:border-teal-500"
                placeholder="********"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View className="mb-6">
              <Text className="text-gray-600 font-bold mb-2 font-nunito ml-1">Confirmar Senha</Text>
              <TextInput 
                className="bg-white/80 border border-gray-200 rounded-xl p-4 font-nunito text-gray-800 focus:border-teal-500"
                placeholder="********"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity 
              onPress={handleRegister}
              disabled={loading}
              className={`bg-teal-500 rounded-xl py-4 items-center shadow-lg shadow-teal-500/30 active:scale-95 ${loading ? 'opacity-70' : ''}`}
            >
              <Text className="text-white font-bold text-lg font-nunito">{loading ? 'Cadastrando...' : 'Cadastrar'}</Text>
            </TouchableOpacity>
          </GlassCard>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600 font-nunito">Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-teal-600 font-bold font-nunito">Entrar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
