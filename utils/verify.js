const { run } = require("hardhat")

async function verify(contractAddress, args, contractPath) {
    console.log("Verifying Contract...")
    try {
        await run("verify:verify", {
            constructorArguments: args,
            address: contractAddress,
            contract: contractPath,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
