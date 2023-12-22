import { prisma } from "@/config";

async function findUniqueIncludes(orderId: number) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      products: {
        select: {
          price: true,
        },
      },
      orderAdditionals: {
        select: {
          additional: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  return order;
}
