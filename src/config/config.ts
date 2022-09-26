export const config = {
  "dev": {
    "username": "udagramtobidev",
    "password": "udagramtobidev",
    "database": "udagramtobidev",
    "host": "udagramtobidev.c7zcelp5jsui.us-east-1.rds.amazonaws.com",    
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "udacity",
    "aws_media_bucket": "udagram-tobi-dev"
  },
  "local": {
    "username": "postgres",
    "password": "postgres",
    "database": "udagramtobidev",
    "host": "localhost",    
    "dialect": "postgres",
    "aws_region": "us-east-1",
    "aws_profile": "udacity",
    "aws_media_bucket": "udagram-tobi-dev"
  },
  "jwt": {
    "secret": "2owUuvVMrm1aaFxQvYnNRTpYfL1sLAbi"
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}