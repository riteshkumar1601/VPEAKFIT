import google.generativeai as genai
from dotenv import load_dotenv
import os
load_dotenv()
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
from langchain_google_genai import ChatGoogleGenerativeAI
llm=ChatGoogleGenerativeAI(model="gemini-pro",google_api_key=GOOGLE_API_KEY)
genai.configure(api_key=GOOGLE_API_KEY)
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

def exerciser(age, weight, goal, profession):

    message = HumanMessage(
        content= f"The user is a {age}-year-old {profession} weighing {weight} kg. Their goal is {goal}. "
                    "Please provide a personalized at home exercise plan consisting of basic workouts according to the age for a week so that they could follow and target diff sections of body each day to ensure good physical fitness."
    )


    response = llm.invoke([message])
    return response.content
 
