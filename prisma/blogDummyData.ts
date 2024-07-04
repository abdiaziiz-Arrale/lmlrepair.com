// dummyData.ts
export const users = [
   {
      id: 1,
      email: 'alice@example.com',
      name: 'Alice',
   },
   {
      id: 2,
      email: 'bob@example.com',
      name: 'Bob',
   },
];

export const posts = [
   {
      title: 'Alice Post 1',
      content: "This is Alice's first post",
      published: true,
    createdAt: new Date(), // Current date and time
      authorId: 1, // Assuming 1 is the ID for Alice after seeding
   },
   {
      title: 'Alice Post 2',
      content: "This is Alice's second post",
      published: false,
            createdAt: new Date(), // Current date and time

      authorId: 1, // Assuming 1 is the ID for Alice after seeding
   },
   {
      title: 'Bob Post 1',
      content: "This is Bob's first post",
      published: true,
            createdAt: new Date(), // Current date and time

      authorId: 2, // Assuming 2 is the ID for Bob after seeding
   },
   {
      title: 'Bob Post 2',
      content: "This is Bob's second post",
      published: false,
            createdAt: new Date(), // Current date and time

      authorId: 2, // Assuming 2 is the ID for Bob after seeding
   },
];
