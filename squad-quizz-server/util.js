const logger = (message) => {
    const timestamp = String(new Date()); 
    console.log(timestamp.slice(0,24)+" : "+message);
}

module.exports = {logger}