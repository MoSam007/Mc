from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

from app import routes  
