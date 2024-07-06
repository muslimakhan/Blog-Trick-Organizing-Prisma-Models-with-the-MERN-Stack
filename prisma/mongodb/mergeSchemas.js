const fs = require('fs');
const path = require('path');

const modelDir = path.join(__dirname, 'models');
const typeDir = path.join(__dirname, 'types');
const enumDir = path.join(__dirname, 'enums');
const dataSource = path.join(__dirname, 'DataSource.prisma');
const outputSchema = path.join(__dirname, '../schema.prisma');

const dataSourceContent = fs.readFileSync(dataSource, 'utf-8');

// Read base schema
const baseSchema = `
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

${dataSourceContent}
`;

// Read all enum files
const enumsFiles = fs.readdirSync(enumDir).filter(file => file.endsWith('.prisma'));

// Concatenate all enum files content
let enumsContent = '';
if (enumsFiles.length > 0) {
    enumsContent += '//All Enums Generate\n\n';
    for (const file of enumsFiles) {
        const content = fs.readFileSync(path.join(enumDir, file), 'utf-8');
        enumsContent += `${content}\n`;
    }
}

// Read all type files
const typesFiles = fs.readdirSync(typeDir).filter(file => file.endsWith('.prisma'));

// Concatenate all type files content
let typesContent = '';
if (typesFiles.length > 0) {
    typesContent += '\n//All Types Generate\n\n';
    for (const file of typesFiles) {
        const content = fs.readFileSync(path.join(typeDir, file), 'utf-8');
        typesContent += `${content}\n`;
    }
}

// Read all model files
const modelFiles = fs.readdirSync(modelDir).filter(file => file.endsWith('.prisma'));

let modelsContent = '';
// Concatenate all model files content
if (modelFiles.length > 0) {
    modelsContent += '\n//All Models Generate\n\n';
    for (const file of modelFiles) {
        const content = fs.readFileSync(path.join(modelDir, file), 'utf-8');
        modelsContent += `${content}\n`;
    }
}

// Write the final schema.prisma file
fs.writeFileSync(outputSchema, baseSchema + enumsContent + typesContent + modelsContent);

console.log('Schema merged successfully');
