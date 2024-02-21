const { Client } = require('@supabase/supabase-js');
const { exec } = require('child_process');
const supabase = new Client('your-supabase-url', 'your-supabase-key');

// Function to install Docker
function installDocker(callback) {
    const installCmd = `sudo apt-get update && sudo apt-get install -y docker.io`;
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

// Function to add a new user with sudo privileges
function addUser(username, password, callback) {
    const addUserCmd = `sudo useradd -m -s /bin/bash -G sudo ${username}`;
    const addPasswdCmd = `echo ${username}:${password} | sudo chpasswd`;
    exec(addUserCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        exec(addPasswdCmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            callback();
        });
    });
}

// Function to create a new Node and manage users
exports.createNode = async (req, res) => {
    const { data, error } = await supabase.from('nodes').insert([
        {
            user_id: req.body.user_id,
            username: req.body.username,
            password: req.body.password,
            hostname: req.body.hostname,
        },
    ]);

    if (error) {
        res.status(500).json({ error: error.message });
        return;
    }

    // Check if current user is root
    const checkUserCmd = 'whoami';
    exec(checkUserCmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stdout.trim() === 'root') {
            // Install Docker
            installDocker(() => {
                // Add new user with sudo privileges
                addUser(req.body.username, req.body.password, () => {
                    // Update Node with new username
                    supabase.from('nodes').update({ username: req.body.username }).eq('id', data[0].id).then(() => {
                        res.status(201).json({ message: 'Node created successfully' });
                    }).catch((error) => {
                        res.status(500).json({ error: error.message });
                    });
                });
            });
        } else {
            res.status(403).json({ error: 'Must be root user to create new Node' });
        }
    });
};