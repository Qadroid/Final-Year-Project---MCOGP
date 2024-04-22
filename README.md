# MCOGP
An application built to host a frontend used for convenient management of containers and clusters. It offers a template/recipe system that can be used to setup complex deployments with ease and simplicity.

# Requirements
This application in it's current state only requires Docker to be installed on the test system.
All other requirements are handled from within the containers deployed by the application.

The recommended system requirements are:
Linux or MacOS is preferred. (Due to how K3d in setup)
If using Windows, ensure Docker is running with WSL.

Internet access is required

CPU: 4 cores ( x86 is recommended for compatibility )
RAM: 4-8 GB
STORAGE: 10 GB
>[!NOTE]- These requirements are based on the assumption only the demo will be tested and no more. Assign more resources as needed.

# Setup
The application is currently in a Docker container format by default. Due to the current nature of the projects progress, it only will deploy a cluster inside docker containers for the purposes of easier development and testing. It can be setup by running the following command:
```bash
./launch.sh 
```

You can also customise the localhost port by adding the chosen port as an argument:
```bash
./launch.sh {PORT}
```

# Usage
The frontend UI can be reached by going to `localhost:3000` or whatever port was specified in the previous commands.

From here the default setup will commence and guide the user through the first install instructions.

# How it works
The installation wizard will launch a container for the database and also specify a dockerfile/compose for the OpenTofu container. The OpenTofu container will be deployed on demand to make changes to the infrastructure and then automatically shut down to avoid using unnecessary resources. 

The files will be store in either a bucket with Supabase, or as JSON configurations in the database.
These will be manipulated only by the main MCOGP application. The database has hooks ready to deploy changes made with the GUI.