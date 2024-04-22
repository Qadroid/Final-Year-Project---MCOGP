# MCOGP
An application built to host a frontend used for convenient management of containers and clusters. It offers a template/recipe system that can be used to setup complex deployments with ease and simplicity.

# Setup
The application is currently in a Docker container format by default. It can be setup by running the following commands:
` INSERT COMMMANDS HERE `

# Usage
The frontend UI can be reached by going to `localhost:3000` or whatever port was specified in the previous commands.

From here the default setup will commence and guide the user through the first install instructions.

# How it works
The installation wizard will launch a container for the database and also specify a dockerfile/compose for the OpenTofu container. The OpenTofu container will be deployed on demand to make changes to the infrastructure and then automatically shut down to avoid using unnecessary resources. 

The files will be store in either a bucket with Supabase, or as JSON configurations in the database.
These will be manipulated only by the main MCOGP application. The database has hooks ready to deploy changes made with the GUI.