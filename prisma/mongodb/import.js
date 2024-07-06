const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const prisma = new PrismaClient();


async function main() {
    // Use glob to find all JSON files in the specified directory
    const files = glob.sync(path.join(__dirname, 'data/*.json'));

    // Iterate over each file
    for (const file of files) {
        // Extract the model name from the file name (assuming the file name matches the model name)
        const modelName = path.basename(file, path.extname(file));

        // Ensure the model name starts with an uppercase letter (adjust as needed)
        const prismaModel = modelName.charAt(0).toUpperCase() + modelName.slice(1);

        // Check if the model exists in the Prisma client and has unique fields defined
        if (prisma[prismaModel]) {
            // Read and parse the JSON file
            const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

            // Import the data into the corresponding Prisma model
            for (const item of data) {
                // console.log(item);

                // Add additional fields dynamically
                item.status = item.status || 'Active';

                // Insert the new record
                await prisma[prismaModel].create({
                    data: item,
                });
            }

            console.log(`Data from ${file} imported successfully into ${prismaModel} model.`);
        } else {
            console.error(`Model ${prismaModel} does not exist in Prisma schema or unique fields are not defined.`);
        }
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
