const {
    INITIAL_SUPPLY,
    developmentChains,
} = require("../helper-hardhat-config")
const { getNamedAccounts, deployments, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const contractPath = "contracts/OurToken.sol:OurToken"

    const args = [INITIAL_SUPPLY]
    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`Token deployed at ${ourToken.address}`)
    log("==============================================")

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ourToken.address, args, contractPath)
    }
    log("================================================")
}

module.exports.tags = ["all", "ourtoken"]
