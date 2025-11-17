"""
Tests for Tips and Missions Module
"""

import unittest
from respira_plus.tips_missions import TipsMissionsManager


class TestTipsMissionsManager(unittest.TestCase):
    
    def setUp(self):
        """Set up test manager instance."""
        self.manager = TipsMissionsManager()
    
    def test_get_all_tips(self):
        """Test getting all tips."""
        tips = self.manager.get_tips_by_category()
        self.assertGreater(len(tips), 0)
        self.assertIsInstance(tips, list)
    
    def test_get_tips_by_category_transportation(self):
        """Test filtering tips by transportation category."""
        tips = self.manager.get_tips_by_category('transportation')
        self.assertGreater(len(tips), 0)
        for tip in tips:
            self.assertEqual(tip['category'], 'transportation')
    
    def test_get_tips_by_category_energy(self):
        """Test filtering tips by energy category."""
        tips = self.manager.get_tips_by_category('energy')
        self.assertGreater(len(tips), 0)
        for tip in tips:
            self.assertEqual(tip['category'], 'energy')
    
    def test_get_tips_by_category_food(self):
        """Test filtering tips by food category."""
        tips = self.manager.get_tips_by_category('food')
        self.assertGreater(len(tips), 0)
        for tip in tips:
            self.assertEqual(tip['category'], 'food')
    
    def test_get_random_tips(self):
        """Test getting random tips."""
        tips = self.manager.get_random_tips(3)
        self.assertEqual(len(tips), 3)
        self.assertIsInstance(tips, list)
    
    def test_get_tip_by_id(self):
        """Test getting a specific tip by ID."""
        tip = self.manager.get_tip_by_id(1)
        self.assertIsNotNone(tip)
        self.assertEqual(tip['id'], 1)
        self.assertIn('title', tip)
        self.assertIn('description', tip)
    
    def test_get_tip_by_invalid_id(self):
        """Test getting a tip with invalid ID."""
        tip = self.manager.get_tip_by_id(9999)
        self.assertIsNone(tip)
    
    def test_get_all_missions(self):
        """Test getting all missions."""
        missions = self.manager.get_missions()
        self.assertGreater(len(missions), 0)
        self.assertIsInstance(missions, list)
    
    def test_get_mission_by_id(self):
        """Test getting a specific mission by ID."""
        mission = self.manager.get_mission_by_id(1)
        self.assertIsNotNone(mission)
        self.assertEqual(mission['id'], 1)
        self.assertIn('title', mission)
        self.assertIn('points', mission)
        self.assertIn('co2_savings_kg', mission)
    
    def test_get_mission_by_invalid_id(self):
        """Test getting a mission with invalid ID."""
        mission = self.manager.get_mission_by_id(9999)
        self.assertIsNone(mission)
    
    def test_get_missions_by_category(self):
        """Test filtering missions by category."""
        missions = self.manager.get_missions_by_category('transportation')
        self.assertGreater(len(missions), 0)
        for mission in missions:
            self.assertEqual(mission['category'], 'transportation')
    
    def test_tip_structure(self):
        """Test that tips have required fields."""
        tips = self.manager.get_tips_by_category()
        for tip in tips:
            self.assertIn('id', tip)
            self.assertIn('category', tip)
            self.assertIn('title', tip)
            self.assertIn('description', tip)
            self.assertIn('impact', tip)
    
    def test_mission_structure(self):
        """Test that missions have required fields."""
        missions = self.manager.get_missions()
        for mission in missions:
            self.assertIn('id', mission)
            self.assertIn('title', mission)
            self.assertIn('description', mission)
            self.assertIn('category', mission)
            self.assertIn('duration_days', mission)
            self.assertIn('points', mission)
            self.assertIn('co2_savings_kg', mission)


if __name__ == '__main__':
    unittest.main()
