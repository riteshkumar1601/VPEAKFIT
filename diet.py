import google.generativeai as genai
from dotenv import load_dotenv
import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
import PIL.Image
load_dotenv()
#configure keys
GOOGLE_API_KEY=os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

#model
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=GOOGLE_API_KEY)
image = PIL.Image.open("download.png")


def rate_meal(image_path,age,weight,goal,profession):

    message = HumanMessage(
        content=[
            {
                "type": "text",
                "text": f"As a nutritionist of top class please tell the review of this meal...if the person is of age {age} and weight {weight} please tell if this meal is sufficeint for them for not. Also consider goal of the user{goal}. if you think the portions are too large or too small according to the age please state a warning.Make suggestions about the meal accordingly so that it could be as personlized as possible. pay importance to the profession{profession} of the user and give a personalized response. if u dont know the units or the exact count of number of items in the picture take an avg of a how many of them are consumed in one meal by a person of given age. " # Use f-string for formatting
            },
            {
                "type": "image_url",
                "image_url": image_path
            }
        ]
    )


    response = llm.invoke([message])
    return response.content

def bmi(weight, height):

    bmi_value = weight / (height * height)

    message = HumanMessage(
        content=f"The user's BMI is {bmi_value:.2f}. Please classify it into the appropriate zone (underweight, normal, overweight, etc. also state that bmi is not the only factor to chek ones physical well being provide some tips to get the user back into fight category ie; if the person is obese provide suitable tips,if underweight proive suitable tips...answer this as if your are a top nutritionist at a hospital. try to avoid paragraphs and give information in poitns so as to make it more appealing)."
    )


    response = llm.invoke([message])


    return response.content