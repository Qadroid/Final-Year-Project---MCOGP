const { exec } = require('child_process');

// Function to install a Docker image
function installDockerImage(imageName, callback) {
    const installCmd = `sudo docker pull ${imageName}`;
    exec(installCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        callback();
    });
}

// Container controller
module.exports = {
    // Get all containers for a user
    getContainers: async (req, res) => {
        const { userId } = req.params;

        const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('user_id', userId);

        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(data);
        }
    },

    // Get a single container by ID
    getContainer: async (req, res) => {
        const { id } = req.params;

        const { data, error } = await supabase
        .from('containers')
        .select('*')
        .eq('id', id)
        .single();

        if (error) {
            res.status(500).send(error.message);
        } else {
            res.json(data);
        }
    },

    // Create a new container
    createContainer: async (req, res) => {
        const { user_id, name, image, pullBehaviour, volumes, ports, node } = req.body;
    
        // If the pull behavior is not specified, set it to 'ifnotexists'
        if (!pullBehaviour) {
            pullBehaviour = 'ifnotexists';
        }
    
        // If the pull behavior is 'ifnotexists', check if the image is already installed
        if (pullBehaviour === 'ifnotexists') {
        try {
            const { stdout, error } = await execSync(`sudo docker image inspect ${image}`);
            if (error) {
                // Image not found, install it
                installDockerImage(image, async () => {
                    const { data, error } = await supabase
                    .from('containers')
                    .insert([
                        {
                            user_id,
                            name,
                            image,
                            pullBehaviour,
                            volumes,
                            ports,
                            node,
                        },
                    ]);
        
                    if (error) {
                        res.status(500).send(error.message);
                    } else {
                        res.json(data);
                    }
                });
            } else {
                // Image already exists, proceed with creation
                const { data, error } = await supabase
                    .from('containers')
                    .insert([
                        {
                            user_id,
                            name,
                            image,
                            pullBehaviour,
                            volumes,
                            ports,
                            node,
                        },
                    ]);
        
                if (error) {
                    res.status(500).send(error.message);
                } else {
                    res.json(data);
                }
            }
            } catch (error) {
                // Handle error
                res.status(500).send(error.message);
            }   
        } else {
            // Pull behavior is 'pull', proceed with installation
            installDockerImage(image, async () => {
                const { data, error } = await supabase
                .from('containers')
                .insert([
                    {
                        user_id,
                        name,
                        image,
                        pullBehaviour,
                        volumes,
                        ports,
                        node,
                    },
                ]);
        
                if (error) {
                    res.status(500).send(error.message);
                } else {
                    res.json(data);
                }
            });
        }
    },

     // Update a container
    updateContainer: async (req, res) => {
        const { id } = req.params;
        const { user_id, name, image, pullBehaviour, volumes, ports, node } = req.body;

        const { data, error } = await supabase
        .from('containers')
        .update({
            user_id,
            name,
            image,
            pullBehaviour,
            volumes,
            ports,
            node,
        })
        .eq('id', id);

        if (error) {
        res.status(500).send(error.message);
        } else {
        res.json(data);
        }
    },

    // Delete a container
    deleteContainer: async (req, res) => {
        const { id } = req.params;

        const { data, error } = await supabase
        .from('containers')
        .delete()
        .eq('id', id);

        if (error) {
        res.status(500).send(error.message);
        } else {
        res.json(data);
        }
    },
};