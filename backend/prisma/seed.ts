// TODO: Implement the database seeding script
// This should create:
// - 5 users with realistic names and emails
// - 3 projects
// - 8 different tags
// - 100 tasks with random assignments
// - Comments for tasks (0-10 per task)
// Refer to the assignment README for detailed requirements

import { PrismaClient, TaskStatus } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
const statuses = Object.values(TaskStatus);

async function main() {
  // TODO: Implement seeding logic here

  const usersData = generateUsers(5);

  await prisma.user.createMany({
    data: usersData,

  });

  const users = await prisma.user.findMany();
  console.log(`Created ${users.length} users`);

  ///////////////////////////////////////

  const projectData = generateProjects(3);

  await prisma.project.createMany({
    data: projectData,
    skipDuplicates: true,
  });

  const projects = await prisma.project.findMany();
  console.log(`Created ${projects.length} projects`);

  /////////////////////////////////////////

  const tagsData = generateTags();

  await prisma.tag.createMany({
    data: tagsData,
    skipDuplicates: true,
  });

  const tags = await prisma.tag.findMany();
  console.log(`Created ${tags.length} tags`);

  /////////////////////////////////////////

  const tasksData = generateTasks(100, users, projects);

  await prisma.task.createMany({
    data: tasksData,
  });

  const tasks = await prisma.task.findMany();
  console.log(`Created ${tasks.length} tasks`);

  /////////////////////////////////////////

  const taskTagsData = generateTaskTags(tasks, tags);

  await prisma.taskTag.createMany({
    data: taskTagsData,
    skipDuplicates: true,
  });

  const taskTags = await prisma.taskTag.findMany();
  console.log(`Created ${taskTags.length} task-tag relationships`);

  /////////////////////////////////////////

  const commentsData = generateComments(tasks, users);

  if (commentsData.length > 0) {
    await prisma.comment.createMany({
      data: commentsData,
    });
  }

  const comments = await prisma.comment.findMany();
  console.log(`Created ${comments.length} comments`);

  /////////////////////////////////////////
  console.log("Database seeding completed successfully!");
  console.log(`   Users: ${users.length}`);
  console.log(`   Projects: ${projects.length}`);
  console.log(`   Tags: ${tags.length}`);
  console.log(`   Tasks: ${tasks.length}`);
  console.log(`   Task-Tag relationships: ${taskTags.length}`);
  console.log(`   Comments: ${comments.length}`);
  /////////////////////////////////////////

}

function generateUsers(count: number) {
  return Array.from({ length: count }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
}

function generateProjects(count: number) {
  return Array.from({ length: count }, () => ({
    name: faker.company.name(),
  }));
}

function generateTags() {
  const tags = [
    "Frontend", "Backend", "Database", "UI/UX", "Testing",
    "DevOps", "Security", "Performance"
  ];

  return faker.helpers.shuffle(tags).map(name => ({ name }));
}

function generateTasks(count: number, users: any[], projects: any[]) {
  return Array.from({ length: count }, () => ({
    title: generateRealisticTaskTitle(),
    status: faker.helpers.arrayElement(statuses),
    assigneeId: faker.helpers.arrayElement(users).id,
    projectId: faker.helpers.arrayElement(projects).id,
  }));
}

function generateTaskTags(tasks: any[], tags: any[]) {
  const taskTags: { taskId: any; tagId: any; }[] = [];
  tasks.forEach(task => {
    const numberOfTags = faker.number.int({ min: 1, max: 3 });
    const selectedTags = faker.helpers.arrayElements(tags, numberOfTags);
    selectedTags.forEach(tag => {
      taskTags.push({
        taskId: task.id,
        tagId: tag.id,
      });
    }
    );
  }
  );
  return taskTags;
}

function generateComments(tasks: any[], users: any[]) {
  const comments: { body: string; taskId: any; authorId: any; createdAt: Date; }[] = [];
  tasks.forEach(task => {
    const numberOfComments = faker.number.int({ min: 0, max: 10 });
    for (let i = 0; i < numberOfComments; i++) {
      comments.push({
        body: faker.lorem.sentences({ min: 1, max: 3 }),
        taskId: task.id,
        authorId: faker.helpers.arrayElement(users).id,
        createdAt: faker.date.between({ from: task.createdAt, to: new Date() }),
      });
    }
  });
  return comments;
}

function generateRealisticTaskTitle() {
  const word1 = faker.helpers.arrayElement(['Enhance', 'Streamline', 'Optimize', 'Implement', 'Integrate']);
  const word2 = faker.helpers.arrayElement(['dashboard', 'workflow', 'interface', 'system', 'process']);
  const word3 = faker.helpers.arrayElement(['performance', 'usability', 'security', 'efficiency', 'scalability']);
  
  return `${word1} ${word2} ${word3}`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
