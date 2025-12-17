// Borra el "use server" de aquí arriba
"use client";
import { Order, OrderDto } from "@/features/types/order";
import { getApiUrl } from "@/features/utils/baseURL";
import { getAuthToken } from "@/lib/auth";

const url = getApiUrl('/api/order');

/**
 * Función auxiliar para obtener headers (evita repetir código)
 */
const getHeaders = () => {
  const token = getAuthToken(); // Quita el 'await', getAuthToken de localStorage es directo
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
};

export const getMyOrders = async (): Promise<OrderDto[]> => {
  const response = await fetch(`${url}/user/my-orders`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await fetch(`${url}/${orderId}`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

export const getActiveRentals = async (): Promise<OrderDto[]> => {
  const response = await fetch(`${url}/activerentals`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

export const getOverdueRentals = async (): Promise<OrderDto[]> => {
  const response = await fetch(`${url}/overduerentals`, {
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
};

export const cancelOrder = async (orderId: string): Promise<boolean> => {
  const response = await fetch(`${url}/${orderId}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return response.ok;
};

export const markAsReturned = async (orderId: string): Promise<boolean> => {
  const response = await fetch(`${url}/${orderId}/mark-returned`, {
    method: "PUT",
    headers: getHeaders(),
  });
  return response.ok;
};