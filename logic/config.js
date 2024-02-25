const fs = require('fs');

class ConfigReader {
    readConfig() {
        try {
            const data = fs.readFileSync("./logic/config.json", 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Error reading config file:', err);
            return null;
        }
    }
}

const configReader = new ConfigReader();
const cnf = configReader.readConfig();

module.exports = cnf