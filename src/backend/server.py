''' imports '''
#reading config file
import configparser
import os

#creating a server
from flask import Flask, current_app, g, request

#connecting to mongodb
from flask_pymongo import PyMongo

#CORS connection
from flask_cors import CORS, cross_origin

#something from mongodb tutorial
from werkzeug.local import LocalProxy

#network certificate
import certifi


''' configuration '''
app = Flask(__name__)   #create global flask app

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

#app route
@app.route("/")
def home_page():
  return "<p>welcome to the server</p>"


@app.route("/getPosts")
def get_posts():
  '''
    return all posts in database
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