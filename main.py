"""
Respira+ Main Application

Command-line interface for the Respira+ carbon footprint tracking application.
"""

import sys
from datetime import datetime
from respira_plus.carbon_calculator import CarbonCalculator
from respira_plus.tips_missions import TipsMissionsManager
from respira_plus.user_profile import UserProfile


class RespiraApp:
    """
    Main application class for Respira+.
    """
    
    def __init__(self):
        self.calculator = CarbonCalculator()
        self.tips_manager = TipsMissionsManager()
        self.user = None
    
    def create_user(self, user_id, name):
        """Create a new user profile."""
        self.user = UserProfile(user_id, name)
        return self.user
    
    def calculate_daily_footprint(self, transportation_data, energy_data, food_data):
        """
        Calculate daily carbon footprint.
        
        Args:
            transportation_data (list): List of (transport_type, distance) tuples
            energy_data (list): List of (energy_type, consumption) tuples
            food_data (tuple): (diet_type, days)
            
        Returns:
            dict: Calculation results
        """
        self.calculator.reset()
        
        # Calculate transportation emissions
        for transport_type, distance in transportation_data:
            self.calculator.calculate_transportation(transport_type, distance)
        
        # Calculate energy emissions
        for energy_type, consumption in energy_data:
            self.calculator.calculate_energy(energy_type, consumption)
        
        # Calculate food emissions
        diet_type, days = food_data
        self.calculator.calculate_food(diet_type, days)
        
        results = {
            'total_emissions_kg': self.calculator.get_total_emissions(),
            'breakdown': self.calculator.get_breakdown(),
            'date': datetime.now().isoformat()
        }
        
        # Add to user profile if available
        if self.user:
            self.user.add_emission_record(
                results['date'],
                results['total_emissions_kg'],
                results['breakdown']
            )
        
        return results
    
    def display_results(self, results):
        """Display calculation results in a formatted way."""
        print("\n" + "="*50)
        print("CARBON FOOTPRINT CALCULATION RESULTS")
        print("="*50)
        print(f"\nDate: {results['date'][:10]}")
        print(f"\nTotal Emissions: {results['total_emissions_kg']:.2f} kg CO2e")
        print("\nBreakdown by Category:")
        print(f"  Transportation: {results['breakdown']['transportation']:.2f} kg CO2e")
        print(f"  Energy:         {results['breakdown']['energy']:.2f} kg CO2e")
        print(f"  Food:           {results['breakdown']['food']:.2f} kg CO2e")
        print("\n" + "="*50)
    
    def show_tips(self, category=None, count=3):
        """Display sustainable tips."""
        if category:
            tips = self.tips_manager.get_tips_by_category(category)
        else:
            tips = self.tips_manager.get_random_tips(count)
        
        print("\n" + "="*50)
        print("SUSTAINABLE TIPS")
        print("="*50)
        for tip in tips:
            print(f"\n{tip['title']} ({tip['category'].upper()})")
            print(f"  {tip['description']}")
            print(f"  Impact: {tip['impact'].upper()}")
        print("\n" + "="*50)
    
    def show_missions(self):
        """Display available missions."""
        missions = self.tips_manager.get_missions()
        
        print("\n" + "="*50)
        print("AVAILABLE MISSIONS")
        print("="*50)
        for mission in missions:
            print(f"\n{mission['id']}. {mission['title']}")
            print(f"   {mission['description']}")
            print(f"   Duration: {mission['duration_days']} days")
            print(f"   Rewards: {mission['points']} points, {mission['co2_savings_kg']} kg CO2 saved")
        print("\n" + "="*50)
    
    def show_user_stats(self):
        """Display user statistics."""
        if not self.user:
            print("\nNo user profile available. Create a user first.")
            return
        
        stats = self.user.get_statistics()
        
        print("\n" + "="*50)
        print("USER STATISTICS")
        print("="*50)
        print(f"\nName: {stats['name']}")
        print(f"User ID: {stats['user_id']}")
        print(f"Points: {stats['total_points']}")
        print(f"\nCarbon Footprint:")
        print(f"  Total Emissions: {stats['total_emissions_kg']:.2f} kg CO2e")
        print(f"  CO2 Saved (missions): {stats['total_co2_saved_kg']:.2f} kg CO2e")
        print(f"  Net Impact: {stats['net_impact_kg']:.2f} kg CO2e")
        print(f"\nActivity:")
        print(f"  Missions Completed: {stats['missions_completed']}")
        print(f"  Active Missions: {stats['active_missions']}")
        print(f"  Last 30 days emissions: {stats['recent_30_days_emissions']:.2f} kg CO2e")
        print("\n" + "="*50)


def main():
    """Main entry point for the application."""
    print("\n" + "="*50)
    print("RESPIRA+ - Carbon Footprint Tracker")
    print("Based on ODS 13 - Climate Action")
    print("="*50)
    
    app = RespiraApp()
    
    # Create a demo user
    user = app.create_user("user001", "Demo User")
    print(f"\nUser created: {user.name}")
    
    # Example: Calculate weekly carbon footprint
    print("\n--- WEEKLY CARBON FOOTPRINT CALCULATION ---")
    
    # Transportation: 5 days commuting by car (20km/day)
    transportation_data = [
        ('car_gasoline_km', 100),  # 5 days * 20km
    ]
    
    # Energy: weekly electricity consumption
    energy_data = [
        ('electricity_kwh', 50),  # 50 kWh per week
    ]
    
    # Food: medium meat consumption
    food_data = ('meat_medium_day', 7)  # 7 days
    
    results = app.calculate_daily_footprint(transportation_data, energy_data, food_data)
    app.display_results(results)
    
    # Show sustainable tips
    app.show_tips(count=3)
    
    # Show available missions
    app.show_missions()
    
    # Start a mission
    missions = app.tips_manager.get_missions()
    user.start_mission(missions[0])  # Start first mission
    print(f"\n✓ Mission started: {missions[0]['title']}")
    
    # Show user statistics
    app.show_user_stats()
    
    print("\n" + "="*50)
    print("Thank you for using Respira+!")
    print("Together we can make a difference for our planet!")
    print("="*50 + "\n")


if __name__ == "__main__":
    main()
