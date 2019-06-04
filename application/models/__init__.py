from models.base_model import BaseModel
from models.level import Level
from models.reward import Reward
from models.user import User
from models.engine import storage

CLASS_DICT = storage.Storage.CLASS_DICT
database = storage.Storage()

database.reload()
