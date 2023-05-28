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
app.config['DEBUG'] = False

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
  return "<p>This is the backend server for our forum site<br>We hosted this with AWS EC2</p>"


#get all posts
@app.route("/getPosts")
@cross_origin()
def get_posts():
  '''
    return all posts in database without their ids or comments
    refs: 
      https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
      https://pymongo.readthedocs.io/en/stable/api/pymongo/cursor.html
  '''
  count = db.posts.count_documents( {} )         #get total number of items in collection
  #print(count)   #for testing purposes

  cursor = db.posts.find( {}, {"_id":False, "comments":False} )    #returns a pointer to results
  #print(cursor)  #for testing purposes
  
  posts = []
  for x in range(count):
    posts.append( cursor.next() )               #add all documents to array
  
  posts.reverse()
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
  #print( body )        #for testing, comment out later

  db.posts.insert_one(
    body,
    { WriteConcern: body }
  )
  
  return ""


@app.route("/test")
@cross_origin()
def test():
  '''
    return a single posts in database
  '''
  query = {'name':'example'}
  post = db.posts.find_one( query, {"_id":False} )    #return post without id

  return post


''' main '''
if __name__ == "__main__":
  app.run()