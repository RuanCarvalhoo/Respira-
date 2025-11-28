import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlassCard } from './GlassCard';
import { FontAwesome5 } from '@expo/vector-icons';

interface ConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  icon?: string;
}

export const ConfirmationModal = ({
  visible,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  icon = "question-circle"
}: ConfirmationModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <GlassCard className="w-full max-w-sm p-6 items-center">
          <View className="w-16 h-16 bg-teal-100 rounded-full items-center justify-center mb-4">
            <FontAwesome5 name={icon} size={32} color="#319795" />
          </View>
          
          <Text className="text-xl font-bold text-gray-800 font-fredoka mb-2 text-center">
            {title}
          </Text>
          
          <Text className="text-gray-600 font-nunito text-center mb-6 leading-5">
            {message}
          </Text>

          <View className="flex-row gap-3 w-full">
            <TouchableOpacity 
              onPress={onCancel}
              className="flex-1 py-3 rounded-xl bg-gray-200 items-center"
            >
              <Text className="font-bold text-gray-600 font-nunito">{cancelText}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={onConfirm}
              className="flex-1 py-3 rounded-xl bg-teal-500 items-center"
            >
              <Text className="font-bold text-white font-nunito">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </GlassCard>
      </View>
    </Modal>
  );
};
