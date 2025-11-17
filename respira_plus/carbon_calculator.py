"""
Carbon Footprint Calculator Module

Calculates carbon emissions from various activities:
- Transportation (car, bus, train, plane)
- Energy consumption (electricity, heating)
- Food/diet choices
"""


class CarbonCalculator:
    """
    Calculates carbon footprint based on user activities.
    Emissions are measured in kg CO2e (carbon dioxide equivalent).
    """
    
    # Emission factors (kg CO2e per unit)
    EMISSION_FACTORS = {
        'transportation': {
            'car_gasoline_km': 0.192,      # per km
            'car_diesel_km': 0.171,        # per km
            'car_electric_km': 0.053,      # per km
            'bus_km': 0.089,               # per km
            'train_km': 0.041,             # per km
            'plane_short_km': 0.255,       # per km (flights < 1500km)
            'plane_long_km': 0.195,        # per km (flights > 1500km)
            'bike_km': 0.0,                # per km
            'walk_km': 0.0,                # per km
        },
        'energy': {
            'electricity_kwh': 0.233,      # per kWh (global average)
            'natural_gas_kwh': 0.185,      # per kWh
            'heating_oil_liter': 2.52,     # per liter
        },
        'food': {
            'meat_heavy_day': 7.19,        # per day
            'meat_medium_day': 5.63,       # per day
            'meat_low_day': 4.67,          # per day
            'pescatarian_day': 3.91,       # per day
            'vegetarian_day': 3.81,        # per day
            'vegan_day': 2.89,             # per day
        }
    }
    
    def __init__(self):
        self.total_emissions = 0.0
        self.breakdown = {
            'transportation': 0.0,
            'energy': 0.0,
            'food': 0.0
        }
    
    def calculate_transportation(self, transport_type, distance):
        """
        Calculate emissions from transportation.
        
        Args:
            transport_type (str): Type of transport (e.g., 'car_gasoline_km', 'bus_km')
            distance (float): Distance traveled in kilometers
            
        Returns:
            float: CO2 emissions in kg
        """
        if transport_type not in self.EMISSION_FACTORS['transportation']:
            raise ValueError(f"Unknown transport type: {transport_type}")
        
        emissions = self.EMISSION_FACTORS['transportation'][transport_type] * distance
        self.breakdown['transportation'] += emissions
        self.total_emissions += emissions
        return emissions
    
    def calculate_energy(self, energy_type, consumption):
        """
        Calculate emissions from energy consumption.
        
        Args:
            energy_type (str): Type of energy (e.g., 'electricity_kwh', 'natural_gas_kwh')
            consumption (float): Amount consumed (kWh or liters)
            
        Returns:
            float: CO2 emissions in kg
        """
        if energy_type not in self.EMISSION_FACTORS['energy']:
            raise ValueError(f"Unknown energy type: {energy_type}")
        
        emissions = self.EMISSION_FACTORS['energy'][energy_type] * consumption
        self.breakdown['energy'] += emissions
        self.total_emissions += emissions
        return emissions
    
    def calculate_food(self, diet_type, days):
        """
        Calculate emissions from food consumption based on diet type.
        
        Args:
            diet_type (str): Type of diet (e.g., 'meat_heavy_day', 'vegan_day')
            days (int): Number of days
            
        Returns:
            float: CO2 emissions in kg
        """
        if diet_type not in self.EMISSION_FACTORS['food']:
            raise ValueError(f"Unknown diet type: {diet_type}")
        
        emissions = self.EMISSION_FACTORS['food'][diet_type] * days
        self.breakdown['food'] += emissions
        self.total_emissions += emissions
        return emissions
    
    def get_total_emissions(self):
        """Get total carbon emissions calculated."""
        return self.total_emissions
    
    def get_breakdown(self):
        """Get emissions breakdown by category."""
        return self.breakdown.copy()
    
    def reset(self):
        """Reset all calculations."""
        self.total_emissions = 0.0
        self.breakdown = {
            'transportation': 0.0,
            'energy': 0.0,
            'food': 0.0
        }
