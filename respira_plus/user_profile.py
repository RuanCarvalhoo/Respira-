"""
User Progress Tracking Module

Tracks user progress, carbon footprint history, and mission completion.
"""

from datetime import datetime, timedelta
import json


class UserProfile:
    """
    Represents a user profile with carbon footprint tracking.
    """
    
    def __init__(self, user_id, name):
        self.user_id = user_id
        self.name = name
        self.total_points = 0
        self.emissions_history = []
        self.completed_missions = []
        self.active_missions = []
        self.created_at = datetime.now().isoformat()
    
    def add_emission_record(self, date, emissions_kg, breakdown):
        """
        Add a carbon emission record.
        
        Args:
            date (str): Date in ISO format
            emissions_kg (float): Total emissions in kg CO2e
            breakdown (dict): Breakdown by category
        """
        record = {
            'date': date,
            'total_emissions_kg': emissions_kg,
            'breakdown': breakdown
        }
        self.emissions_history.append(record)
    
    def start_mission(self, mission):
        """
        Start a new mission.
        
        Args:
            mission (dict): Mission details
        """
        mission_record = {
            'mission_id': mission['id'],
            'title': mission['title'],
            'started_at': datetime.now().isoformat(),
            'duration_days': mission['duration_days'],
            'points': mission['points'],
            'co2_savings_kg': mission['co2_savings_kg'],
            'status': 'active'
        }
        self.active_missions.append(mission_record)
    
    def complete_mission(self, mission_id):
        """
        Mark a mission as completed.
        
        Args:
            mission_id (int): Mission ID to complete
            
        Returns:
            bool: True if mission was found and completed
        """
        for i, mission in enumerate(self.active_missions):
            if mission['mission_id'] == mission_id:
                mission['status'] = 'completed'
                mission['completed_at'] = datetime.now().isoformat()
                self.total_points += mission['points']
                self.completed_missions.append(mission)
                self.active_missions.pop(i)
                return True
        return False
    
    def get_total_emissions(self):
        """
        Calculate total emissions across all records.
        
        Returns:
            float: Total emissions in kg CO2e
        """
        return sum(record['total_emissions_kg'] for record in self.emissions_history)
    
    def get_emissions_by_period(self, days=30):
        """
        Get emissions for a specific period.
        
        Args:
            days (int): Number of days to look back
            
        Returns:
            list: Emission records within the period
        """
        cutoff_date = (datetime.now() - timedelta(days=days)).isoformat()
        return [
            record for record in self.emissions_history
            if record['date'] >= cutoff_date
        ]
    
    def get_total_co2_saved(self):
        """
        Calculate total CO2 saved from completed missions.
        
        Returns:
            float: Total CO2 saved in kg
        """
        return sum(mission['co2_savings_kg'] for mission in self.completed_missions)
    
    def get_statistics(self):
        """
        Get user statistics summary.
        
        Returns:
            dict: User statistics
        """
        total_emissions = self.get_total_emissions()
        total_saved = self.get_total_co2_saved()
        recent_emissions = self.get_emissions_by_period(30)
        
        return {
            'user_id': self.user_id,
            'name': self.name,
            'total_points': self.total_points,
            'total_emissions_kg': total_emissions,
            'total_co2_saved_kg': total_saved,
            'net_impact_kg': total_emissions - total_saved,
            'missions_completed': len(self.completed_missions),
            'active_missions': len(self.active_missions),
            'recent_30_days_emissions': sum(r['total_emissions_kg'] for r in recent_emissions),
            'created_at': self.created_at
        }
    
    def to_dict(self):
        """
        Convert profile to dictionary.
        
        Returns:
            dict: Profile data
        """
        return {
            'user_id': self.user_id,
            'name': self.name,
            'total_points': self.total_points,
            'emissions_history': self.emissions_history,
            'completed_missions': self.completed_missions,
            'active_missions': self.active_missions,
            'created_at': self.created_at
        }
    
    @classmethod
    def from_dict(cls, data):
        """
        Create profile from dictionary.
        
        Args:
            data (dict): Profile data
            
        Returns:
            UserProfile: User profile instance
        """
        profile = cls(data['user_id'], data['name'])
        profile.total_points = data.get('total_points', 0)
        profile.emissions_history = data.get('emissions_history', [])
        profile.completed_missions = data.get('completed_missions', [])
        profile.active_missions = data.get('active_missions', [])
        profile.created_at = data.get('created_at', datetime.now().isoformat())
        return profile
