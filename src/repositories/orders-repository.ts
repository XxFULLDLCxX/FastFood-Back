import { prisma } from "@/config";

const findUnique = () => {
  return prisma.order.findUnique({});
};
