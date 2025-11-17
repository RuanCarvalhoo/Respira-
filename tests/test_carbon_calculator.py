"""
Tests for Carbon Calculator Module
"""

import unittest
from respira_plus.carbon_calculator import CarbonCalculator


class TestCarbonCalculator(unittest.TestCase):
    
    def setUp(self):
        """Set up test calculator instance."""
        self.calculator = CarbonCalculator()
    
    def test_calculate_transportation_car(self):
        """Test car transportation emissions calculation."""
        emissions = self.calculator.calculate_transportation('car_gasoline_km', 100)
        self.assertAlmostEqual(emissions, 19.2, places=1)
        self.assertAlmostEqual(self.calculator.breakdown['transportation'], 19.2, places=1)
    
    def test_calculate_transportation_bus(self):
        """Test bus transportation emissions calculation."""
        emissions = self.calculator.calculate_transportation('bus_km', 50)
        self.assertAlmostEqual(emissions, 4.45, places=2)
    
    def test_calculate_transportation_zero_emissions(self):
        """Test zero emission transportation (bike, walk)."""
        emissions = self.calculator.calculate_transportation('bike_km', 10)
        self.assertEqual(emissions, 0.0)
    
    def test_calculate_energy_electricity(self):
        """Test electricity consumption emissions."""
        emissions = self.calculator.calculate_energy('electricity_kwh', 100)
        self.assertAlmostEqual(emissions, 23.3, places=1)
        self.assertAlmostEqual(self.calculator.breakdown['energy'], 23.3, places=1)
    
    def test_calculate_food_vegan(self):
        """Test vegan diet emissions."""
        emissions = self.calculator.calculate_food('vegan_day', 7)
        self.assertAlmostEqual(emissions, 20.23, places=2)
    
    def test_calculate_food_meat_heavy(self):
        """Test meat-heavy diet emissions."""
        emissions = self.calculator.calculate_food('meat_heavy_day', 7)
        self.assertAlmostEqual(emissions, 50.33, places=2)
    
    def test_total_emissions(self):
        """Test total emissions calculation."""
        self.calculator.calculate_transportation('car_gasoline_km', 50)
        self.calculator.calculate_energy('electricity_kwh', 50)
        self.calculator.calculate_food('vegetarian_day', 7)
        
        total = self.calculator.get_total_emissions()
        expected = (0.192 * 50) + (0.233 * 50) + (3.81 * 7)
        self.assertAlmostEqual(total, expected, places=2)
    
    def test_breakdown(self):
        """Test emissions breakdown by category."""
        self.calculator.calculate_transportation('bus_km', 100)
        self.calculator.calculate_energy('electricity_kwh', 100)
        self.calculator.calculate_food('vegan_day', 7)
        
        breakdown = self.calculator.get_breakdown()
        self.assertIn('transportation', breakdown)
        self.assertIn('energy', breakdown)
        self.assertIn('food', breakdown)
    
    def test_reset(self):
        """Test calculator reset."""
        self.calculator.calculate_transportation('car_gasoline_km', 100)
        self.calculator.reset()
        
        self.assertEqual(self.calculator.get_total_emissions(), 0.0)
        breakdown = self.calculator.get_breakdown()
        self.assertEqual(breakdown['transportation'], 0.0)
        self.assertEqual(breakdown['energy'], 0.0)
        self.assertEqual(breakdown['food'], 0.0)
    
    def test_invalid_transport_type(self):
        """Test error handling for invalid transport type."""
        with self.assertRaises(ValueError):
            self.calculator.calculate_transportation('invalid_type', 100)
    
    def test_invalid_energy_type(self):
        """Test error handling for invalid energy type."""
        with self.assertRaises(ValueError):
            self.calculator.calculate_energy('invalid_type', 100)
    
    def test_invalid_diet_type(self):
        """Test error handling for invalid diet type."""
        with self.assertRaises(ValueError):
            self.calculator.calculate_food('invalid_type', 7)


if __name__ == '__main__':
    unittest.main()
