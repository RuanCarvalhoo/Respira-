"""
Testes para o Módulo de Perfil de Usuário
"""

import unittest
from datetime import datetime
from respira_plus.user_profile import UserProfile


class TestUserProfile(unittest.TestCase):
    
    def setUp(self):
        """Configura o perfil de usuário de teste."""
        self.user = UserProfile("test001", "Test User")
    
    def test_user_creation(self):
        """Testa a criação do perfil de usuário."""
        self.assertEqual(self.user.user_id, "test001")
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.total_points, 0)
        self.assertEqual(len(self.user.emissions_history), 0)
    
    def test_add_emission_record(self):
        """Testa a adição de registros de emissão."""
        date = datetime.now().isoformat()
        breakdown = {'transportation': 10.0, 'energy': 5.0, 'food': 3.0}
        
        self.user.add_emission_record(date, 18.0, breakdown)
        
        self.assertEqual(len(self.user.emissions_history), 1)
        self.assertEqual(self.user.emissions_history[0]['total_emissions_kg'], 18.0)
    
    def test_start_mission(self):
        """Testa o início de uma missão."""
        mission = {
            'id': 1,
            'title': 'Test Mission',
            'duration_days': 7,
            'points': 100,
            'co2_savings_kg': 20.0
        }
        
        self.user.start_mission(mission)
        
        self.assertEqual(len(self.user.active_missions), 1)
        self.assertEqual(self.user.active_missions[0]['mission_id'], 1)
        self.assertEqual(self.user.active_missions[0]['status'], 'active')
    
    def test_complete_mission(self):
        """Testa a conclusão de uma missão."""
        mission = {
            'id': 1,
            'title': 'Test Mission',
            'duration_days': 7,
            'points': 100,
            'co2_savings_kg': 20.0
        }
        
        self.user.start_mission(mission)
        result = self.user.complete_mission(1)
        
        self.assertTrue(result)
        self.assertEqual(len(self.user.active_missions), 0)
        self.assertEqual(len(self.user.completed_missions), 1)
        self.assertEqual(self.user.total_points, 100)
    
    def test_complete_nonexistent_mission(self):
        """Testa a conclusão de uma missão que não existe."""
        result = self.user.complete_mission(999)
        self.assertFalse(result)
    
    def test_get_total_emissions(self):
        """Testa o cálculo do total de emissões."""
        date = datetime.now().isoformat()
        breakdown = {'transportation': 10.0, 'energy': 5.0, 'food': 3.0}
        
        self.user.add_emission_record(date, 18.0, breakdown)
        self.user.add_emission_record(date, 22.0, breakdown)
        
        total = self.user.get_total_emissions()
        self.assertEqual(total, 40.0)
    
    def test_get_total_co2_saved(self):
        """Testa o cálculo do total de CO2 economizado."""
        mission1 = {
            'id': 1,
            'title': 'Mission 1',
            'duration_days': 7,
            'points': 100,
            'co2_savings_kg': 20.0
        }
        mission2 = {
            'id': 2,
            'title': 'Mission 2',
            'duration_days': 7,
            'points': 150,
            'co2_savings_kg': 30.0
        }
        
        self.user.start_mission(mission1)
        self.user.complete_mission(1)
        self.user.start_mission(mission2)
        self.user.complete_mission(2)
        
        total_saved = self.user.get_total_co2_saved()
        self.assertEqual(total_saved, 50.0)
    
    def test_get_statistics(self):
        """Testa a obtenção das estatísticas do usuário."""
        date = datetime.now().isoformat()
        breakdown = {'transportation': 10.0, 'energy': 5.0, 'food': 3.0}
        
        self.user.add_emission_record(date, 18.0, breakdown)
        
        mission = {
            'id': 1,
            'title': 'Test Mission',
            'duration_days': 7,
            'points': 100,
            'co2_savings_kg': 20.0
        }
        self.user.start_mission(mission)
        self.user.complete_mission(1)
        
        stats = self.user.get_statistics()
        
        self.assertEqual(stats['user_id'], "test001")
        self.assertEqual(stats['name'], "Test User")
        self.assertEqual(stats['total_points'], 100)
        self.assertEqual(stats['total_emissions_kg'], 18.0)
        self.assertEqual(stats['total_co2_saved_kg'], 20.0)
        self.assertEqual(stats['missions_completed'], 1)
    
    def test_to_dict(self):
        """Testa a conversão do perfil para dicionário."""
        data = self.user.to_dict()
        
        self.assertIsInstance(data, dict)
        self.assertIn('user_id', data)
        self.assertIn('name', data)
        self.assertIn('total_points', data)
        self.assertIn('emissions_history', data)
    
    def test_from_dict(self):
        """Testa a criação do perfil a partir de um dicionário."""
        data = {
            'user_id': 'test002',
            'name': 'Test User 2',
            'total_points': 200,
            'emissions_history': [],
            'completed_missions': [],
            'active_missions': []
        }
        
        user = UserProfile.from_dict(data)
        
        self.assertEqual(user.user_id, 'test002')
        self.assertEqual(user.name, 'Test User 2')
        self.assertEqual(user.total_points, 200)


if __name__ == '__main__':
    unittest.main()
