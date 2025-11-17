"""
Sustainable Tips and Missions Module

Provides users with sustainable tips and missions to reduce their carbon footprint.
"""

import random


class TipsMissionsManager:
    """
    Manages sustainable tips and missions for users.
    """
    
    TIPS = [
        {
            'id': 1,
            'category': 'transportation',
            'title': 'Use Public Transportation',
            'description': 'Switch from car to bus or train for your daily commute to reduce emissions by up to 50%.',
            'impact': 'high'
        },
        {
            'id': 2,
            'category': 'transportation',
            'title': 'Bike or Walk for Short Trips',
            'description': 'For trips under 3km, consider walking or biking instead of driving.',
            'impact': 'medium'
        },
        {
            'id': 3,
            'category': 'transportation',
            'title': 'Carpool When Possible',
            'description': 'Share rides with colleagues or friends to reduce individual carbon footprint.',
            'impact': 'medium'
        },
        {
            'id': 4,
            'category': 'energy',
            'title': 'Switch to LED Bulbs',
            'description': 'LED bulbs use 75% less energy than traditional incandescent bulbs.',
            'impact': 'medium'
        },
        {
            'id': 5,
            'category': 'energy',
            'title': 'Unplug Devices',
            'description': 'Unplug electronics when not in use to avoid phantom energy consumption.',
            'impact': 'low'
        },
        {
            'id': 6,
            'category': 'energy',
            'title': 'Use Energy-Efficient Appliances',
            'description': 'Choose appliances with high energy efficiency ratings (A++ or better).',
            'impact': 'high'
        },
        {
            'id': 7,
            'category': 'food',
            'title': 'Reduce Meat Consumption',
            'description': 'Try meatless Mondays or reduce meat portions to lower your food carbon footprint.',
            'impact': 'high'
        },
        {
            'id': 8,
            'category': 'food',
            'title': 'Buy Local Produce',
            'description': 'Choose locally grown fruits and vegetables to reduce transportation emissions.',
            'impact': 'medium'
        },
        {
            'id': 9,
            'category': 'food',
            'title': 'Reduce Food Waste',
            'description': 'Plan meals and store food properly to minimize waste.',
            'impact': 'medium'
        },
        {
            'id': 10,
            'category': 'general',
            'title': 'Recycle and Compost',
            'description': 'Separate recyclables and compost organic waste to reduce landfill emissions.',
            'impact': 'medium'
        }
    ]
    
    MISSIONS = [
        {
            'id': 1,
            'title': 'Public Transport Challenge',
            'description': 'Use public transportation for 5 consecutive workdays',
            'category': 'transportation',
            'duration_days': 5,
            'points': 100,
            'co2_savings_kg': 15.0
        },
        {
            'id': 2,
            'title': 'Zero Waste Week',
            'description': 'Reduce your food waste to zero for one week',
            'category': 'food',
            'duration_days': 7,
            'points': 150,
            'co2_savings_kg': 10.0
        },
        {
            'id': 3,
            'title': 'Meatless Week',
            'description': 'Follow a vegetarian diet for 7 days',
            'category': 'food',
            'duration_days': 7,
            'points': 200,
            'co2_savings_kg': 25.0
        },
        {
            'id': 4,
            'title': 'Energy Saver',
            'description': 'Reduce electricity consumption by 20% for one month',
            'category': 'energy',
            'duration_days': 30,
            'points': 250,
            'co2_savings_kg': 40.0
        },
        {
            'id': 5,
            'title': 'Bike to Work',
            'description': 'Commute by bike for 10 workdays',
            'category': 'transportation',
            'duration_days': 14,
            'points': 180,
            'co2_savings_kg': 30.0
        }
    ]
    
    def get_tips_by_category(self, category=None):
        """
        Get tips, optionally filtered by category.
        
        Args:
            category (str, optional): Filter by category
            
        Returns:
            list: List of tips
        """
        if category:
            return [tip for tip in self.TIPS if tip['category'] == category]
        return self.TIPS.copy()
    
    def get_random_tips(self, count=3):
        """
        Get random tips.
        
        Args:
            count (int): Number of tips to return
            
        Returns:
            list: Random tips
        """
        return random.sample(self.TIPS, min(count, len(self.TIPS)))
    
    def get_tip_by_id(self, tip_id):
        """
        Get a specific tip by ID.
        
        Args:
            tip_id (int): Tip ID
            
        Returns:
            dict or None: Tip if found
        """
        for tip in self.TIPS:
            if tip['id'] == tip_id:
                return tip.copy()
        return None
    
    def get_missions(self):
        """
        Get all available missions.
        
        Returns:
            list: List of missions
        """
        return self.MISSIONS.copy()
    
    def get_mission_by_id(self, mission_id):
        """
        Get a specific mission by ID.
        
        Args:
            mission_id (int): Mission ID
            
        Returns:
            dict or None: Mission if found
        """
        for mission in self.MISSIONS:
            if mission['id'] == mission_id:
                return mission.copy()
        return None
    
    def get_missions_by_category(self, category):
        """
        Get missions filtered by category.
        
        Args:
            category (str): Category to filter by
            
        Returns:
            list: List of missions
        """
        return [mission for mission in self.MISSIONS if mission['category'] == category]
