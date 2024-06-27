import inquirer from 'inquirer';

const users = [];

const genders = ['Male', 'Female', 'Other'];

async function addUser() {
    try {
        while (true) {
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Enter user's name (or press ENTER to stop adding users):",
                },
            ]);

            if (answers.name.trim() === '') {
                return false;
            }

            const nameExists = users.some(user => user.name.toLowerCase() === answers.name.trim().toLowerCase());

            if (nameExists) {
                console.log('A user with this name already exists. Please enter a different name.');
            } else {
                const userInfo = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'gender',
                        message: "Select user's gender:",
                        choices: genders,
                    }
                ]);

                let ageValid = false;
                let age;
                while (!ageValid) {
                    const ageAnswer = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'age',
                            message: "Enter user's age:",
                            validate: (value) => {
                                age = parseInt(value, 10);
                                if (isNaN(age) || age <= 0) {
                                    return 'Please enter a valid age.';
                                }
                                ageValid = true;
                                return true;
                            },
                        }
                    ]);
                }

                users.push({ name: answers.name.trim(), gender: userInfo.gender, age });
                console.log('User added successfully!');
                return true;
            }
        }
    } catch (error) {
        console.error('Error adding user: ', error);
        return false;
    }
}

async function findUser() {
    try {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the user you want to find:',
            },
        ]);

        const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());

        if (user) {
            console.log('User found:');
            console.log(user);
        } else {
            console.log('User not found.');
        }
    } catch (error) {
        console.error('Error finding user:', error);
    }
}

async function main() {
    try {
        let addingUsers = true;

        while (addingUsers) {
            addingUsers = await addUser();
        }

        const { search } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'search',
                message: 'Do you want to search for a user?',
                default: false,
            },
        ]);

        if (search) {
            await findUser();
        }

        console.log('Goodbye!');
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

main();
