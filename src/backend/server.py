''' imports '''
#import string

#reading config file
import configparser
import os

#creating a server
from flask import Flask, current_app, g, request

#connecting to mongodb
from flask_pymongo import PyMongo

#CORS connection
from flask_cors import CORS, cross_origin
from pymongo import WriteConcern

#something from mongodb tutorial
from werkzeug.local import LocalProxy

#network certificate
import certifi


''' configuration '''
app = Flask(__name__)   #create global flask app
CORS( app )

#read config.ini
config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join("config.ini")))

#configure flask app
app.config['MONGO_URI'] = config['Database']['DB_URI']
app.config['DEBUG'] = True

#network certificate
certificate = certifi.where()


#create pymongo instance
def get_db():
  ''' Configuration '''
  db = getattr( g, "_database", None )

  if db is None:
    db = g._database = PyMongo( current_app, tlsCAFile=certificate ).db
    print( "DB:", db )
  
  return db

db = LocalProxy( get_db )


''' app routes  '''
#home
@app.route("/")
def home_page():
  '''
    homepage of backend server
    display basic message
  '''
  return "<p>welcome to the server</p>"


@app.route("/getPosts")
@cross_origin()
def get_posts():
  '''
    return all posts in database without their ids
    ref: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
  '''
  query = {}

  posts = db.posts.find( query, {"_id":False} )    #returns a pointer to results

  '''
  posts = []
  while( cursor.hasNext() ):
    posts.append( cursor.next() )
  '''

  return posts

#add new post
@app.put("/newPost")
@cross_origin()
def new_post():
  '''
    add a new post to database
    throws "application must write bytes" error in console but *does* update database??
    ref: https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/
  '''
  body = request.json
  print( body )

  db.posts.insert_one(
    body,
    { WriteConcern: body }
  )
  
  return ""

@app.route("/test")
def test():
  '''
    return a single posts in database
  '''
  query = {'author':'Guy'}
  post = db.posts.find_one( query, {"_id":False} )    #return post without id

  return post

#main
if __name__ == "__main__":
  app.run()