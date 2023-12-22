import { prisma } from '@/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

async function main() {
  
  const prisma = new PrismaClient();
  
  interface SeedParams {
    categories: number;
    productsPerCategory: number;
    additionalsPerProduct: number;
  }
  
  async function cleanDatabase(): Promise<void> {
    await prisma.orderAdditional.deleteMany({});
    await prisma.additional.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.payment.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
  }
  
  async function createCategory(name: string): Promise<any> {
    return prisma.category.create({
      data: {
        name,
        image: '',
      },
    });
  }
  
  async function createProduct(categoryId: number): Promise<any> {
    return prisma.product.create({
      data: {
        categoryId,
        image: '',
        info: faker.lorem.words(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        banner: '',
      },
    });
  }
  
  async function createAdditional(productId: number): Promise<any> {
    return prisma.additional.create({
      data: {
        image: '',
        info: faker.lorem.words(),
        name: faker.commerce.productAdjective(),
        price: Number(faker.commerce.price()),
        productId,
      },
    });
  }
  
  async function createManyProductsAndAdditionals(params: SeedParams): Promise<void> {
    const { categories, productsPerCategory, additionalsPerProduct } = params;
  
    await cleanDatabase();
  
    for (let i = 0; i < categories; i++) {
      const category = await createCategory(`Category${i + 1}`);
  
      for (let j = 0; j < productsPerCategory; j++) {
        const product = await createProduct(category.id);
  
        for (let k = 0; k < Math.floor(Math.random() * (additionalsPerProduct + 1)); k++) {
          await createAdditional(product.id);
        }
      }
    }
  }
  
  // Exemplo de uso
  const seedParams: SeedParams = {
    categories: 4,
    productsPerCategory: 20,
    additionalsPerProduct: 5,
  };
  
  createManyProductsAndAdditionals(seedParams);
  
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
