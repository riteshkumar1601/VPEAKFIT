import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)
model=genai.GenerativeModel('gemini-pro')
class Tips:
    def __init__(self, model):
        self.model = model

    def generate_tips(self, target_area, goal):
        prompt = f"Based on the user's fitness goals: '{goal}', and target area: '{target_area}', recommend some tips to avoid injury in their sport/target."

        response = self.model.generate_content(prompt)
        return response.text


model = genai.GenerativeModel('gemini-pro')
recommender = Tips(model=model)