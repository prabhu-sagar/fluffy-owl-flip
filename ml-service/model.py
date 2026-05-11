import random

class DelayPredictor:
    """
    A sophisticated prediction and scoring model for multi-modal travel.
    """
    
    def __init__(self):
        self.base_delays = {
            "flight": 5,
            "train": 10,
            "cab": 8,
            "bus": 15
        }
        
        self.weather_multipliers = {
            "clear": 1.0,
            "cloudy": 1.2,
            "rainy": 1.8
        }
        
        self.traffic_multipliers = {
            "low": 1.0,
            "medium": 1.4,
            "high": 2.2
        }

    def predict(self, mode, distance, weather, traffic_level):
        base = self.base_delays.get(mode.lower(), 10)
        weather_impact = self.weather_multipliers.get(weather.lower(), 1.0)
        traffic_impact = self.traffic_multipliers.get(traffic_level.lower(), 1.0)
        distance_factor = distance / 100.0
        
        predicted_delay = (base + distance_factor) * weather_impact * traffic_impact
        predicted_delay = round(predicted_delay, 1)
        
        # Reliability Score (0-100)
        reliability = max(0, 100 - (predicted_delay * 1.5))
        
        confidence = round(random.uniform(0.8, 0.98), 2)
        
        reasons = []
        if traffic_impact > 1.5: reasons.append("heavy traffic congestion")
        if weather_impact > 1.5: reasons.append("adverse weather conditions")
        
        reason = f"Delay primarily due to {', '.join(reasons)}." if reasons else "Optimal transit conditions."
        
        return {
            "predicted_delay": predicted_delay,
            "reliability_score": round(reliability, 1),
            "confidence": confidence,
            "reason": reason
        }

    def calculate_route_score(self, cost, duration, reliability):
        """
        Calculates a weighted score for route recommendation.
        Lower score is better (cost/time efficiency).
        """
        cost_weight = 0.4
        time_weight = 0.4
        reliability_weight = 0.2
        
        # Normalized score calculation
        score = (cost * cost_weight) + (duration * time_weight)
        final_score = score / (reliability / 100.0)
        return round(final_score, 2)

predictor = DelayPredictor()