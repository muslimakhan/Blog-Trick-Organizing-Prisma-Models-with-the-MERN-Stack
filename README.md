# Trick – Organizing Prisma Models with the MERN Stack

## What is the Trick for Organizing Prisma Models?

When I started working with Prisma ORM, I discovered the `schema.prisma` file in the `./prisma` folder, which is generated after running the Prisma `init` command. This file contains all the Prisma ORM information about database connectivity, models, types, and enums. Keeping all the details in one place works well for small projects. However, as projects grow, it becomes complex to manage everything in a single file due to the increasing number of models, types, and enums.

I realized that we need to split the models and other information into different files. I searched the Prisma documentation but found no official guidelines or structure to help with this. Therefore, I developed my own method to handle this situation from scratch. This trick is not officially supported by Prisma ORM, but I hope you find this blog beneficial for your development journey.

Additionally, I found that there is no built-in way to import predefined data for tables through Prisma ORM. Many tables require initial data imports at the start of every project, such as `AppConfig`, `Country`, `State`, `City`, `Currency`, `EmailTemplate`, `SMSTemplate`, `User`, etc. While this data can be imported using MongoDB Compass or the MongoDB command line, we need a way to import all data through Prisma ORM from JSON files.

[Read more about this trick here](https://muslimahmad.com/trick-organazing-prisma-models-with-the-mern-stack)
