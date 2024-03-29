import httpStatus from "http-status";
import { orderRepositoy } from "@/repositories/orders-repository";
import setError from "@/utils/errors";
import { OrderAdditionalsParams, OrderParams } from "@/utils/protocols/orders";

const read = async () => {
  return orderRepositoy.findMany();
};

const readByCode = async (code: number) => {
  if (isNaN(code))
    throw setError(
      httpStatus.UNPROCESSABLE_ENTITY,
      "code é um número de um pedido válido",
    );
  const result = await orderRepositoy.findManyByCode(code);
  if (result.length === 0) throw setError(httpStatus.NOT_FOUND);
  return result;
};

const readAdditionals = async (orderId: number) => {
  const result = orderRepositoy.readAdditionals(orderId);
  return result;
}

const create = async (params: OrderParams) => {
  const order = await orderRepositoy.findFirst(params.productId);
  if (order)
    throw setError(httpStatus.FORBIDDEN, "O productId já incluso no pedido.");
  return orderRepositoy.create(params);
};

const createAdditional = async (params: OrderAdditionalsParams) => {
  return orderRepositoy.createAdditional(params);
};

const orderService = {
  createAdditional,
  readAdditionals,
  readByCode,
  create,
  read,
};

export default orderService;
